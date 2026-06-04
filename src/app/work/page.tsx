'use client'

import { motion } from 'framer-motion'
import { projects } from '@/data/projects'
import WorkListRow from '@/components/WorkListRow'

export default function WorkPage() {
  return (
    <div className="pt-32 px-6 md:px-12 pb-24 max-w-[1440px] mx-auto">
      {/* Header */}
      <div className="mb-16">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-[10px] uppercase tracking-widest font-mono text-gray-300 dark:text-white/25 mb-4"
        >
          2019–2025
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 dark:text-white"
        >
          All Works
        </motion.h1>
      </div>

      {/* Top border */}
      <div className="border-t border-black/10 dark:border-white/10" />

      {/* Project rows */}
      {projects.map((project, i) => (
        <WorkListRow key={project.slug} project={project} index={i} />
      ))}
    </div>
  )
}
