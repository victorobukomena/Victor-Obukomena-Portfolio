'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

const aspectClass: Record<string, string> = {
  square: 'aspect-square',
  wide: 'aspect-video',
  portrait: 'aspect-[3/4]',
  tall: 'aspect-[9/16]',
  ultrawide: 'aspect-[1920/700]',
  cinema: 'aspect-[1920/620]',
}

interface Props {
  src: string
  aspectRatio: 'square' | 'wide' | 'portrait' | 'tall' | 'ultrawide' | 'cinema'
}

export default function InlineParallaxVideo({ src, aspectRatio }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const rawScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.07, 1, 1.07])
  const scale = useSpring(rawScale, { stiffness: 55, damping: 22 })

  return (
    <div ref={ref} className={`relative w-full rounded-xl overflow-hidden ${aspectClass[aspectRatio]}`}>
      <motion.div className="absolute inset-0 w-full h-full" style={{ scale }}>
        <video
          src={src}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </motion.div>
    </div>
  )
}
