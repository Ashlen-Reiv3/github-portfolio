# Analytica — Distinctive Data-Analyst Portfolio Playbook (2026)

**For:** a data analyst building the "Analytica" brand (PL football analytics + anonymised finance/credit dashboard)
**Stack:** Astro 5 (static + MDX) · small React/Recharts islands · GitHub Pages · light/dark · WCAG 2.1 AA · one maintainer
**Goal:** get hiring managers to the work + a contact, and tell the *source → SQL → analysis → visualisation* story without looking AI-generated.

> Opinionated throughout. Where I make a call I say why. Real example URLs are tagged **[live]** (visit) or **[gallery]** (a curated list to mine).

---

## Executive summary — the 10 highest-impact moves (in priority order)

1. **Pick one "owned" colour + one expressive display typeface, and commit.** The single fastest way out of the template look is a non-indigo accent used consistently as a brand thread, plus a display face that isn't Inter-for-everything. (Tokens + fonts below.) *Why: every AI/builder default ships indigo + Inter; deviating reads as "a human chose this."*
2. **Build a real type system with tabular numerals.** `font-variant-numeric: tabular-nums` everywhere a number appears. For a data brand this is table stakes and most sites miss it.
3. **Ship the "source → SQL → analysis → viz" provenance as a visible, repeated device.** A small "data lineage" chip on every chart (source · transform · query) is both a signature motif *and* your strongest credibility cue. Nobody else's portfolio has it because nobody else does the SQL.
4. **One signature hero motif, used once, done well** — a pitch-line / graph-paper grid that your data "plots" onto. Not 3D everywhere; one memorable moment.
5. **Editorial case studies with a fixed spine:** Problem → Data → Approach → Key insight → Business impact → Stack. Show *how you think*, not just final charts.
6. **Keep JS near-zero. Hydrate charts with `client:visible` only.** Astro's whole advantage is shipping HTML; protect it. Target green Core Web Vitals on mobile.
7. **Native View Transitions for page-to-page polish** — ~2 lines, zero JS weight, auto-respects `prefers-reduced-motion`. This is the cheapest "premium feel" available.
8. **Accessible charts by construction:** every chart = `<figure>` + alt summary + a `<details>` data table + non-colour encoding (shape/dash). Wire it into your chart wrapper once.
9. **Dynamic OG images + JSON-LD** generated at build with Satori. Recruiters share links in Slack/LinkedIn; a generic preview kills the click.
10. **A reduced-motion + dark-mode pass before launch.** Both are quick, both are disproportionately noticed by the exact senior people you want to impress.

---

## 1. Visual identity: what separates distinctive from template

**The template tells.** AI/no-code output converges on: indigo/violet accent, Inter everywhere, evenly-stacked centred sections, soft drop-shadow cards on a perfect grid, a generic gradient blob hero, and Lucide icons in pastel circles. Avoiding *those specific defaults* is 80% of the battle.

**What distinctive 2026 portfolios actually do:**

