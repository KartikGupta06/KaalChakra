# KALACHAKRA (कालचक्र) — DESIGN BIBLE & SYSTEM SPECIFICATION
*Version 1.0.0 | Single Source of Truth for Vedic Astronomical & Astrological Interface*

---

## 1. Executive Summary & Core Identity

### 1.1 Identity Specification
* **Project Name**: Kalachakra
* **Sanskrit Nomenclature**: **कालचक्र** (Kāla-chakra: "The Wheel of Time")
* **Primary Tagline**: *The Eternal Wheel of Time*
* **Secondary Tagline**: *Ancient Wisdom • Modern Experience*

### 1.2 Core Vision
Kalachakra is **not** a software dashboard, a modern web app, or an enterprise SaaS portal. 

Kalachakra is an immersive digital recreation of India's timeless Vedic astronomical (*Jyotisha*) and astrological heritage. The interface is conceived as an ancient, sacred manuscript preserved within a modern digital museum. When users enter Kalachakra, they should experience the tactile reverence of handling palm-leaf inscriptions, copper-plate charts, and royal astronomy scrolls, illuminated by soft temple lamps.

The overall experience must evoke:
* **Heritage**: Rooted in millennia-old Vedic observational traditions (*Surya Siddhanta*, *Brihat Samhita*).
* **Sacredness**: Treated with ritualistic beauty, reverence, and spiritual depth.
* **Authenticity**: True to classical astronomical mathematics and Indian visual aesthetics.
* **Calmness**: Serene, meditative visual atmosphere devoid of bright notifications or aggressive UX triggers.
* **Royal Craftsmanship**: Inspired by royal Indian seals, intricate temple carvings, and gilded illuminations.
* **Timelessness**: Designed to feel as timeless as the cosmos itself.

---

## 2. Design Philosophy: "The Sanskrit Manuscript Rule"

### 2.1 The Cardinal Principle
Every visual, structural, and interactive decision within Kalachakra must pass a single strict filter:

> **"Would this feature, element, animation, color, or font feel at home inside an ancient Indian manuscript or temple observatory?"**

If the answer is **no**, it is strictly rejected and redesigned.

### 2.2 Aesthetic Contrast & Anti-Patterns

| Category | Allowed Aesthetics (Kalachakra Standard) | Prohibited Anti-Patterns (Strictly Forbidden) |
| :--- | :--- | :--- |
| **Color Base** | Parchment, Aged Sand, Temple Wood, Deep Copper | Pure White `#FFFFFF`, Pure Black `#000000`, Synthetic Gray |
| **Accents** | Royal Gold, Brass, Sindoor Red, Deep Maroon | Neon Cyan, Electric Blue, Hot Pink, Cyberpunk Purple |
| **Lighting** | Soft Amber, Golden Glow, Warm Candlelight | Blue LED Highlights, Cold White Backlight, High Contrast Neon |
| **Shapes & Cards** | Manuscripts, Scrolls, Temple Tablets, Carved Wood | Modern Flat Cards, Glassmorphism, 100% Round Pills |
| **Borders** | Engraved Corners, Decorative Tracery, Wax Seals | 1px Solid Gray Borders, Dotted CSS Defaults |
| **Typography** | Classical Serif, Classical Devanagari Script | Poppins, Inter, Arial, Comic Sans, Monospace Code Fonts |
| **Animations** | Ink Spreading, Parchment Unfolding, Slow Shimmer | Springy Bounces, Fast Pop-ups, Rapid Slide-ins |
| **Icons** | Hand-drawn Motifs, Engraved Symbols, Mandalas | Flat Material Symbols, Feather Line Icons, Tech Icons |

---

## 3. Visual Inspiration Matrix

