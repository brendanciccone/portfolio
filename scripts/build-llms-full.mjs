#!/usr/bin/env node
/**
 * Writes out/llms-full.txt: llms.txt followed by the readable text of every
 * page in the sitemap, as one markdown document. public/llms.txt is the
 * hand-written index; this is the companion the llms.txt convention calls
 * for, so an assistant pointed at the site gets every case study in a single
 * fetch instead of a list of links it may or may not follow. The home page's
 * "Open in Claude / Open in ChatGPT" links point here.
 *
 * Generated from the exported HTML rather than written by hand so it cannot
 * drift from the case-study copy: edit a page and the next build carries it.
 *
 * Usage: runs as the second half of `pnpm build`; after a build it can also be
 * run on its own with `node scripts/build-llms-full.mjs`.
 */

import { readFile, writeFile } from "node:fs/promises"
import { dirname, join } from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"
import { JSDOM } from "jsdom"

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, "..", "out")
const siteUrl = "https://brendanciccone.com"

const ELEMENT_NODE = 1
const TEXT_NODE = 3

// Controls and media carry no prose; the footer and nav repeat on every page.
// Buttons stay: an Other Work title is a button that opens its screenshot.
const SKIPPED_TAGS = new Set([
  "FOOTER", "FORM", "IFRAME", "IMG", "NAV", "NOSCRIPT", "PICTURE", "SCRIPT",
  "STYLE", "SVG", "TEMPLATE", "VIDEO",
])

const BLOCK_TAGS = new Set([
  "ADDRESS", "ARTICLE", "ASIDE", "BLOCKQUOTE", "DD", "DIV", "DL", "DT",
  "FIGCAPTION", "FIGURE", "H1", "H2", "H3", "H4", "H5", "H6", "HEADER", "LI",
  "MAIN", "OL", "P", "SECTION", "UL",
])

/** @param {Element} element */
const isSkipped = (element) =>
  SKIPPED_TAGS.has(element.tagName) ||
  element.getAttribute("aria-hidden") === "true" ||
  // Still loading in the static HTML (the GitHub heatmap fetches on the client)
  element.getAttribute("aria-busy") === "true" ||
  // The before/after slider labels its two halves with text that only means
  // something while you are looking at the images
  element.getAttribute("role") === "slider" ||
  // A case study's page header is a <header> too; only the site header
  // carries navigation
  (element.tagName === "HEADER" && element.querySelector("nav") !== null) ||
  // Opted out explicitly: the Open in Claude / ChatGPT links, whose
  // prefilled prompt tells the assistant to read this very file
  element.hasAttribute("data-llms-skip")

/** @param {string} text */
const collapse = (text) => text.replace(/\s+/g, " ").trim()

/** @param {Node} node @returns {node is Element} */
const isElement = (node) => node.nodeType === ELEMENT_NODE

/** @param {Element} element @returns {boolean} */
const containsBlock = (element) =>
  [...element.children].some(
    (child) => !isSkipped(child) && (BLOCK_TAGS.has(child.tagName) || containsBlock(child)),
  )

/**
 * Absolute URL of a link that goes somewhere, or null for anything else
 * (including in-page #fragment links).
 *
 * @param {Element} element
 * @returns {string | null}
 */
const linkTarget = (element) => {
  const href = element.tagName === "A" ? element.getAttribute("href") : null
  if (!href || href.startsWith("#")) return null
  return new URL(href, `${siteUrl}/`).href
}

/**
 * Text of an element's content, with links inside it written as markdown.
 *
 * @param {Element} element
 * @returns {string}
 */
const contentText = (element) => {
  const children = [...element.childNodes].filter((child) => !isElement(child) || !isSkipped(child))
  const elements = children.filter(isElement)
  // A bare space counts: in <strong>Fast</strong> <em>secure</em> it is the
  // word break, not a gap between chips
  const hasOwnText = children.some((child) => child.nodeType === TEXT_NODE && (child.textContent ?? "") !== "")

  // Sibling elements with no text between them are separate items on screen
  // (a row of tag chips, the lines of a card), which would otherwise run
  // together into one word
  if (elements.length > 1 && !hasOwnText) {
    return elements.map((child) => collapse(inlineText(child))).filter(Boolean).join(" · ")
  }
  return children.map(inlineText).join("")
}

/** @param {Node} node @returns {string} */
const inlineText = (node) => {
  if (node.nodeType === TEXT_NODE) return node.textContent ?? ""
  if (!isElement(node) || isSkipped(node)) return ""

  const text = contentText(node)
  const href = linkTarget(node)
  return href && collapse(text) ? `[${collapse(text)}](${href})` : text
}

