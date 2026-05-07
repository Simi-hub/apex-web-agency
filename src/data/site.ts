/* ================================================================
   data/site.ts — All copy in one place. Edit here, updates everywhere.
================================================================ */

export const NAV_LINKS = [
  { href: '#services',  label: 'Services',  num: '01' },
  { href: '#portfolio', label: 'Portfolio', num: '02' },
  { href: '#pricing',   label: 'Pricing',   num: '03' },
  { href: '#about',     label: 'About',     num: '04' },
]

export const SERVICES = [
  {
    num: '01',
    title: 'Website Design',
    desc: 'Pixel-perfect, bespoke designs tailored to your brand identity. We craft immersive visual experiences that leave a lasting impression.',
    features: ['Custom UI/UX Design', 'Brand-aligned Aesthetics', 'Mobile-First Approach', 'Figma Prototyping'],
    featured: false,
  },
  {
    num: '02',
    title: 'Website Development',
    desc: 'Rock-solid, high-performance websites engineered for scale. Built with modern stacks — fast, secure, and ready for global traffic.',
    features: ['React / Next.js / Vue', 'CMS Integration', 'E-commerce Solutions', 'API & Backend Development'],
    featured: true,
  },
  {
    num: '03',
    title: 'Redesign & Upgrade',
    desc: 'Transform your outdated website into a conversion machine. We analyze, strategize, and rebuild your digital presence to dominate.',
    features: ['Full Site Audit', 'Performance Optimization', 'Modernized UI/UX', 'SEO Enhancement'],
    featured: false,
  },
]

export type PortfolioCategory = 'all' | 'design' | 'development' | 'redesign'

export const PORTFOLIO_ITEMS = [
  {
    id: 1,
    label: 'AURELIA',
    title: 'Aurelia Luxury Brand',
    tag: 'Design',
    category: 'design' as PortfolioCategory,
    client: 'Dubai, UAE',
    accentColor: '#c9a227',
    bgColor: '#1a1500',
    wide: false,
  },
  {
    id: 2,
    label: 'NEXUS',
    title: 'Nexus Commerce Platform',
    tag: 'Development',
    category: 'development' as PortfolioCategory,
    client: 'London, UK',
    accentColor: '#7a7a8a',
    bgColor: '#0d0d14',
    wide: false,
  },
  {
    id: 3,
    label: 'MERIDIAN',
    title: 'Meridian Banking Group',
    tag: 'Redesign',
    category: 'redesign' as PortfolioCategory,
    client: 'New York, USA',
    accentColor: '#c9a227',
    bgColor: '#0f0e00',
    wide: true,
  },
  {
    id: 4,
    label: 'SOLARIS',
    title: 'Solaris Tech Startup',
    tag: 'Development',
    category: 'development' as PortfolioCategory,
    client: 'Singapore',
    accentColor: '#aaaabc',
    bgColor: '#0a0a10',
    wide: false,
  },
  {
    id: 5,
    label: 'CELESTE',
    title: 'Celeste Fashion House',
    tag: 'Design',
    category: 'design' as PortfolioCategory,
    client: 'Paris, France',
    accentColor: '#c9a227',
    bgColor: '#150e00',
    wide: false,
  },
]

export const PRICING_PLANS = [
  {
    tier: 'Starter',
    price: '1,500',
    tagline: 'Perfect for small businesses & personal brands',
    features: [
      { text: 'Up to 5 Pages',      available: true },
      { text: 'Custom Design',       available: true },
      { text: 'Mobile Responsive',   available: true },
      { text: 'Contact Form',        available: true },
      { text: 'Basic SEO Setup',     available: true },
      { text: '2 Revision Rounds',   available: true },
      { text: 'E-Commerce',          available: false },
      { text: 'CMS Integration',     available: false },
    ],
    cta: 'Get Started',
    featured: false,
  },
  {
    tier: 'Professional',
    price: '4,500',
    tagline: 'For growing businesses that demand excellence',
    features: [
      { text: 'Up to 15 Pages',           available: true },
      { text: 'Bespoke UI/UX Design',      available: true },
      { text: 'Mobile + Tablet Responsive',available: true },
      { text: 'CMS Integration',           available: true },
      { text: 'Advanced SEO',              available: true },
      { text: '5 Revision Rounds',         available: true },
      { text: 'E-Commerce Ready',          available: true },
      { text: 'Performance Optimization',  available: true },
    ],
    cta: 'Get Started',
    featured: true,
  },
  {
    tier: 'Enterprise',
    price: null, // custom
    tagline: 'Full-scale solutions for global brands',
    features: [
      { text: 'Unlimited Pages',          available: true },
      { text: 'Full Brand Identity',       available: true },
      { text: 'Custom Web Application',    available: true },
      { text: 'API Development',           available: true },
      { text: 'Enterprise SEO Strategy',   available: true },
      { text: 'Unlimited Revisions',       available: true },
      { text: 'Full E-Commerce Suite',     available: true },
      { text: 'Dedicated Account Manager', available: true },
    ],
    cta: 'Request Quote',
    featured: false,
  },
]

export const TESTIMONIALS = [
  {
    initials: 'JR',
    quote: '"Apex completely transformed our digital presence. Our conversion rate doubled within three months of launch. Simply extraordinary work."',
    name: 'James Rothwell',
    title: 'CEO, Meridian Banking Group',
  },
  {
    initials: 'SA',
    quote: '"Working with Apex felt like having a world-class creative studio and engineering team in one. They understood our vision immediately."',
    name: 'Sofia Al-Rashid',
    title: 'Founder, Aurelia Luxury',
  },
  {
    initials: 'KT',
    quote: '"Our new platform handles 10× the traffic flawlessly. Delivered ahead of schedule and beyond every expectation. Truly world-class."',
    name: 'Kenji Tanaka',
    title: 'CTO, Solaris Technologies',
  },
  {
    initials: 'ML',
    quote: '"Apex gave us a website that reflects our brand\'s prestige. International clients now find us, trust us, and buy from us immediately."',
    name: 'Marie Lefevre',
    title: 'Creative Director, Celeste Fashion',
  },
]

export const STATS = [
  { target: 150, suffix: '+', label: 'Projects Delivered' },
  { target: 40,  suffix: '+', label: 'Countries Served' },
  { target: 98,  suffix: '%', label: 'Client Satisfaction' },
]

export const MARQUEE_ITEMS = [
  'Web Design', 'Development', 'Redesign', 'UI / UX',
  'E-Commerce', 'SEO Strategy', 'Branding', 'Performance',
]

export const VALUES = [
  { title: 'Precision',           desc: 'We sweat the details others overlook.' },
  { title: 'Global Perspective',  desc: 'Cross-cultural expertise for worldwide impact.' },
  { title: 'Results First',       desc: 'Beautiful design that drives measurable growth.' },
]

export const FOOTER_LINKS = {
  Services: [
    { label: 'Website Design',    href: '#services' },
    { label: 'Development',       href: '#services' },
    { label: 'Redesign & Upgrade',href: '#services' },
    { label: 'E-Commerce',        href: '#services' },
    { label: 'SEO Strategy',      href: '#services' },
  ],
  Company: [
    { label: 'About Us',   href: '#about' },
    { label: 'Portfolio',  href: '#portfolio' },
    { label: 'Pricing',    href: '#pricing' },
    { label: 'Contact',    href: '#contact' },
    { label: 'Careers',    href: '#' },
  ],
  Legal: [
    { label: 'Privacy Policy',   href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy',    href: '#' },
  ],
}