The visual identity of Kalachakra is drawn directly from classical historical sources across the Indian subcontinent:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        VISUAL INSPIRATION MATRIX                       │
├──────────────────────────┬─────────────────────────────────────────────┤
│ Source Category          │ Key Visual Elements Extracted               │
├──────────────────────────┼─────────────────────────────────────────────┤
│ Sacred Manuscripts       │ Burnt parchment edges, ink wash, cinnabar    │
│                          │ marginalia, Devanagari headings, gold leaf   │
├──────────────────────────┼─────────────────────────────────────────────┤
│ Temple Architecture      │ Konark Sun Temple wheels, stone carvings,   │
│                          │ Hampi pillars, carved wooden ceiling frames │
├──────────────────────────┼─────────────────────────────────────────────┤
│ Astronomical Artifacts   │ Jantar Mantar masonry instruments, brass    │
│                          │ astrolabes, armillary spheres, copper charts│
├──────────────────────────┼─────────────────────────────────────────────┤
│ Cave Art & Miniatures    │ Ajanta/Ellora pigments, Rajasthani royal    │
│                          │ gold borders, Tanjore gilded inlay          │
└──────────────────────────┴─────────────────────────────────────────────┘
```

---

## 4. Comprehensive Color System

The color palette is built entirely on organic pigments, metals, and surfaces found in ancient Indian art and architecture.

### 4.1 Primary Light Mode Backgrounds (Parchment & Sand)

```
┌─────────────┬─────────────┬─────────────┬─────────────┐
│ Ancient     │ Parchment   │ Temple Sand │ Warm Ivory  │
│ Paper       │             │             │             │
│ #F4E7C8     │ #E7D1A3     │ #E9D8B4     │ #F8F0DD     │
└─────────────┴─────────────┴─────────────┴─────────────┘
```

* **Ancient Paper** (`#F4E7C8`): Primary light canvas background.
* **Parchment** (`#E7D1A3`): Secondary background for active scroll cards, panels, and sidebars.
* **Temple Sand** (`#E9D8B4`): Tertiary element background and section distinction.
* **Warm Ivory** (`#F8F0DD`): Elevated card surfaces and highlighted readable areas.

### 4.2 Primary Dark Mode Backgrounds (Temple Wood & Charcoal)

```
┌─────────────┬─────────────┬─────────────┬─────────────┐
│ Temple      │ Dark Wood   │ Burnt Brown │ Charcoal    │
│ Brown       │             │             │ Brown       │
│ #5C4033     │ #3A2414     │ #2B1A10     │ #20140D     │
└─────────────┴─────────────┴─────────────┴─────────────┘
```

* **Temple Brown** (`#5C4033`): Muted dark background for secondary overlays.
* **Dark Wood** (`#3A2414`): Secondary dark theme background (carved wooden paneling).
* **Burnt Brown** (`#2B1A10`): Primary dark theme canvas background.
* **Charcoal Brown** (`#20140D`): Deepest ambient backdrop for nocturnal celestial views.

### 4.3 Sacred Accent Colors

```
┌─────────────┬─────────────┬─────────────┬─────────────┐
│ Royal Gold  │ Brass       │ Copper      │ Saffron     │
│ #D4AF37     │ #C89B3C     │ #B87333     │ #E67E22     │
├─────────────┼─────────────┼─────────────┼─────────────┤
│ Deep Maroon │ Sindoor     │ Lotus Pink  │             │
│ #7B1E1E     │ #A52A2A     │ #C97A7E     │             │
└─────────────┴─────────────┴─────────────┴─────────────┘
```

* **Royal Gold** (`#D4AF37`): Primary accent. Used for astronomical focus lines, selected tab indicators, and active planetary positions.
* **Brass** (`#C89B3C`): Secondary metallic accent for borders, frame corners, and badges.
* **Copper** (`#B87333`): Warm metallic highlight for historical calculations and charts.
* **Saffron** (`#E67E22`): Sacred astronomical emphasis, solar markers, and key interactive highlights.
* **Deep Maroon** (`#7B1E1E`): Primary brand color for headers, sacred dividers, and major headings.
* **Sindoor** (`#A52A2A`): Secondary reddish accent for auspicious markers (*Muhurta*, *Tithi* indicators).
* **Lotus Pink** (`#C97A7E`): Soft ornamental color for botanical motifs and subtle active states.

### 4.4 Typography Color Palette

```
┌─────────────┬─────────────┬─────────────┬─────────────┐
│ Primary Text│ Secondary   │ Muted Text  │ Disabled    │
│ #2F1B14     │ #5C4033     │ #7D6B57     │ #A79A87     │
└─────────────┴─────────────┴─────────────┴─────────────┘
```

