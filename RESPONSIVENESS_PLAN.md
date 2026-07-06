# Muntazar Classes — Full Responsiveness Plan (Mobile-First, A→Z)

> **Priority context:** This website is used **mostly on mobile phones**. Therefore this plan is **mobile-first**: the phone layout is the primary design, tablet and desktop are progressive enhancements. Every decision below optimizes the phone experience first, then scales up.

---

## 0. TL;DR — What this plan delivers

1. **One standard breakpoint system** to replace the ~26 ad-hoc breakpoints currently scattered across components.
2. **Fluid typography & spacing** so text and gaps scale smoothly instead of jumping at breakpoints.
3. A **section-by-section responsive audit** with concrete tasks for all 19 components + 3 full pages.
4. **Touch-first ergonomics** — 44px tap targets, thumb-reachable actions, no hover-only interactions.
5. A **device test matrix** and acceptance checklist.

---

## 1. Current State — Audit Findings

**Stack:** React 19 + Vite, CSS-in-JSX (`<style>` per component), global tokens in [index.css](client/src/index.css). No CSS framework, no shared breakpoint variables.

**What already works**
- Global utilities exist: `.show-desktop` / `.show-mobile` (swap at 991/992px), `.mobile-bottom` + `body { padding-bottom }` (StickyBottom at 768px), `.fab-wrap` (hidden on mobile), `.wrap` container with a 768px padding step.
- [Navbar.jsx](client/src/components/Navbar.jsx) has a working hamburger + slide-in mobile drawer.
- Most sections have *some* responsive rules.

**Problems to fix**
| # | Problem | Impact |
|---|---|---|
| P1 | **~26 different breakpoint values** (768, 991, 640, 576, 560, 520, 500, 450, 440, 420, 380, 360, 320, 300, 880, 820, 720…) | Layouts shift at unpredictable widths; impossible to reason about or test |
| P2 | **No shared breakpoint tokens** — every component hardcodes px | Any change means editing many files; drift guaranteed |
| P3 | **Fixed-width elements** (e.g. cards `width: 270px`, min-widths) can overflow narrow phones (≤360px) | Horizontal scroll / clipped content |
| P4 | **Typography set in `clamp()` in some places, fixed `rem` in others** | Inconsistent scaling; some headings too large on small phones |
| P5 | **Reviews.jsx & some sections have 0 media queries** | Likely desktop-only layout on phones |
| P6 | **Hover-dependent affordances** (card hover reveals, etc.) | No touch equivalent on phones |
| P7 | Full pages ([AchievementPage](client/src/components/AchievementPage.jsx), [GalleryPage](client/src/components/GalleryPage.jsx), [ProgramsPage](client/src/components/ProgramsPage.jsx)) need their own mobile passes | Dense grids on small screens |

---

## 2. The Standard Breakpoint System (P1, P2)

Adopt **5 named breakpoints**, mobile-first. Collapse the 26 ad-hoc values onto the nearest of these.

| Token | Width | Target devices | Role |
|---|---|---|---|
| *(base)* | `0–479px` | Small/standard phones (320–479) | **Primary design** |
| `sm` | `≥480px` | Large phones / phablets | Minor upsizing |
| `md` | `≥768px` | Tablets (portrait) | 2-col layouts appear |
| `lg` | `≥992px` | Tablets (landscape) / small laptops | Full desktop layout, navbar switches |
| `xl` | `≥1240px` | Desktops | Max container width caps |

**Implementation choice (pick one in §7 review):**
- **Option A —** keep `max-width` (desktop-first) queries but snap all values to **exactly** `480 / 768 / 992 / 1240`. Lowest-effort, least code churn.
- **Option B —** rewrite to **mobile-first `min-width`** queries (base styles = phone, `@media (min-width:…)` layers up). More work, but matches the "mobile is primary" goal and is cleaner long-term.

> Recommendation: **Option B** for the core layout sections (Hero, Navbar, Courses, Bento, Achievements, Reviews, Contact, Footer) since mobile is the main audience; Option A (snapping) for the rest to limit churn.

