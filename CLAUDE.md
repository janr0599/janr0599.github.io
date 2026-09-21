# Portfolio site — janr0599.github.io

Personal project of Javier Noguera Rodríguez. **Not PraxisFlow work.** Nothing here may include
PraxisFlow or client code, workflow JSON, credentials, or client names; describing work is fine,
publishing it is not (Technology Assignment Agreement).

## Build and deploy
- The site is the Next.js app in `next-site/` (App Router, Tailwind v4, Motion, Lenis, Radix).
  Copy, figures and diagram data live in `next-site/lib/content.ts`.
- Dev: `cd next-site && npm run dev` (first compile takes ~15 s). Never run `next build` while
  the dev server is up; both write `.next/` and the dev server breaks. `rm -rf .next` fixes it.
- Deploy = push to `main`. `.github/workflows/deploy.yml` builds the static export and publishes
  it to GitHub Pages (source: GitHub Actions). Live in two to three minutes.
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
  onboarding 40 min to 40 s, LexSelect 51-93% / 24 of 24. Don't round them into marketing.
- Screenshots of client workflows never ship. The Grafana stat row (no client selector, no
  workflow table) and the architecture diagrams are the allowed evidence.
- Client is "a US immigration law firm", agency is "a small automation agency" unless he says
  to name them.
- No em dashes anywhere in copy.

## Open items
- His accuracy pass on the four case studies.
- LexSelect public benchmark post URL, to link from the evaluation case.
- Three n8n community templates marked "in progress"; link each when published.
- PDF portfolio (`links.portfolioPdf` in content.ts is null until the file exists in `public/`).
