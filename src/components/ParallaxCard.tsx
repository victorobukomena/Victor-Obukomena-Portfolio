'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

interface Props {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

/**
 * Wraps any content in a subtle parallax zoom — the same effect used on
 * InlineParallaxImage, but for non-image blocks like the colour palette card.
 * The outer div clips overflow so the scale stays within rounded corners.
 */
export default function ParallaxCard({ children, className = '', style }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const rawScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.04, 1, 1.04])
  const scale = useSpring(rawScale, { stiffness: 55, damping: 22 })

  return (
    <div ref={ref} className={`overflow-hidden ${className}`} style={style}>
      <motion.div style={{ scale }} className="w-full h-full">
        {children}
      </motion.div>
    </div>
  )
}
