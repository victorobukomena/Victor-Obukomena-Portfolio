'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

// ── Cycling card ────────────────────────────────────────────────
function CyclingCard({
  images,
  className,
  startDelay = 0,
}: {
  images: { src: string; alt: string }[]
  className: string
  startDelay?: number
}) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>
    const delayId = setTimeout(() => {
      intervalId = setInterval(() => setActive(p => (p + 1) % images.length), 2000)
    }, startDelay)
    return () => { clearTimeout(delayId); clearInterval(intervalId) }
  }, [images.length, startDelay])

  return (
    <div className={`relative flex-shrink-0 rounded-2xl overflow-hidden opacity-50 ${className}`}>
      {images.map((img, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-[1000ms] ease-in-out ${i === active ? 'opacity-100' : 'opacity-0'}`}
        >
          <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="420px" />
        </div>
      ))}
    </div>
  )
}

// ── Static card ─────────────────────────────────────────────────
function StaticCard({ src, alt, className }: { src: string; alt: string; className: string }) {
  return (
    <div className={`relative flex-shrink-0 rounded-2xl overflow-hidden opacity-50 ${className}`}>
      <Image src={src} alt={alt} fill className="object-cover" sizes="420px" />
    </div>
  )
}

// ── Slot data ───────────────────────────────────────────────────
// 6 landscape + 2 portrait. Heights > container (50vh) so tops
// bleed upward behind the navbar. items-end keeps bottoms aligned.
type SlotData =
  | { type: 'static';  src: string; alt: string; w: string; h: string }
  | { type: 'cycling'; images: { src: string; alt: string }[]; w: string; h: string; delay: number }

const L = 'w-[560px]'  // landscape width
const P = 'w-[240px]'  // portrait width

const SLOTS: SlotData[] = [
  { type: 'static',
    src: '/assets/projects/mcfabels-foods/15.jpg', alt: 'McFabels Foods',
    w: L, h: 'h-[62vh]' },
  { type: 'static',
    src: '/assets/projects/mcfabels-foods/hero2.jpg', alt: 'McFabels Foods',
    w: P, h: 'h-[80vh]' },
  { type: 'cycling',
    images: [
      { src: '/assets/projects/merit-and-mark/3.jpg', alt: 'Merit & Mark' },
      { src: '/assets/projects/merit-and-mark/4.jpg', alt: 'Merit & Mark' },
      { src: '/assets/projects/merit-and-mark/5.jpg', alt: 'Merit & Mark' },
    ], w: L, h: 'h-[68vh]', delay: 0 },
  { type: 'static',
    src: '/assets/projects/global-accelerex/03.jpg', alt: 'Global Accelerex',
    w: L, h: 'h-[58vh]' },
  { type: 'cycling',
    images: [
      { src: '/assets/projects/brand-and-stitch/01.jpg', alt: 'Brand & Stitch' },
      { src: '/assets/projects/brand-and-stitch/02.jpg', alt: 'Brand & Stitch' },
      { src: '/assets/projects/brand-and-stitch/03.jpg', alt: 'Brand & Stitch' },
    ], w: L, h: 'h-[72vh]', delay: 800 },
  { type: 'static',
    src: '/assets/projects/merit-and-mark/hero.jpg', alt: 'Merit & Mark',
    w: P, h: 'h-[85vh]' },
  { type: 'static',
    src: '/assets/projects/mcfabels-foods/1.jpg', alt: 'McFabels Foods',
    w: L, h: 'h-[65vh]' },
  { type: 'cycling',
    images: [
      { src: '/assets/projects/mcfabels-foods/16.jpg', alt: 'McFabels Foods' },
      { src: '/assets/projects/mcfabels-foods/17.jpg', alt: 'McFabels Foods' },
      { src: '/assets/projects/mcfabels-foods/18.jpg', alt: 'McFabels Foods' },
    ], w: L, h: 'h-[70vh]', delay: 1600 },
]

const ALL_SLOTS = [...SLOTS, ...SLOTS]

// ── Strip ───────────────────────────────────────────────────────
export default function ProjectStrip() {
  return (
    <div className="w-full overflow-hidden h-[50vh]" aria-hidden="true">
      <div
        className="flex gap-3 items-end h-full w-max"
        style={{ animation: 'marquee 52s linear infinite' }}
      >
        {ALL_SLOTS.map((slot, i) => {
          const cls = `${slot.w} ${slot.h}`
          return slot.type === 'static' ? (
            <StaticCard key={i} src={slot.src} alt={slot.alt} className={cls} />
          ) : (
            <CyclingCard key={i} images={slot.images} className={cls} startDelay={slot.delay} />
          )
        })}
      </div>
    </div>
  )
}
