'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import type { Project } from '@/data/projects'

export default function WorkCard({ project }: { project: Project }) {
  return (
    <Link href={`/work/${project.slug}`} className="block group">
      <motion.div
        className="relative rounded-2xl overflow-hidden cursor-pointer"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Thumbnail image or gradient fallback */}
        <div
          className="w-full aspect-[4/3] relative"
          style={
            !project.thumbnail
              ? { background: `linear-gradient(135deg, ${project.gradient[0]} 0%, ${project.gradient[1]} 100%)` }
              : undefined
          }
        >
          {project.thumbnail && (
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 700px"
            />
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/55 transition-colors duration-400" />

          {/* "View case study" CTA — fades in on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-white text-sm font-medium border border-white/60 rounded-full px-6 py-2.5">
              View case study →
            </span>
          </div>
        </div>

        {/* Card info */}
        <div className="p-5 bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-b-2xl -mt-1">
          <h3 className="font-semibold text-gray-900 dark:text-white text-base mb-3 group-hover:text-[#D4A853] transition-colors">
            {project.title}
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] uppercase tracking-wider text-[#D4A853] border border-[#D4A853]/30 rounded-full px-2.5 py-0.5"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
