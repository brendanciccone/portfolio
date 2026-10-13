import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { OpenInLinks } from '@/components/open-in-links'

const promptOf = (href: string | null): string => {
  if (href === null) throw new Error('link has no href')
  const prompt = new URL(href).searchParams.get('q')
  if (prompt === null) throw new Error(`no q param in ${href}`)
  return prompt
}

describe('OpenInLinks', () => {
  it('prefills a new Claude chat and a new ChatGPT chat', () => {
    render(<OpenInLinks />)
    const claude = screen.getByRole('link', { name: /^Open in Claude/ })
    const chatgpt = screen.getByRole('link', { name: /^Open in ChatGPT/ })
    expect(claude.getAttribute('href')).toMatch(/^https:\/\/claude\.ai\/new\?q=/)
    expect(chatgpt.getAttribute('href')).toMatch(/^https:\/\/chatgpt\.com\/\?q=/)
  })

  it('points both assistants at the full-text file with the same prompt', () => {
    render(<OpenInLinks />)
    const prompts = screen.getAllByRole('link').map((link) => promptOf(link.getAttribute('href')))
    expect(prompts).toHaveLength(2)
    expect(prompts[0]).toBe(prompts[1])
    expect(prompts[0]).toContain('https://brendanciccone.com/llms-full.txt')
  })

  it('opens in a new tab without handing over the opener, and says so', () => {
    render(<OpenInLinks />)
    for (const link of screen.getAllByRole('link')) {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
      expect(link.getAttribute('aria-label')).toMatch(/new tab/)
    }
  })

  it('opts out of llms-full.txt, which its own prompt tells the assistant to read', () => {
    const { container } = render(<OpenInLinks />)
    expect(container.firstElementChild).toHaveAttribute('data-llms-skip')
  })

  it('keeps the visible name inside the accessible name', () => {
    render(<OpenInLinks />)
    for (const link of screen.getAllByRole('link')) {
      const visible = link.textContent ?? ''
      expect(visible).toMatch(/^Open in /)
      expect(link.getAttribute('aria-label')).toContain(visible)
    }
  })
})
