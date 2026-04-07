# Portfolio

My personal portfolio site. Built with Next.js, TypeScript, and Tailwind. Live at [brendanciccone.com](https://brendanciccone.com/).

Preview (screenshot of the top of the site; regenerate with `pnpm og:capture`):

![Screenshot of Brendan Ciccone's portfolio homepage](https://brendanciccone.com/og.png)

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Hosted on Railway — **canonical URL:** `https://brendanciccone.com` (apex; `www` → apex redirect in `next.config.mjs`, `alternates.canonical` + `metadataBase` in app metadata)

## Run locally

```bash
pnpm install
pnpm dev
```

Then open [localhost:3000](http://localhost:3000).

## Recent additions

## Updating the OG / README preview image

The OpenGraph image and README preview are a **real screenshot** of the top of the site. After design or copy changes, regenerate it:

```bash
pnpm og:capture
```

This builds the site, runs it in a headless browser, captures a 1200×630 screenshot, and saves it to `public/og.png`. Commit the updated `og.png` when you push.

**First time only:** install Playwright’s Chromium browser so the script can run:

```bash
pnpm exec playwright install chromium
```
