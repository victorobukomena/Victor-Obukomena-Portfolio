'use client'

import { motion } from 'framer-motion'
import type { Project } from '@/data/projects'

interface CaseStudyHeroProps {
  project: Project
  index: number
}

export default function CaseStudyHero({ project, index }: CaseStudyHeroProps) {
  const num = String(index + 1).padStart(2, '0')

  return (
    <div className="pt-8 pb-12 px-6 md:px-12 max-w-[1440px] mx-auto">
      {/* Project number + year */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-xs font-mono text-gray-400 dark:text-white/25 mb-5"
      >
        {num} · {project.year}
      </motion.p>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight mb-3"
      >
        {project.title}
      </motion.h1>

      {/* Subtitle (optional) */}
      {project.subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="text-lg md:text-xl text-gray-400 dark:text-white/40 mb-6 font-normal"
        >
          {project.subtitle}
        </motion.p>
      )}

      {/* Tag badges */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.22 }}
        className="flex flex-wrap gap-2 mb-8"
      >
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-[11px] uppercase tracking-widest text-[#D4A853] border border-[#D4A853]/40 rounded-full px-3 py-1"
          >
            {tag}
          </span>
        ))}
      </motion.div>

      {/* Client / Sector row (optional) */}
      {(project.client || project.sector) && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.28 }}
          className="flex flex-wrap gap-8 mb-8 pb-8 border-b border-black/5 dark:border-white/5"
        >
          {project.client && (
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-300 dark:text-white/25 mb-1">Client</p>
              <p className="text-sm text-gray-700 dark:text-white/70">{project.client}</p>
            </div>
          )}
          {project.sector && (
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-300 dark:text-white/25 mb-1">Sector</p>
              <p className="text-sm text-gray-700 dark:text-white/70">{project.sector}</p>
            </div>
          )}
          <div>
            <p className="text-[10px] uppercase tracking-widest text-gray-300 dark:text-white/25 mb-1">Year</p>
            <p className="text-sm text-gray-700 dark:text-white/70">{project.year}</p>
          </div>
        </motion.div>
      )}

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.32 }}
        className="text-gray-500 dark:text-white/55 text-base md:text-lg leading-relaxed max-w-3xl mb-10"
      >
        {project.description}
      </motion.p>

    </div>
  )
}
