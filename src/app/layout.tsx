import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Barlow, Barlow_Condensed } from 'next/font/google'
import './globals.css'

/* ─── Fonts ──────────────────────────────────────────────── */
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display-var',
  display: 'swap',
})

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body-var',
  display: 'swap',
})

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-ui-var',
  display: 'swap',
})

/* ─── Metadata ───────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL('https://apexwebagency.com'),
  title: {
    default: 'Apex Web Agency | Premium Web Services',
    template: '%s | Apex Web Agency',
  },
  description:
    'Apex Web Agency — Premium website design, development, and redesign services for global clients. Elevate your digital presence.',
  keywords: [
    'web design', 'web development', 'website redesign',
    'global agency', 'premium websites', 'UI/UX design',
  ],
  authors: [{ name: 'Apex Web Agency' }],
  creator: 'Apex Web Agency',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://apexwebagency.com',
    siteName: 'Apex Web Agency',
    title: 'Apex Web Agency | Premium Web Services',
    description: 'We craft elite digital experiences for ambitious brands worldwide.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apex Web Agency | Premium Web Services',
    description: 'We craft elite digital experiences for ambitious brands worldwide.',
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#080808',
}

/* ─── Layout ─────────────────────────────────────────────── */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${barlow.variable} ${barlowCondensed.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
