# PostX Website 2026 — Architecture & Design System (`design.md`)

Use this document as a blueprint to set up a new repository with the exact stack, design tokens, layout shell, routing pattern, component architecture, and build conventions of `postx-website-2026`.

---

## 1. Tech Stack & Dependencies

| Layer | Package / Tool | Version | Notes |
| --- | --- | --- | --- |
| Framework | `vue` | `^3.5.44` | Composition API (`<script setup>`) |
| Bundler | `vite` | `^8.3.6` | `@vitejs/plugin-vue` (`^6.0.10`) |
| Styling | `tailwindcss` + `@tailwindcss/vite` | `^4.3.4` | Tailwind v4 CSS-first `@theme` config |
| Typography | `@fontsource/poppins` | `^5.3.0` | Self-hosted weights `100`–`900` |
| Module Type | ESM | `"type": "module"` | Node scripts use `node:fs` / `node:path` |

### `package.json` Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "prebuild": "node scripts/bump-version.js",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

### `vite.config.js` Invariants

- Plugins: `vue()`, `tailwindcss()`.
- Both `server.port` and `preview.port` are pinned to **`3000`**.
- `npm run build` automatically triggers `scripts/bump-version.js` via `prebuild`, incrementing the patch version in `package.json`.

---

## 2. Directory Structure

```text
├── index.html
├── package.json
├── vite.config.js
├── scripts/
│   └── bump-version.js                 # Auto patch-version increment on build
└── src/
    ├── main.js                         # Imports @fontsource/poppins (100–900) + style.css
    ├── style.css                       # Tailwind v4 @theme, base typography, .btn variants
    ├── App.vue                         # Viewport wrapper, hash router, Header / main / Footer
    ├── composables/
    │   └── useDevicePreview.js         # Local-only device simulation state (auto/desktop/tablet/mobile)
    ├── pages/
    │   ├── HomePage.vue                # Main landing page
    │   ├── UnifiedInboxPage.vue        # #unified-inbox (ComingSoon)
    │   ├── PostingPage.vue             # #posting (ComingSoon)
    │   ├── FramesPage.vue              # #frames (ComingSoon)
    │   ├── ReviewsPage.vue             # #reviews (ComingSoon)
    │   └── LiveChatAIPage.vue          # #livechat-ai (ComingSoon)
    ├── components/
    │   ├── banner/HeroBanner.vue
    │   ├── brand-logos/BrandLogos.vue
    │   ├── carousel/
    │   │   ├── GradientCarousel.vue
    │   │   ├── CarouselImage.vue
    │   │   ├── CarouselIcons.vue
    │   │   └── DefaultCarousel.vue
    │   ├── common/ComingSoon.vue
    │   ├── cta/
    │   │   ├── BodyCTA.vue
    │   │   └── FooterCTA.vue
    │   ├── faq/FAQ.vue
    │   ├── features/FutureFeature.vue
    │   ├── footer/Footer.vue
    │   ├── header/Header.vue
    │   └── services/IconServices.vue
    └── images/
        ├── brand-logos/                # OEM brand logos (.webp)
        └── ...                         # Page illustrations, mockups, SVG icons
```

---

## 3. Design System & Tokens (`src/style.css`)

### Brand Colors

```css
@theme {
  --font-sans: "Poppins", ui-sans-serif, system-ui, sans-serif;
  --font-poppins: "Poppins", ui-sans-serif, system-ui, sans-serif;

  --color-primary: #00A5C5;
  --color-secondary: #2C8799;
}

:root {
  --primary: #00A5C5;
  --secondary: #2C8799;
}
```

### Base Typography & Section Rhythm

- **Font**: `Poppins` (loaded locally in `src/main.js` across weights `100` to `900`), antialiased.
- **`h1`**: `font-weight: 500`, `20px` on mobile, `48px` at `min-width: 768px` (and overridden back to `20px` inside `[data-device="mobile"]`).
- **`p`**: `font-weight: 400`, `#000000`, `14px` on mobile, `16px` at `min-width: 768px` (overridden back to `14px` inside `[data-device="mobile"]`).
- **`section`**:
  - `margin-block: 30px;`
  - `scroll-margin-top: 136px;` (clears the floating pill navbar when jumping to anchor links).

### Button System (`.btn` + Variant)

All buttons use `.btn` combined with a variant class:

- **Base (`.btn`)**:
  - `font-family: "Poppins", sans-serif`, `font-size: 14px`, `font-weight: 500`, `line-height: 1`
  - `border-radius: 9999px` (pill)
  - Mobile padding: `16px 40px` (also enforced under `[data-device="mobile"] .btn`)
  - Desktop padding (`min-width: 768px`): `16px 24px`
- **Variants**:
  - `.btn-primary`: `#000000` bg, `#ffffff` text → hover `#00A5C5` (`--primary`) bg, `#ffffff` text.
  - `.btn-secondary`: `#00A5C5` (`--primary`) bg, `#ffffff` text → hover `#2C8799` (`--secondary`) bg, `#ffffff` text.
  - `.btn-primary-outline`: `transparent` bg, `#000000` text, `1.5px solid #000000` → hover `#000000` bg, `#ffffff` text.
  - `.btn-tertiary`: `var(--primary)` bg, `#ffffff` text, `1px solid rgba(0, 0, 0, 0.08)`, `box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08)` → hover `#f1f5f9` bg, `#000000` text.

