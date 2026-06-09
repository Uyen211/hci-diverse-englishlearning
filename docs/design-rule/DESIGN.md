---
name: DiveVerse Light Universe System
colors:
  primary: "#4E56C0"
  secondary: "#9B5DE0"
  accent: "#D78FEE"
  light-accent: "#FDCFFA"
  canvas: "#F9F7FE"
  surface: "#FFFFFF"
  text-primary: "#1A1A2E"
  text-secondary: "#5A5A7A"
  dark-floor: "#1C1B2E"
  success: "#22C55E"
  warning: "#F59E0B"
  error: "#EF4444"
typography:
  font-primary: "Manrope"
  font-secondary: "Inter"
  display-xl:
    fontFamily: Manrope
    fontSize: 64px
    fontWeight: 700
    letterSpacing: -2px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 400
rounded:
  md: 12px
  lg: 16px
  xl: 24px
  xxl: 32px
  pill: 9999px
  full: 9999px
---

## Overview

DiveVerse's design system, "Light Mode Universe," creates a learning environment that feels like a gentle journey through a cosmos of knowledge. The aesthetic is clean, airy, and futuristic, focusing on light, space, and a sense of calm exploration. It replaces heavy, physical-world metaphors with ethereal glows, glassmorphism, and soft, rounded shapes.

