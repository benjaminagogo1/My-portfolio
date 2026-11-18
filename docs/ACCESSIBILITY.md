# Accessibility implementation

The portfolio includes a discreet **Display and accessibility** button in the header on every page. Its settings panel combines **Appearance** (System, Light, and Dark themes) with larger text, higher contrast, and reduced motion. The default design already supports keyboard navigation, appropriate text contrast, and the operating system's reduced-motion preference; the controls supplement those defaults.

Preferences apply immediately and are saved under `benjamin-portfolio-accessibility` in browser local storage. They also synchronize between tabs. There is no account, cookie, tracking service, or backend required. If browser storage is blocked, changes still work for the current page session and the panel explains that persistence is unavailable. Reset restores the defaults.

## Reading and motion

- Reading typography uses relative `rem` units, including responsive breakpoints, so the larger-text preference and the browser's default font size actually affect content.
- System appearance follows the device's light or dark theme and reacts when that preference changes. Explicit Light and Dark choices override the device theme and persist across reloads and project pages.
- The dark palette covers navigation, content, project diagrams, settings, and footer; higher contrast also supports the dark theme. The genuine project screenshot remains an unchanged source capture.
- Larger text increases the root reading size by 20 percent. Fluid headings continue to respond to the available width.
- Higher contrast strengthens shared text, border, and background tokens, plus selected diagram and section details.
- Reduced motion stops smooth scrolling, decorative transitions, and Motion section movements. An operating-system reduced-motion setting is respected even when the saved preference is off.
- An inline pre-paint script applies validated theme choices and boolean preferences to root data attributes. The root uses a narrowly scoped hydration-warning exemption for these expected user-specific attributes; the rest of the document hydrates normally.

## Keyboard and assistive technology

- The first keyboard link skips directly to the focusable main landmark.
- Navigation, disclosures, project actions, preferences, and native checkboxes support keyboard operation.
- Radix dialogs trap focus, provide labeled titles/descriptions, close with Escape, and return focus to their triggers.
- Disclosure buttons expose `aria-expanded` and `aria-controls`, with buttons inside proper heading elements.
- Settings controls have explicit names and descriptions; unavailable storage is announced through a polite status region.
- Decorative icons are hidden from screen readers. The systems illustration and actual project screenshot retain meaningful descriptions.
- Primary controls and commonly used links have at least 44px target height. Icon-only navigation and accessibility buttons have at least 44 × 44px targets.
- Forced-color preferences retain control boundaries and visible focus.
- Without JavaScript, the content and project pages still render; native section navigation appears on smaller screens and unavailable script-based controls are hidden.

## Verification

The browser suite covers default and saved accessibility preferences, persistence across reloads and project routes, reset, blocked storage, keyboard skip navigation, target dimensions, no-JavaScript navigation, and 320px layouts. Automated axe scans check the main pages and dialogs in both default and larger-text/high-contrast modes.

Automated checks and keyboard verification support the implementation; they are not a claim of certification or a substitute for testing with every assistive technology. Full results and screenshots are recorded in [verification](verification/README.md).