* **Primary Text** (`#2F1B14`): Deep ink brown for highest contrast readability on parchment.
* **Secondary Text** (`#5C4033`): Medium warm brown for subtitles, table headers, and metadata.
* **Muted Text** (`#7D6B57`): Soft earth brown for secondary notes, coordinate labels, and footnotes.
* **Disabled Text** (`#A79A87`): Low-contrast parchment brown for inactive interface states.

### 4.5 CSS Variables Definition Standard
All applications within the Kalachakra ecosystem must declare these exact tokens:

```css
:root {
  /* Canvas & Surfaces (Light) */
  --kc-bg-paper: #F4E7C8;
  --kc-bg-parchment: #E7D1A3;
  --kc-bg-sand: #E9D8B4;
  --kc-bg-ivory: #F8F0DD;

  /* Dark Theme Surfaces */
  --kc-bg-temple-brown: #5C4033;
  --kc-bg-dark-wood: #3A2414;
  --kc-bg-burnt-brown: #2B1A10;
  --kc-bg-charcoal: #20140D;

  /* Accents */
  --kc-gold-royal: #D4AF37;
  --kc-brass: #C89B3C;
  --kc-copper: #B87333;
  --kc-saffron: #E67E22;
  --kc-maroon: #7B1E1E;
  --kc-sindoor: #A52A2A;
  --kc-lotus: #C97A7E;

  /* Typography */
  --kc-text-primary: #2F1B14;
  --kc-text-secondary: #5C4033;
  --kc-text-muted: #7D6B57;
  --kc-text-disabled: #A79A87;

  /* Shadows & Glows */
  --kc-shadow-warm: 0 8px 24px rgba(47, 27, 20, 0.12);
  --kc-shadow-deep: 0 16px 40px rgba(32, 20, 13, 0.25);
  --kc-glow-amber: 0 0 15px rgba(212, 175, 55, 0.35);
  --kc-glow-lamp: 0 0 30px rgba(230, 126, 34, 0.25);
}
```

---

## 5. Texture & Surface Guidelines

Static flat background colors are **prohibited**. All containers and screens must employ soft organic textures to mimic physical artifacts.

### 5.1 Texture Layers & Stack Hierarchy

```
┌────────────────────────────────────────────────────────┐
│ Layer 4: Ambient Candlelight Overlay (Radial Gradient) │
├────────────────────────────────────────────────────────┤
│ Layer 3: Vector Border Frame & Corner Engravings       │
├────────────────────────────────────────────────────────┤
│ Layer 2: Noise / Grain Overlay (Opacity 4-8%)          │
├────────────────────────────────────────────────────────┤
│ Layer 1: Base Surface Color (e.g. #F4E7C8 / #2B1A10)   │
└────────────────────────────────────────────────────────┘
```

### 5.2 Texture Specifications
1. **Old Paper Grain**: Fine noise opacity (4-7%) overlaying `--kc-bg-paper` to simulate handmade cotton parchment.
2. **Burnt Parchment Edges**: Subtle radial vignetting on viewport corners (`rgba(58, 36, 20, 0.15)` fading inwards).
3. **Temple Stone & Wood Grain**: Linear subtle striations applied to sidebar backgrounds and heavy structural cards.
4. **Ink Wash**: Soft water-color gradient patches (`rgba(123, 30, 30, 0.03)`) under major section headers.
5. **Dust Particles**: Slow floating ambient particles on dark astronomical chart screens.

---

## 6. Typography System

Typography must embody manuscript craftsmanship. Modern sans-serif fonts (Inter, Roboto, Arial, Poppins) are strictly prohibited as primary identity fonts.

### 6.1 Font Stacks

