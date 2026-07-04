# Muntazar Classes — Blue-Theme Redesign Implementation Plan

> Goal: Re-skin and re-lay-out the entire landing page to match the **EP LMS reference design** (the green/teal + pastel EdTech template in the reference images), but rendered in the **Muntazar blue theme** and populated with Muntazar's coaching-institute content.

---

## 1. Context & Approach

### Current state
- Stack: **React 19 + Vite + framer-motion + react-icons + react-router-dom**.
- Styling: global tokens in [index.css](client/src/index.css) (already a "Light Blue Professional Design System") + **per-component `<style>` blocks** (CSS-in-JSX). No CSS framework.
- Page composition in [App.jsx](client/src/App.jsx) → `LandingPage` renders: `Navbar → Hero → BentoFeatures → Courses → AchievementSection → GallerySection → FAQ → CTA → Contact → Footer → StickyBottom` + `AdmissionPopup`.

### What the reference changes
The reference is **lighter, softer, and more "product/EdTech"** than our current dark-image-heavy site:
- Hero moves from a **full-bleed dark image slider** → a **light gradient hero** with a heading on the left, a rounded student photo on the right, and a **dark stat bar docked to the hero's bottom edge**.
- Softer surfaces, pastel-tinted accent cards, pill chips, rounded cards, and a **testimonials/reviews section we don't currently have**.
- Two dark "banner" strips (a feature banner and a partner/CTA banner) break up the light sections.

### Guiding principle
Keep the **component-per-section + CSS-in-JSX** architecture. Reuse the existing global tokens/utility classes (`.wrap`, `.btn`, `.eyebrow`, `.field`). Adapt the reference **layouts** while swapping the reference's green/purple palette for our **blue palette**. Preserve all existing functionality (admission popup, enquiry form, gallery lightbox, sticky mobile bar, routing).

---

## 2. Design Language: Reference → Blue Theme Mapping

