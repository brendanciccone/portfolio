import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock Resend before importing the route
vi.mock('resend', () => ({
  Resend: class MockResend {
    emails = {
      send: vi.fn().mockResolvedValue({ id: 'mock-id' }),
    }
  },
}))

// Mock NextResponse to work outside of Next.js runtime
vi.mock('next/server', () => ({
  NextResponse: {
    json: (body: unknown, init?: { status?: number }) => ({
      body,
      status: init?.status ?? 200,
      json: async () => body,
    }),
  },
}))

import { POST } from '@/app/api/contact/route'

const makeRequest = (body: unknown): Request =>
  new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

describe('POST /api/contact', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // --- Validation ---

  it('rejects request with missing required fields', async () => {
    const res = await POST(makeRequest({ name: '', email: '', message: '' }))
    expect(res.status).toBe(400)
  })

  it('rejects request with missing name', async () => {
    const res = await POST(makeRequest({ email: 'a@b.com', message: 'Hello there!' }))
    expect(res.status).toBe(400)
  })

  it('rejects request with missing email', async () => {
    const res = await POST(makeRequest({ name: 'Test', message: 'Hello there!' }))
    expect(res.status).toBe(400)
  })

  it('rejects request with missing message', async () => {
    const res = await POST(makeRequest({ name: 'Test', email: 'a@b.com' }))
    expect(res.status).toBe(400)
  })

  it('accepts valid submission', async () => {
    const res = await POST(
      makeRequest({ name: 'Test', email: 'test@example.com', message: 'Hello!' })
    )
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(data.success).toBe(true)
  })

  // --- Security: email validation ---

  it('rejects email exceeding max length (254 chars)', async () => {
    const longEmail = 'a'.repeat(246) + '@test.com'
    const res = await POST(makeRequest({ name: 'Test', email: longEmail, message: 'Hi' }))
    expect(res.status).toBe(400)
  })

  it('rejects email with invalid format', async () => {
    const invalidEmails = [
      'not-an-email',
      'missing@tld',
      '@no-local.com',
      'spaces in@email.com',
      'user@.com',
    ]
    for (const email of invalidEmails) {
      const res = await POST(makeRequest({ name: 'Test', email, message: 'Hello' }))
      expect(res.status).toBe(400)
    }
  })

  it('rejects non-string email', async () => {
    const res = await POST(makeRequest({ name: 'Test', email: 12345, message: 'Hello' }))
    expect(res.status).toBe(400)
  })

  // --- Security: XSS / injection in fields ---

  it('accepts but does not crash on HTML/script in name field', async () => {
    const res = await POST(
      makeRequest({
        name: '<script>alert("xss")</script>',
        email: 'test@example.com',
        message: 'Testing XSS in name',
      })
    )
    // The API sends plain text email so HTML is not interpreted — should succeed
    expect(res.status).toBe(200)
  })

  it('accepts but does not crash on HTML/script in message field', async () => {
    const res = await POST(
      makeRequest({
        name: 'Test',
        email: 'test@example.com',
        message: '<img src=x onerror=alert(1)>',
      })
    )
    expect(res.status).toBe(200)
  })

  // --- Security: malformed request body ---

  it('returns 500 on unparseable JSON body', async () => {
    const req = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: 'not-json',
    })
    const res = await POST(req)
    expect(res.status).toBe(500)
  })
})
