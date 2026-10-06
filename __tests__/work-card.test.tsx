import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CompactWorkCard, type CompactWorkCardData } from '@/components/work-card'

const project: CompactWorkCardData = {
  title: 'Storysync',
  description: 'Design system sync from code to Figma',
  logo: { src: '/about/logos/storysync.jpeg', alt: 'Storysync logo' },
  href: 'https://github.com/brendanciccone/storysync',
}

describe('CompactWorkCard', () => {
  it('opens its link in a new tab without handing over the opener', () => {
    render(<CompactWorkCard {...project} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', project.href)
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('shows the title, description and logo alt text', () => {
    render(<CompactWorkCard {...project} />)
    expect(screen.getByRole('heading', { name: project.title })).toBeInTheDocument()
    expect(screen.getByText(project.description)).toBeInTheDocument()
    expect(screen.getByRole('img', { name: project.logo.alt })).toBeInTheDocument()
  })
})