| Reference (EP LMS) | Muntazar Blue Equivalent |
|---|---|
| Mint/teal hero gradient | Soft blue gradient: `linear-gradient(135deg,#eef4ff 0%,#e0ecff 55%,#dbe7ff 100%)` |
| Dark green stat bar | `--blue-deep` (#172554) stat bar |
| Indigo/purple primary buttons (#5b3df5) | Existing `--blue` (#1a56db) |
| Pastel step cards (blue/green/purple/pink) | Blue-family pastels (see §3 new tokens) |
| Dark navy feature banner | `--blue-deep` banner |
| Lavender partner banner | Soft blue tint card (`#eef2ff`) with blue accents |
| Green secondary button | Keep a single **WhatsApp green** only for WhatsApp; everything else blue |
| Orange/star ratings | Keep amber `#f59e0b` **only** for star ratings |

**Rule:** Blue is the single brand color. The only non-blue accents allowed are WhatsApp green (`#25D366`) and rating amber (`#f59e0b`). Pastels are all blue-family tints.

---

## 3. Design Token Updates — [index.css](client/src/index.css)

Add to `:root` (keep all existing tokens):

```css
/* Hero / section gradients */
--grad-hero: linear-gradient(135deg,#eef4ff 0%,#e0ecff 55%,#dbe7ff 100%);
--grad-soft: linear-gradient(180deg,#f8fbff 0%,#eef4ff 100%);

/* Pastel accent tints (for Easy-Steps numbered cards) */
--tint-blue:   #e8f0ff;   --tint-blue-ink:   #1e40af;
--tint-sky:    #e6f6ff;   --tint-sky-ink:    #0369a1;
--tint-indigo: #eef0ff;   --tint-indigo-ink: #4338ca;
--tint-slate:  #eef2f7;   --tint-slate-ink:  #334155;

/* Accents kept intentionally non-blue */
--amber: #f59e0b;         /* star ratings only */
--wa-green: #25d366;      /* WhatsApp only */

/* Elevation */
--shadow-sm: 0 4px 12px -4px rgba(23,37,84,.10);
--shadow-md: 0 12px 32px -12px rgba(23,37,84,.18);
--shadow-lg: 0 24px 60px -20px rgba(23,37,84,.22);
```

Add global helpers:
- `.btn--wa` (WhatsApp green button) so we stop inlining `#25D366`.
- `.section-head` centered header pattern (eyebrow + title + desc) reused by chips/steps/FAQ/reviews.
- Increase default `--radius` usage tolerance — reference cards are rounder; introduce `--radius-lg: 22px` for hero image + step cards.

---

## 4. Section-by-Section Plan

Order reflects the **new page flow** (reference layout adapted to Muntazar). Legend: 🔁 rewrite · ✏️ restyle · ➕ new · ✅ keep.

### 4.1 🔁 Hero — [Hero.jsx](client/src/components/Hero.jsx)
**Reference:** light gradient background; left = star-pill eyebrow + big bold headline + subtext + primary button; right = rounded student photo; **dark stat bar docked to the bottom** with 4 stats separated by thin dividers.

**Changes:**
- Replace the full-screen dark image **slider** with a **static split hero** (`grid` 1.05fr / 0.95fr) on `--grad-hero`. Drop the `AnimatePresence` slide rotation; keep entrance animations.
- Left column: star-pill eyebrow (`★ GOVANDI'S PREMIER INSTITUTE ★`), `clamp(2.6rem,5.5vw,4rem)` headline in `--text-dark` (not white), one-line subtext, primary `Book Free Demo Class` button (`btn--blue btn--lg`) + secondary `View Programs` (`btn--outline`).
- Right column: single rounded photo (`--radius-lg`, `--shadow-lg`), subtle floating "18+ Years / Trusted" glass chip overlapping bottom-left (mirrors reference's "35k+ Total Students" card).
- **Dark stat bar** (`--blue-deep`) docked at hero's bottom, 4 cells with vertical dividers: `18+ Years` · `3 Mediums` · `200+ Board Scorers` · `25 Students/Batch`. On mobile it becomes a 2×2 grid.
- Remove hero dots. Keep `margin-top` offset for fixed navbar.

**Content:** keep single strongest slide's copy (`Educating the Next Generation of Thinkers`).

### 4.2 ➕ Programs Chips Strip — `ProgramChips.jsx` (NEW)
**Reference:** "Start Preparing for Your Next Test!" — centered heading + rows of rounded pill chips (IELTS, GRE, …) + a `See All` blue pill.

**Adaptation:** centered `section-head` "What We Teach at Muntazar" → pill chips for offerings: `SSC (10th)`, `HSC Science`, `HSC Commerce`, `B.Com`, `BAF`, `BMS`, `Hindi Medium`, `Urdu Medium`, `English Medium`, plus a `See All Programs →` chip that scrolls to `#courses`. Each chip: white bg, `--border`, small subject icon, hover → `--blue` border + `--blue-soft` bg. Light section (`--white`).

### 4.3 ➕ Easy Steps — `EasySteps.jsx` (NEW)
**Reference:** "Get started with Easy Steps" — left column (heading + desc + `Get Started Now!` + `Watch Tutorial`), right = 2×2 numbered pastel cards (01 Select Course … 04 Learn).

**Adaptation:** two-column grid.
- Left: eyebrow `Simple Enrolment`, title `Get Started in 4 Easy Steps`, short desc, `Book Free Demo` (`btn--blue`) + `Call Us` ghost button with play/phone icon.
- Right: 2×2 numbered cards using the pastel tint tokens (`--tint-blue/sky/indigo/slate`), big faded `01–04` numeral, title + one-liner:
  1. **Choose Your Program** — School / College / Degree.
  2. **Book a Free Demo** — sit in a live lecture.
  3. **Enrol & Get Materials** — modules, tests, mentor.
  4. **Start Learning** — daily doubt-solving + tracking.
- Section bg `--grad-soft`.

### 4.4 🔁 Why Choose Us — [BentoFeatures.jsx](client/src/components/BentoFeatures.jsx)
**Reference:** left = overlapping image collage + floating "35k+ Total Students" card; right = heading + paragraph + 2-column checklist (Consultative Training, Real Deal Coaching, …); **below: dark 3-column feature banner** (Education / eLearning Online / Best Industry Leaders) with icons.

**Changes:**
- Rebuild the "Why" block as a **two-column split**: left image collage (2 stacked/overlapping photos + floating `35k+`→ replace with `200+ Toppers` glass card); right = eyebrow `Why Muntazar Classes`, title `Where Discipline Meets Excellence`, paragraph, and a **2-col check-list** built from the current 6 feature titles (Hindi & Urdu Batches, Expert Faculty, Study Halls, Daily Doubt Sessions, Smart Classrooms, Regular Testing) rendered as check-row items (blue check icon + label).
- **Keep the animated stats strip** but move it into the Hero's dark bar (§4.1) — so remove the duplicate here, OR keep a slimmer version. Decision: **remove stats strip from BentoFeatures** (now in hero) to avoid duplication.
- Add the **dark 3-column feature banner** (`--blue-deep`) below the split: `Board Excellence` / `3-Medium Coaching` / `Expert Faculty`, each with icon + one-line sub-copy and a thin divider (mirrors reference dark banner).

### 4.5 ✏️ Courses — [Courses.jsx](client/src/components/Courses.jsx)
Keep the 3 program cards and content. Restyle to match reference card language: rounder corners (`--radius-lg`), `--shadow-sm` resting → `--shadow-md` on hover, keep number/tag/title/details/CTA. Section bg alternate to `--white`. No structural change; only visual polish + shadow tokens.

### 4.6 ✏️ Achievements — [AchievementSection.jsx](client/src/components/AchievementSection.jsx)
Keep 4 topper cards + "View all results" link → `/achievements`. Restyle: softer cards, blue score badge, amber star accent optional. Minor polish only.

### 4.7 ✅ Gallery — [GallerySection.jsx](client/src/components/GallerySection.jsx)
Keep as-is (4-image grid + lightbox). Light polish: match card radius/shadow tokens. No logic change.

### 4.8 ➕ Partner / Admissions Banner — `AdmissionsBanner.jsx` (NEW)
**Reference:** lavender card "Educators, find out how EP can help your school…" with 3D icons left/right + `Join Us` / `We're hiring!` buttons.

**Adaptation:** soft-blue tint card (`#eef2ff`, `--radius-lg`, `--shadow-sm`) centered above FAQ: headline `Admissions Open for 2026–27 — Limited Seats per Batch`, sub-line, two buttons `Book Free Demo` (`btn--blue`) + `WhatsApp Us` (`btn--wa`). Optional decorative blurred blue blobs left/right instead of 3D icons (no new asset dependency). This partly overlaps the existing dark `CTA` — see §4.11.

### 4.9 ✏️ FAQ — [FAQ.jsx](client/src/components/FAQ.jsx)
**Reference:** centered heading; single-column accordion; **first item open with a dark navy background**, remaining items light.

**Changes:** switch from the current 2-column sticky layout → **centered single-column** accordion (max-width ~820px). Open item gets `--blue-deep` bg + white text (reference's signature look); closed items white with `--border`. Keep framer-motion height animation and the plus→cross icon. Keep all 5 Q&As. Add small `Still have questions? Contact Us` line under the accordion.

### 4.10 ➕ Student & Parent Reviews — `Reviews.jsx` (NEW)
**Reference:** "Student Reviews and Feedback" — heading left, prev/next arrow buttons right, row of testimonial cards (quote text, avatar, name, role, amber star rating 4.5).

**Adaptation (brand-new section, we currently have none):** heading `What Parents & Students Say` + eyebrow, arrow nav (framer-motion carousel or CSS scroll-snap track), 5–6 testimonial cards: quote, avatar (Unsplash/placeholder), name, role (`Parent of HSC Student`, `SSC Topper`, etc.), amber star rating. Use scroll-snap on mobile, arrow-controlled translateX on desktop. Place between FAQ and Contact.

### 4.11 ✏️ CTA — [CTA.jsx](client/src/components/CTA.jsx)
Keep the dark `--blue-deep` conversion band. To avoid redundancy with the new §4.8 Admissions Banner, **differentiate**: make §4.8 a light mid-page nudge and keep this CTA as the final dark, full-width "Your Child's Academic Future Starts Here" band before Contact. Light polish only.

### 4.12 ✏️ Contact — [Contact.jsx](client/src/components/Contact.jsx)
Keep info column + enquiry form + Google Maps button + success state. Restyle form card to match new radius/shadow tokens. No logic change.

### 4.13 ✏️ Footer — [Footer.jsx](client/src/components/Footer.jsx)
Keep structure/content. Light polish for consistency (spacing, hover). No structural change.

### 4.14 ✅ Navbar / StickyBottom / AdmissionPopup
- [Navbar.jsx](client/src/components/Navbar.jsx): keep; ensure link list matches new section IDs. Add optional `Reviews` link. Verify anchor targets (`#why-choose-us`, `#courses`, `#faq`, `#contact`).
- [StickyBottom.jsx](client/src/components/StickyBottom.jsx): keep; swap inline `#25D366` → `.btn--wa`.
- [AdmissionPopup.jsx](client/src/components/AdmissionPopup.jsx): keep logic; light restyle to match tokens.

---

## 5. New Components Summary

| File | Purpose | Inserted in App between |
|---|---|---|
| `client/src/components/ProgramChips.jsx` | Offerings pill chips | Hero → EasySteps |
| `client/src/components/EasySteps.jsx` | 4-step enrol path (pastel cards) | ProgramChips → BentoFeatures |
| `client/src/components/AdmissionsBanner.jsx` | Light mid-page admissions nudge | Gallery → FAQ |
| `client/src/components/Reviews.jsx` | Testimonials carousel | FAQ → CTA |

## 6. New Page Order — [App.jsx](client/src/App.jsx) `LandingPage`

```
Navbar
Hero                 (🔁 light + docked dark stat bar)
ProgramChips         (➕)
EasySteps            (➕)
BentoFeatures        (🔁 Why + dark 3-col banner)
Courses              (✏️)
AchievementSection   (✏️)
GallerySection       (✅)
AdmissionsBanner     (➕)
FAQ                  (🔁 centered, dark-open item)
Reviews              (➕)
CTA                  (✏️)
Contact              (✏️)
Footer               (✏️)
StickyBottom + AdmissionPopup (✅)
```

Update imports and the `<LandingPage>` JSX accordingly. Keep the 20s auto-popup, `handleAdmissionClick`, `handleEnquiryClick`, `handleEnquirySubmit`, and `/gallery` + `/achievements` routes untouched.

---

## 7. Implementation Phases

**Phase 0 — Tokens (foundation).** Update [index.css](client/src/index.css): add gradients, pastel tints, shadows, `--radius-lg`, `.btn--wa`, `.section-head`. Nothing visually breaks yet.

**Phase 1 — Hero rewrite.** Rebuild [Hero.jsx](client/src/components/Hero.jsx) (light split + docked dark stat bar). Verify navbar offset + mobile stacking.

**Phase 2 — New top sections.** Build `ProgramChips.jsx` and `EasySteps.jsx`; wire into App.

**Phase 3 — Why/Features rework.** Rewrite [BentoFeatures.jsx](client/src/components/BentoFeatures.jsx) (image collage + checklist + dark 3-col banner); remove duplicated stats strip.

**Phase 4 — FAQ + Reviews.** Recenter [FAQ.jsx](client/src/components/FAQ.jsx) with dark-open item; build `Reviews.jsx` carousel; wire into App.

**Phase 5 — Banner + polish pass.** Build `AdmissionsBanner.jsx`; restyle Courses/Achievements/Gallery/Contact/CTA/Footer/Popup to token consistency; swap WhatsApp inline colors → `.btn--wa`.

**Phase 6 — QA.** Responsive + accessibility + functionality pass (§9).

Each phase is independently runnable via `npm run dev:client` and reviewable in isolation.

---

## 8. Assets Needed
- **Hero photo** (students/classroom, portrait-ish) — currently Unsplash URLs; can reuse existing Unsplash links or drop real Muntazar photos into `client/public/`.
- **Why-section collage** — 2 photos (reuse existing Unsplash education URLs).
- **Reviews avatars** — 5–6 small portraits (Unsplash placeholder faces or real, with consent). No 3D icon assets required (reference's 3D icons replaced by CSS blur blobs / react-icons).
- No new fonts (keep Outfit / Inter / Playfair already loaded via `index.html`).

## 9. QA Checklist
**Responsive:** hero split → stacked (<768px); stat bar 4-col → 2×2; EasySteps 2×2 → 1-col; chips wrap; Why split → stacked; reviews → scroll-snap; FAQ single-col already fine. Verify at 360 / 768 / 1024 / 1440.
**Accessibility:** color contrast on light hero (dark text on pale blue passes AA); accordion buttons keyboard-operable; carousel arrows have `aria-label`; images have `alt`; respect existing focus styles.
**Functionality (must still work):** admission popup (manual + 20s auto), enquiry submit → `/api/enquiry` with local fallback, gallery lightbox, `/gallery` + `/achievements` routes, sticky mobile bar, all anchor scrolls, phone/WhatsApp links.
**Performance:** keep `loading="lazy"` on images; avoid layout shift on hero image (set aspect-ratio); framer-motion `viewport={{ once: true }}` retained.

## 10. Out of Scope
LMS-only reference screens (Payment Successful, Coupon/checkout, Login/Dashboard) are **not** part of this marketing landing page and are excluded. `Dashboard` nav button from the reference is omitted (we use `Enrol Now`).

---

### Risk notes
- **Duplication risk:** stats appear both in reference hero bar and a "35k+" card — we consolidate stats into the hero bar and use a single "200+ Toppers" card in the Why collage to avoid repeating numbers.
- **CTA vs Admissions Banner overlap:** intentionally differentiated (light mid-page nudge vs final dark band) — if it still feels redundant during Phase 5, collapse into one.
- **Hero slider removal:** we lose the 3-slide rotation; if the client wants motion, the right-side image can cross-fade between 2–3 photos while text stays static.