Add breakpoint constants as a comment block in [index.css](client/src/index.css) (CSS `@media` can't use `var()`), and standardize edge padding via the existing `.wrap`.

---

## 3. Fluid Typography & Spacing (P4)

- **Type scale:** define fluid heading tokens in [index.css](client/src/index.css) using `clamp()`, e.g.
  - `--fs-h1: clamp(1.9rem, 6vw, 3.4rem)`
  - `--fs-h2: clamp(1.6rem, 4.5vw, 2.75rem)`
  - `--fs-h3: clamp(1.15rem, 3vw, 1.5rem)`
  - `--fs-body: clamp(0.95rem, 2.5vw, 1.05rem)`
  Replace hardcoded heading sizes across sections with these tokens.
- **Spacing:** the `--gap-*` scale already exists; audit sections so vertical section padding steps down on mobile (e.g. `--gap-5xl` desktop → `--gap-3xl` phone) via a single consistent rule rather than per-component magic numbers.
- **Line length:** cap body copy at `~60ch` / existing `max-width` on paragraphs so text doesn't run edge-to-edge on tablets.
- **No text `white-space: nowrap`** on phones (already handled for `.rs-title`; audit others).

---

## 4. Touch & Ergonomics (P6, mobile-first)

- **Tap targets ≥ 44×44px** for all buttons, nav links, filter pills, FAQ toggles, gallery thumbs, close buttons.
- **Thumb zone:** keep primary CTAs (Enrol, WhatsApp, Call) reachable — the sticky bottom bar ([StickyBottom.jsx](client/src/components/StickyBottom.jsx)) already covers this; verify it doesn't overlap content (the `body { padding-bottom }` is set).
- **Replace hover-only reveals** (P6) with always-visible info on touch, or tap-to-expand. Keep hover as enhancement for `lg+`.
- **Forms** ([Contact.jsx](client/src/components/Contact.jsx), [AdmissionPopup.jsx](client/src/components/AdmissionPopup.jsx)): full-width fields on phone, `font-size ≥ 16px` on inputs to prevent iOS zoom-on-focus, single-column stacking.
- **Images:** `max-width:100%` already global; add `aspect-ratio` where missing to prevent layout shift; use `loading="lazy"` (mostly present).

---

## 5. Section-by-Section Responsive Tasks

Order = order on the page. Each gets a mobile-first pass.

### Global chrome
- **[Navbar.jsx](client/src/components/Navbar.jsx)** — verify hamburger drawer at `<lg`; ensure drawer scrolls if links overflow short landscape phones; lock body scroll when open; logo scales down; 44px tap targets.
- **[StickyBottom.jsx](client/src/components/StickyBottom.jsx)** — mobile-only bar; confirm 3 actions fit ≤320px without wrapping; safe-area inset for notched phones (`padding-bottom: env(safe-area-inset-bottom)`).

### Landing sections
- **[Hero.jsx](client/src/components/Hero.jsx)** — most critical (first paint on mobile). Stack heading → CTA → image; fluid H1; stat bar wraps to 2×2 or scroll; ensure background/gradient doesn't crop key text; CTA buttons full-width on phone.
- **[ProgramChips.jsx](client/src/components/ProgramChips.jsx)** — horizontal scroll row or wrap on phone; hide scrollbar; snap.
- **[BentoFeatures.jsx](client/src/components/BentoFeatures.jsx)** — bento grid → single column stack on phone; preserve visual hierarchy (largest tile first).
- **[Courses.jsx](client/src/components/Courses.jsx)** — card grid → 1 col (phone) / 2 col (md) / 3+ (lg); ensure enquiry CTA reachable.
- **[EasySteps.jsx](client/src/components/EasySteps.jsx)** — step timeline → vertical stack on phone; connectors adapt or hide.
- **[AchievementSection.jsx](client/src/components/AchievementSection.jsx)** — ✅ recently reworked; verify circular topper cards center and go full-width `max-width:300px` on phone (done); stat cards wrap; one-line title reverts to wrap at `sm`.
- **[GallerySection.jsx](client/src/components/GallerySection.jsx)** — masonry/grid → 2 col or 1 col phone; lightbox full-screen on phone; swipe support (nice-to-have).
- **[FAQ.jsx](client/src/components/FAQ.jsx)** — accordion full-width; 44px toggle rows; comfortable text size.
- **[Reviews.jsx](client/src/components/Reviews.jsx)** — ⚠️ **0 media queries** — needs a full mobile pass. Convert multi-col testimonials to a **swipeable carousel / single card** on phone.
- **[AdmissionsBanner.jsx](client/src/components/AdmissionsBanner.jsx)** — stack text/CTA; prevent overflow of dark banner.
- **[CTA.jsx](client/src/components/CTA.jsx)** — center + full-width button on phone.
- **[Contact.jsx](client/src/components/Contact.jsx)** — form + info stack vertically; map/details full-width; 16px inputs.
- **[Footer.jsx](client/src/components/Footer.jsx)** — column grid → stacked/2-col accordion on phone; keep links tappable.
- **[AdmissionPopup.jsx](client/src/components/AdmissionPopup.jsx)** — modal fits small screens; scrollable body; close button in thumb reach; no viewport overflow.

### Full pages (routed)
- **[AchievementPage.jsx](client/src/components/AchievementPage.jsx)** — filter tabs wrap/scroll on phone; student card grid 4→2→1; accordion headers stack; lightbox full-screen.
- **[GalleryPage.jsx](client/src/components/GalleryPage.jsx)** — grid density steps down; lightbox mobile.
- **[ProgramsPage.jsx](client/src/components/ProgramsPage.jsx)** — program cards single column; sticky sub-nav (if any) collapses.

---

## 6. Cross-Cutting Fixes (P3, P5)

- **Kill horizontal overflow:** audit for fixed `width`/`min-width` px on flex/grid items; convert to `max-width` + `%`/`fr`; add a debug pass with `* { outline }` to catch overflow at 320px.
- **Container:** confirm `.wrap` padding is comfortable on phone (currently `1.25rem` at ≤768) and never causes overflow.
- **Media:** every `<img>`/embed inside `aspect-ratio` wrappers to prevent CLS.
- **Z-index/overlays:** ensure Navbar drawer, AdmissionPopup, lightboxes, and StickyBottom don't fight; document a z-index scale token set.
- **Safe areas:** `env(safe-area-inset-*)` for the sticky bar and any fixed elements (iPhone notch/home indicator).

---

## 7. Rollout Plan (phased, low-risk)

1. **Foundation** — add breakpoint comment block + fluid type/spacing tokens to [index.css](client/src/index.css). *(No visual change yet.)*
2. **Standardize breakpoints** — snap all component queries to `480/768/992/1240` (mechanical, per file).
3. **High-traffic first** — Navbar → Hero → StickyBottom → Courses → Achievements → Reviews (the 0-query gap) → Contact/CTA.
4. **Remaining sections** — Bento, EasySteps, Gallery, FAQ, Footer, banners, popup.
5. **Full pages** — Achievement, Gallery, Programs.
6. **QA pass** — device matrix (§8), fix overflow/tap-target issues.

Each phase is independently shippable and verifiable.

---

## 8. Test Matrix & Acceptance

**Widths to test:** 320 (iPhone SE), 360 (common Android), 390 (iPhone 14), 414 (large phone), 480, 768 (iPad portrait), 820, 992, 1024 (iPad landscape), 1240, 1440.

**Acceptance checklist (per breakpoint):**
- [ ] No horizontal scrollbar at any width ≥320px.
- [ ] All text legible (≥14px body on phone), no overlap/clipping.
- [ ] All interactive targets ≥44px and reachable.
- [ ] Images maintain aspect ratio, no layout shift.
- [ ] Navbar drawer, popup, lightboxes, sticky bar all usable and non-overlapping.
- [ ] Forms usable; no iOS zoom-on-focus; keyboard doesn't hide submit.
- [ ] Hero renders fully above the fold on a 360×640 phone.
- [ ] Every section matches the mobile-first design intent (single-column, centered where specified).

---

## 9. Open Questions for You (please confirm before implementation)

1. **Breakpoint strategy:** Go with **Option B (mobile-first `min-width` rewrite)** for core sections, or the lower-effort **Option A (snap existing `max-width` values)** everywhere?
2. **Scope now:** Do the full A→Z pass across all 19 components + 3 pages, or start with the **high-traffic subset** (Navbar, Hero, Sticky bar, Courses, Achievements, Reviews, Contact) and iterate?
3. **Carousels:** For Reviews (and optionally ProgramChips/Gallery) on phone — add **swipe carousels** (adds a small lib or custom logic), or keep simple **stacked/scroll** layouts?
4. **Design tweaks allowed?** May I adjust layout/spacing/hierarchy per section on mobile (as with the achievements rework), or keep each section's current desktop design and only make it fit?