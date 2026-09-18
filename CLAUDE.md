# Portfolio site — janr0599.github.io

Personal project of Javier Noguera Rodríguez. **Not PraxisFlow work.** Nothing here may include
PraxisFlow or client code, workflow JSON, credentials, or client names; describing work is fine,
publishing it is not (Technology Assignment Agreement).

## Build and deploy
- Source of truth: `build/classic.html` (page content, no html/head/body wrapper).
- `python3 build/make.py` regenerates `index.html` and `build/artifact-classic.html`.
- Deploy = push to `main`; GitHub Pages serves the root. Live in about a minute.
- **Git identity for this repo: user `janr0599`.** Run `gh auth switch --user janr0599` before
  any push, and `gh auth switch --user javiern0599` afterwards (that one is the PraxisFlow work
  account). Commit as `Javier Noguera <javiernr0599@gmail.com>`.
- Preview a change headlessly: `google-chrome-stable --headless=new --disable-gpu
  --hide-scrollbars --window-size=1280,2700 --screenshot=/tmp/p.png file://$PWD/index.html`

## Design
- Current site: light, bento cards, Figtree + IBM Plex Mono, cobalt accent. He chose this
  "regular-looking" layout deliberately over two earlier directions.
- `build/archive/` holds the rejected versions: `the-run.html` (3D scroll-through workflow,
  three.js + GSAP + Lenis) and `paper.html` (light document style). Don't delete; don't deploy.
- He is allergic to AI-slop design: glowing rounded cards on near-black, one acid accent,
  Inter/Space Grotesk, emoji section markers, centered-everything. Don't reintroduce them.

## Content rules
- Numbers are real and must stay accurate: 25 workflows, ~380 runs/day, 0% failures, intake
  40 min → 40 s, LexSelect 51–93% / 24 of 24. Don't round them into marketing.
- Client is "a US immigration law firm", agency is "a small automation agency" unless he says
  to name them.
- No em dashes anywhere in copy.

## Open items
- Booking link (Book a call currently opens a mailto).
- His accuracy pass on the four case studies.
- LexSelect public benchmark post URL, to link from the evaluation case.
- Three n8n community templates marked "in progress"; link each when published.
