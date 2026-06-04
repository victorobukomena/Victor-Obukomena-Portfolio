'use client'

import { useParams, notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useRef } from 'react'
import type { JSX } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { projects } from '@/data/projects'
import CaseStudyHero from '@/components/CaseStudyHero'
import ImagePlaceholder from '@/components/ImagePlaceholder'
import InlineParallaxImage from '@/components/InlineParallaxImage'
import InlineParallaxVideo from '@/components/InlineParallaxVideo'
import ParallaxCard from '@/components/ParallaxCard'
import YouTubeEmbed from '@/components/YouTubeEmbed'

const aspectClass: Record<string, string> = {
  square: 'aspect-square',
  wide: 'aspect-video',
  portrait: 'aspect-[3/4]',
  tall: 'aspect-[9/16]',
  ultrawide: 'aspect-[1920/700]',
  cinema: 'aspect-[1920/620]',
  banner: 'aspect-[1920/270]',
}

export default function CaseStudyPage() {
  const params = useParams()
  const slug = params?.slug as string

  const idx = projects.findIndex((p) => p.slug === slug)
  if (idx === -1) notFound()

  const project = projects[idx]
  const nextProject = projects.find((p) => p.slug === project.nextProject)

  // Parallax hero scroll hooks
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const rawScale    = useTransform(scrollYProgress, [0, 1], [1, 1.14])
  const rawYNum     = useTransform(scrollYProgress, [0, 1], [0, 22])   // numeric for spring
  const heroOpacity = useTransform(scrollYProgress, [0.55, 1], [1, 0])
  const scale  = useSpring(rawScale, { stiffness: 60, damping: 20 })
  const yNum   = useSpring(rawYNum,  { stiffness: 60, damping: 20 })
  const y      = useTransform(yNum, (v) => `${v}%`)                    // back to CSS %

  // Compute image-grid nodes once — rendered either before or after narrative sections
  const gridNodes = (() => {
    const layout = project.placeholderLayout
    const nodes = [] as JSX.Element[]
    let i = 0
    while (i < layout.length) {
      const type = layout[i]
      if (type === 'tall' && layout[i + 1] === 'tall') {
        const idxA = i, idxB = i + 1
        nodes.push(
          <motion.div
            key={idxA}
            className="md:col-span-2 grid grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, delay: 0, ease: [0.16, 1, 0.3, 1] }}
          >
            {[idxA, idxB].map((imgIdx) => {
              const src = project.images?.[imgIdx]
              const labelNum = imgIdx + 1 + (project.gridLabelOffset ?? 0)
              return src ? (
                project.imageParallax ? (
                  <InlineParallaxImage
                    key={imgIdx}
                    src={src}
                    alt={`${project.title} — image ${labelNum}`}
                    aspectRatio="tall"
                  />
                ) : (
                  <div key={imgIdx} className={`relative w-full rounded-xl overflow-hidden ${aspectClass['tall']}`}>
                    <Image
                      src={src}
                      alt={`${project.title} — image ${labelNum}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 400px"
                    />
                  </div>
                )
              ) : (
                <ImagePlaceholder
                  key={imgIdx}
                  label={`${project.title} — Image ${labelNum}`}
                  aspectRatio="tall"
                  gradientColors={[project.gradient[0], project.gradient[1]]}
                  parallax={project.imageParallax}
                />
              )
            })}
          </motion.div>
        )
        i += 2
      } else {
        const src = project.images?.[i]
        nodes.push(
          <motion.div
            key={i}
            className={type === 'wide' || type === 'banner' ? 'md:col-span-2' : ''}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, delay: (i % 4) * 0.07, ease: [0.16, 1, 0.3, 1] }}
          >
            {(() => {
              const labelNum = i + 1 + (project.gridLabelOffset ?? 0)
              const itemLabel = project.gridItemLabel ?? 'Image'
              const youtubeMatch = src?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/)
              const youtubeId = youtubeMatch?.[1]
              const isVideo = src && /\.(webm|mp4|mov)$/i.test(src)
              return src ? (
                youtubeId ? (
                  <YouTubeEmbed videoId={youtubeId} aspectRatio={aspectClass[type]} />
                ) : isVideo ? (
                  <InlineParallaxVideo
                    src={src}
                    aspectRatio={type as 'square' | 'wide' | 'portrait' | 'tall' | 'ultrawide' | 'cinema'}
                  />
                ) : project.imageParallax ? (
                  <InlineParallaxImage
                    src={src}
                    alt={`${project.title} — ${itemLabel} ${labelNum}`}
                    aspectRatio={type as 'square' | 'wide' | 'portrait' | 'tall' | 'ultrawide' | 'cinema' | 'banner'}
                  />
                ) : (
                  <div className={`relative w-full rounded-xl overflow-hidden ${aspectClass[type]}`}>
                    <Image
                      src={src}
                      alt={`${project.title} — ${itemLabel} ${labelNum}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                    />
                  </div>
                )
              ) : (
                <ImagePlaceholder
                  label={`${project.title} — ${itemLabel} ${labelNum}`}
                  aspectRatio={type}
                  gradientColors={[project.gradient[0], project.gradient[1]]}
                  parallax={project.imageParallax}
                />
              )
            })()}
          </motion.div>
        )
        i++
      }
    }
    return nodes
  })()

  return (
    <div className="min-h-screen">

      {/* ── Full-bleed parallax hero (McFabels and any project with heroImage) ── */}
      {project.heroImage ? (
        <>
          <motion.div
            ref={heroRef}
            className="relative w-full h-screen overflow-hidden"
            style={{ opacity: heroOpacity }}
          >
            {/* Parallax + zoom image */}
            <motion.div
              className="absolute inset-0 w-full h-full"
              style={{ scale, y }}
            >
              <Image
                src={project.heroImage}
                alt={project.title}
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
            </motion.div>

            {/* Cinematic dark vignette on all edges */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(0,0,0,0.55)_100%)]" />

            {/* Bottom gradient — bleeds into the page background */}
            <div className="absolute inset-x-0 bottom-0 h-48
              bg-gradient-to-t from-[#F7F7F5] to-transparent
              dark:from-[#0A0A0F] dark:to-transparent" />

            {/* Back link — top-left overlay */}
            <div className="absolute top-0 left-0 right-0 pt-28 px-6 md:px-12 max-w-6xl mx-auto">
              <Link
                href="/work"
                className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-[#D4A853] transition-colors drop-shadow"
              >
                <span>←</span>
                <span>All Works</span>
              </Link>
            </div>
          </motion.div>
        </>
      ) : (
        /* Back link for projects without a hero image */
        <div className="pt-28 px-6 md:px-12 max-w-6xl mx-auto">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm text-gray-400 dark:text-white/40 hover:text-[#D4A853] transition-colors"
          >
            <span>←</span>
            <span>All Works</span>
          </Link>
        </div>
      )}

      {/* Hero: title, subtitle, tags, client/sector, description, colour palette */}
      <CaseStudyHero project={project} index={idx} />

      {/* Image grid — early position (before narrative sections, e.g. Merit & Mark) */}
      {project.gridBeforeSections && (
        <div className="px-6 md:px-12 max-w-6xl mx-auto mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {gridNodes}
          </div>
        </div>
      )}

      {/* Narrative sections (present on rich case studies like McFabels) */}
      {project.sections && project.sections.length > 0 && (
        <div className="px-6 md:px-12 max-w-6xl mx-auto pb-4">
          <div className={project.gridBeforeSections ? 'pt-4' : 'border-t border-black/5 dark:border-white/5 pt-16'}>
            {project.sections.map((section, si) => (
              <motion.div
                key={si}
                className={si === 0 ? '' : (section.prefixImageLayout || section.pairedImages) ? 'mt-4' : 'mt-16'}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Prefix image — rendered before the section heading */}
                {section.prefixImageLayout && (
                  <div className="mb-8">
                    {section.prefixImage ? (
                      /\.(webm|mp4|mov)$/i.test(section.prefixImage) ? (
                        <InlineParallaxVideo
                          src={section.prefixImage}
                          aspectRatio={section.prefixImageLayout}
                        />
                      ) : (
                        <InlineParallaxImage
                          src={section.prefixImage}
                          alt={section.prefixImageLabel ?? project.title}
                          aspectRatio={section.prefixImageLayout}
                        />
                      )
                    ) : (
                      <ImagePlaceholder
                        label={section.prefixImageLabel ?? `${project.title} — inline image`}
                        aspectRatio={section.prefixImageLayout}
                        gradientColors={[project.gradient[0], project.gradient[1]]}
                        parallax={project.imageParallax}
                      />
                    )}
                  </div>
                )}

                {/* Section heading */}
                {section.heading && (
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-5">
                    {section.heading}
                  </h2>
                )}

                {/* Section body — supports \n\n for paragraph breaks */}
                {section.body && (
                  <div className="max-w-3xl space-y-4">
                    {section.body.split('\n\n').map((para, pi) => (
                      <p key={pi} className="text-gray-500 dark:text-white/55 text-base md:text-lg leading-relaxed">
                        {para}
                      </p>
                    ))}
                  </div>
                )}

                {/* Pull quote — card style when pullQuoteCardColor is set, inline bordered style otherwise */}
                {section.pullQuote && (
                  section.pullQuoteCardColor ? (
                    <div
                      className="relative w-full rounded-2xl overflow-hidden aspect-[1920/950] flex items-center justify-center"
                      style={{ backgroundColor: section.pullQuoteCardColor }}
                    >
                      <p className="text-xl md:text-2xl lg:text-3xl font-light italic text-white/75 leading-relaxed text-center max-w-3xl px-10 md:px-16">
                        {section.pullQuote}
                      </p>
                    </div>
                  ) : (
                    <div className={section.heading || section.body ? 'mt-10' : ''}>
                      <p className="text-xl md:text-2xl font-light italic text-gray-600 dark:text-white/60 leading-relaxed max-w-3xl border-l-[3px] border-[#D4A853] pl-6">
                        {section.pullQuote}
                      </p>
                    </div>
                  )
                )}

                {/* Design options grid (e.g. "Exploring the Direction") */}
                {section.options && section.options.length > 0 && (
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {section.options.map((opt, oi) => (
                      <motion.div
                        key={oi}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: oi * 0.08 }}
                        className="rounded-xl border border-black/5 dark:border-white/5 p-5 bg-black/[0.01] dark:bg-white/[0.02]"
                      >
                        <p className="text-[10px] uppercase tracking-widest text-[#D4A853] mb-2">{opt.label}</p>
                        <p className="text-base font-semibold text-gray-900 dark:text-white mb-3">{opt.title}</p>
                        <p className="text-sm text-gray-500 dark:text-white/50 leading-relaxed">{opt.description}</p>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Inline image (parallax zoom when real image present, placeholder otherwise) */}
                {section.inlineImageLayout && (
                  <div className="mt-8">
                    {section.inlineImage ? (
                      <InlineParallaxImage
                        src={section.inlineImage}
                        alt={section.inlineImageLabel ?? project.title}
                        aspectRatio={section.inlineImageLayout}
                      />
                    ) : (
                      <ImagePlaceholder
                        label={section.inlineImageLabel ?? `${project.title} — inline image`}
                        aspectRatio={section.inlineImageLayout}
                        gradientColors={[project.gradient[0], project.gradient[1]]}
                        parallax={project.imageParallax}
                      />
                    )}
                  </div>
                )}

                {/* Colour & Brand Language — rendered after the section that flags appendColorPalette */}
                {section.appendColorPalette && (project.colorSwatches || project.colorPalette) && (
                  <ParallaxCard className="mt-4 rounded-xl" style={{ backgroundColor: '#fef9ed' }}>
                    <div className="p-6 md:p-8">
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-6">
                        Colour &amp; Brand Language
                      </p>
                      {project.colorSwatches ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                          {project.colorSwatches.map((swatch) => (
                            <div key={swatch.hex} className="flex flex-col gap-2">
                              <div
                                className="w-full aspect-square rounded-xl border border-black/10"
                                style={{ backgroundColor: swatch.hex }}
                              />
                              <div>
                                <p className="text-[10px] font-mono text-gray-400">{swatch.hex}</p>
                                <p className="text-xs font-semibold text-gray-800 mt-0.5">{swatch.name}</p>
                                <p className="text-[10px] uppercase tracking-wide mt-0.5" style={{ color: '#A07820' }}>{swatch.role}</p>
                                <p className="text-[11px] text-gray-500 mt-1 leading-snug">{swatch.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex gap-3 flex-wrap">
                          {project.colorPalette!.map((color) => (
                            <div key={color} className="flex flex-col items-center gap-1.5">
                              <div
                                className="w-9 h-9 rounded-full border border-black/10"
                                style={{ backgroundColor: color }}
                                title={color}
                              />
                              <span className="text-[9px] font-mono text-gray-500">{color}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </ParallaxCard>
                )}

                {/* Mid image — between colour palette and append image */}
                {section.midImageLayout && (
                  <div className="mt-4">
                    {section.midImage ? (
                      /\.(webm|mp4|mov)$/i.test(section.midImage) ? (
                        <InlineParallaxVideo src={section.midImage} aspectRatio={section.midImageLayout} />
                      ) : (
                        <InlineParallaxImage src={section.midImage} alt={section.midImageLabel ?? project.title} aspectRatio={section.midImageLayout} />
                      )
                    ) : (
                      <ImagePlaceholder
                        label={section.midImageLabel ?? `${project.title} — inline image`}
                        aspectRatio={section.midImageLayout}
                        gradientColors={[project.gradient[0], project.gradient[1]]}
                        parallax={project.imageParallax}
                      />
                    )}
                  </div>
                )}

                {/* Append image/video — rendered below the colour palette (e.g. animation frame) */}
                {section.appendImageLayout && (
                  <div className="mt-4">
                    {section.appendImage ? (
                      /\.(webm|mp4|mov)$/i.test(section.appendImage) ? (
                        <InlineParallaxVideo
                          src={section.appendImage}
                          aspectRatio={section.appendImageLayout}
                        />
                      ) : (
                        <InlineParallaxImage
                          src={section.appendImage}
                          alt={section.appendImageLabel ?? project.title}
                          aspectRatio={section.appendImageLayout}
                        />
                      )
                    ) : (
                      <ImagePlaceholder
                        label={section.appendImageLabel ?? `${project.title} — inline image`}
                        aspectRatio={section.appendImageLayout}
                        gradientColors={[project.gradient[0], project.gradient[1]]}
                        parallax={project.imageParallax}
                      />
                    )}
                  </div>
                )}

                {/* Paired images — two images side by side */}
                {section.pairedImages && section.pairedImages.length > 0 && (
                  <div className="grid grid-cols-2 gap-4">
                    {section.pairedImages.map((img, ii) => (
                      img.image ? (
                        <InlineParallaxImage
                          key={ii}
                          src={img.image}
                          alt={img.label ?? project.title}
                          aspectRatio={img.aspectRatio}
                        />
                      ) : (
                        <ImagePlaceholder
                          key={ii}
                          label={img.label ?? `${project.title} — inline image`}
                          aspectRatio={img.aspectRatio}
                          gradientColors={[project.gradient[0], project.gradient[1]]}
                          parallax={project.imageParallax}
                        />
                      )
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Image grid — default position (after narrative sections) */}
      {!project.gridBeforeSections && (
        <div className="px-6 md:px-12 max-w-6xl mx-auto mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {gridNodes}
          </div>
        </div>
      )}

      {/* Next project */}
      <div className="px-6 md:px-12 max-w-6xl mx-auto pb-24">
        {nextProject && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-24 pt-10 border-t border-black/5 dark:border-white/5"
          >
            <p className="text-[10px] uppercase tracking-widest text-gray-300 dark:text-white/25 mb-4">
              Next Project
            </p>
            <Link href={`/work/${nextProject.slug}`} className="group inline-flex items-center gap-4">
              <span className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white group-hover:text-[#D4A853] transition-colors duration-200">
                {nextProject.title}
              </span>
              <span className="text-[#D4A853] text-2xl group-hover:translate-x-2 transition-transform duration-200">
                →
              </span>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  )
}
