# Portfolio site, javiernoguera.com

Personal project of Javier Noguera Rodríguez. **Not PraxisFlow work.** Nothing here may include
PraxisFlow or client code, workflow JSON, credentials, or client names; describing work is fine,
publishing it is not (Technology Assignment Agreement).

## Build and deploy
- The site is the Next.js app in `next-site/` (App Router, Tailwind v4, Motion, Lenis, Radix).
  Copy, figures and diagram data live in `next-site/lib/content.ts`.
- Dev: `cd next-site && npm run dev` (first compile takes ~15 s). Never run `next build` while
  the dev server is up; both write `.next/` and the dev server breaks. `rm -rf .next` fixes it.
- Deploy = push to `main`. Vercel (project `portfolio`, root directory `next-site`) builds and
  publishes to https://javiernoguera.com within a minute or two; www redirects to the apex.
  DNS is at GoDaddy (A `@` 216.198.79.1, CNAME `www` to Vercel). GitHub Pages is no longer used.
- Previous versions are archived in `build/`: `classic.html` (the light bento layout, formerly
  `index.html`, built by `make.py`), `archive/the-run.html`, `archive/paper.html`. Don't delete;
  don't deploy.
- **Git identity for this repo: user `janr0599`.** Run `gh auth switch --user janr0599` before
  any push, and `gh auth switch --user javiern0599` afterwards (that one is the PraxisFlow work
  account). Commit as `Javier Noguera <javiernr0599@gmail.com>`.
- `.agents/`, `.claude/` and `skills-lock.json` are gitignored: third-party skills, not site code.

## Design
- Current site (since 2026-09-19): charcoal, off-white, one muted industrial orange, sharp
  corners, hairline rules, Geist + Geist Mono. Brutalist editorial, whitespace-heavy. Built
  against three skills: impeccable (structure), design-taste-frontend (styling),
  emil-design-eng (motion: ease-out only, under 300 ms for UI, reduced-motion honored).
- Motion that exists on purpose: hero wire draw plus a looping orange flow pulse, a sticky
  scroll stack for the four project cards (he asked for it on 2026-09-21), scroll-driven edge
  drawing inside each diagram, staggered CSS reveals. He rejected 3D and horizontal scroll.
- Copy is deliberately generic (email trigger, CRM, automation workflow) so any reader relates;
  the law-firm specifics stay in the case studies, not the hero.
- He is allergic to AI-slop design: glowing cards, gradients, blobs, starfields, acid accents,
  Inter/Space Grotesk, emoji section markers, eyebrows, section numbers, centered-everything.

## Content rules
- Numbers are real and must stay accurate: 25 workflows, 300-400 runs/day, 0% failures,
  onboarding 40 min to 40 s. Don't round them into marketing. The LexSelect evaluation
  (51-93% / 24 of 24) was swapped out of the site on 2026-09-21 for the RAG pipeline; keep it
  for the PDF.
- Case studies are written problem, what runs now, result, in plain language. Node labels
  describe what a step does, not the product behind it.
- Screenshots of client workflows never ship. The Grafana stat row (no client selector, no
  workflow table) and the architecture diagrams are the allowed evidence.
- Client is "a US immigration law firm", agency is "a small automation agency" unless he says
  to name them.
- No em dashes anywhere in copy.

## Open items
- His accuracy pass on the four case studies.
- He must confirm the RAG case: the ingestion side (Drive to Pinecone) is verified, the
  question-answering side is drafted from the pattern, not from his workflow.
- Three n8n community templates marked "in progress"; link each when published.
- PDF portfolio (`links.portfolioPdf` in content.ts is null until the file exists in `public/`).
