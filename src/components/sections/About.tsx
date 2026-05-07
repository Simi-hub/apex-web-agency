import Image from 'next/image'
import { VALUES } from '@/data/site'

export default function About() {
  return (
    <section className="about section" id="about" aria-labelledby="about-heading">
      <div className="container">
        <div className="about-inner">

          {/* Visual */}
          <div className="about-visual">
            <div className="about-eagle-wrap">
              <Image src="/eagle.png" alt="Apex eagle emblem" width={300} height={240} className="about-eagle" />
              <div className="about-eagle-ring ring-1" aria-hidden="true" />
              <div className="about-eagle-ring ring-2" aria-hidden="true" />
              <div className="about-eagle-ring ring-3" aria-hidden="true" />
            </div>
            <div className="about-globe" aria-hidden="true">
              <div className="globe-line" />
              <div className="globe-line" />
              <div className="globe-line" />
              {[
                { angle: '30deg',  radius: '80px' },
                { angle: '120deg', radius: '90px' },
                { angle: '200deg', radius: '75px' },
                { angle: '300deg', radius: '85px' },
              ].map(({ angle, radius }) => (
                <div
                  key={angle}
                  className="globe-dot"
                  style={{ '--angle': angle, '--radius': radius } as React.CSSProperties}
                />
              ))}
            </div>
          </div>

          {/* Text */}
          <div className="about-text">
            <p className="section-eyebrow">About Apex</p>
            <h2 className="section-title" id="about-heading">
              We Are the Agency <em>Ambitious</em> Brands Choose
            </h2>
            <p className="about-body">
              Apex Web Agency was founded on a single conviction: that extraordinary digital
              experiences are the most powerful business asset in the modern world. We exist to create them.
            </p>
            <p className="about-body">
              Operating across six continents, our team of designers, engineers, and strategists
              deliver websites that don&apos;t just look exceptional — they perform. Every pixel is intentional.
              Every line of code is crafted for speed, security, and scale.
            </p>

            <div className="about-values">
              {VALUES.map(v => (
                <div key={v.title} className="value-item">
                  <span className="value-icon" aria-hidden="true">◆</span>
                  <div>
                    <h4>{v.title}</h4>
                    <p>{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <a href="#contact" className="btn btn-gold magnetic">
              <span className="btn-inner">
                <span className="btn-text">Work With Us</span>
                <span className="btn-arrow">↗</span>
              </span>
              <span className="btn-shine" aria-hidden="true" />
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
