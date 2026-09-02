'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const contacts = [
  {
    label: 'Email',
    value: 'hello@victorobukomena.com',
    href: 'mailto:hello@victorobukomena.com',
    external: false,
  },
  {
    label: 'WhatsApp',
    value: '+234 813 507 4515',
    href: 'https://wa.me/2348135074515',
    external: true,
  },
  {
    label: 'Behance',
    value: 'behance.net/victorobukomena',
    href: 'https://behance.net/victorobukomena',
    external: true,
  },
  {
    label: 'LinkedIn',
    value: 'Victor Obukomena',
    href: 'https://linkedin.com/in/victor-obukomena-a5108a8a',
    external: true,
  },
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
          subject: `New message from ${form.name} via portfolio site`,
          from_name: form.name,
          ...form,
        }),
      })

      const data = await res.json()
      if (data.success) {
        setSubmitted(true)
      } else {
        setError(data.message || 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="pt-32 px-6 md:px-12 pb-24 max-w-5xl mx-auto">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="mb-16"
      >
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 dark:text-white leading-[1.05]">
          Let&apos;s Work
          <br />
          <span className="text-[#D4A853]">Together.</span>
        </h1>
        <p className="text-gray-400 dark:text-white/40 text-base mt-6 max-w-md">
          I&apos;m always open to new projects, collaborations, and conversations.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20">
        {/* Contact detail rows */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {contacts.map(({ label, value, href, external }) => (
            <a
              key={label}
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              className="group flex flex-col border-b border-black/5 dark:border-white/5 py-6 hover:border-[#D4A853]/30 transition-colors"
            >
              <span className="text-[10px] uppercase tracking-widest text-gray-300 dark:text-white/30 mb-1.5">
                {label}
              </span>
              <span className="text-gray-900 dark:text-white text-xl font-medium group-hover:text-[#D4A853] transition-colors underline-offset-4 group-hover:underline">
                {value}
              </span>
            </a>
          ))}
        </motion.div>

        {/* Contact form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {submitted ? (
            <div className="flex flex-col items-start justify-center h-full min-h-64 gap-3">
              <p className="text-3xl font-semibold text-gray-900 dark:text-white">Thanks!</p>
              <p className="text-gray-500 dark:text-white/50">I&apos;ll be in touch soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-gray-300 dark:text-white/30 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={set('name')}
                  placeholder="Your name"
                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-3 text-gray-900 dark:text-white text-sm placeholder:text-gray-300 dark:placeholder:text-white/20 focus:outline-none focus:border-[#D4A853]/60 transition-colors"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-gray-300 dark:text-white/30 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={set('email')}
                  placeholder="your@email.com"
                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-3 text-gray-900 dark:text-white text-sm placeholder:text-gray-300 dark:placeholder:text-white/20 focus:outline-none focus:border-[#D4A853]/60 transition-colors"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-gray-300 dark:text-white/30 mb-2">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={set('message')}
                  placeholder="Tell me about your project..."
                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-3 text-gray-900 dark:text-white text-sm placeholder:text-gray-300 dark:placeholder:text-white/20 focus:outline-none focus:border-[#D4A853]/60 transition-colors resize-none"
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="bg-[#D4A853] text-black font-semibold px-8 py-3.5 rounded-full text-sm hover:bg-[#C49743] active:bg-[#B58632] transition-colors w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  )
}
