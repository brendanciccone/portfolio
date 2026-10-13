# Portfolio

Source for [brendanciccone.com](https://brendanciccone.com/).

![Screenshot of Brendan Ciccone's portfolio homepage](https://brendanciccone.com/og.png)

Next.js (App Router, static export), TypeScript, Tailwind CSS, and shadcn/ui, hosted on Cloudflare Workers static assets.

## Develop

```bash
pnpm install
pnpm dev      # localhost:3000
pnpm test
pnpm lint
```

## Deploy

Merging to `main` deploys through Cloudflare's git-connected build; `pnpm run deploy` ships from your machine. The contact form needs `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` at build time (see `.env.example`). Setup, DNS, and rollback live in [DEPLOY.md](DEPLOY.md).

## OG image

`public/og.png` is a real screenshot of the homepage. Regenerate it after visual changes with `pnpm og:capture` (first run needs `pnpm exec playwright install chromium`).