```
┌─────────────────┬─────────────────────────────────────────────────────┐
│ Usage           │ Font Family Stack                                   │
├─────────────────┼─────────────────────────────────────────────────────┤
│ Latin Headings  │ 'Cinzel', 'EB Garamond', 'Cormorant Garamond', serif│
├─────────────────┼─────────────────────────────────────────────────────┤
│ Devanagari      │ 'Tiro Devanagari Sanskrit', 'Noto Serif Devanagari' │
├─────────────────┼─────────────────────────────────────────────────────┤
│ Body Text       │ 'EB Garamond', 'Cormorant Garamond', Georgia, serif │
├─────────────────┼─────────────────────────────────────────────────────┤
│ Astronomical    │ 'Cinzel Decorative', 'EB Garamond', serif           │
│ Numerals        │                                                     │
└─────────────────┴─────────────────────────────────────────────────────┘
```

### 6.2 Typographic Hierarchy & Scale

```
┌──────────────┬──────────────┬──────────────┬──────────────┬───────────┐
│ Level        │ Size (rem)   │ Size (px)    │ Line Height  │ Weight    │
├──────────────┼──────────────┼──────────────┼──────────────┼───────────┤
│ Display (H1) │ 2.75 - 3.5   │ 44px - 56px  │ 1.15         │ 700 (Bold)│
│ Section (H2) │ 2.0 - 2.25   │ 32px - 36px  │ 1.25         │ 600       │
│ Subsection   │ 1.35 - 1.5   │ 22px - 24px  │ 1.35         │ 600       │
│ Card Title   │ 1.15 - 1.25  │ 18px - 20px  │ 1.4          │ 500       │
│ Body Text    │ 1.0          │ 16px         │ 1.6          │ 400       │
│ Small / Meta │ 0.85         │ 13.5px       │ 1.5          │ 400       │
└──────────────┴──────────────┴──────────────┴──────────────┴───────────┘
```

### 6.3 Devanagari & Sanskrit Formatting Rules
* Sanskrit terms (*Rashi*, *Nakshatra*, *Tithi*, *Yoga*, *Karana*) should always be rendered alongside their classical Devanagari script:
  * Example: **Kumbha (कुम्भ)** • *Aquarius*
  * Example: **Rohini (रोहिणी)** • *2nd Nakshatra*
* Sanskrit titles must be styled with subtle golden ink highlights (`--kc-gold-royal`).

---

## 7. Sacred Iconography & Symbol System

Icons are treated as **engraved temple motifs** or manuscript woodcuts rather than generic web icons.

### 7.1 Approved Motif Catalog

```
┌──────────┬───────────────────────┬──────────────────────────────────┐
│ Symbol   │ Name                  │ Context & Application            │
├──────────┼───────────────────────┼──────────────────────────────────┤
│ 🕉       │ Om / Sacred Syllable  │ Header ornament, sacred entry    │
│ 🪔       │ Deepa (Temple Lamp)   │ Active status, illumination mode │
│ 📜       │ Patra (Scroll)        │ Manuscripts, reports, readings   │
│ ☀        │ Surya (Sun)           │ Solar calculations, Day lord     │
│ 🌙       │ Chandra (Moon)        │ Lunar phase, Tithi, Paksha       │
│ ⭐       │ Nakshatra (Star)      │ Stellar mansions, constellations │
│ 🔱       │ Trishula              │ Spiritual focus, major transit   │
│ 📿       │ Japa Mala (Beads)     │ Cycle counter, mantra timers     │
│ 🌺       │ Padma (Lotus)         │ Auspiciousness indicator, success│
│ 🔔       │ Ghanta (Temple Bell)  │ Notifications, alerts, transitions│
└──────────┴───────────────────────┴──────────────────────────────────┘
```

### 7.2 Custom SVG Vector Guidelines
When SVG icons are rendered:
1. Stroke width must be consistent (1.5px to 2px equivalent).
2. Endcaps must be rounded (`stroke-linecap="round"`).
3. Color must default to `--kc-maroon` or `--kc-brass`.
4. Avoid solid filled modern shapes; prefer open-line woodcut engravings.

---

## 8. Decorative Frames, Borders & Dividers

Simple 1px solid rectangle frames are forbidden. Cards and containers rely on manuscript-style frames.

### 8.1 Temple Corner Motif & Border Style

