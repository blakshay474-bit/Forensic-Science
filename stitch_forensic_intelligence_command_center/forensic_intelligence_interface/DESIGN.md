---
name: Forensic Intelligence Interface
colors:
  surface: '#101419'
  surface-dim: '#101419'
  surface-bright: '#36393f'
  surface-container-lowest: '#0a0e13'
  surface-container-low: '#181c21'
  surface-container: '#1c2025'
  surface-container-high: '#262a30'
  surface-container-highest: '#31353b'
  on-surface: '#e0e2ea'
  on-surface-variant: '#d2c5b2'
  inverse-surface: '#e0e2ea'
  inverse-on-surface: '#2d3136'
  outline: '#9b8f7e'
  outline-variant: '#4e4637'
  surface-tint: '#f0bf64'
  primary: '#f4c367'
  on-primary: '#412d00'
  primary-container: '#d6a84f'
  on-primary-container: '#583e00'
  inverse-primary: '#7c5800'
  secondary: '#96ccff'
  on-secondary: '#003353'
  secondary-container: '#005281'
  on-secondary-container: '#8cc4fa'
  tertiary: '#00dff6'
  on-tertiary: '#00363d'
  tertiary-container: '#00c1d5'
  on-tertiary-container: '#004a52'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdea6'
  primary-fixed-dim: '#f0bf64'
  on-primary-fixed: '#271900'
  on-primary-fixed-variant: '#5e4200'
  secondary-fixed: '#cee5ff'
  secondary-fixed-dim: '#96ccff'
  on-secondary-fixed: '#001d32'
  on-secondary-fixed-variant: '#004a76'
  tertiary-fixed: '#97f0ff'
  tertiary-fixed-dim: '#00daf1'
  on-tertiary-fixed: '#001f24'
  on-tertiary-fixed-variant: '#004f58'
  background: '#101419'
  on-background: '#e0e2ea'
  surface-variant: '#31353b'
  surface-deep: '#07090C'
  surface-elevated: '#10151C'
  amber-glow: '#F0C76A'
  scientific-ice: '#8BC6FF'
  critical-red: '#E53935'
  evidence-green: '#43A047'
  slate-muted: '#546E7A'
typography:
  display-lg:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Sora
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
  body-lg:
    fontFamily: IBM Plex Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: IBM Plex Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  data-mono:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.1em
spacing:
  unit: 8px
  gutter: 24px
  margin-edge: 40px
  container-max: 1440px
---

## Brand & Style

This design system establishes a high-fidelity "Command Center" aesthetic tailored for elite forensic investigators. The visual narrative is built on **Scientific Precision** and **Cinematic Institutionalism**, evoking the atmosphere of a high-stakes intelligence lab. 

The style utilizes a **Modern-Technical** approach:
- **Cinematic Depth:** Deep charcoal foundations with high-contrast amber highlights create a focused, low-light environment conducive to long-form digital investigation.
- **Instrumental Clarity:** UI elements mimic physical scientific instruments—sharp, calibrated, and deliberate. 
- **Analytical Rigor:** A heavy reliance on monospaced data visualization and "Investigation File" metaphors ensures information is presented with an institutional authority.
- **Micro-Detailing:** Incorporation of "active scanning" indicators, metadata overlays, and 1px technical borders to simulate live data processing.

## Colors

The palette is anchored in a triple-layered dark mode to provide structural hierarchy without traditional shadows. 

- **Foundational Layers:** Use `#07090C` for the base canvas. Use `#0B0F14` for primary containers and `#10151C` for interactive surfaces or headers.
- **Forensic Amber:** Used exclusively for high-priority actions, active states, and critical evidence markers. It represents the "human" element of the investigation.
- **Cold Scientific Blue:** Reserved for data streams, secondary telemetry, and non-critical analytical information.
- **Technical Accents:** The `#00E7FF` from the legacy brand is retained as a "Pulse" color for live connection statuses or high-tech scanning animations.

## Typography

Typography functions as a navigational grid. 
- **Space Grotesk** provides a futuristic, geometric authority for major section headings.
- **Sora** is used for secondary sub-headers to provide a slightly softer, more modern contrast to the harshness of the data.
- **IBM Plex Sans** handles all long-form reading, providing a neutral, legible institutional feel.
- **JetBrains Mono** is the "Forensic Workhorse." It must be used for Case IDs, timestamps, coordinates, and any numeric analytical data. Always use uppercase for technical labels (e.g., "01 / SUBJECT_PROFILE").

## Layout & Spacing

The layout follows a **Strict 8px Grid System**, emphasizing sharp vertical and horizontal alignment to suggest mathematical order.

- **Grid Model:** Use a 12-column fixed grid for desktop (1440px max-width) to maintain large "Investigation Margins" (negative space).
- **Negative Space:** Generous padding is required around technical charts to prevent cognitive overload.
- **Mobile Reflow:** On mobile, columns collapse to a single stack, but the 8px rhythm remains. Gutters reduce to 16px to maximize data real estate.
- **Modular Blocks:** Content should be organized into "Dossier Modules"—self-contained blocks with distinct 1px borders.

## Elevation & Depth

In this design system, depth is achieved through **Tonal Layering** and **Technical Outlines** rather than traditional shadows.

- **The "No-Shadow" Policy:** Avoid soft drop shadows. Use 1px solid borders in `slate-muted` or low-opacity `secondary-blue` to define edges.
- **Tonal Tiers:** Objects further back in the z-index use the darkest hex (`#07090C`). Interactive or "active" dossiers use the elevated `#10151C`.
- **Glassmorphism (Restricted):** Use backdrop blurs (20px) only for temporary overlays or "HUD" (Heads-Up Display) elements that appear over map data or complex imagery.
- **Scanning Overlays:** Use a subtle, slow-moving horizontal gradient line (0.05 opacity primary amber) over evidence photos to simulate "Live Analysis."

## Shapes

The shape language is **Sharp and Uncompromising**. 

- **Corner Radius:** All primary UI components (buttons, cards, input fields) use a 0px (sharp) radius to maintain a professional, scientific look.
- **Angled Accents:** Use 45-degree "clipped corners" for status tags or specialized technical labels to reinforce the "Futuristic Command Center" aesthetic.
- **Line Weights:** Maintain a consistent 1px weight for all UI borders and decorative "bracket" elements.

## Components

- **Buttons:** Sharp-edged. Primary buttons use the Forensic Amber background with black text. Secondary buttons are transparent with a 1px Blue-Gray border and monospaced text.
- **Investigation Dossiers (Cards):** These replace standard cards. They feature a top-aligned technical label (e.g., "REF_NO: 8829") in `label-caps` and 1px borders.
- **Scientific Charts:** Use hairline strokes (0.5pt to 1pt). Remove all background grid lines; use only X/Y axis markers. Data points should use the `tertiary` pulse color.
- **Input Fields:** Underline-only or 1px border. Focus state is indicated by a "glow" text-shadow on the Forensic Amber label rather than a thick border.
- **Status Indicators:** Use small "LED" circles. A "pulsing" animation on the `evidence-green` indicator signifies live data streaming.
- **Case Folders:** Tabs should mimic physical folder tabs but with sharp, geometric lines.