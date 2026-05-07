# Apex Web Agency — Next.js App

Premium agency website built with **Next.js 14** (App Router), TypeScript, and CSS Modules.

## Stack

| Layer      | Tech                                   |
|------------|----------------------------------------|
| Framework  | Next.js 14 (App Router)                |
| Language   | TypeScript                             |
| Styling    | Global CSS (no Tailwind needed)        |
| Fonts      | next/font/google — zero layout shift   |
| Images     | next/image — automatic optimisation    |
| API        | Next.js Route Handler (`/api/contact`) |
| Deploy     | Vercel (zero config)                   |

## Project Structure

```
apex-web-agency/
├── public/
│   └── eagle.png              # Logo (replace with your asset)
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout, fonts, metadata
│   │   ├── page.tsx           # Home page — composes all sections
│   │   ├── globals.css        # All styles (1900+ lines)
│   │   └── api/contact/
│   │       └── route.ts       # POST /api/contact — form handler
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx     # Fixed nav, scroll spy, hamburger
│   │   │   └── Footer.tsx     # Links, social icons, year
│   │   ├── sections/
│   │   │   ├── Hero.tsx       # Headline, stats, parallax eagle
│   │   │   ├── Marquee.tsx    # Infinite scrolling strip
│   │   │   ├── Services.tsx   # 3 cards with spotlight hover
│   │   │   ├── Portfolio.tsx  # Filterable grid with FLIP anim
│   │   │   ├── Pricing.tsx    # 3-tier cards
│   │   │   ├── About.tsx      # Eagle + pulsing rings
│   │   │   ├── Testimonials.tsx # Auto carousel + swipe
│   │   │   └── Contact.tsx    # Form → /api/contact
│   │   └── ui/
│   │       ├── Loader.tsx     # Gold progress bar intro
│   │       ├── Cursor.tsx     # Custom cursor + click ripple
│   │       ├── ParticleCanvas.tsx # Floating gold dust
│   │       ├── BackToTop.tsx  # Back-to-top + ReadProgress + Noise
│   │       ├── ReadProgress.tsx
│   │       └── NoiseOverlay.tsx
│   ├── data/
│   │   └── site.ts            # ALL copy in one file — edit here
│   └── hooks/
│       ├── useScrollReveal.ts # IntersectionObserver reveal
│       ├── useCounter.ts      # Animated number counter
│       └── useMagnetic.ts     # Magnetic button effect
├── next.config.js
├── tsconfig.json
└── package.json
```

## Quick Start

```bash
# 1. Install
npm install

# 2. Dev server
npm run dev
# → http://localhost:3000

# 3. Build for production
npm run build
npm start
```

## Deploy to Vercel (recommended)

```bash
npm i -g vercel
vercel
```

Or push to GitHub and import at **vercel.com/new** — zero configuration needed.

## Deploy to Netlify

```bash
npm run build
# Upload the `.next` folder, or connect your GitHub repo
# Set build command: npm run build
# Set output directory: .next
```

## Adding Real Email (Contact Form)

Open `src/app/api/contact/route.ts` and replace the simulation block with your provider:

### Option A — Resend (recommended)
```bash
npm install resend
```
```ts
import { Resend } from 'resend'
const resend = new Resend(process.env.RESEND_API_KEY)
await resend.emails.send({
  from: 'noreply@apexwebagency.com',
  to:   'hello@apexwebagency.com',
  subject: `New enquiry from ${body.name}`,
  text: JSON.stringify(body, null, 2),
})
```

### Option B — SendGrid
```bash
npm install @sendgrid/mail
```

### Environment Variables
Create `.env.local` (never commit this):
```
RESEND_API_KEY=re_...
```

## Updating Content

All site copy lives in `src/data/site.ts`:
- Add/remove services → `SERVICES`
- Add portfolio projects → `PORTFOLIO_ITEMS`
- Change pricing → `PRICING_PLANS`
- Update testimonials → `TESTIMONIALS`

## Replacing the Logo

Drop your image into `public/eagle.png` (or any name) and update the `src` prop in `Navbar.tsx`, `Footer.tsx`, `Hero.tsx`, `About.tsx`, and `Loader.tsx`.
