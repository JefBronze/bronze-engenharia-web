# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

Single-page marketing site for **www.bronze-engenharia.com.br**, branded Bronze Engenharia de Energia (Next.js App Router, TypeScript). Until October 2026 it was the Data Joule site at data-joule.com; the domains were swapped, and data-joule.com now serves the energy observatory from the `bronze-web` repo. The repo name stayed. Brand: text wordmark in `app/Brand.tsx` (no logo mark for now), accent bronze `#8A6737` in `landing.module.css`, favicon is the bronze B tile (`npm run icons` regenerates the PNGs). The e-mail signature loads `data-joule.com/email/logo-*.png`, so those files are served by the observatory now; the copies here are unused. Portuguese (pt-BR) landing page for a Grupo A (média tensão) electricity-invoice audit service aimed at industries, supermarket chains, hospitals, malls and retail networks. No backend, no database, no API routes. The old FlexCompute/OpenADR demo site that used to live here was removed in September 2026.

The page was ported from the Claude Design project "Data Joule" (file `Data Joule.dc.html`). When the design changes, re-port from that file rather than restyling ad hoc.

## Commands

```bash
npm run dev      # dev server (localhost:3000), no env vars required
npm run build    # production build — CI runs lint + build
npm run lint
npm run icons    # regenerate public/*.png from public/favicon.svg (uses sharp)
```

## Layout of the code

- `app/layout.tsx` — fonts via `next/font/google` (Source Sans 3, Source Serif 4 variable with `opsz`, Fragment Mono), site metadata, Vercel Analytics + Speed Insights. Fonts must stay self-hosted: the CSP in `next.config.ts` only allows `font-src 'self'`.
- `app/page.tsx` — the whole landing as one client component (needs state for the FAQ accordion). Copy lives in constants at the top (`CHECKS`, `STEPS`, `BASIS`, `FAQ`, `IDLE_SHARE`).
- `app/landing.module.css` — design tokens on `.root` and every component class. Generic link colour is scoped to `a:not([class])` on purpose: classed links (CTA buttons, footer) define their own colours and must not be overridden.
- `app/globals.css` — minimal reset only. No Tailwind.
- The sticky WhatsApp CTA is shown with a plain `@media (max-width: 719px)` rule, matching the design's 720px breakpoint.

## Routing lockdown

`proxy.ts` (Next 16's renamed middleware) allows only `/`, `/privacidade`, the favicon/icon files and `/email/logo-*.png` (loaded by the e-mail signature). Every other path is rewritten to the custom `app/not-found.tsx` with status 404. Adding a new public page or file means adding its path to `ALLOWED` in `proxy.ts`.

## Conventions

- WhatsApp number comes from `NEXT_PUBLIC_WHATSAPP_NUMBER` (see `.env.example`); the default in page.tsx is the current contact number.
- The case chart is inline SVG computed from `IDLE_SHARE` in `page.tsx` (BDGD/ANEEL Copel 2025 analysis, see `../auditoria-fatura/bdgd_analise.md`). Update the numbers there when the analysis is refreshed.
- Security headers/CSP in `next.config.ts` are deliberate. Adding any third-party script, font or image host requires a CSP change.
