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

## Supply-chain protection

This project assumes contributors have [Aikido Safe Chain](https://github.com/AikidoSec/safe-chain) installed locally. Safe Chain wraps `npm`/`pnpm`/`yarn`/`npx`/`pip`/`uv`/`poetry` to block known-malicious packages and quarantine versions under 48 hours old at install time — defense against npm supply-chain attacks like Shai-Hulud.

One-time install:

```bash
curl -fsSL https://safechain.aikido.dev/install.sh | bash
# then restart your terminal
```

No tokens or config required. Free and open source.

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