The base atmosphere is a **light, ethereal canvas** (`{colors.canvas}` — #F9F7FE) that feels like a nebula, paired with crisp white surfaces (`{colors.surface}` — #FFFFFF) for content cards. The primary brand color is a deep, eternal night blue (`{colors.primary}` — #4E56C0), used for critical CTAs and active states, creating sharp, clear focus points.

Typography is led by **Manrope** for display headings, chosen for its clean, modern, yet slightly rounded character that feels both sophisticated and friendly. **Inter** is used for all body and UI text for its supreme readability.

A key characteristic of this system is the complete replacement of traditional drop-shadows with **emissive glows**. Elements don't cast shadows; they emit light, reinforcing the celestial theme. This is combined with large border radii (`{rounded.xl}` to `{rounded.xxl}`) and glassmorphism to create a soft, floating, and futuristic UI.

**Key Characteristics:**
- Ethereal, slightly purple-tinted canvas (`{colors.canvas}` — #F9F7FE).
- Deep blue primary CTAs (`{colors.primary}` — #4E56C0) with strong glows.
- A palette of cosmic blues, purples, and pinks (`{colors.secondary}`, `{colors.accent}`, `{colors.light-accent}`).
- **Glows instead of shadows.** Depth is created by light, not darkness.
- **Glassmorphism** for sidebars and notification panels, using `backdrop-filter` for a frosted-glass effect over a starry background.
- Extremely generous border-radius: `{rounded.lg}` (16px) for small components, `{rounded.xxl}` (32px) for main cards and panels.
- Manrope for headings provides a clean, modern, and friendly voice. Inter for body text ensures readability.
- Decorative patterns are minimal, consisting of sparse, tiny stars and thin elliptical orbits.

## Colors

### Brand & Accent
- **Primary** (`{colors.primary}` — #4E56C0): Eternal night blue. For primary CTAs, active indicators, and key highlights.
- **Secondary** (`{colors.secondary}` — #9B5DE0): Intellectual and whimsical purple. For secondary actions, icons, and highlighted sections.
- **Accent** (`{colors.accent}` — #D78FEE): A gentle, lighter purple for hover states and selected items.
- **Light Accent** (`{colors.light-accent}` — #FDCFFA): Warm, atmospheric pink. Used for progress bar backgrounds and subtle card glows.

### Surface
- **Canvas** (`{colors.canvas}` — #F9F7FE): The main page background. A white with a very faint purple/pink tint.
- **Surface** (`{colors.surface}` — #FFFFFF): Pure white for content cards, panels, and modals to create a clean separation from the canvas.
- **Dark Floor** (`{colors.dark-floor}` — #1C1B2E): A deep, dark blue-purple used exclusively for the footer, providing a resting point for the user's eyes.
- **Glass** (`rgba(255, 255, 255, 0.7)`): The fill color for glassmorphic elements, combined with a `backdrop-filter`.

### Text
- **Text Primary** (`{colors.text-primary}` — #1A1A2E): A near-black with a hint of blue. Easy on the eyes for long reading sessions.
- **Text Secondary** (`{colors.text-secondary}` — #5A5A7A): A muted purple-gray for descriptions, metadata, and breadcrumbs.
- **On Primary** (`#FFFFFF`): White text for use on primary-colored buttons.

### Semantic
- **Success** (`{colors.success}` — #22C55E): Success states, completion checkmarks.
- **Warning** (`{colors.warning}` — #F59E0B): Warning callouts, gentle alerts.
- **Error** (`{colors.error}` — #EF4444): Validation errors, critical alerts.

### Gradients
- **Morning Nebula:** `linear-gradient(135deg, #FDCFFA 0%, #D78FEE 50%, #9B5DE0 100%)`. For progress rings and welcome banners.
- **Galactic Glow:** `linear-gradient(120deg, #4E56C0, #9B5DE0, #D78FEE)`. For oversized CTAs and special event cards.
- **Atmosphere Haze:** `radial-gradient(circle at 20% 30%, #FDCFFA, #F9F7FE)`. For static hero backgrounds.

## Typography

### Font Family
The system uses **Manrope** for display headings and **Inter** for all body and UI text. This creates a clear hierarchy where headlines are impactful and friendly, while running text is maximally legible. The fallback stack is a standard `sans-serif` system stack.

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `{typography.display-xl}` | 64px | 700 | 1.1 | -2px | Main hero headline |
| `{typography.display-lg}` | 48px | 700 | 1.15 | -1.5px | Section headers |
| `{typography.display-md}` | 36px | 700 | 1.2 | -1px | Sub-section headers |
| `{typography.display-sm}` | 28px | 700 | 1.3 | -0.5px | Large card titles |
| `{typography.title-lg}` | 24px | 600 | 1.3 | 0 | Card titles, modal headers |
| `{typography.title-md}` | 18px | 600 | 1.4 | 0 | Item titles, emphasized text |
| `{typography.body-md}` | 16px | 400 | 1.6 | 0 | Default body text |
| `{typography.body-sm}` | 14px | 400 | 1.6 | 0 | Secondary text, descriptions |
| `{typography.caption}` | 12px | 500 | 1.4 | 0.5px | Captions, labels, breadcrumbs |
| `{typography.button}` | 16px | 600 | 1.0 | 0 | Button labels |

## Layout

### Spacing System
- **Base unit:** 4px.
- **Tokens:** `{spacing.xxs}` 4px · `{spacing.xs}` 8px · `{spacing.sm}` 12px · `{spacing.md}` 16px · `{spacing.lg}` 24px · `{spacing.xl}` 32px · `{spacing.xxl}` 48px · `{spacing.section}` 96px.
- **Section padding:** `{spacing.section}` (96px) between major page sections.
- **Card internal padding:** `{spacing.xl}` (32px) for primary cards; `{spacing.lg}` (24px) for secondary cards.

### Grid & Container
- **Max content width:** ~1200px centered.
- **Standard Layout:** 2-panel layout for learning screens (content + interaction). Dashboard uses a single-column vertical flow.
- **Whitespace Philosophy:** Generous whitespace is critical. The "Light Mode Universe" feels open and un-cramped.

## Elevation & Depth

Depth is created by **light and blur**, not shadow.

| Level | Treatment | Use |
|---|---|---|
| 0 (Canvas) | No effect. | The base background of the page. |
| 1 (Surface) | `background: {colors.surface}`. | Standard content cards. |
| 2 (Glow) | `box-shadow: 0 0 12px rgba(155, 93, 224, 0.15);` | Soft glow for static cards, avatars. |
| 3 (Active Glow) | `box-shadow: 0 0 20px rgba(78, 86, 192, 0.25);` | Glow for primary buttons and active elements. |
| 4 (Hover Glow) | `box-shadow: 0 0 32px rgba(215, 143, 238, 0.4);` | Intense glow for interactive hover states. |
| 5 (Glass) | `background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(8px);` | Sidebars, notification panels. |

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `{rounded.md}` | 12px | Small elements, tags. |
| `{rounded.lg}` | 16px | Buttons, inputs. |
| `{rounded.xl}` | 24px | Standard cards. |
| `{rounded.xxl}` | 32px | Large panels, hero cards. |
| `{rounded.pill}` | 9999px | Pill-shaped tabs, badges. |
| `{rounded.full}` | 50% | Avatars, circular progress bars. |

## Iconography

The system uses **Lucide Icons** for their clean, modern, and friendly appearance, which aligns perfectly with the DiveVerse brand.

### Principles
1. **Purposeful:** Icons clarify actions (`play`), indicate status (`check-circle`), or anchor navigation (`layout-dashboard`). Avoid purely decorative icons.
2. **Consistent Style:** Stroke weight is `2px`, with rounded linecaps and joins. Size is `20px` for UI, `16px` for small contexts, and up to `48px` for display.
3. **Color:** Icons must use `currentColor` to inherit text color.

### Specific Assignments
- **Navigation:** `home` (Dashboard), `rocket` (Learning Path), `award` (Exams), `book-open` (Dictionary).
- **Gamification:** `flame` (Streak), `star` (Achievements), `check-circle` (Completion).
- **Learning:** `headphones` (Listening), `mic` (Speaking), `sparkles` (AI Feedback).
- **System:** `x` (Close), `arrow-left/right` (Back/Next), `more-horizontal` (Options).

## Components

### Top Navigation
- **`top-nav`**: Pinned to the top, 64px tall. Uses the `{elevation.glass}` style (`backdrop-filter: blur(8px)` over a `rgba(255, 255, 255, 0.7)` background). Contains logo, main links, and user avatar. Active links are highlighted with `{colors.primary}`.

### Buttons
- **`button-primary`**: Background `{colors.primary}`, text `white`, type `{typography.button}`, padding 12px × 24px, rounded `{rounded.lg}`. Has a `{elevation.active-glow}` by default, which intensifies to `{elevation.hover-glow}` on hover.
- **`button-secondary`**: White background, text `{colors.primary}`, with a 1px border of `rgba(78, 86, 192, 0.2)`.

### Cards & Containers
- **`hero-card`**: The main "Continue Learning" card on the dashboard. Rounded `{rounded.xxl}`, with a subtle `Atmosphere Haze` gradient. Contains the primary CTA.
- **`lesson-card`**: Standard card for lessons in the learning path. Background `{colors.surface}`, rounded `{rounded.xl}`, with a `{elevation.glow}`.
- **`modal-container`**: Used for popups (e.g., congratulations). Features a dark overlay (`{colors.dark-floor}` at 50% opacity) and a `{elevation.glass}` panel for the modal content itself.

### Inputs
- **`text-input`**: Background `{colors.surface}`, text `{colors.text-primary}`, rounded `{rounded.lg}`, with a 1px border of `rgba(155, 93, 224, 0.2)`. On focus, the border color changes to `{colors.primary}`.

## Do's and Don'ts

### Do
- Use glows for elevation.
- Embrace large border radii for a soft, friendly feel.
- Use generous whitespace to create an open, airy layout.
- Apply gradients subtly on banners and progress indicators.
- Keep the Mascot's appearance consistent as defined in the Master Guidelines.

### Don't
- **Do not use black drop-shadows.** This is the most critical rule.
- Do not use sharp corners (less than 12px radius).
- Do not use busy, complex background patterns. Stick to sparse stars and orbits.
- Do not use colors other than those defined in the palette.
- Do not make the UI feel cramped or dense.

## Iteration Guide
1. Always start with the defined tokens (`{colors...}`, `{rounded...}`, etc.). Do not use inline hex codes or pixel values.
2. When creating a new component, map its states (default, hover, active) to the appropriate elevation levels (Glow, Active Glow, Hover Glow).
3. Ensure all interactive elements have a minimum touch target of 44x44px.
4. Reference the `MASTER_UI_UX_GUIDELINES.md` for higher-level UX principles (like the 2-panel layout or the 3-click rule).
