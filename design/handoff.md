# Developer handoff — Analytica portfolio

> Spec for the two screen archetypes. Token names refer to
> [`design/tokens.json`](tokens.json) / [`src/styles/tokens.css`](../src/styles/tokens.css);
> component props refer to [`design/design-system.md`](design-system.md). This portfolio is
> already implemented in Astro — this doc is the reference for parity when redesigning in
> Figma or extending screens.

## Global frame
- **Container:** `--container` (1120px), centred, `--sp-4` inline padding.
- **Section rhythm:** `.section` = `--sp-7` (5rem) block padding.
- **Header:** sticky, `z-index:50`, translucent (`color-mix(--bg 82%)`) + `blur(10px)`,
  bottom `--border`. Persists across view transitions.
- **Footer:** `--surface-2`, top `--border`, `--sp-7` top margin.
- **Themes:** light default; `[data-theme="dark"]` toggled by nav button, persisted to
  `localStorage`, reflected in `aria-pressed`.
- **Type:** display = Fraunces, body = IBM Plex Sans, labels/data = IBM Plex Mono.
  Numbers everywhere use `tabular-nums lining-nums`.

---

## Screen A — Home (`/`, [`index.astro`](../src/pages/index.astro))

**Sections (top → bottom):** Hero → Work (bento grid + filters) → About (+ headshot) →
Credentials → Contact → Footer. Section heads use the numbered `.eyebrow` (`01 / Work`).

| Region | Layout | Tokens | Component / behaviour |
|--------|--------|--------|-----------------------|
| Hero | full-width, `graph-grid` bg; display `--step-5` | `--accent`, `--signal`, `--grid-line` | scatter→formation animation (respects reduced-motion) |
| Work grid | bento (multi-col → 1 col mobile) | `.card`, `--radius-lg`, `--shadow` | `a.card` hover lift; `StatCard` inside; lineage chips |
| Filters | pill row | `.tag`/chip styles | All / Data eng / Analysis / Data science / Viz — client-side filter |
| About | text `--measure` + headshot | `--surface`, `--border` | static |
| Contact | CTA row | `.btn`, `.btn-primary` | mailto + social |

**Interaction states:** cards lift `-3px` + accent border + shadow on hover; filter pills use
active = filled `--accent`; all interactive elements get the global focus ring.
**Responsive:** bento → 1 column, hero stacks, nav brand-name hidden < 540px.

---

## Screen B — Case-study spine ([`CaseStudy.astro`](../src/layouts/CaseStudy.astro))

Two live instances: [`football-analytica`](../src/pages/work/football-analytica.astro),
[`credit-card-tracker`](../src/pages/work/credit-card-tracker.astro).

### Header block (`graph-grid`, `--grid-size:28px`)
`← All work` back link → `.eyebrow` category → `<h1>` + optional `.badge` status →
`.lead` summary (capped at `--measure`) → meta `<dl>` (Role / Status / Stack tags) +
optional hero `StatCard` → optional `.btn` link row.

### Body — sticky rail + content (`.cs-grid`)
- **Grid:** `160px minmax(0,1fr)`, gap `--sp-6`. Collapses to 1 col < 860px (rail becomes a
  horizontal row above content).
- **Pipeline rail** (`aside`, `position:sticky; top:80px`): ordered Source → SQL → Analysis →
  Viz. **Scroll-spy** via `IntersectionObserver` (`rootMargin:-20% 0 -55% 0`) sets `.active`
  (accent text + left-border; active num disc filled `--accent`). Anchors `#source` etc.;
  stages get `scroll-margin-top:80px`.
- **Content** (capped `--measure`): optional `.cs-problem` callout (orange), then slotted
  `.stage` sections. Prose helpers available to pages: `.viz` (chart frame), `.note` (teal),
  `.insight` (signal, display-type quote), `pre code` blocks, `figure/figcaption`.

### Component props (StatCard heroStat)
`{ value, unit?, label, spark?, lineage?, tone? }` — see design-system doc. Charts inside `.viz`
must be wrapped in `ChartFigure` (`summary` required; `columns`/`rows` for the data table).

**Interaction / motion:** rail item hover + active transitions (`.15s`); `.reveal` scroll
reveals disabled under `prefers-reduced-motion`; chart island animations gated on the same.
**Edge cases:** rail requires each `.stage` to have a matching `id`; if `heroStat`/`links`/
`problem` props are absent, those blocks are omitted (all conditional).

---

## Handoff checklist
- [ ] Colours reference tokens (both `light` + `dark` in `tokens.json`) — no raw hex.
- [ ] Every chart wrapped in `ChartFigure` with a `summary` + data table; encoding uses
      shape/pattern, not hue alone.
- [ ] Interactive elements are real `<button>`/`<a>` with visible `:focus-visible` ring.
- [ ] Sticky offsets: header uses `top:0`; rail + `scroll-margin-top` use `80px` — keep in sync.
- [ ] Motion respects `prefers-reduced-motion`.
