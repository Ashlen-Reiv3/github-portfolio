# Design — working across Claude Code + Claude Design

This repo is set up so the **same design source of truth** feeds both **Claude Code**
(implementation) and **Claude Design** (the `design:*` skills, and — once authorized — the
Figma/Notion/Linear connectors). Start here.

## What lives where

| File | What it is | Produced by | Consumed by |
|------|-----------|-------------|-------------|
| [`src/styles/tokens.css`](src/styles/tokens.css) | **Runtime** source of truth — CSS custom properties, both themes, primitives | hand-authored | the site (Astro) |
| [`design/tokens.json`](design/tokens.json) | **Portable** token export (W3C Design Tokens format), light + dark | generated from `tokens.css` | Figma connector, design tooling, the skills |
| [`design/design-system.md`](design/design-system.md) | Component + primitive reference (variants, states, a11y) | `/design:design-system` | reviewers, designers, handoff |
| [`design/handoff.md`](design/handoff.md) | Per-screen dev spec (home + case-study spine) | `/design:design-handoff` | engineering / redesign parity |
| [`qc-findings.md`](qc-findings.md) | Ranked review findings (blocker → nits) | `/design:design-critique` + `/design:accessibility-review` + manual QC | whoever fixes |

## Who does what

- **Claude Code** — implement, run the dev server, fix bugs, verify in-browser.
  (e.g. the SpendChart hydration fix in [`SpendChart.jsx`](src/components/charts/SpendChart.jsx).)
- **Claude Design skills** (already available inside Claude Code — no auth needed):
  - `/design:design-critique` — usability / hierarchy / consistency
  - `/design:accessibility-review` — WCAG 2.1 AA audit
  - `/design:design-system` — audit / document / extend components → `design/design-system.md`
  - `/design:design-handoff` — screen specs → `design/handoff.md`
  - `/design:ux-copy` — microcopy, CTAs, empty/error states
- **Claude Design connectors** (need OAuth — authorize via claude.ai connector settings, or
  `/mcp` in an interactive `claude` terminal): **Figma** (mirror `tokens.json`, sync designs),
  **Notion** (publish these docs), **Linear** (track the qc-findings items).

## Keeping tokens in sync
`tokens.css` is authoritative. When you change a colour/space/type value there, update the
matching entry in `design/tokens.json` (same slot names). If drift becomes a problem, add a
small generator script and wire it into `npm run build`.

## Regenerate the docs
```
/design:design-system document [component]   # refresh design/design-system.md
/design:design-handoff [screen]              # refresh design/handoff.md
/design:design-critique                      # + /design:accessibility-review → qc-findings.md
```
