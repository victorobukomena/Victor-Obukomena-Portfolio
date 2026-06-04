'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

const aspectClass: Record<string, string> = {
  square: 'aspect-square',
  wide: 'aspect-video',
  portrait: 'aspect-[3/4]',
  tall: 'aspect-[9/16]',
  ultrawide: 'aspect-[1920/700]',
  cinema: 'aspect-[1920/620]',
  banner: 'aspect-[1920/270]',
}

interface Props {
  src: string
  alt: string
  aspectRatio: 'square' | 'wide' | 'portrait' | 'tall' | 'ultrawide' | 'cinema' | 'banner'
}

export default function InlineParallaxImage({ src, alt, aspectRatio }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  // Subtle scale: starts slightly zoomed in, hits 1 at midpoint, zooms back out as it leaves
  const rawScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.07, 1, 1.07])
  const scale = useSpring(rawScale, { stiffness: 55, damping: 22 })

  return (
    <div ref={ref} className={`relative w-full rounded-xl overflow-hidden ${aspectClass[aspectRatio]}`}>
      <motion.div className="absolute inset-0 w-full h-full" style={{ scale }}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 1200px"
        />
      </motion.div>
    </div>
  )
}
