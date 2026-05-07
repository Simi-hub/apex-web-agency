import { MARQUEE_ITEMS } from '@/data/site'

export default function Marquee() {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]

  return (
    <div className="marquee-strip" aria-hidden="true">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <>
            <span key={`${item}-${i}`}>{item}</span>
            <span key={`dot-${i}`} className="dot">◆</span>
          </>
        ))}
      </div>
    </div>
  )
}
