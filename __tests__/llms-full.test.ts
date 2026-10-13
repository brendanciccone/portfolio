import { describe, it, expect } from 'vitest'
import { mainToMarkdown } from '@/scripts/build-llms-full.mjs'

const page = (main: string): string => `<!doctype html><html><body><main>${main}</main></body></html>`

describe('mainToMarkdown', () => {
  it('writes headings, paragraphs and list items as markdown', () => {
    const markdown = mainToMarkdown(
      page('<h1>Corellium</h1><p>Mobile <strong>virtualization</strong></p><ul><li>One</li><li>Two</li></ul><h2>Overview</h2><p>Body</p>'),
    )
    expect(markdown).toBe('# Corellium\n\nMobile virtualization\n\n- One\n- Two\n\n## Overview\n\nBody')
  })

  it('leaves out site chrome, controls, hidden and loading content', () => {
    const markdown = mainToMarkdown(
      page(
        '<header><a href="/">Brendan Ciccone</a><nav><a href="/about/">About</a></nav></header>' +
          '<p>Kept</p>' +
          '<div role="slider"><div>Before</div><div>After</div></div>' +
          '<span aria-hidden="true">decoration</span>' +
          '<div aria-busy="true"><p>Loading contributions</p></div>' +
          '<form><label>Email</label></form>' +
          '<ul data-llms-skip><li><a href="https://claude.ai/new?q=x">Open in Claude</a></li></ul>' +
          '<footer>© 2026</footer>',
      ),
    )
    expect(markdown).toBe('Kept')
  })

  it('keeps a page header that carries no navigation', () => {
    const markdown = mainToMarkdown(page('<header><h1>Corellium</h1><p>Mobile virtualization</p></header>'))
    expect(markdown).toBe('# Corellium\n\nMobile virtualization')
  })

  it('writes a label/value row as one line', () => {
    const markdown = mainToMarkdown(
      page('<dl><div><dt>Role</dt><dd>Staff Product Designer</dd></div><div><dt>Timeline</dt><dd>2023–Present</dd></div></dl>'),
    )
    expect(markdown).toBe('- Role: Staff Product Designer\n- Timeline: 2023–Present')
  })

  it('keeps the space between inline elements in a sentence', () => {
    const markdown = mainToMarkdown(page('<p><strong>Fast</strong> <em>secure</em></p>'))
    expect(markdown).toBe('Fast secure')
  })

  it('separates a row of chips instead of running them together', () => {
    const markdown = mainToMarkdown(page('<div><span>2023</span><span>Acquired</span><span>AI</span></div>'))
    expect(markdown).toBe('2023 · Acquired · AI')
  })

  it('flattens a laid-out list item into one line, keeping its links', () => {
    const markdown = mainToMarkdown(
      page('<ul><li><div><p>Designer</p><p><a href="https://www.fourpixels.xyz">Four Pixels</a></p></div><span>2015-2018</span></li></ul>'),
    )
    expect(markdown).toBe('- Designer · [Four Pixels](https://www.fourpixels.xyz/) · 2015-2018')
  })

  it('turns a card-sized link into one linked line', () => {
    const markdown = mainToMarkdown(
      page('<a href="/work/paidly/"><img alt="" src="x.webp"><div><h2>Paidly</h2><p>Invoicing for SMEs</p></div></a>'),
    )
    expect(markdown).toBe('- [Paidly](https://brendanciccone.com/work/paidly/): Invoicing for SMEs')
  })

  it('resolves relative links and leaves in-page anchors as text', () => {
    const markdown = mainToMarkdown(page('<p><a href="/contact/">Reach out</a> or <a href="#overview">jump</a></p>'))
    expect(markdown).toBe('[Reach out](https://brendanciccone.com/contact/) or jump')
  })

  it('drops headings left with nothing under them', () => {
    const markdown = mainToMarkdown(
      page('<h2>How I Ship</h2><p>Claude Code</p><h3>GitHub Activity</h3><div aria-busy="true"><p>Loading</p></div><h2>Publications</h2><p>Paper</p><h2>Empty</h2>'),
    )
    expect(markdown).toBe('## How I Ship\n\nClaude Code\n\n## Publications\n\nPaper')
  })

  it('throws when the page has no <main>', () => {
    expect(() => mainToMarkdown('<!doctype html><html><body><p>Hi</p></body></html>')).toThrow('No <main> element')
  })
})
