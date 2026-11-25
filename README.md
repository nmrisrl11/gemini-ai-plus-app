# Gemini AI Plus Portal — Landing Page

Official landing page for **[Gemini AI Plus Portal](https://github.com/nmrisrl11/gemini-ai-plus-portal)**, an independent, open-source Windows desktop utility that automates 12-month Google AI Plus onboarding and extracts canonical Google One offer links 100% locally.

## Highlights

- **Midnight Sapphire Dark Theme**: Dark-only obsidian palette (`#090c12`) paired with a WebGL2 `Grainient` shader background and self-hosted `Geist` + `Geist Mono` typography.
- **Interactive Desktop Preview**: Live in-browser simulation of the CustomTkinter desktop app—profile randomization, browser selector, 3-step stepper, simulated 6-digit OTP prompt, canonical offer link extraction, and live activity console.
- **Architecture & Workflow**: Sticky 4-step pipeline cards, asymmetric Bento architecture grid (5-tier Chromium discovery cascade, Nuitka native build, `F12` diagnostics, CDP recovery, zero telemetry), tabbed Quick Start (`Portable .exe`, `From Source`, `Headless CLI`), and accessible `<details>` FAQ.
- **Tactile Craft**: Custom `--ease-out` (`cubic-bezier(0.23, 1, 0.32, 1)`) motion tokens, press feedback (`scale(0.97)`), pointer-gated hover transforms, and `prefers-reduced-motion` compliance.

## Tech Stack

- **Framework**: React 19 + TypeScript + Vite 8
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`) + shadcn/ui (`radix-nova`)
- **Fonts**: `@fontsource-variable/geist` & `@fontsource-variable/geist-mono`
- **Linting & Formatting**: Oxlint, Oxfmt, and `tailwind-lint`

## Project Structure

```text
├── public/
│   ├── favicon.ico
│   ├── site.webmanifest
│   └── images/                  # Official app icons, OG preview, and support QR codes
└── src/
    ├── App.tsx                  # Page layout, skip link, and 404 route fallback
    ├── index.css                # Sapphire dark palette, easing curves, and motion utilities
    ├── constants/
    │   ├── app-info.ts          # Repository, release, and brand metadata
    │   └── landing-data.ts      # Structured copy for sections, demo profiles, and FAQs
    └── components/
        ├── icons.tsx            # GitHub and Windows SVG marks
        ├── ui/
        │   └── grainient.tsx    # Interactive WebGL2 shader canvas
        └── landing/
            ├── floating-navbar.tsx
            ├── hero-section.tsx
            ├── preview-section.tsx
            ├── workflow-section.tsx
            ├── features-section.tsx
            ├── install-section.tsx
            ├── faq-section.tsx
            ├── support-section.tsx
            ├── download-section.tsx
            ├── footer.tsx
            └── not-found-page.tsx
```

## Development

```bash
npm install
npm run dev
```

### Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Start Vite development server |
| `npm run build` | Run `oxlint --deny-warnings`, `tsc -b`, and `vite build` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run Oxlint across `src/` |
| `npm run lint:tailwind` | Validate canonical Tailwind CSS classes |
| `npm run format` | Format repository files with Oxfmt |
| `npm run format:check` | Check formatting without writing |

## Disclaimer

This repository hosts the landing page for an independent open-source project and is not affiliated with, sponsored by, or endorsed by Google LLC, Alphabet Inc., or Internshala.
