'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Project } from '@/data/projects'

interface WorkListRowProps {
  project: Project
  index: number
}

export default function WorkListRow({ project, index }: WorkListRowProps) {
  const num = String(index + 1).padStart(2, '0')

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/work/${project.slug}`} className="block">
        <div className="group relative flex items-center py-6 border-b border-black/5 dark:border-white/5 cursor-pointer overflow-hidden">
          {/* Hover tint */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{ background: 'rgba(212, 168, 83, 0.05)' }}
          />

          {/* Gradient thumbnail that slides in from right on hover */}
          <div
            className="absolute right-0 top-0 h-full w-32 opacity-0 group-hover:opacity-60 translate-x-4 group-hover:translate-x-0 transition-all duration-400 pointer-events-none mask-left"
            style={{
              background: `linear-gradient(135deg, ${project.gradient[0]}, ${project.gradient[1]})`,
            }}
          />

          {/* Number */}
          <span className="relative z-10 text-gray-300 dark:text-white/20 text-xs font-mono w-10 shrink-0">
            {num}
          </span>

          {/* Title */}
          <span className="relative z-10 text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white flex-1 pr-4 group-hover:text-[#D4A853] transition-colors duration-200">
            {project.title}
          </span>

          {/* Tags — visible on md+ */}
          <div className="relative z-10 hidden md:flex gap-3 items-center mr-10">
            {project.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-white/30"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Year */}
          <span className="relative z-10 hidden lg:block text-xs text-gray-300 dark:text-white/20 font-mono mr-6">
            {project.year}
          </span>

          {/* CTA */}
          <span className="relative z-10 text-sm text-[#D4A853] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pr-2">
            View →
          </span>
        </div>
      </Link>
    </motion.div>
  )
}
