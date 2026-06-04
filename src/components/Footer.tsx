'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const socials = [
  { label: 'WhatsApp', href: 'https://wa.me/2348135074515' },
  { label: 'Behance', href: 'https://behance.net/victorobukomena' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/victor-obukomena-a5108a8a' },
]

export default function Footer() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      // Africa/Lagos is UTC+1 (WAT) year-round, no DST
      const wat = new Date(now.toLocaleString('en-US', { timeZone: 'Africa/Lagos' }))
      const h = String(wat.getHours()).padStart(2, '0')
      const m = String(wat.getMinutes()).padStart(2, '0')
      const s = String(wat.getSeconds()).padStart(2, '0')
      setTime(`${h}:${m}:${s}`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <footer className="border-t border-black/5 dark:border-white/5 px-6 md:px-12 py-12 mt-20">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Left: clock + email */}
          <div>
            <p className="text-[11px] font-mono text-gray-400 dark:text-white/30 mb-3 tabular-nums">
              Lagos, Nigeria —{' '}
              <span className="text-[#D4A853]">{time || '——:——:——'}</span> WAT
            </p>
            <a
              href="mailto:hello@victorobukomena.com"
              className="text-sm text-gray-500 dark:text-white/50 hover:text-[#D4A853] dark:hover:text-[#D4A853] transition-colors"
            >
              hello@victorobukomena.com
            </a>
          </div>

          {/* Right: social links */}
          <div className="flex gap-6 items-center">
            {socials.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-400 dark:text-white/40 hover:text-[#D4A853] dark:hover:text-[#D4A853] transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-black/5 dark:border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="text-xs text-gray-400 dark:text-white/25">
            © 2025 Victor Obukomena
          </p>
          <Link
            href="/work"
            className="text-xs text-gray-400 dark:text-white/20 hover:text-[#D4A853] transition-colors"
          >
            View All Works →
          </Link>
        </div>
      </div>
    </footer>
  )
}
