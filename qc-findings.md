# Portfolio visual QC — findings & fix-list

**Date:** 2026-07-01 · **Branch:** `revamp-2026` · **Method:** local `astro dev` (port 4321), preview screenshots + DOM/console/network inspection + computed-style contrast checks.
**Scope covered:** 3 routes (`/`, `/work/football-analytica`, `/work/credit-card-tracker`) × desktop (1280) + mobile (375) × light + dark, plus interaction testing.

> **This file is the hand-off for a separate review-and-execute session. No fixes were applied in the QC session.** Work top-down (blocker → nits). Each item has a file ref + suggested fix.

---

> **Status (updated 2026-07-01, fix session):** Items **1–4 fixed** in code and
> build-validated (`npm run build` clean, SSR + no console/server errors). The chart
> *visuals* for #2/#3 and the manual items #5/#6 still want one real foreground-browser
> pass — the `client:visible` islands don't hydrate in the headless preview (hidden-tab
> IntersectionObserver throttling).

## 🔴 Blocker / correctness

### 1. SpendChart hydration mismatch (React error, whole island re-renders) — ✅ FIXED
- **File:** `src/components/charts/SpendChart.jsx:47` — `R {total.toLocaleString()}`
- **Symptom:** Console throws 6× `Warning: Text content did not match. Server: "5 375" … Client: "5,375"` followed by 6× `An error occurred during hydration. The server HTML was replaced with client content in <astro-island>`. Reproduces on every load of `/work/credit-card-tracker`. ShotMap and XgChart islands are clean — this is the only offender.
- **Cause:** `Number.prototype.toLocaleString()` with **no locale** uses the runtime's default locale, which differs between Node (SSR → space/NNBSP group separator, "5 375") and the browser (client → "5,375"). Non-deterministic ⇒ hydration mismatch ⇒ React discards the SSR HTML and re-renders the island client-side (visible flash + console errors any recruiter who opens devtools will see).
- **Fix:** Pin the locale so SSR and client agree. Decide the intended format first:
  - SA style ("R 5 375"): `total.toLocaleString('en-ZA')`
  - US/UK style ("R 5,375"): `total.toLocaleString('en-US')` (or `en-GB`)
  - Zero-dependency / bulletproof regardless of host ICU: `String(total).replace(/\B(?=(\d{3})+(?!\d))/g, ',')`
- **Verify after fix:** reload the page, confirm console is clean (no "Text content did not match").

---

## 🟠 Polish / design

### 2. Spend chart palette is off-brand + colour-only category encoding — ✅ FIXED (visual eyeball pending)
> Now teal (`--series-1`) + orange (`--series-2`) only; each category also carries a
> pattern (solid / hatch / dots) via SVG `<pattern>` defs, and legend swatches mirror it.
> No more blue/magenta; encoding no longer relies on hue alone.
- **File:** `src/components/charts/SpendChart.jsx` (the `CATS` colours)
- **Issue:** stacked bars use teal / orange / **blue** / **magenta**. Blue and especially magenta sit outside the documented brand palette (teal `#0A6B5E` + signal-orange `#E4572E`). Also, unlike the xG chart's hatched-vs-solid **pattern** encoding, the 4 categories are separated by **colour alone** (accessibility: colour-only encoding, and it clashes with the warm/teal aesthetic).
- **Suggested fix:** move to an on-brand categorical ramp (tints/shades of teal + the orange as the accent), and/or add a per-category pattern (hatch/dot) so it doesn't rely on hue. Legend chips + data table already help but shouldn't be the only differentiator.

### 3. xG chart: expected-vs-actual distinction is weak in dark mode — ✅ FIXED (visual eyeball pending)
> Hatch pattern elements are now classed; a `<style>` block boosts hatch fill-opacity
> (0.16 → 0.36) and line weight under `[data-theme="dark"]` so expected vs actual separate.
- **File:** `src/components/charts/XgChart.jsx`
- **Issue:** in **light** mode the "expected" (hatched blue) vs "actual" (solid teal) bars read clearly; in **dark** mode both render as similar mint-teal and the hatch pattern is subtle, so the two series are hard to tell apart at a glance.
- **Suggested fix:** verify/strengthen the hatch contrast (or give the two series more separated colours) specifically under `[data-theme="dark"]`.

