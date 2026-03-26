import { describe, it, expect } from 'vitest'
import { generatePageMetadata, projectDetails } from '@/lib/metadata'

describe('generatePageMetadata', () => {
  it('generates default metadata when no title is provided', () => {
    const meta = generatePageMetadata({})
    expect(meta.title).toBe('Brendan Ciccone - 0 → 1 Staff Product Designer')
    expect(meta.description).toContain('Brendan Ciccone')
  })

  it('prepends page title to site title', () => {
    const meta = generatePageMetadata({ title: 'About' })
    expect(meta.title).toBe('About - Brendan Ciccone - 0 → 1 Staff Product Designer')
  })

  it('constructs full URL from path', () => {
    const meta = generatePageMetadata({ path: '/about' })
    const og = meta.openGraph as Record<string, unknown>
    expect(og.url).toBe('https://brendanciccone.com/about')
  })

  it('includes OpenGraph and Twitter card metadata', () => {
    const meta = generatePageMetadata({ title: 'Contact' })
    expect(meta.openGraph).toBeDefined()
    expect(meta.twitter).toBeDefined()

    const twitter = meta.twitter as Record<string, unknown>
    expect(twitter.card).toBe('summary_large_image')
  })

  it('uses custom image dimensions', () => {
    const meta = generatePageMetadata({
      imageUrl: '/custom.png',
      imageAlt: 'Custom',
      imageWidth: 800,
      imageHeight: 400,
    })
    const og = meta.openGraph as { images: Array<{ width: number; height: number }> }
    expect(og.images[0].width).toBe(800)
    expect(og.images[0].height).toBe(400)
  })
})

describe('projectDetails', () => {
  it('contains all four projects', () => {
    expect(Object.keys(projectDetails)).toEqual(
      expect.arrayContaining(['corellium', 'spontivly', 'immertec', 'paidly'])
    )
  })

  it('each project has title, description, and image with alt text', () => {
    for (const project of Object.values(projectDetails)) {
      expect(project.title).toBeTruthy()
      expect(project.description).toBeTruthy()
      expect(project.image.url).toBeTruthy()
      expect(project.image.alt).toBeTruthy()
    }
  })
})
