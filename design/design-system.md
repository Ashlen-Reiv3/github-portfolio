# Analytica portfolio — design system

> Source of truth: [`src/styles/tokens.css`](../src/styles/tokens.css) (tokens + primitives) and
> [`src/components/`](../src/components/). Portable token export lives in
> [`design/tokens.json`](tokens.json). This doc is the human-readable reference — regenerate it
> when components change (`/design:design-system document [component]`).

Owned aesthetic: deep **teal-green** primary + **signal-orange** accent on **warm paper**,
graph-paper grid signature, Fraunces display / IBM Plex Sans body / IBM Plex Mono labels.
Deliberately not the indigo/Inter template default. Light is the default theme;
`[data-theme="dark"]` re-points the same token slots.

---

## Design tokens

| Category | Tokens | Notes |
|----------|--------|-------|
| Brand colour | `--accent`, `--accent-strong`, `--accent-contrast`, `--signal`, `--signal-strong` | teal primary + orange accent; both themes AA on their canvas |
| Tint/ink pairs | `--teal-tint`/`--teal-ink`, `--orange-tint`/`--orange-ink` | AA-safe chip/label combos |
| Surfaces | `--bg`, `--surface`, `--surface-2` | warm paper, never pure white/black |
| Text | `--text` (~15:1), `--muted` (~6:1 AA body), `--faint` (~4.6:1) | warm ink |
| Lines | `--border`, `--border-strong`, `--grid-line` | grid-line drives the graph-paper texture |
| Chart series | `--series-1..6` | colourblind-aware — **always pair with shape/dash**, never hue alone |
| Type family | `--font-display`, `--font-sans`, `--font-mono` | Fraunces / Plex Sans / Plex Mono |
| Type scale | `--step--1 .. --step-5` | fluid `clamp()`, ~1.25 ratio, 16px base; `--step-5` = hero |
| Spacing | `--sp-1 .. --sp-7` | 4px base (0.5rem → 5rem) |
| Shape | `--radius` 10px, `--radius-lg` 16px, `--radius-pill` 999px | |
| Effect | `--shadow`, `--ring` (focus), `--container` 1120px, `--measure` 68ch | shadow re-tuned per theme |

Rule of thumb: **no hardcoded hex/px in components** — reference a token. Chart islands (JSX)
pass tokens through inline styles as `var(--…)` strings so they theme correctly.

---

## Primitives (defined in `tokens.css`)

### Button — `.btn`
| Variant | Class | Use when |
|---------|-------|----------|
| Secondary (default) | `.btn` | supporting actions; transparent, bordered |
| Primary | `.btn.btn-primary` | main action; filled `--accent` |

**States:** default → hover (`--surface-2` bg / accent border; primary → `--accent-strong`) →
active (`scale(.98)`) → focus-visible (2px `--accent` outline, global rule).
**A11y:** real `<button>`/`<a>`; focus ring inherited; hit area ≥ ~40px via padding.

### Icon button — `.icon-btn`
38×38 square; used for the theme toggle. Hover = `--surface-2` + accent border.
**A11y:** must carry `aria-label` + `aria-pressed` (see theme toggle in Nav).

### Tag / Badge — `.tag`, `.badge`, `.badge-signal`
Mono, pill-shaped labels. `.tag` = neutral (stack chips); `.badge` = teal tint/ink;
`.badge-signal` = orange tint/ink. Decorative-only; keep text meaningful for SR.

### Card — `.card`
Surface + border + `--radius-lg`. As a link (`a.card`) adds hover lift (`translateY(-3px)`
+ shadow + accent border). Used for the bento work grid.

### Eyebrow — `.eyebrow` (+ `.num`)
Numbered editorial section header (`01 / Work`). Mono, uppercase, tracked; number in `--signal`.

### Pipeline step — `.pl-step`
18px numbered disc for the case-study pipeline rail (Source→SQL→Analysis→Viz).

### Utilities
`.graph-grid` (signature background), `.container`, `.section`, `.section-head`, `.reveal`
(scroll-reveal, disabled under `prefers-reduced-motion`), `.sr-only`, `.skip-link`.

---

## Components