/** @param {string} tagName @param {string} text */
const formatLeaf = (tagName, text) => {
  const heading = /^H([1-6])$/.exec(tagName)
  if (heading) return `${"#".repeat(Number(heading[1]))} ${text}`
  if (tagName === "FIGCAPTION") return `*${text}*`
  return text
}

/** @param {Element} container @param {string[]} blocks */
const collectBlocks = (container, blocks) => {
  for (const child of container.childNodes) {
    if (child.nodeType === TEXT_NODE) {
      const text = collapse(child.textContent ?? "")
      if (text) blocks.push(text)
      continue
    }
    if (!isElement(child) || isSkipped(child)) continue

    // Label/value rows (<dt>Role</dt><dd>Staff Product Designer</dd>) read as
    // one line; the <dd> is written out with its <dt>
    if (child.tagName === "DD") continue
    if (child.tagName === "DT") {
      const next = child.nextElementSibling
      const value = next?.tagName === "DD" ? collapse(inlineText(next)) : ""
      blocks.push(`- ${collapse(inlineText(child))}${value ? `: ${value}` : ""}`)
      continue
    }

    // A list item is one line however its row is laid out
    if (child.tagName === "LI") {
      const text = collapse(inlineText(child))
      if (text) blocks.push(`- ${text}`)
      continue
    }

    // A card that is one big link (a case study, a publication, an album)
    // becomes one linked line: its first line is the name, the rest are notes
    const href = linkTarget(child)
    if (href && containsBlock(child)) {
      const [name, ...notes] = collapse(contentText(child)).split(" · ")
      if (name) blocks.push(`- [${name}](${href})${notes.length > 0 ? `: ${notes.join(" · ")}` : ""}`)
      continue
    }

    if (containsBlock(child)) {
      collectBlocks(child, blocks)
      continue
    }

    const text = collapse(inlineText(child))
    if (text) blocks.push(formatLeaf(child.tagName, text))
  }
}

/** @param {string} block @returns {number | null} */
const headingRank = (block) => /^(#{1,6}) /.exec(block)?.[1].length ?? null

/**
 * Drops headings left with nothing under them once controls and loading
 * states are gone. Walks backwards so a section whose only child heading was
 * dropped is dropped too.
 *
 * @param {readonly string[]} blocks
 * @returns {string[]}
 */
const withoutEmptyHeadings = (blocks) =>
  blocks.reduceRight((kept, block) => {
    const rank = headingRank(block)
    const nextRank = kept.length > 0 ? headingRank(kept[0]) : 0
    if (rank !== null && nextRank !== null && nextRank <= rank) return kept
    return [block, ...kept]
  }, /** @type {string[]} */ ([]))

/**
 * Converts the <main> of an exported page to markdown: headings, paragraphs,
 * list items, label/value rows, card links and figure captions, with site
 * chrome and controls left out.
 *
 * @param {string} html
 * @returns {string}
 */
export const mainToMarkdown = (html) => {
  const { document } = new JSDOM(html).window
  const main = document.querySelector("main")
  if (!main) throw new Error("No <main> element in the exported HTML")

  /** @type {string[]} */
  const collected = []
  collectBlocks(main, collected)
  const blocks = withoutEmptyHeadings(collected)

  // List items stay on consecutive lines; everything else is its own paragraph
  return blocks
    .map((block, index) => {
      if (index === 0) return block
      const isListItem = block.startsWith("- ")
      const followsListItem = blocks[index - 1].startsWith("- ")
      return `${isListItem && followsListItem ? "\n" : "\n\n"}${block}`
    })
    .join("")
}

const writeLlmsFull = async () => {
  // Next copies public/ into out/, so the index sits next to the pages
  const index = await readFile(join(outDir, "llms.txt"), "utf8")

  const sitemap = await readFile(join(outDir, "sitemap.xml"), "utf8")
  const { document } = new JSDOM(sitemap, { contentType: "text/xml" }).window
  const urls = [...document.querySelectorAll("loc")].map((loc) => collapse(loc.textContent ?? ""))
  if (urls.length === 0) throw new Error("out/sitemap.xml lists no pages")

  const pages = await Promise.all(
    urls.map(async (url) => {
      const html = await readFile(join(outDir, new URL(url).pathname, "index.html"), "utf8")
      return `Source: ${url}\n\n${mainToMarkdown(html)}`
    }),
  )

  await writeFile(join(outDir, "llms-full.txt"), `${[index.trim(), ...pages].join("\n\n---\n\n")}\n`)
  console.log(`llms-full.txt: llms.txt + ${pages.length} pages`)
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await writeLlmsFull()
}
