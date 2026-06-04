const SERVICES = [
  'Branding',
  'Digital Communications',
  'Motion Graphics',
  'Social Media',
  'Event Design',
  'Web Design',
  'Brand Strategy',
  'Packaging',
  'Internal Communications',
]

// Content is duplicated so the strip loops seamlessly
const items = [...SERVICES, ...SERVICES]

export default function Marquee() {
  return (
    <div
      className="border-y border-black/5 dark:border-white/5 overflow-hidden py-4 my-10 select-none"
      aria-hidden="true"
    >
      <div
        className="flex whitespace-nowrap"
        style={{ animation: 'marquee 40s linear infinite' }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center text-[10px] tracking-[0.2em] uppercase text-gray-400 dark:text-white/35"
          >
            {item}
            <span className="text-[#D4A853] mx-4 text-base leading-none">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