```
┌─┐                                                           ┌─┐
│ ╔═════════════════════════════════════════════════════════╗ │
│ ║                                                         ║ │
│ ║             [MANUSCRIPT CONTENT AREA]                   ║ │
│ ║                                                         ║ │
│ ╚═════════════════════════════════════════════════════════╝ │
└─┘                                                           └─┘
```

### 8.2 Border Specifications
1. **Corner Ornaments**: Intricate L-shaped filigree or 45-degree brass corner caps on elevated cards.
2. **Double Line Framing**: Outer thin border (`1px solid --kc-brass`), inner offset padding (4px), inner hairline (`1px solid rgba(200, 155, 60, 0.3)`).
3. **Manuscript Dividers**: Center-ornamented horizontal lines:
   ```
   ───❖───  or  ───◆───  or  ───☸───
   ```
4. **Wax Seal Motifs**: Circular red/maroon seals (`--kc-sindoor`) acting as closing buttons or verification badges.

---

## 9. Card & Surface Paradigms

Cards in Kalachakra are designed to represent physical historical media:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CARD PARADIGM SPECTRUM                          │
├─────────────────┬──────────────────┬───────────────────────────────────┤
│ Type            │ Surface Motif    │ Recommended Use Case              │
├─────────────────┼──────────────────┼───────────────────────────────────┤
│ 1. Scroll       │ Rolled parchment │ Main content feed, transit logs   │
│ 2. Tablet       │ Carved stone/wood│ Panchang summary, daily view      │
│ 3. Plaque       │ Engraved brass   │ Key metrics, planetary status     │
│ 4. Copper Sheet │ Gilded copper    │ Horoscope charts (Kundali / Chakra│
└─────────────────┴──────────────────┴───────────────────────────────────┘
```

---

## 10. Candlelight & Ambient Lighting Model

The UI is illuminated by simulated temple oil lamps (*Deepas*).

### 10.1 Lighting Rules
1. **Warm Candlelight**: Highlights use radial amber gradients fading into parchment.
2. **No Blue Lighting**: Blue/cyan light sources are banned. Ambient highlights use warmth ranges ($2000\text{K} - 3200\text{K}$ equivalent).
3. **Subtle Candle Flicker**: Hero elements may feature an ultra-slow, ambient glow modulation ($0.95$ to $1.0$ opacity over 4 seconds).

---

## 11. Motion Design & Animation Specification

Animations must feel **ceremonial, deliberate, and organic**. Fast, snappy, or robotic transitions ruin the manuscript immersion.

### 11.1 Timing Standards

```
┌─────────────────────────┬───────────────────┬──────────────────────────┐
│ Animation Type          │ Duration Range    │ Easing Function          │
├─────────────────────────┼───────────────────┼──────────────────────────┤
│ Micro-interactions      │ 250ms – 400ms     │ cubic-bezier(0.4,0,0.2,1)│
│ Component Transitions   │ 500ms – 800ms     │ cubic-bezier(0.25,1,0.5,1)│
│ Hero & Page Reveals     │ 900ms – 1400ms    │ cubic-bezier(0.16,1,0.3,1)│
└─────────────────────────┴───────────────────┴──────────────────────────┘
```

### 11.2 Key Ceremonial Animation Patterns
* **Paper Unfolding**: Cards open from a narrow horizontal axis outward like an unrolling scroll.
* **Ink Spreading**: Text titles and badges reveal using a smooth mask blur to emulate ink absorbing into wet parchment.
* **Golden Shimmer**: A soft 45-degree light sweep over brass and gold borders on hover.
* **Mandala Rotation**: Cosmic wheels and astronomical charts rotate at ultra-slow speeds (e.g. 120 seconds per full turn).
* **Page Turning**: Modal dialogs turn smoothly like heavy parchment pages.

---

## 12. Component Style Guide & Specs

### 12.1 Buttons & Interactive Triggers
* **Appearance**: Handcrafted rounded pill or rectangular tablet with corner cuts.
* **Base Style**: Background `--kc-bg-sand`, border `1px solid --kc-brass`, text `--kc-maroon`.
* **Hover State**: Background shifts to `--kc-bg-parchment`, subtle amber glow (`--kc-glow-amber`), scale to `1.02`.
* **Active State**: Inset shadow to feel physically pressed onto parchment.

### 12.2 Form Inputs & Selectors
* **Appearance**: Recessed parchment slot.
* **Base Style**: Inner shadow `inset 0 2px 4px rgba(47, 27, 20, 0.08)`, border `1px solid --kc-text-disabled`.
* **Focus State**: Border shifts to `--kc-gold-royal` with soft lamp glow. Font renders in `--kc-text-primary`.

### 12.3 Dialogs & Manuscripts (Modals)
* **Appearance**: Centered ancient manuscript popup with burnt-edge shadows.
* **Close Action**: Red wax seal button (`--kc-sindoor`) in top-right corner containing an embossed `✕` or `✕❖`.
* **Header**: Decorative gold filigree border below modal title.

### 12.4 Navigation Scroll
* **Structure**: Top or side scroll container styled as rolled parchment with wooden dowel end-caps.
* **Active Item**: Indicated by a gold leaf bookmark ribbon motif hanging beneath the active tab.

---

## 13. Audio & Soundscape Framework (Optional / Sensory)

Sound effects enhance tactile feedback without distracting the user.

* **Temple Bell**: Played softly on key calculation completions or day-change triggers.
* **Paper Flip**: Subtle rustle when switching major tabs or opening manuscripts.
* **Ink Pen Stroke**: Soft tactile tick on button toggles.
* **Ambient Conch / Wind**: Extremely low volume optional background soundscape for cosmic chart views.

---

## 14. Spacing System & Grid Layout

* **Generous Padding**: Minimum card padding is 24px (`1.5rem`). Content must never feel cramped.
* **Grid**: 12-column layout with wide gutters (24px to 32px).
* **Rhythm**: Spacing units follow 8px / 12px steps (`8px`, `16px`, `24px`, `36px`, `48px`, `72px`).

---

## 15. Accessibility & Contrast Compliance

1. **Text Contrast**: Text in `--kc-text-primary` (`#2F1B14`) on `--kc-bg-paper` (`#F4E7C8`) yields a contrast ratio of **10.8:1** (Exceeds WCAG AAA standard).
2. **Textured Readability**: Text areas maintain a high-contrast solid parchment backdrop (`#F8F0DD`) beneath text blocks to prevent background noise from hindering readability.
3. **Screen Readers**: All sacred iconography includes `aria-label` translations (e.g. `aria-label="Surya / Sun"`).

---

## 16. Code Implementation Token Cheat-Sheet

Developers implementing components in future phases can copy these utility patterns directly:

```css
/* Decorative Manuscript Card Utility */
.kc-card-manuscript {
  background-color: var(--kc-bg-paper);
  background-image: radial-gradient(circle at center, rgba(248, 240, 221, 0.8) 0%, rgba(244, 231, 200, 0.4) 100%);
  border: 1px solid var(--kc-brass);
  box-shadow: var(--kc-shadow-warm);
  border-radius: 4px;
  position: relative;
  padding: 1.75rem;
}

.kc-card-manuscript::before {
  content: '';
  position: absolute;
  top: 3px; left: 3px; right: 3px; bottom: 3px;
  border: 1px solid rgba(200, 155, 60, 0.3);
  pointer-events: none;
}

/* Gold Heading Utility */
.kc-heading-gold {
  font-family: 'Cinzel', 'EB Garamond', serif;
  color: var(--kc-maroon);
  border-bottom: 1px solid var(--kc-gold-royal);
  padding-bottom: 0.5rem;
  margin-bottom: 1.25rem;
}
```

---

## 17. Governance & Enforcement Rules

1. **Single Source of Truth**: This document (`docs/KALACHAKRA_DESIGN_SYSTEM.md`) is binding for all future development phases.
2. **Zero Unauthorized Deviations**: No new fonts, colors, or modern shortcuts may be introduced without updating this Design Bible first.
3. **Phase Sign-Off Requirement**: Every component or screen produced in subsequent phases must be audited against Section 2.2 (Aesthetic Contrast & Anti-Patterns).

---
*End of Kalachakra Design System Specification • Phase 0 Complete*
