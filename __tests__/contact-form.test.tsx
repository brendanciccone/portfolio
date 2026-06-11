import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ContactForm from '@/components/contact-form'

const mockFetch = vi.fn()

const fillRequiredFields = () => {
  fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Test User' } })
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } })
  fireEvent.change(screen.getByLabelText('Message'), {
    target: { value: 'Hello from the test suite!' },
  })
  fireEvent.click(screen.getByRole('checkbox'))
}

const submitForm = () => {
  fireEvent.click(screen.getByRole('button', { name: /send message/i }))
}

describe('ContactForm', () => {
  beforeEach(() => {
    mockFetch.mockReset()
    vi.stubGlobal('fetch', mockFetch)
    vi.stubEnv('NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY', 'test-access-key')
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.unstubAllEnvs()
  })

  it('keeps the submit button disabled until terms are accepted', () => {
    render(<ContactForm />)
    const submitButton = screen.getByRole('button', { name: /send message/i })
    expect(submitButton).toBeDisabled()

    fireEvent.click(screen.getByRole('checkbox'))
    expect(submitButton).toBeEnabled()
  })

  it('blocks submission when client-side validation fails', async () => {
    render(<ContactForm />)
    fillRequiredFields()
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'short' } })

    submitForm()

    expect(
      await screen.findByText('Message must be at least 10 characters long'),
    ).toBeInTheDocument()
    expect(mockFetch).not.toHaveBeenCalled()
  })

  it('submits to Web3Forms and shows the success state', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, message: 'Email sent' }),
    })
    render(<ContactForm />)
    fillRequiredFields()

    submitForm()

    expect(await screen.findByText('Thank you for your message!')).toBeInTheDocument()
    expect(mockFetch).toHaveBeenCalledTimes(1)

    const [url, init] = mockFetch.mock.calls[0] as [string, RequestInit]
    expect(url).toBe('https://api.web3forms.com/submit')
    expect(init.method).toBe('POST')
    const payload: unknown = JSON.parse(String(init.body))
    expect(payload).toMatchObject({
      access_key: 'test-access-key',
      name: 'Test User',
      email: 'test@example.com',
      company: 'Not provided',
      message: 'Hello from the test suite!',
    })
  })

  it('surfaces the Web3Forms error message when submission is rejected', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      json: async () => ({ success: false, message: 'Invalid access key' }),
    })
    render(<ContactForm />)
    fillRequiredFields()

    submitForm()

    expect(await screen.findByText('Invalid access key')).toBeInTheDocument()
    expect(screen.queryByText('Thank you for your message!')).not.toBeInTheDocument()
  })

  it('shows a configuration error when the access key is missing', async () => {
    vi.stubEnv('NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY', '')
    render(<ContactForm />)
    fillRequiredFields()

    submitForm()

    expect(await screen.findByText(/not configured/i)).toBeInTheDocument()
    expect(mockFetch).not.toHaveBeenCalled()
  })

  it('shows a generic error when the response body is not the Web3Forms shape', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ unexpected: 'shape' }),
    })
    render(<ContactForm />)
    fillRequiredFields()

    submitForm()

    expect(await screen.findByText('Failed to send message')).toBeInTheDocument()
  })
})