### StatCard — [`StatCard.astro`](../src/components/StatCard.astro)
The signature "xStat" card: big tabular number + sparkline + data-lineage chip.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | headline number (tabular-nums) |
| `unit` | `string?` | — | small superscript unit, tinted by tone |
| `label` | `string` | — | mono uppercase caption |
| `spark` | `number[]` | `[]` | ≥2 points → normalised sparkline polyline |
| `lineage` | `string[]` | `['source','SQL','analysis','viz']` | pipeline chip, last step in signal colour |
| `tone` | `'teal' \| 'signal'` | `'teal'` | accent for unit/sparkline |

**States:** static (no interactive states). **A11y:** sparkline `aria-hidden`; lineage row has
`aria-label="Data lineage: source to SQL to …"`; `›` separators `aria-hidden`.

### ChartFigure — [`ChartFigure.astro`](../src/components/ChartFigure.astro)
Accessible wrapper every chart should use: takeaway summary + chart slot + collapsible data
table + non-colour-encoding note.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `summary` | `string` | — | plain-language takeaway (teal callout) |
| `caption` | `string?` | — | figcaption |
| `columns` | `string[]` | `[]` | table headers (`<th scope="col">`) |
| `rows` | `(string\|number)[][]` | `[]` | table rows (first cell `<th scope="row">`) |
| `note` | `string?` | — | appended to the "Show data table" summary |

**A11y:** `<figure>`/`<figcaption>`; the `<details>` table is the text-equivalent of every chart
(the reason charts pass WCAG). Table cells are tabular-nums, right-aligned.

### Nav — [`Nav.astro`](../src/components/Nav.astro)
Sticky, blurred header. Brand mark "A" + name "Ashlen Mammen" + primary links + theme toggle.
**Responsive:** `.brand-name` hides < 540px (mark only). **A11y:** `<nav aria-label="Primary">`;
theme toggle is a `<button aria-label="Toggle dark mode" aria-pressed>` whose state is updated in JS.
`transition:persist` keeps it across Astro view transitions.

### Footer — [`Footer.astro`](../src/components/Footer.astro)
Wordmark "Analytica" + copyright + social links (LinkedIn/GitHub/Email, `target=_blank rel=noopener`).
> **Known inconsistency (see qc-findings #4):** nav brands the person ("Ashlen Mammen"), footer uses
> the project mark ("Analytica"). Decide if intentional (product mark) or unify.

### Chart islands (React, hydrated) — [`src/components/charts/`](../src/components/charts/)
All three render inside a `ChartFigure`, use `--series-*`/theme tokens via inline `var()`, respect
`prefers-reduced-motion` (`isAnimationActive={!reduceMotion}`), and encode categories with **shape
or pattern, not colour alone**.

| Chart | File | Interaction | Encoding | A11y |
|-------|------|-------------|----------|------|
| ShotMap | [`ShotMap.jsx`](../src/components/charts/ShotMap.jsx) | hover/focus → `aria-live` detail line | marker **size** = xG; goal=filled, saved=muted-fill, missed=hollow-ring | SSR-rendered (visible without JS); each shot `tabIndex=0`, `role=img`, descriptive `aria-label`, `:focus-visible` ring |
| XgChart | [`XgChart.jsx`](../src/components/charts/XgChart.jsx) | season toggle (`aria-pressed`) | expected = **hatched** (`url(#xg-hatch)`), actual = solid teal | wrapper `role=img` + summary label; legend labels state the pattern |
| SpendChart | [`SpendChart.jsx`](../src/components/charts/SpendChart.jsx) | per-category focus/hide chips (`aria-pressed`) | stacked bars by `--series-1..4` | wrapper `role=img`; total uses locale-independent grouping (SSR/client match) |

**Open polish items (qc-findings #2, #3):** SpendChart uses colour-only category encoding with two
off-brand hues (blue/magenta) — move to an on-brand teal ramp + per-category pattern. XgChart
expected-vs-actual separation is weak in dark mode — strengthen hatch contrast under `[data-theme="dark"]`.

---

## Accessibility baseline (system-wide)
- Global `:focus-visible` outline (2px `--accent`) + `.skip-link` + `prefers-reduced-motion` guard.
- All text/bg token pairs target WCAG AA; dark-mode measured 5–15:1 (see qc-findings "Verified good").
- Numeric contexts use `font-variant-numeric: tabular-nums lining-nums` (`.kpi`, `table`, `.tnum`).
- Charts never rely on hue alone; each has a text-equivalent data table via ChartFigure.