- **Broken / asymmetric grids.** Irregular layout signals real decisions were made rather than content dropped into a template. ([Envato — kinetic type, broken grids](https://elements.envato.com/learn/web-design-trends); [BBDirector 2026](https://bbdirector.com/design/web-design-trends-for-2026/))
- **Bento grids** for project/skill overviews — modular asymmetric blocks, varied sizes for emphasis, generous whitespace. ([TheeDigital](https://www.theedigital.com/blog/web-design-trends))
- **Expressive, oversized typography as the primary brand device** — type carries identity so the rest of the UI can stay restrained. ([Figma trends](https://www.figma.com/resource-library/web-design-trends/))
- **One signature "colour thread"** running through the whole site so you *own* a hue. ([Envato portfolio trends](https://elements.envato.com/learn/portfolio-trends))
- **Functional motion only** — micro-feedback on interactive elements, not fade-everything-on-scroll. 2026 is "restraint, performance, strategic clarity" after 2025's experimental chaos. ([BBDirector](https://bbdirector.com/design/web-design-trends-for-2026/))
- **Texture without weight** — SVG/CSS patterns (graph paper, dot grids, noise) that are tiny on the wire but make the page feel built, not generated.

**Your signature device (recommendation):** a thin **chalk-line / graph-paper grid** that reads simultaneously as a football pitch, a coordinate plane, and engineering paper. Use it three ways: (a) faint full-bleed background texture; (b) the hero, where a scatter of points animates into a recognisable shape (a formation, a trend line, the "A" of Analytica); (c) a recurring "stat card" with tabular figures + a tiny sparkline. That single motif ties football and finance together under one brand.

**Real examples to study [live]:**
- https://yerradouani.me/ — restrained, type-led, clearly hand-built (your ref)
- https://www.aaabadcode.com/ — strong personality, anti-template layout (your ref)
- https://mchiu.co.uk/ — editorial product-design portfolio, excellent case-study spine (your ref)
- https://somenathsau.github.io/ — a *data-analyst* GitHub Pages site whose case-study skeleton (Problem→Dataset→Approach→Key Insight→Business Impact→Stack) is exactly the spine to adopt (your ref)
- [Awwwards — Portfolio winners gallery](https://www.awwwards.com/websites/winner_category_portfolio/) **[gallery]**

---

## 2. Typography

Rules for a data brand: **two families max** (display + text), add a mono **only** for code/figures, and turn on **tabular figures** anywhere numbers align. Tall x-height + clear `1 l I 0 O` differentiation matter at small sizes. All picks below are free and self-hostable via [Fontsource](https://fontsource.org/) or Google Fonts. ([Datawrapper on dataviz fonts](https://www.datawrapper.de/blog/fonts-for-data-visualization); [dense-dashboard fonts](https://fontalternatives.com/blog/best-fonts-dense-dashboards/))

**Pairing A — "Editorial data" (my top pick for Analytica)**
- Display: **Fraunces** (variable serif, optical sizing — characterful, anti-template)
- Text/UI: **IBM Plex Sans** (literally designed for data interfaces; superb glyph differentiation, tnum support)
- Code/figures: **IBM Plex Mono**
- *Why:* a serif headline over Plex body immediately reads "thoughtful publication," not "generated SaaS." Plex's `1/l/I` clarity is a real asset for finance numbers.

**Pairing B — "Modern technical" (safe, sharp)**
- Display: **Space Grotesk**  ·  Text: **Inter** (`tnum` on)  ·  Code: **JetBrains Mono**
- *Why:* clean and techy; just be aware Inter+Space Grotesk is popular, so lean on your colour + layout to differentiate.

**Pairing C — "Expressive signature"**
- Display: **Clash Display** (free via [Fontshare](https://www.fontshare.com/)) · Text: **Geist** or **Inter** · Code: **Geist Mono**
- *Why:* Clash Display is a one-look brand-maker; use it for the hero word only.

**Pro move — single multiplexed family:** **Recursive** (Google Fonts) gives sans + mono in one variable file with *multiplexed* (uni-width) figures, so bold numbers don't shift column width. One font file, perfect table alignment. ([Datawrapper](https://www.datawrapper.de/blog/fonts-for-data-visualization))

**Tabular numerals — non-negotiable.** Set globally on data contexts:
```css
.kpi, table, .figure, [data-tnum] { font-variant-numeric: tabular-nums lining-nums; }
```
Body tables run **13–14px**, headers slightly larger; don't go below 12px on Windows ClearType. ([Best fonts for tables](https://wpdatatables.com/best-fonts-for-tables/))

**Type scale** — modular ~1.25 (major third), fluid with `clamp()`, 16px base, line-height 1.55 body / 1.1 display. Tokens in §"Design tokens" below.

---

## 3. Colour: building an "owned" palette beyond indigo

Principles, all AA-verifiable:
- **Tokenise by role, not hex** (`--canvas`, `--surface`, `--text`, `--primary`, `--accent`, `--focus`) so dark mode just re-points the same slots. ([semantic token system](https://brndle.com/accessible-color-system-block-themes-wcag/))
- **Never pure black or pure white.** Warm off-white paper + near-black ink in light; `#0E1014`-ish canvas + warm off-white text in dark. Pure `#FFF` on `#000` technically passes 21:1 but causes halation/glare. ([Muzli dark systems](https://muz.li/blog/dark-mode-design-systems-a-complete-guide-to-patterns-tokens-and-hierarchy/))
- **AA targets:** 4.5:1 normal text, 3:1 large text *and* UI/graphical objects (chart strokes, borders, focus rings). Verify every pair in both modes. ([WCAG contrast guide 2026](https://web-accessibility-checker.com/en/blog/color-contrast-wcag-guide))
- **Accent that fails text contrast is fine — for graphics.** A bright signal colour can live in charts/large CTAs at 3:1 without being a body-text link.

**Recommended Analytica palette** (deep teal-green primary + signal-orange accent — evokes pitch + alert, owns a non-default hue). Hex + rationale in the token block; verify with [WebAIM](https://webaim.org/resources/contrastchecker/) before shipping.

**Chart series:** use a colourblind-aware set and *always* pair colour with shape or dash (see §6). Real palettes to borrow: Okabe–Ito, or Datawrapper's. ([Datawrapper](https://www.datawrapper.de/blog/fonts-for-data-visualization))

**Examples [gallery]:** [Awwwards data-viz winners](https://www.awwwards.com/websites/data-visualization/) · [Muzli dark-mode patterns](https://muz.li/blog/dark-mode-design-systems-a-complete-guide-to-patterns-tokens-and-hierarchy/)

---

## 4. Layout & hero

- **Hero = one idea, one motion.** A headline that states your value ("I turn raw match data into decisions") + the animated graph-grid motif drawing your signature shape. Resist carousels, particle fields, and floating 3D laptops.
- **Asymmetry with an underlying grid.** Use a 12-col grid but break it deliberately: a wide chart spanning 8 cols beside a narrow annotation rail of 4. Irregularity should look intentional, never accidental.
- **Editorial case-study layout:** generous measure (60–75ch) for narrative, full-bleed for the money chart, a sticky side rail showing the pipeline stage you're in (Source → SQL → Analysis → Viz). The sticky rail *is* a signature device and reinforces your story.
- **Whitespace is the budget.** Bento grids only work with generous gutters; cramming kills them. ([TheeDigital](https://www.theedigital.com/blog/web-design-trends))
- **Signature motif for sport+data:** the chalk-grid pitch that doubles as a coordinate plane; a recurring "xStat" card (big tabular number + sparkline + lineage chip).

**Examples [live]:** https://mchiu.co.uk/ (case-study rhythm) · https://www.aaabadcode.com/ (asymmetry/personality) · [Awwwards portfolios](https://www.awwwards.com/websites/winner_category_portfolio/) **[gallery]**

---

## 5. Motion & interaction

**Taste test:** motion should *communicate* (state, feedback, spatial continuity), not decorate. 2026 consensus is functional-only after years of fade-everything overuse. ([Envato](https://elements.envato.com/learn/web-design-trends))

For a static Astro site, in increasing weight:

1. **Native View Transitions** — add `<ClientRouter />` to your layout `<head>` for app-like page morphs. No library, no added bundle, and Astro's UA CSS auto-disables them under `prefers-reduced-motion`. Browser support is ~85%+ with graceful fallback to a normal nav. **Start here.** ([Astro docs](https://docs.astro.build/en/guides/view-transitions/); [guide](https://eastondev.com/blog/en/posts/dev/20251202-astro-view-transitions-guide/))
2. **Scroll-reveal via `IntersectionObserver`** — a tiny vanilla script that adds an `in-view` class; animate with CSS. Zero dependency, perfect for an Astro island-free page. Gate the whole thing behind a `(prefers-reduced-motion: no-preference)` check.
3. **Motion One** (~5kb) when you want spring/keyframe control without GSAP's weight — good middle ground for hover micro-interactions and chart entrance.
4. **Lenis** (~3kb, now just the `lenis` package from Darkroom Engineering) for smooth scroll *only if* you genuinely want it; disable for reduced-motion by passing `lerp: 1` or not mounting it. ([Lenis+GSAP 2026 guide](https://devdreaming.com/blogs/nextjs-smooth-scrolling-with-lenis-gsap))
5. **GSAP** — reach for it only for the one signature hero animation (e.g., points-to-formation). Use `gsap.matchMedia()` to swap to a reduced/none variant for reduced-motion users; SplitText/MorphSVG aren't needed. ([GSAP accessibility](https://gsap.com/resources/a11y/); [Astro+GSAP build, Codrops](https://tympanus.net/codrops/2026/02/18/joffrey-spitzer-portfolio-a-minimalist-astro-gsap-build-with-reveals-flip-transitions-and-subtle-motion/))

**Animated charts:** draw lines/bars on first view only (entrance), not on every hover; respect reduced-motion by rendering the final state instantly.

**Reduced-motion rule of thumb:** *spatial* motion that aids understanding can be softened to a cross-fade rather than removed (Apple's approach); pure decoration should be removed. ([GSAP a11y](https://gsap.com/resources/a11y/))

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .001ms !important; transition-duration: .001ms !important; scroll-behavior: auto !important; }
}
```

---

## 6. Data viz

**Library call for your stack:**

| Need | Pick | Why |
|---|---|---|
| 90% of portfolio charts (line/bar/area, fast to ship) | **Recharts** | Declarative React, ~1/10th the code of D3, fine inside a `client:visible` island. Your default. ([cssauthor](https://cssauthor.com/best-data-visualization-libraries-for-web/)) |
| Clean, lightweight, *static-friendly* charts without React | **Observable Plot** | Concise grammar-of-graphics; can render to SVG. Great when you don't want to hydrate a React island at all. |
| One bespoke "signature" viz (e.g., pitch heatmap, xG map) | **visx** (or raw **D3**) | D3 power with React ergonomics; use only where pre-built types can't express the idea. ([npm-compare](https://npm-compare.com/@visx/visx,chart.js,d3,react-vis,recharts)) |

**Don't reach for D3 by default** — teams routinely burn weeks on it then find Recharts would've shipped the same chart in a quarter of the time. ([cssauthor](https://cssauthor.com/best-data-visualization-libraries-for-web/))

**Hydration strategy:** charts are below the fold → **`client:visible`** so JS loads only when the chart scrolls into view; never `client:load` a chart. Above-the-fold hero sparkline can be a pre-rendered static SVG with no JS at all.

**Accessible charts — bake into one `<ChartFigure>` wrapper:**
- Wrap in `<figure>` with a real `alt`/summary that states the *takeaway*, not "a chart": e.g. "Western region leads Q3 at $2.3M, ahead of Eastern $1.8M." ([chartgen.ai](https://chartgen.ai/resources/blog/chart-accessibility-inclusive-data-visualization))
- Provide the underlying numbers in a `<details>`-collapsed data table (this also helps you, and search engines).
- **Never colour-alone:** add line dash/marker shape/direct labels so colourblind users and printed/greyscale views still work. ([greeden a11y dataviz](https://blog.greeden.me/en/2025/09/01/the-complete-guide-to-accessible-graphs-data-visualization-designing-charts-everyone-can-understand-beyond-color-reliance/))
- ARIA + keyboard for interactive charts: `role`/`aria-label` per series, Tab to points, focus shows the tooltip (don't make insight hover-only). ([5of10 WCAG dataviz checklist](https://5of10.com/articles/wcag-checklist-data-visualization/); [JHU dataviz a11y](https://accessibility.jhu.edu/wp-content/uploads/sites/31/AccessibleDataVisualizationPresentation.pdf))
- 3:1 contrast for chart strokes/markers vs background (a graphical-object requirement, easy to miss).

**Examples [live]:** https://pudding.cool/ (interactive data narrative) · https://ourworldindata.org/ (rigorous, accessible charts + downloadable data) · https://flowingdata.com/ (charting craft) — study the patterns, don't clone the look.

---

## 7. Performance — Core Web Vitals on Astro/GitHub Pages

**Targets (mobile, field-data spirit):** LCP < 2.5s · INP < 200ms · CLS < 0.1 · Lighthouse 95+. Astro's zero-JS-by-default makes this very attainable; the usual culprits are `client:load` everywhere, unoptimised JPEGs, and untuned fonts. ([Astro perf guide](https://eastondev.com/blog/en/posts/dev/20251202-astro-performance-optimization/); [Astro CWV](https://techsynth.tech/blog/astro-core-web-vitals/))

Concrete moves:
- **Images:** use Astro's `<Image />` to auto-emit AVIF/WebP + responsive `srcset`; set explicit width/height to kill CLS. Hero image should be the LCP element — preload it, don't lazy-load it. Everything below the fold: `loading="lazy"`.
- **Fonts:** self-host via Fontsource (no third-party round-trip), subset to the weights you use (e.g. display 600 + body 400/600 + mono 400), `font-display: swap`, and `<link rel="preload">` the body font. Variable fonts (Fraunces/Recursive) cut requests.
- **Islands budget:** static HTML for ~90% of the page; hydrate only charts/theme-toggle/filters, and only with `client:visible`/`client:idle`. Aim for a per-page JS budget you can state out loud (e.g. < 40kb gz). ([island strategy](https://thebcms.com/blog/astro-server-islands-tutorial))
- **GitHub Pages note:** static-only host, so no server OG generation at request time — generate OG images and JSON-LD **at build** (§9). Add `@astrojs/sitemap`. Set `site:` in `astro.config` so canonical/OG URLs resolve.
- **Measure:** Lighthouse CI in your GitHub Action; treat a regression as a failed build.

---

## 8. Accessibility — WCAG 2.1 AA checklist for portfolios

- **Contrast:** body 4.5:1, large 3:1, UI/graphics 3:1 — both themes. ([guide](https://web-accessibility-checker.com/en/blog/color-contrast-wcag-guide))
- **Visible focus** on every interactive element (`:focus-visible`, ≥3:1 ring, never `outline:none` without a replacement).
- **Keyboard:** full nav incl. theme toggle, project filters, chart points; logical focus order; skip-to-content link.
- **Semantics:** one `<h1>` per page, ordered headings, `<nav>/<main>/<footer>` landmarks, real `<button>`/`<a>` (not divs).
- **Images:** meaningful `alt`; decorative motif grid = `alt=""`/`aria-hidden`.
- **Motion:** honour `prefers-reduced-motion` (§5); no autoplay > 5s without controls.
- **Charts:** alt summary + data-table fallback + non-colour encoding + keyboard (§6).
- **Forms (contact):** `<label>` for every field, errors announced (not colour-only), `aria-describedby` hints.
- **Don't trap:** no hover-only content; targets ≥24px (AA) / 44px comfortable.
- **Test:** axe DevTools + WAVE + manual keyboard pass + one screen-reader sweep. ([JHU checklist](https://accessibility.jhu.edu/wp-content/uploads/sites/31/AccessibleDataVisualizationPresentation.pdf))

---

## 9. SEO / sharing & credibility

- **Dynamic OG images at build with Satori** (+ `@resvg/resvg-js` or `sharp` → PNG, 1200×630). Template per page-type (home / case study) injecting title + the project's headline stat. Generate into `/public` during build so GitHub Pages serves them statically. ([techsquidtv](https://techsquidtv.com/blog/generating-open-graph-images-for-astro/); [Astro OG integrations](https://astro.build/integrations?search=images))
- **Meta basics:** unique `<title>`/description per page, canonical URL, `og:*` + `twitter:card=summary_large_image`.
- **JSON-LD:** `Person` (you) on home, `CreativeWork`/`Article` per case study, with `image` pointing at the OG PNG. ([JSON-LD in Astro](https://www.vbesse.com/en/blog/json-ld-automated-technical-seo/))
- **Sitemap + robots:** `@astrojs/sitemap`; submit to Search Console.
- **Recruiter cues (credibility):** a one-line value prop above the fold, an obvious "View work" + "Contact" path, links to **live dashboards + the SQL/GitHub repo**, role/seniority clarity, and the data-lineage chip on charts (proves you own the pipeline, not just the picture).

---

## 10. Storytelling — structure that shows *how you think*

Use a fixed case-study spine (this is exactly what the data-analyst reference site uses, and it works):

1. **Problem / question** — the decision someone needed to make.
2. **Data** — sources, size, the messy reality (nulls, joins, grain). Show a row count, name the tables.
3. **Approach & methodology** — your SQL/Python reasoning; *show one real query or transformation*. This is your differentiator — most portfolios skip straight to the chart.
4. **Key insight** — the single sentence a stakeholder remembers.
5. **Business impact** — what changed / what it would change.
6. **Stack & artefacts** — tools, link to repo, link to live dashboard.

Reinforce with the sticky **Source → SQL → Analysis → Viz** rail so the reader literally watches your pipeline unfold. Lead each study with the headline stat (and reuse it in the OG image).

**Examples [live]:** https://somenathsau.github.io/ (the analyst spine, your ref) · https://mchiu.co.uk/ (narrative rhythm, your ref) · https://pudding.cool/ (insight-first data narrative).

---

## 11. Anti-patterns — the "do NOT do" list (looks generic / AI-made)

- Indigo/violet accent + Inter-for-everything + Lucide-icons-in-pastel-circles. The trifecta of "generated."
- A gradient-blob hero, particle background, or floating 3D laptop.
- Centred, evenly-stacked sections with identical card shadows on a flawless grid.
- "Passionate developer crafting beautiful experiences" filler copy. Say what you *did*.
- Proportional figures in tables/KPIs (numbers that don't line up).
- Charts as flat images with no alt, no data table, colour-only series.
- `client:load` on everything; 300kb of JS for a static page.
- Fade-in *every* element on scroll; smooth-scroll so heavy it feels laggy.
- Cloning a famous portfolio wholesale (e.g. Brittany Chiang's) — recruiters have seen it 500 times.
- Skill bars claiming "SQL 92%." Show a query instead.
- Pure-black/pure-white theme that glares; no reduced-motion handling.

---

## Design tokens starter (paste into a global CSS file)

> Verify each pair in [WebAIM](https://webaim.org/resources/contrastchecker/) after any tweak. Ratios below are approximate and meet AA in the role indicated.

```css
:root {
  /* ---- Colour (LIGHT) — warm paper + deep teal + signal orange ---- */
  --canvas:        #FAF9F6; /* warm off-white, not #fff */
  --surface:       #FFFFFF;
  --surface-2:     #F2F0EA;
  --border:        #E3E0D8;
  --text:          #1A1C20; /* ink — ~15:1 on canvas */
  --text-muted:    #595D67; /* ~6.2:1 on canvas (AA body) */
  --primary:       #0A6B5E; /* teal-green — ~5.3:1 on canvas, AA links/text */
  --primary-hover: #08574C;
  --accent:        #E4572E; /* signal orange — large/graphical use (~3.9:1) */
  --focus:         #0A6B5E; /* focus ring; pair with 2px offset */

  /* ---- Chart series (colourblind-aware; ALWAYS add shape/dash too) ---- */
  --series-1: #0A6B5E; --series-2: #E4572E; --series-3: #3A6EA5;
  --series-4: #B5179E; --series-5: #6A8E1F; --series-6: #8C6A4A;

  /* ---- Type ---- */
  --font-display: "Fraunces", Georgia, serif;
  --font-text:    "IBM Plex Sans", system-ui, sans-serif;
  --font-mono:    "IBM Plex Mono", ui-monospace, monospace;

  /* fluid modular scale ~1.25, 16px base */
  --step--1: clamp(0.80rem, 0.76rem + 0.18vw, 0.89rem);
  --step-0:  clamp(1.00rem, 0.95rem + 0.24vw, 1.13rem);
  --step-1:  clamp(1.25rem, 1.16rem + 0.45vw, 1.50rem);
  --step-2:  clamp(1.56rem, 1.40rem + 0.80vw, 2.00rem);
  --step-3:  clamp(1.95rem, 1.69rem + 1.30vw, 2.67rem);
  --step-4:  clamp(2.44rem, 2.02rem + 2.10vw, 3.55rem);
  --step-5:  clamp(3.05rem, 2.38rem + 3.35vw, 4.74rem); /* hero display */

  --leading-display: 1.08;
  --leading-body:    1.55;

  /* ---- Space scale (4px base) ---- */
  --space-2xs: 0.25rem; --space-xs: 0.5rem;  --space-s: 0.75rem;
  --space-m:   1rem;    --space-l:  1.5rem;   --space-xl: 2rem;
  --space-2xl: 3rem;    --space-3xl: 4rem;    --space-4xl: 6rem;

  --radius: 10px;
  --measure: 68ch; /* readable line length for narrative */
}

/* ---- Colour (DARK) — near-black ink, brightened brand ---- */
:root[data-theme="dark"] {
  --canvas:        #0E1014; /* not pure black */
  --surface:       #161A20;
  --surface-2:     #1E232B;
  --border:        #2A2F38;
  --text:          #ECEAE3; /* warm off-white — ~14:1 on canvas */
  --text-muted:    #9AA0AC; /* ~6:1 on canvas */
  --primary:       #4FD1B5; /* brightened teal — AA on dark */
  --primary-hover: #6FE0C7;
  --accent:        #FF7A4D; /* brightened orange */
  --focus:         #4FD1B5;
  --series-1: #4FD1B5; --series-2: #FF7A4D; --series-3: #6FA8DC;
  --series-4: #E879C9; --series-5: #A6C44E; --series-6: #C2A079;
}

/* ---- Numerals: align everywhere a number appears ---- */
.kpi, table, .figure, [data-tnum] {
  font-variant-numeric: tabular-nums lining-nums;
}

/* ---- Focus + reduced motion ---- */
:focus-visible { outline: 2px solid var(--focus); outline-offset: 2px; }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .001ms !important;
    transition-duration: .001ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## Prioritised, effort-tagged checklist

**Quick wins (≤ ½ day each)**
- [ ] Swap default indigo → owned teal/orange tokens; remove pure black/white. `[S]`
- [ ] Install fonts via Fontsource; turn on `tabular-nums` globally on data contexts. `[S]`
- [ ] Add `<ClientRouter />` for View Transitions. `[S]`
- [ ] Add `:focus-visible` ring + reduced-motion block + skip-link. `[S]`
- [ ] Switch every chart island to `client:visible`. `[S]`
- [ ] `@astrojs/sitemap` + per-page title/description/canonical. `[S]`
- [ ] Rewrite hero copy to a concrete value prop; replace filler. `[S]`

**Medium (1–2 days each)**
- [ ] Build the `<ChartFigure>` wrapper: alt summary + `<details>` data table + non-colour encoding. `[M]`
- [ ] Migrate all images to `<Image />` (AVIF/WebP, width/height, lazy below fold, hero preload). `[M]`
- [ ] Implement the case-study spine + sticky Source→SQL→Analysis→Viz rail as a layout. `[M]`
- [ ] Bento overview grid for projects/skills with deliberate asymmetry. `[M]`
- [ ] Scroll-reveal via IntersectionObserver (reduced-motion gated). `[M]`
- [ ] Lighthouse CI in GitHub Actions; set a JS budget. `[M]`

**Bigger bets (2–4+ days)**
- [ ] Signature hero motif: graph-grid + points-to-shape animation (GSAP, with matchMedia fallback). `[L]`
- [ ] Dynamic OG images (Satori → PNG) per page-type, built into `/public`. `[L]`
- [ ] JSON-LD `Person` + `CreativeWork` across pages. `[M/L]`
- [ ] One bespoke "signature" viz for the PL platform (visx/D3) — e.g. xG/heatmap. `[L]`
- [ ] Full a11y sweep: axe + WAVE + keyboard + one screen-reader pass. `[M]`

---

## Brief for Claude Code / Claude Design

When you hand this to Claude Code, instruct it to:

1. **Review each reference URL with Claude Design and extract, don't clone.** For each of https://yerradouani.me/ , https://www.aaabadcode.com/ , https://sawad.framer.website/ , https://somenathsau.github.io/ , https://mchiu.co.uk/ — capture *specific* devices worth adapting (grid rhythm, type contrast, motion timing, case-study spine) and *what makes each feel hand-built*. Produce a short "steal list" per site, then a **single synthesised direction** for Analytica — explicitly different from any one of them so it isn't a clone (see Anti-patterns).
2. **Treat §"Design tokens" as the source of truth** and wire components to the role tokens, never raw hex.
3. **Enforce the constraints as guardrails:** zero-JS-by-default, `client:visible` only for charts, AA contrast in both themes, reduced-motion respected, per-page JS budget, Lighthouse CI gate.
4. **Build the `<ChartFigure>` wrapper first** so every later chart inherits accessibility.
5. Borrow the analyst case-study spine from somenathsau.github.io but elevate the visual layer to the synthesised direction.

---

### Sources (2025–2026, selected)
Figma web-design-trends · BBDirector 2026 · Envato (broken grids / functional motion) · TheeDigital (bento) · Awwwards portfolio + data-viz galleries · Muzli dark-mode systems · Datawrapper dataviz fonts · wpdatatables / FontAlternatives (tables & dashboards) · web-accessibility-checker WCAG contrast · brndle semantic tokens · Astro docs (View Transitions) · eastondev (Astro perf + view transitions) · techsynth Astro CWV · GSAP a11y · Codrops (Astro+GSAP) · Lenis+GSAP 2026 guide · cssauthor dataviz libraries · npm-compare (visx) · chartgen.ai / 5of10 / greeden / JHU (accessible charts) · techsquidtv + Astro integrations (Satori OG) · vbesse (JSON-LD). Links inline throughout.
