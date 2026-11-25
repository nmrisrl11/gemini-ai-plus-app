# Google AI Plus Portal — Landing Page

Landing page for **[Google AI Plus Portal](https://github.com/nmrisrl11/gemini-ai-plus-portal)**, an independent, open-source Windows desktop utility that automates 12-month Google AI Plus onboarding and resolves your direct Google One offer link 100% locally.

## Highlights

- **Midnight Sapphire Dark Theme**: Dark-only obsidian palette (`#090c12`) paired with WebGL2 `GradientASCII` (`horizon` hero and `rise` closing CTA) backdrops, scroll-driven `Preview the App` cue, and self-hosted `Geist` + `Geist Mono` typography.
- **Interactive Desktop Preview**: Phishing-safe, read-only UI simulation of the CustomTkinter desktop app—profile randomization, expandable `Customize` view, shadcn `Select` browser picker, 3-step stepper, one-click confirmation pause, canonical link preview, live activity console, `F12` diagnostics preview, and a hairline-divided Google AI Plus spec rail.
- **How It Works & Features**: Lazy-loaded Three.js 3D camera-on-a-rail full-bleed scroll pipeline with 4 monochrome Canvas2D UI cards, an interactive split-spotlight Features showcase (browser detection, local-only privacy, portable Windows download, safe pause & resume), and a topic-filtered exclusive `<details>` FAQ.
- **Zero-Shift Craft**: Custom `--ease-out` (`cubic-bezier(0.23, 1, 0.32, 1)`) motion tokens, zero-layout-shift interactive states, locked control dimensions, and `prefers-reduced-motion` compliance.

## Tech Stack

- **Framework**: React 19 + TypeScript + Vite 8
- **3D & Shaders**: Three.js (lazy-loaded rail scene) + WebGL2 (`GradientASCII`)
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`) + shadcn/ui (`radix-nova`)
- **Fonts**: `@fontsource-variable/geist` & `@fontsource-variable/geist-mono`
- **Linting & Formatting**: Oxlint, Oxfmt, and `tailwind-lint`

## Project Structure

```text
├── vercel.json                  # Security/cache headers, /download redirect, and SPA rewrites
├── public/
│   ├── favicon.ico
│   ├── llms.txt                 # Machine-readable LLM discovery index
│   ├── llms-full.txt            # Complete single-file technical & user guide
│   ├── og-image.png             # 1200x630 Open Graph social preview
│   ├── robots.txt               # Search & AI crawler directives
│   ├── site.webmanifest         # Web app & mobile bookmark manifest
│   ├── sitemap.xml              # Canonical XML sitemap
│   └── icons/                   # Multi-size PNG & WebP app icons (16–512px)
└── src/
    ├── App.tsx                  # Page layout, skip link, and 404 route fallback
    ├── index.css                # Stylesheet entry manifest
    ├── styles/
    │   ├── base.css             # Base resets, focus rings, and custom dark scrollbars
    │   ├── interactions.css     # Zero-shift transitions, popovers, FAQ accordion, and surfaces
    │   ├── scroll-animations.css # CSS scroll-driven section fade-in/out animations
    │   └── theme.css            # Midnight Sapphire palette, Tailwind tokens, and shadows
    ├── constants/
    │   ├── app-info.ts          # Repository, release, and brand metadata
    │   └── landing-data.ts      # Structured copy for sections, demo profiles, and FAQs
    └── components/
        ├── icons.tsx            # GitHub SVG mark
        ├── download/
        │   └── download-section.tsx
        ├── faq/
        │   └── faq-section.tsx
        ├── features/
        │   ├── feature-stage.tsx
        │   └── features-section.tsx
        ├── hero/
        │   ├── hero-scroll-cue.tsx
        │   └── hero-section.tsx
        ├── how-it-works/
        │   ├── draw-step-card.ts
        │   ├── how-it-works-section.tsx
        │   ├── rail-scene-canvas.tsx
        │   ├── step-caption-overlay.tsx
        │   └── step-progress-rail.tsx
        ├── layout/
        │   ├── floating-navbar.tsx
        │   ├── footer.tsx
        │   └── not-found-page.tsx
        ├── preview/
        │   ├── plan-benefits-rail.tsx
        │   ├── preview-banners.tsx
        │   ├── preview-console.tsx
        │   ├── preview-profile-card.tsx
        │   ├── preview-section.tsx
        │   ├── preview-stepper.tsx
        │   └── use-preview-simulation.ts
        └── ui/
            ├── gradient-ascii.tsx
            └── select.tsx
```

## Development

```bash
npm install
npm run dev
```

### Scripts

| Command                 | Description                                              |
| :---------------------- | :------------------------------------------------------- |
| `npm run dev`           | Start Vite development server                            |
| `npm run build`         | Run `oxlint --deny-warnings`, `tsc -b`, and `vite build` |
| `npm run preview`       | Preview the production build locally                     |
| `npm run lint`          | Run Oxlint across `src/`                                 |
| `npm run lint:tailwind` | Validate canonical Tailwind CSS classes                  |
| `npm run format`        | Format repository files with Oxfmt                       |
| `npm run format:check`  | Check formatting without writing                         |

## Support Development

If this project saved you time, you can support ongoing open-source maintenance:

- **Buy Me a Coffee**: [buymeacoffee.com/nmrisrl11](https://buymeacoffee.com/nmrisrl11)
- **GitHub**: Star [gemini-ai-plus-portal](https://github.com/nmrisrl11/gemini-ai-plus-portal) or join [Community Discussions](https://github.com/nmrisrl11/gemini-ai-plus-portal/discussions)
- **Developer**: [nmrisrl.dev](https://www.nmrisrl.dev)

## Disclaimer

This repository hosts the landing page for an independent open-source project and is not affiliated with, sponsored by, or endorsed by Google LLC, Alphabet Inc., or Internshala.

## License

This repository is licensed under the [MIT License](LICENSE).
