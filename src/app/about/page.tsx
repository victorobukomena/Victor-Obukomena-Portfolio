'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

const skills = [
  'Branding & Visual Identity',
  'Digital Communications',
  'Motion Graphics',
  'Social Media Strategy',
  'Event Design',
  'Packaging Design',
  'Web Design',
  'Internal Communications',
]

const tools = [
  'Adobe Photoshop',
  'Adobe Illustrator',
  'Adobe After Effects',
  'Adobe Premiere Pro',
  'Adobe InDesign',
  'Adobe Audition',
  'Figma',
]

const experience = [
  { company: 'The Aig-Imoukhuede Foundation, NG', role: 'Digital Communications/Graphics Design Consultant', period: '2024 – Present' },
  { company: 'KPMG West Africa, NG',              role: 'Creative Designer',                                  period: '2022 – 2024'   },
  { company: 'Global Accelerex, NG',              role: 'Senior Designer',                                    period: '2020 – 2022'   },
  { company: 'DCBS Media Academy, NG',            role: 'HOD, Trainings',                                     period: '2019 – 2021'   },
  { company: 'SmartEdge Media & Comms, NG',       role: 'Senior Design Consultant',                           period: '2018 – 2020'   },
  { company: 'Freelance',                         role: 'Graphics Designer',                                  period: '2016 – 2020'   },
]

const bio = [
  "I'm a graphic designer and digital communications specialist passionate about turning ideas into visuals that connect, inform, and inspire.",
  "Over the years, I've worked across public sector, fintech, and corporate spaces, designing for organisations like the Aig-Imoukhuede Foundation, KPMG Nigeria, and Global Accelerex. My work spans branding, integrated marketing campaigns, motion graphics, social media content, website designs, and event design.",
  "I enjoy blending strategy with creativity — whether it's building out a full communications rollout for an event, leading a training on digital content creation, or crafting a visual that helps people understand something quicker and better. I've also collaborated with international bodies like the World Bank and IFC, giving me a well-rounded view of design that works across audiences and sectors.",
  'Outside of work, I enjoy learning about the world through stories — movies, books. And a lot of great music, especially lo-fi these days.',
]

export default function AboutPage() {
  return (
    <div className="pt-32 px-6 md:px-12 pb-24 max-w-[1440px] mx-auto">
      {/* Hero heading */}
      <motion.h1
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 dark:text-white mb-16 leading-none"
      >
        Hello! I&apos;m Victor
      </motion.h1>

      {/* Portrait + Bio grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 mb-20 items-start">
        {/* Portrait image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-gray-100 dark:bg-white/5"
        >
          <Image
            src="/assets/victor-portrait.png"
            alt="Victor Obukomena"
            fill
            className="object-cover"
            priority
          />
          {/* Fallback shown while image loads or if missing */}
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-white/5 dark:to-white/[0.02] -z-10">
            <span className="text-gray-300 dark:text-white/20 text-sm">Portrait photo</span>
          </div>
        </motion.div>

        {/* Bio text */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-center"
        >
          <div className="space-y-5">
            {bio.map((para, i) => (
              <p
                key={i}
                className="text-gray-600 dark:text-white/65 text-base md:text-lg leading-relaxed"
              >
                {para}
              </p>
            ))}
          </div>
        </motion.div>
      </div>

      {/* What I Do */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="border-t border-black/5 dark:border-white/5 pt-16 mb-14"
      >
        <p className="text-[10px] uppercase tracking-widest text-gray-300 dark:text-white/30 mb-7">
          What I Do
        </p>
        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <span
              key={skill}
              className="text-sm text-gray-700 dark:text-white/70 border border-gray-200 dark:border-white/10 rounded-full px-4 py-2 hover:border-[#D4A853]/60 hover:text-[#D4A853] transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Tools */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="border-t border-black/5 dark:border-white/5 pt-16 mb-14"
      >
        <p className="text-[10px] uppercase tracking-widest text-gray-300 dark:text-white/30 mb-7">
          Tools
        </p>
        <div className="flex flex-wrap gap-3">
          {tools.map((tool) => (
            <span
              key={tool}
              className="text-sm text-[#D4A853]/80 border border-[#D4A853]/25 rounded-full px-4 py-2"
            >
              {tool}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Experience */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="border-t border-black/5 dark:border-white/5 pt-16 mb-14"
      >
        <p className="text-[10px] uppercase tracking-widest text-gray-300 dark:text-white/30 mb-7">
          Experience
        </p>
        <div className="space-y-2">
          {experience.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-[1.4fr_1.4fr_auto] gap-1 md:gap-6 items-center
                         bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5
                         rounded-xl px-6 py-5"
            >
              <span className="font-semibold text-gray-900 dark:text-white text-sm md:text-base">
                {item.company}
              </span>
              <span className="text-gray-500 dark:text-white/50 text-sm">
                {item.role}
              </span>
              <span className="text-gray-400 dark:text-white/30 text-sm md:text-right tabular-nums">
                {item.period}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="border-t border-black/5 dark:border-white/5 pt-16"
      >
        <p className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-5">
          Want to work together?
        </p>
        <Link
          href="/contact"
          className="text-[#D4A853] hover:underline underline-offset-4 text-base font-medium"
        >
          Get in touch →
        </Link>
      </motion.div>
    </div>
  )
}