---

## 🟡 Nits

### 4. Brand-name inconsistency: nav vs footer — ✅ FIXED
> Unified to the person: footer wordmark changed "Analytica" → "Ashlen Mammen" (matches
> nav); the duplicate name in the meta line was dropped. Verified in browser (SSR).
- **Files:** `src/components/Nav.astro` (brand "Ashlen Mammen") vs `src/components/Footer.astro` (wordmark "Analytica")
- **Issue:** the nav brands the person; the footer says "Analytica" (project codename). Looks slightly inconsistent. Decide whether that's intentional (a product mark) or unify to one.

---

## 🔍 Verify manually (not confirmed bugs — synthetic-event limits)

### 5. Shot map keyboard-focus tooltip
- **File:** `src/components/charts/ShotMap.jsx`
- **Status:** code is correct — 16 shots are `tabIndex=0`, `role="img"`, each with a descriptive `aria-label` ("Jesus, minute 78: xG 0.71, goal"), a `:focus-visible` outline, and `onFocus → setSel`. **Hover tooltip confirmed working.** The on-focus detail line couldn't be confirmed via programmatic `.focus()` (headless Chrome doesn't fire `:focus-visible` for programmatic focus, and React's `onFocus` didn't update under synthetic events). **Action:** do one real keyboard Tab-through in a browser to confirm the detail line updates on focus. Likely fine.

### 6. Spend chart bar-hover tooltip
- **File:** `src/components/charts/SpendChart.jsx:55` (`<Tooltip>` is present)
- **Status:** didn't fire under synthetic mouse events, whereas the xG chart's did once. Most likely a synthetic-event limitation with recharts stacked charts, not a real bug. **Action:** confirm with a real mouse hover.

---

## ✅ Verified good (no action)

- **Home:** hero scatter→formation animation, bento work grid, StatCards + `source › SQL › analysis › viz` lineage chips, **project filters** (All / Data eng / Analysis / Data science / Viz all filter correctly), about + headshot, credentials, contact, footer.
- **Theme toggle:** works, light↔dark, persists to `localStorage`, `aria-pressed` updates.
- **Dark-mode contrast (computed):** text/bg **15.82**, muted/bg **7.25**, faint/bg **5.12**, accent/bg **10.08**, signal/bg **7.38**, accent-contrast/accent **8.69** — all WCAG AA+, most AAA. Dark tokens: bg `#0e1014`, text `#eceae3`, accent `#4fd1b5`, signal `#ff7a4d`.
- **Case-study spine:** breadcrumb, stack chips, **sticky pipeline rail that highlights the active step (Source→SQL→Analysis→Viz)**, problem callout, synthetic-data disclaimer, impact/artefacts section.
- **Shot map:** renders at SSR (no blank-island bug), hover tooltip works, legible in **light + dark + mobile**, accessible (aria-labels + shape/pattern encoding: teal=goal, grey=saved, hollow=missed).
- **xG chart:** season toggle (2024/25 ↔ 2023/24) re-renders bars, bar hover tooltip works (light).
- **Spend chart:** category toggle (focus/hide a category) works.
- **Mobile:** nav collapses to the "A" mark, hero stacks, bento → 1 column, shot map reflows.
- **Console:** no errors from ShotMap/XgChart islands. **Network:** no broken assets (fonts/OG/favicon all fine; the single "failed" entry was the pre-server-start connection probe).

---

## ⚠️ QC-process caveat (not a site bug)
The preview **screenshot tool paints a dark blob at the bottom-center of every capture** — confirmed via DOM inspection that no such element exists (no fixed/dark element; `elementFromPoint` returns normal content). This is the "degraded screenshot tool" noted from the previous session, **not a design defect.** Screenshots are reliable in their top ~85%; ignore the bottom strip. For pixel-truth (colours/spacing) the QC used `preview_inspect`/computed styles instead.
