# Homepage Redesign — MYM Sign Language Platform

## Overview
Complete visual and structural redesign of `index.html` to a modern, editorial-quality landing page. All existing brand tokens (colors, fonts, 3D buttons, notch navbar) preserved. New pricing section added. Existing pages (dashboard, lesson, library, etc.) remain unchanged.

## Page Structure (top to bottom)

### 1. Notch Navbar (keep existing)
- Floating pill, `backdrop-filter:blur`, fixed top-center
- Desktop: nav links left / logo center / profile right
- Mobile: hamburger → fullscreen blue overlay with white card + staggered links
- No changes needed

### 2. Split Hero
- **Left half** — `background:var(--blue)` flat blue, no image
  - Eyebrow badge: "Interactive Learning"
  - h1: "Sign Language,<br><span>Through Play</span>" (orange span)
  - p: descriptive copy
  - Two CTAs: `btn-accent` "Get Started Free" + `btn-outline` "Explore Courses"
  - Stats bar: 3 stats with vertical dividers
  - Staggered entrance animation (badge → h1 → p → CTAs → trust → stats)
- **Right half** — white card containing a device-frame mockup with a banner PNG screenshot inside
  - Card: white bg, 2px border, `border-radius:var(--radius)`, subtle shadow
  - Inner image: banner.png in a phone/tablet frame mockup

### 3. How It Works (3 steps)
- Section header: eyebrow "How It Works" + h2 "Your Path to Fluency" + subtitle
- 3 horizontal cards with arrow connectors between them
- Each card:
  - Banner thumbnail at top (proportional, `border-radius`, cropped)
  - Step number (1/2/3 circled)
  - h3 heading
  - p description
- Hover: `translateY(-3px)`, blue border tint
- Mobile: stack vertically

### 4. Features (6 cards, 3×2 bento grid)
- Keep existing 6 feature cards but restyle:
  - Alternating: some cards get a small banner/image thumbnail at top
  - Hover lift with blue border tint
  - SVG icon at top of each
  - h3 + p description
- 3 columns desktop, 2 columns tablet, 1 column mobile
- Staggered entry animation

### 5. Sign of the Day
- Keep existing design: horizontal card with SVG + text description
- Eyebrow badge + h2 heading
- "Practice This Sign" CTA button
- Enhanced hover: `translateY(-2px)`, blue border, SVG spring rotation

### 6. Testimonials (3 cards)
- Keep existing 3 testimonial cards
- Star ratings, quote text, avatar circle, name + title
- Hover: lift with blue border tint
- Staggered entry

### 7. Pricing Section — NEW
- Section header: eyebrow "Pricing" + h2 "Choose Your Plan" + subtitle
- 3-column card layout

| Feature | Free | Plus | Pro |
|---------|------|------|-----|
| Core lessons | ✅ | ✅ | ✅ |
| Daily streaks | ✅ | ✅ | ✅ |
| Sign library access | ✅ | ✅ | ✅ |
| Mym AI Tutor | — | ✅ | ✅ |
| Offline mode | — | ✅ | ✅ |
| Unlimited reviews | — | — | ✅ |
| Priority support | — | — | ✅ |
| Price | $0 | $7.99/mo | $14.99/mo |

- Plus card highlighted as "Most Popular" — orange badge on top, slightly taller, orange accent border
- Each card: plan name, price, hr divider, feature checklist (checkmark or dash), CTA button
- CTA buttons: Free → `btn-primary` "Get Started", Plus → `btn-accent` "Subscribe", Pro → `btn-primary` "Go Pro"
- Hover: card lift, blue/orange border tint

### 8. FAQ (keep existing)
- Accordion-style, 5 questions
- No changes

### 9. CTA Banner
- Full-width `var(--blue)` background section
- Eyebrow badge (white on translucent bg)
- h2 "Ready to Start?"
- p subtitle
- White 3D button "Get Started Free" with arrow icon

### 10. Footer (keep existing)
- 4-column grid, copyright bar
- No changes

## New Page: Pricing Page (`pricing.html`) — NEW
- Full standalone pricing page linked from homepage pricing CTAs
- Hero: small flat blue section with eyebrow + h1 "Choose Your Plan"
- Same 3 pricing cards as homepage but more detailed
- FAQ section specific to pricing/billing
- Notch navbar + footer (shared templates)

## Visual Design Tokens (all existing)
- `--blue: #1072cf` / `--orange: #fd6c22` — flat colors, no gradients
- Fonts: Outfit (display h1-h3), DM Sans (body)
- 3D buttons: `box-shadow: 0 4px 0` darken variant + `:active { translateY(2px) }`
- Cards: `border: 2px solid var(--border)`, `border-radius: var(--radius)`, white bg
- Hover lift: `translateY(-1px)` to `translateY(-3px)` depending on element
- Entrance animations: `fadeSlideUp` with staggered delays
- Easing: `--ease-premium: cubic-bezier(.22,1,.36,1)`, `--ease-spring: cubic-bezier(.34,1.56,.64,1)`
- Responsive breakpoints: 900px, 768px, 480px

## Banner Images Usage
- `assets/images/banner1.png` — hero right-panel mockup (device frame)
- `assets/images/banner2.png` — How It Works step thumbnails
- `assets/images/banner1.png` — feature card thumbnails (alternating cards)
- Images: proportional scaling, `border-radius`, `object-fit:cover` where needed

## Files Modified
- `index.html` — full restructure
- `assets/css/style.css` — hero split-layout, pricing cards, how-it-works steps, layout adjustments
- `assets/js/main.js` — any new interactive elements (pricing toggle if annual/monthly, etc.)

## Files Created
- `pricing.html` — new pricing page