---

## 4. Layout Shell & Local Device Preview

### Application Shell (`src/App.vue`)

`App.vue` wraps the entire site (`Header`, `<main>`, `Footer`) inside a single viewport container bound to `activeDevice` (`:data-device="activeDevice"`):

- `auto` / `desktop` / `tablet`: `w-full min-h-screen` on a white background.
- `mobile`: `w-[390px] max-w-full shadow-2xl rounded-[36px] overflow-x-clip border-8 border-neutral-900 my-6 min-h-[844px]` centered on `bg-neutral-200 py-6`.

### Local-Only Device Preview (`src/composables/useDevicePreview.js`)

- Exposes `activeDevice` (`'auto' | 'desktop' | 'tablet' | 'mobile'`), `setDevice(mode)`, and `isLocal`.
- `isLocal` is `true` only when `import.meta.env.DEV` is true or `window.location.hostname` is `localhost`, `127.0.0.1`, or ends with `.local`.
- `Header.vue` renders the device switcher only when `isLocal` is `true`, keeping production builds clean.

### Header (`src/components/header/Header.vue`)

- Floating black capsule navbar (`max-w-[1600px]`, `h-16 md:h-20 lg:h-24`, `rounded-full bg-black border border-white/10 shadow-2xl`).
- Links (`text-neutral-300`), `md` desktop/mobile breakpoint, dropdown support for **Services** (`Unified inbox`, `Posting`, `Frames`, `Reviews`, `LiveChat AI`), **Blogs** (`#blogs`), **About** (`#about`), and primary CTA (`#contact`).

---

## 5. Routing & Page Architecture

### Hash-Based Page Switching (`src/App.vue`)

Instead of `vue-router`, `App.vue` maps `window.location.hash` via `pageMap`:

| Hash | Component | Status |
| --- | --- | --- |
| `(default)` / `#` / unknown | `HomePage.vue` | Active landing page |
| `#unified-inbox` | `UnifiedInboxPage.vue` | `ComingSoon` wrapper |
| `#posting` | `PostingPage.vue` | `ComingSoon` wrapper |
| `#frames` | `FramesPage.vue` | `ComingSoon` wrapper |
| `#reviews` | `ReviewsPage.vue` | `ComingSoon` wrapper |
| `#livechat-ai` | `LiveChatAIPage.vue` | `ComingSoon` wrapper |

`hashchange` updates `currentHash` and smoothly scrolls to the top when navigating to a mapped sub-page.

### `HomePage.vue` Section Sequence

1. `HeroBanner` — Main hero banner (desktop/mobile art direction)
2. Proprietary / Intro sections — Brand positioning & value proposition
3. `BrandLogos` — Automotive & OEM partner logo strip
4. `GradientCarousel` — Core pillars carousel with icon slot
5. `CarouselImage` — "Create, approve and publish content without the back-and-forth" horizontal card track (`trackRef` uses `relative`, `isProgrammaticScroll` guard against counter flicker, and explicit `index === 0 ? 0` scroll reset)
6. `BodyCTA` — Mid-page call to action
7. Mobile app & AI assistant sections + `CarouselIcons`
8. Automated customer journey section + `DefaultCarousel` (`leadCaptureSlides`)
9. `IconServices` — Service highlights
10. Trust / proprietary ownership section
11. `FutureFeature` — Upcoming capability spotlight
12. `FAQ` — Accordion FAQ section (Poppins Medium questions)
13. `FooterCTA` — Closing conversion carousel/CTA before `Footer`

---

## 6. Bootstrapping a New Repository

1. **Initialize project**:
   ```bash
   npm create vite@latest my-postx-site -- --template vue
   cd my-postx-site
   npm install
   npm install tailwindcss @tailwindcss/vite @fontsource/poppins
   ```
2. **Configure `vite.config.js`**: Add `tailwindcss()` plugin and pin `server.port` and `preview.port` to `3000`.
3. **Add `scripts/bump-version.js`**: Wire `"prebuild": "node scripts/bump-version.js"` into `package.json`.
4. **Set up `src/main.js` & `src/style.css`**: Import `@fontsource/poppins/100.css` through `900.css`, define `@theme` brand tokens (`#00A5C5`, `#2C8799`), base `h1`/`p`/`section` rules, and `.btn` component classes.
5. **Implement the Shell**: Copy `src/composables/useDevicePreview.js`, `src/App.vue`, `src/components/header/Header.vue`, `src/components/footer/Footer.vue`, and `src/components/common/ComingSoon.vue`.
6. **Build Pages & Sections**: Add `HomePage.vue` and sub-pages (`UnifiedInboxPage.vue`, `PostingPage.vue`, `FramesPage.vue`, `ReviewsPage.vue`, `LiveChatAIPage.vue`), along with the `carousel/`, `cta/`, `faq/`, `features/`, `services/`, `banner/`, and `brand-logos/` components and `src/images/` assets.
7. **Verify**:
   ```bash
   npm run dev     # Serves on http://localhost:3000 with local device preview enabled
   npm run build   # Bumps patch version and outputs production bundle
   ```
