# Deploying

The site is a fully static Next.js export (`output: 'export'`) hosted on
**Cloudflare Workers static assets** (free tier, scale-to-zero). There is no
runtime server — `wrangler.jsonc` declares an assets-only Worker (no `main`)
that serves the prebuilt `out/` directory:

- The contact form posts directly from the browser to [Web3Forms](https://web3forms.com).
- `next/image` is backed by Cloudflare Image Transformations
  (`/cdn-cgi/image/...`, free tier: 5,000 unique transformations/month) via
  `lib/image-loader.ts`.
- `public/_redirects` and `public/_headers` (copied into `out/` at build time)
  replace the `redirects()` / `headers()` blocks that used to live in
  `next.config.mjs` (both are ignored under `output: 'export'`). Workers static
  assets honor these files from the assets root.

> **Why a Worker and not Pages?** Either works for a static export, but a
> git-connected build runs `wrangler deploy`, and with no config present
> wrangler auto-detects "Next.js" and forces the OpenNext server adapter —
> which is incompatible with `output: 'export'` and fails the build. Committing
> `wrangler.jsonc` pins the assets-only deploy and avoids that.

## Prerequisites

0. Node.js **>=22.0.0** (matches `engines.node` in `package.json` and
   `.node-version`; wrangler requires it).
1. A Cloudflare account with the `brendanciccone.com` zone on it.
2. `pnpm install`, then authenticate Wrangler once: `pnpm exec wrangler login`
   (only needed for local deploys — the git-connected build authenticates
   itself).
3. A `.env` file with `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` (see `.env.example`).
   The key is inlined into the static bundle at **build time** — it must be
   present before `pnpm build`. For the git-connected build, set it as a
   **build variable** on the Worker (Settings → Build → Variables), not as a
   runtime secret. No runtime env vars are needed (there is no server).

## Deploying

There are two paths; both deploy the assets-only Worker named `portfolio`
(from `wrangler.jsonc`).

### Git-connected build (current setup)

Cloudflare is connected to the repo and deploys on push to the production
branch (`main`):

- **Build command:** `pnpm run build`
- **Deploy command:** `npx wrangler deploy`

So shipping is just merging to `main`. Watch the build in the Cloudflare
dashboard (Workers & Pages → `portfolio` → Deployments).

### Local deploy

```bash
pnpm run deploy
```

(Must be `pnpm run deploy` — bare `pnpm deploy` is a reserved pnpm command.)
This runs `pnpm build && wrangler deploy`, building the export and uploading
`out/`. Use `wrangler deploy --dry-run` to validate the bundle without
uploading.

## One-time Cloudflare setup

1. **Build variable** — Workers & Pages → `portfolio` → Settings → Build →
   Variables and Secrets → add `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` so the
   git-connected build can inline it.

2. **Custom domain** — Workers & Pages → `portfolio` → Settings → Domains &
   Routes → Add → Custom domain → `brendanciccone.com`. Cloudflare creates the
   proxied apex record pointing at the Worker. Remove the old Railway DNS
   records for the apex.

3. **www → apex redirect (permanent 308, previously in next.config.mjs)** —
   make sure a *proxied* DNS record exists for `www` (a CNAME to
   `brendanciccone.com` is fine), then add the zone Redirect Rule:
   *Rules → Redirect rules → "Redirect from WWW to Root"* template, with
   status **308** to match the previous behavior.

4. **Enable Image Transformations** — zone → *Images → Transformations* →
   enable for `brendanciccone.com` (restricting to same-zone sources is
   recommended). Without this, `/cdn-cgi/image/...` URLs return errors.

## Verifying a deploy

- `pnpm build && pnpm start` serves `out/` locally at `localhost:4173`
  (with `/cdn-cgi/image/` passthrough, since transformations only exist at
  Cloudflare's edge).
- On the live domain check:
  - mockup images load and are served as resized variants (responses from
    `/cdn-cgi/image/...` should have `cf-resized` headers),
  - a contact form test submission arrives in the Web3Forms inbox,
  - `https://www.brendanciccone.com` 308s to the apex,
  - a legacy URL like `/work/corellium/1.png` 308s to `1.webp`,
  - image responses carry the week-long `Cache-Control` from `public/_headers`.
- Note: on a `*.workers.dev` preview URL the mockup images will NOT render —
  `/cdn-cgi/image/` only resolves on the custom domain's zone.

## Rolling back to Railway

`railway.json` is intact and still works with the current code: Railway runs
`pnpm build` (static export) and `pnpm start`, which now serves `out/` via
`scripts/serve-out.mjs` (respects `PORT`, answers the `/` health check, and
passes `/cdn-cgi/image/...` through to the source images).

1. Re-enable/redeploy the service on Railway.
2. Point the apex DNS record back at the Railway target (replacing the proxied
   record that points at the Worker).

The old server-rendered setup (Resend-based `/api/contact` route, Next image
optimizer) exists only in git history — restoring it means reverting the
Cloudflare migration commit and setting `RESEND_API_KEY` on Railway again.
