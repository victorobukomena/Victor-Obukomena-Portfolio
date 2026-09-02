'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Marquee from '@/components/Marquee'
import ProjectStrip from '@/components/ProjectStrip'
import WorkCard from '@/components/WorkCard'
import { projects } from '@/data/projects'

const featuredOrder = [
  'mcfabels-foods',
  'merit-and-mark',
  'video-projects',
  'brand-and-stitch',
  'creative-africa-exchange',
]

const featured = featuredOrder
  .map((slug) => projects.find((p) => p.slug === slug))
  .filter((p): p is typeof projects[0] => p != null)

const clients = [
  'Aig-Imoukhuede Foundation',
  'KPMG Nigeria',
  'Global Accelerex',
  'World Bank',
  'IFC',
  'Afreximbank',
]

// Hero heading segments — gold highlights applied via className
const heroSegments = [
  { text: "Hey there! I'm Victor Obukomena, a cross-disciplinary creative in graphic design, brand identity, motion, and digital communications. I blend creativity with strategy to build visuals that inform, engage, and drive action.", gold: false },
]

export default function HomePage() {
  return (
    <>
      {/* ── Project image strip — starts at y:0, bleeds under navbar ── */}
      <ProjectStrip />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative flex flex-col justify-center px-6 md:px-12 pt-16 pb-12 max-w-[1440px] mx-auto">
        {/* Decorative slowly-rotating asterisk */}
        <div
          className="absolute top-36 right-6 md:right-16 text-[#D4A853] text-5xl opacity-20 pointer-events-none select-none"
          style={{ animation: 'spin-slow 20s linear infinite' }}
          aria-hidden="true"
        >
          ✦
        </div>

        <div className="max-w-5xl">
          {/* Main heading — word-by-word stagger */}
          <h1 className="text-xl md:text-2xl lg:text-3xl font-normal leading-relaxed tracking-normal text-gray-900 dark:text-white mb-8 max-w-2xl">
            {heroSegments.map((seg, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: i * 0.06,
                  duration: 0.65,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={seg.gold ? 'text-[#D4A853]' : ''}
              >
                {seg.text}
              </motion.span>
            ))}
          </h1>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.6 }}
            className="flex flex-wrap gap-4 mt-10"
          >
            <Link
              href="/work"
              className="bg-[#D4A853] text-black font-semibold px-7 py-3.5 rounded-full text-sm hover:bg-[#C49743] active:bg-[#B58632] transition-colors"
            >
              View My Work →
            </Link>
            <Link
              href="/contact"
              className="border border-gray-300 dark:border-white/20 text-gray-800 dark:text-white px-7 py-3.5 rounded-full text-sm hover:border-[#D4A853] hover:text-[#D4A853] dark:hover:border-[#D4A853] dark:hover:text-[#D4A853] transition-colors"
            >
              Get In Touch
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Marquee ticker ───────────────────────────────────────────── */}
      <Marquee />

      {/* ── Selected Work ────────────────────────────────────────────── */}
      <section className="px-6 md:px-12 pt-12 pb-20 max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Selected Work
          </h2>
          <Link
            href="/work"
            className="text-sm text-[#D4A853] hover:underline underline-offset-4 hidden sm:block"
          >
            All works →
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featured.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <WorkCard project={project} />
            </motion.div>
          ))}
        </div>

        <div className="mt-10 sm:hidden">
          <Link href="/work" className="text-sm text-[#D4A853] hover:underline underline-offset-4">
            All works →
          </Link>
        </div>
      </section>

      {/* ── About teaser ─────────────────────────────────────────────── */}
      <section className="px-6 md:px-12 py-16 max-w-[1440px] mx-auto border-t border-black/5 dark:border-white/5">
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white leading-snug mb-6">
            &ldquo;Blending strategy with creativity across public sector, fintech, and
            corporate spaces.&rdquo;
          </p>
          <Link
            href="/about"
            className="text-sm text-[#D4A853] hover:underline underline-offset-4"
          >
            More about me →
          </Link>
        </motion.blockquote>
      </section>

      {/* ── Clients strip ────────────────────────────────────────────── */}
      <section className="px-6 md:px-12 py-16 max-w-[1440px] mx-auto border-t border-black/5 dark:border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[10px] uppercase tracking-widest text-gray-400 dark:text-white/30 mb-7">
            Organisations I&apos;ve worked with
          </p>
          <div className="flex flex-wrap gap-3">
            {clients.map((client) => (
              <span
                key={client}
                className="text-sm text-gray-500 dark:text-white/40 border border-gray-200 dark:border-white/10 rounded-full px-4 py-1.5 hover:border-[#D4A853]/50 hover:text-[#D4A853] transition-colors cursor-default"
              >
                {client}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────────── */}
      <section className="px-6 md:px-12 py-24 max-w-[1440px] mx-auto border-t border-black/5 dark:border-white/5">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl lg:text-4xl font-normal text-gray-900 dark:text-white leading-snug"
        >
          Have a project in mind?{' '}
          <Link
            href="/contact"
            className="text-[#D4A853] underline underline-offset-4 decoration-[#D4A853]/40 hover:decoration-[#D4A853] transition-all duration-300"
          >
            I&apos;d love to hear from you
          </Link>
          .
        </motion.p>
      </section>
    </>
  )
}
