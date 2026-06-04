'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggle from './ThemeToggle'

const navLinks = [
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 flex items-center justify-between transition-all duration-300 ${
          scrolled
            ? 'bg-white/80 dark:bg-[#0A0A0F]/80 backdrop-blur-md border-b border-black/5 dark:border-white/5'
            : ''
        }`}
      >
        {/* Wordmark */}
        <Link
          href="/"
          className="text-[11px] font-semibold tracking-[0.25em] uppercase text-gray-900 dark:text-white hover:text-[#D4A853] dark:hover:text-[#D4A853] transition-colors"
        >
          Victor Obukomena
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm transition-colors hover:text-[#D4A853] ${
                pathname.startsWith(href)
                  ? 'text-[#D4A853]'
                  : 'text-gray-600 dark:text-white/60'
              }`}
            >
              {label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex flex-col justify-center gap-[5px] w-6 h-6 text-gray-700 dark:text-white/70"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span
              className={`block h-px bg-current transition-all duration-300 origin-center ${
                menuOpen ? 'w-5 rotate-45 translate-y-[6px]' : 'w-5'
              }`}
            />
            <span
              className={`block h-px bg-current transition-all duration-300 ${
                menuOpen ? 'opacity-0 w-5' : 'w-5'
              }`}
            />
            <span
              className={`block h-px bg-current transition-all duration-300 origin-center ${
                menuOpen ? 'w-5 -rotate-45 -translate-y-[6px]' : 'w-3 ml-auto'
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile slide-out menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#F7F7F5] dark:bg-[#0A0A0F] flex flex-col justify-center px-8"
          >
            <nav className="flex flex-col gap-2">
              {navLinks.map(({ href, label }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 + 0.15, duration: 0.4 }}
                >
                  <Link
                    href={href}
                    className={`block text-4xl font-bold py-3 transition-colors hover:text-[#D4A853] ${
                      pathname.startsWith(href)
                        ? 'text-[#D4A853]'
                        : 'text-gray-900 dark:text-white'
                    }`}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-10 left-8"
            >
              <a
                href="mailto:hello@victorobukomena.com"
                className="text-sm text-gray-500 dark:text-white/30 hover:text-[#D4A853] transition-colors"
              >
                hello@victorobukomena.com
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
