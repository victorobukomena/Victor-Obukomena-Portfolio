'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

export const IMAGES_PENDING = true

interface ImagePlaceholderProps {
  label: string
  aspectRatio?: 'square' | 'wide' | 'portrait' | 'tall' | 'ultrawide' | 'cinema' | 'banner'
  gradientColors?: string[]
  className?: string
  parallax?: boolean
}

const ratioClass: Record<string, string> = {
  square: 'aspect-square',
  wide: 'aspect-video',
  portrait: 'aspect-[3/4]',
  tall: 'aspect-[9/16]',
  ultrawide: 'aspect-[1920/700]',
  cinema: 'aspect-[1920/620]',
  banner: 'aspect-[1920/270]',
}

export default function ImagePlaceholder({
  label,
  aspectRatio = 'square',
  gradientColors = ['#1A1A2E', '#2C2C3E'],
  className = '',
  parallax = false,
}: ImagePlaceholderProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const rawScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.07, 1, 1.07])
  const scale = useSpring(rawScale, { stiffness: 55, damping: 22 })

  const inner = (
    <div
      className="absolute inset-0"
      style={{
        background: `linear-gradient(135deg, ${gradientColors[0]} 0%, ${gradientColors[1]} 100%)`,
      }}
    >
      {/* Pending badge */}
      <div className="absolute top-3 right-3 bg-black/30 backdrop-blur-sm rounded-full px-2.5 py-1 text-[10px] text-white/50 flex items-center gap-1">
        <span>📷</span>
        <span>pending</span>
      </div>
      {/* Label */}
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <p className="text-white/25 text-xs italic text-center leading-relaxed">{label}</p>
      </div>
    </div>
  )

  return (
    <div
      ref={ref}
      className={`relative w-full rounded-xl overflow-hidden ${ratioClass[aspectRatio]} ${className}`}
    >
      {parallax ? (
        <motion.div className="absolute inset-0 w-full h-full" style={{ scale }}>
          {inner}
        </motion.div>
      ) : (
        inner
      )}
    </div>
  )
}
