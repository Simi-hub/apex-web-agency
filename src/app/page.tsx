import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Marquee from '@/components/sections/Marquee'
import Services from '@/components/sections/Services'
import Portfolio from '@/components/sections/Portfolio'
import Pricing from '@/components/sections/Pricing'
import About from '@/components/sections/About'
import Testimonials from '@/components/sections/Testimonials'
import Contact from '@/components/sections/Contact'
import Loader from '@/components/ui/Loader'
import Cursor from '@/components/ui/Cursor'
import ParticleCanvas from '@/components/ui/ParticleCanvas'
import BackToTop from '@/components/ui/BackToTop'
import ReadProgress from '@/components/ui/ReadProgress'
import NoiseOverlay from '@/components/ui/NoiseOverlay'

export default function Home() {
  return (
    <>
      {/* Global FX — client-only */}
      <Loader />
      <Cursor />
      <ParticleCanvas />
      <NoiseOverlay />
      <ReadProgress />

      {/* Layout */}
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Portfolio />
        <Pricing />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
