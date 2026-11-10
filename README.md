# Aakash Puri — Portfolio

Personal portfolio for **Aakash Puri** ([@aakashpuree](https://github.com/aakashpuree)), a full-stack developer from Nepal building fast, expressive products across the stack.

**Live:** [aakashpuree.vercel.app](https://aakashpuree.vercel.app)

---

## Overview

A single-page, editorial-style portfolio built around a black-and-white design system with a `#e2401c` accent, Schibsted Grotesk typography, and a scroll-driven canvas sequence. Data that can be live, is live: GitHub profile stats, contribution heatmap, latest repositories and language mix are fetched from public APIs at runtime with cached fallbacks.

### Highlights

- **Editorial design system** — black, white and `#e2401c`, fluid `clamp()` typography, grain and surface treatments.
- **Custom cursor** — accent arrow with motion rays and contextual labels on pointer-fine devices.
- **Scroll experience** — Lenis smooth scrolling, GSAP intro, reveal-on-scroll sections, scroll progress bar and session-aware preloader.
- **Canvas hero sequence** — 60-frame scroll-linked animation with DPR handling and reduced-motion support.
- **Live GitHub data** — profile totals, contribution heatmap, top languages and recently updated repositories, cached in `sessionStorage` for 30 minutes with bundled fallbacks for offline/rate-limited cases.
- **Working contact form** — Web3Forms submission with inline status states, honeypot spam guard and WhatsApp fallback.
- **Search & sharing identity** — GitHub-photo favicons (ICO/PNG/apple-touch/maskable), a 1200×630 Open Graph card, web manifest, sitemap, robots.txt and rich JSON-LD (`Person`, `ProfilePage`, `WebSite`, `ItemList`, `FAQPage`).
- **Accessible and resilient** — semantic landmarks, skip link, keyboard-friendly navigation, `prefers-reduced-motion` handling, and a no-JavaScript fallback in `index.html`.

### Sections

1. **Hero** — animated introduction with live GitHub stats.
2. **About** — portrait, philosophy and quick facts.
3. **Skills** — toolkit groups plus a live GitHub language footprint.
4. **Work** — six selected projects with filtering, live repo metadata and live/demo links.
5. **Open source** — GitHub totals, contribution heatmap and latest repositories.
6. **Journey** — timeline of roles, milestones and a local-time card.
7. **Contact** — social links, availability card and the Web3Forms contact form.
8. **FAQ** — search-intent answers, name/handle variations and profile links.
9. **Footer** — navigation, socials, wordmark and back-to-top.

---

## Tech Stack

| Layer | Choice |
| --- | --- |
| Framework | React 19 |
| Build tool | Vite 8 |
| Animation | GSAP, Lenis (`@studio-freight/lenis`) |
| Icons | lucide-react, inline brand SVGs |
| Styling | Hand-written CSS with custom properties |
| Typeface | Schibsted Grotesk (Google Fonts) |
| Contact backend | Web3Forms |
| Deployment | Vercel |

---

## Project Structure

```
Portfolio/
├── public/
│   ├── assets/seq/            # 60 hero canvas frames
│   ├── assets/aakash-puri.png # GitHub profile image
│   ├── favicon.ico            # Multi-size icon built from the profile image
│   ├── favicon-*.png          # 16/32/48/192/512 favicons
│   ├── apple-touch-icon.png   # 180×180 Apple touch icon
│   ├── maskable-icon-512x512.png
│   ├── og-image.jpg           # 1200×630 social share card
│   ├── site.webmanifest
│   ├── letter-a.svg           # Safari pinned-tab mark
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── assets/                # Project cover images
│   ├── components/
│   │   ├── Navbar.jsx         # Fixed nav + mobile menu
│   │   ├── Hero.jsx           # Hero + live stats
│   │   ├── About.jsx
│   │   ├── Skills.jsx         # Toolkit + language footprint
│   │   ├── Projects.jsx       # Filterable project grid
│   │   ├── OpenSource.jsx     # GitHub heatmap + latest repos
│   │   ├── Journey.jsx
│   │   ├── Contact.jsx        # Web3Forms contact form
│   │   ├── Faq.jsx            # Search-intent FAQ + name variations
│   │   ├── Footer.jsx
│   │   ├── CanvasSequence.jsx # Scroll-linked canvas
│   │   ├── CustomCursor.jsx
│   │   ├── Preloader.jsx
│   │   └── …                  # Reveal, CountUp, BrandIcons, etc.
│   ├── data/site.js           # Site config, socials, projects, fallbacks
│   ├── hooks/useGitHub.js     # GitHub + contributions fetching/caching
│   ├── lib/                   # Scroll and formatting helpers
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css              # Design system and all styles
├── .env.example
├── index.html                 # SEO, OpenGraph, icons, JSON-LD
├── vercel.json                # Security and asset cache headers
└── vite.config.js
```

---

## Getting Started

Requirements: **Node.js 18+** and **npm**.

```bash
npm install
npm run dev        # start the dev server (http://localhost:5173)
npm run build      # production build → dist/
npm run preview    # preview the production build
npm run lint       # ESLint
```

### Environment

The contact form works out of the box with the bundled Web3Forms access key. To use your own, copy `.env.example` to `.env` and set:

```bash
VITE_WEB3FORMS_KEY=your-web3forms-access-key
```

### Live data

- Profile, repositories and star totals: `https://api.github.com/users/aakashpuree`
- Contributions: `https://github-contributions-api.jogruber.de/v4/aakashpuree`
- Responses are cached in `sessionStorage` for 30 minutes; bundled fallbacks in `src/data/site.js` cover failures.
- To point the site at another account, update `USERNAME` in `src/hooks/useGitHub.js` and the `githubFallback` data.

---

## Customization

- **Content** — names, socials, projects, skills and timeline live in `src/data/site.js`.
- **Theme** — colors, spacing, radii and typography tokens are CSS custom properties at the top of `src/index.css`.
- **Covers** — projects without a photo generate a consistent typographic cover; drop images into `src/assets/` and reference them in `site.js` to override.
- **Hero canvas** — replace the frames in `public/assets/seq/` (keep the `ezgif-frame-###.jpg` naming) and update the frame count in `CanvasSequence.jsx` if needed.
- **SEO** — update the canonical URL, OpenGraph tags and JSON-LD in `index.html`, plus `robots.txt`/`sitemap.xml`, if the domain changes.
- **Icons & share card** — all favicons are generated from the GitHub profile image. Replace `public/favicon*`, `public/apple-touch-icon.png`, `public/maskable-icon-512x512.png` and `public/og-image.jpg` together if the portrait changes.

### SEO after deploying

1. Confirm the production URL matches the canonical URL in `index.html`.
2. Submit `https://aakashpuree.vercel.app/sitemap.xml` in Google Search Console and Bing Webmaster Tools.
3. Request indexing for the homepage. The existing `google-site-verification` meta tag is already in `index.html`.
4. Re-test the share card with the Facebook Sharing Debugger and LinkedIn Post Inspector; both cache aggressively after a change.

---

## Deployment

The site builds to static files and deploys as-is on Vercel (or any static host). For Vercel:

1. Import the repository.
2. Framework preset: **Vite**; build command `npm run build`; output directory `dist`.
3. Optionally add `VITE_WEB3FORMS_KEY` under project environment variables.

---

## Contact

- GitHub: [github.com/aakashpuree](https://github.com/aakashpuree)
- LinkedIn: [linkedin.com/in/aakashpuree](https://www.linkedin.com/in/aakashpuree/)
- Instagram: [instagram.com/aakashpuree](https://www.instagram.com/aakashpuree/)
- WhatsApp: [wa.me/9779748848620](https://wa.me/9779748848620)
- Or use the contact form on the site.

---

## License

Open source for learning and reference. Please credit the original if you reuse significant portions.
