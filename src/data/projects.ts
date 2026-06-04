// Single source of truth for all project data.
// Edit only this file to update project content, tags, or descriptions.

export const IMAGES_PENDING = true

// ── Types ────────────────────────────────────────────────────────────────────

export interface ColorSwatch {
  hex: string
  name: string
  role: string        // e.g. "Primary brand colour"
  description: string // e.g. "Agriculture, freshness, and growth."
}

export interface DesignOption {
  label: string       // e.g. "OPTION 01"
  title: string       // e.g. "The "mf" Emblem"
  description: string
}

export interface ProjectSection {
  heading: string
  body: string
  pullQuote?: string          // Large interstitial quote rendered after the body
  pullQuoteCardColor?: string  // When set, renders pull quote inside a full-width card with this bg colour
  options?: DesignOption[]
  inlineImageLayout?: 'square' | 'wide' | 'portrait' | 'tall' | 'ultrawide'
  inlineImage?: string        // path when the real image is available
  inlineImageLabel?: string   // placeholder label (e.g. "McFabels Foods — Image 11")
  appendColorPalette?: boolean // render the project colour palette after this section
  midImageLayout?: 'square' | 'wide' | 'portrait' | 'tall' | 'ultrawide' | 'cinema'
  midImage?: string           // renders between colour palette and appendImage
  midImageLabel?: string
  appendImageLayout?: 'square' | 'wide' | 'portrait' | 'tall' | 'ultrawide' | 'cinema'
  appendImage?: string        // path when the real image is available
  appendImageLabel?: string   // placeholder label (e.g. "McFabels Foods — Image 12")
  pairedImages?: { aspectRatio: 'square' | 'portrait' | 'wide'; image?: string; label?: string }[]  // two images side by side
  prefixImageLayout?: 'square' | 'wide' | 'portrait' | 'tall' | 'ultrawide'
  prefixImage?: string        // renders BEFORE the section heading
  prefixImageLabel?: string
}

export interface Project {
  slug: string
  title: string
  subtitle?: string   // Optional tagline shown beneath the title
  year: string
  client?: string
  sector?: string
  tags: string[]
  description: string
  gradient: [string, string]
  placeholderCount: number
  placeholderLayout: ('square' | 'wide' | 'portrait' | 'tall' | 'banner')[]
  thumbnail?: string                 // Card thumbnail shown on the homepage / work list
  heroImage?: string                 // Full-bleed hero shown at the top of the case study (parallax + fade effect)
  images?: string[]                 // Real image paths (relative to /public). When present, replaces placeholders in order.
  gridLabelOffset?: number          // Shift the auto-generated placeholder label numbers (e.g. 7 → labels start at 8)
  colorPalette?: string[]           // Simple hex array (legacy projects)
  colorSwatches?: ColorSwatch[]     // Rich swatches with names + descriptions
  sections?: ProjectSection[]       // Structured narrative sections
  gridBeforeSections?: boolean      // When true, image grid renders between project details and narrative sections
  imageParallax?: boolean           // When true, all project images (grid + sections) get scroll-zoom parallax
  gridItemLabel?: string            // Label noun used in grid placeholders — defaults to "Image" (use "Video" for video projects)
  itemTitles?: string[]             // Optional per-item titles shown as overlay labels on grid items
  nextProject: string
}

// ── Project data ─────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    slug: 'mcfabels-foods',
    title: 'McFabels Foods',
    subtitle: 'Rooting a modern food brand in the freshness of nature',
    year: '2025',
    client: 'McFabels Foods',
    sector: 'Agriculture & Food Industry',
    tags: ['Brand Identity', 'Visual Design', 'Collaterals'],
    description:
      'McFabels Foods is a dynamic company operating across the full agricultural and food value chain — from cultivation and processing to packaging, storage, and distribution. The goal of this project was to build a complete brand identity from the ground up: one that could speak to the ambition of a company striving to become a leading African food brand, while remaining warm, accessible, and deeply connected to the natural world it draws from. The result is a brand system anchored in growth, reliability, and freshness, expressed through a bold logo mark, a purposeful colour palette, and a full suite of collaterals designed to work seamlessly from product packaging to staff uniforms.',
    thumbnail: '/assets/projects/mcfabels-foods/hero2.jpg',
    heroImage: '/assets/projects/mcfabels-foods/hero2.jpg',
    gradient: ['#4AA312', '#1A351A'],
    placeholderCount: 6,
    placeholderLayout: ['wide', 'wide', 'wide', 'wide', 'wide', 'wide'],
    gridLabelOffset: 14,
    images: [
      '/assets/projects/mcfabels-foods/15.jpg',
      '/assets/projects/mcfabels-foods/16.jpg',
      '/assets/projects/mcfabels-foods/17.jpg',
      '/assets/projects/mcfabels-foods/18.jpg',
      '/assets/projects/mcfabels-foods/19.jpg',
      '/assets/projects/mcfabels-foods/20.jpg',
    ],
    colorSwatches: [
      {
        hex: '#4AA312',
        name: 'Fresh Harvest Green',
        role: 'Primary brand colour',
        description: 'Agriculture, freshness, and growth.',
      },
      {
        hex: '#1A351A',
        name: 'Deep Forest Green',
        role: 'Anchor colour',
        description: 'Reliability, stability, and trust.',
      },
      {
        hex: '#FFFFFF',
        name: 'Pure White',
        role: 'Neutral base',
        description: 'Clarity, cleanliness, and balance.',
      },
      {
        hex: '#D68018',
        name: 'Golden Spice Orange',
        role: 'Accent colour',
        description: 'Warmth and energy for highlights and labels.',
      },
      {
        hex: '#F9BD21',
        name: 'Sunrise Yellow',
        role: 'Supporting accent',
        description: 'Optimism and approachability.',
      },
    ],
    sections: [
      {
        heading: 'The Brief',
        body: "McFabels needed more than a logo — they needed a visual language that could carry the weight of their mission: to strengthen food security, promote local value addition, and make quality food accessible to all. The brand had to feel modern and forward-looking without losing its roots in nature and community.\n\nThe design direction centred on three pillars: satisfaction and reliability, quality and accessibility, and freshness and innovation. Every visual decision had to balance nature with modern enterprise.",
      },
      {
        heading: 'Exploring the Direction',
        body: 'Before arriving at the final identity, three distinct directions were developed and presented to the client. Each one interpreted the brand\'s core values differently.',
        options: [
          {
            label: 'OPTION 01',
            title: 'The "mf" Emblem',
            description:
              'The first concept merged the brand\'s initials — "mf" — into a compact, circular emblem crowned with two sprouting green leaves. The rounded letterforms gave the mark a friendly, contemporary presence.',
          },
          {
            label: 'OPTION 02',
            title: 'The Leaf Wordmark',
            description:
              'The second direction explored a clean, elegant wordmark. A pair of bright green leaves sprouted naturally from between the letters "m" and "c", turning the brand name itself into a living symbol of growth.',
          },
          {
            label: 'OPTION 03',
            title: 'The "M" Emblem with Soil Lines',
            description:
              'The third concept built the identity around a bold, upright "M" with a subtle "f" hidden within its negative space. A sprouting leaf emerged from the top.',
          },
        ],
      },
      {
        heading: 'The Chosen Direction',
        body: 'The client selected Option 01 — the "mf" Emblem — as the foundation of their brand identity. Its balance of friendliness and strength, combined with its adaptability across every touchpoint, made it the strongest fit for a brand operating at scale.\n\nThe circular badge quality of the mark gave it a particularly powerful role in product contexts, where it could serve as both a recognisable logo and an emblem of quality assurance. The two green leaves crown the mark with a clear, immediate signal of what the brand is rooted in: life, cultivation, and the natural world.',
        inlineImageLayout: 'wide',
        inlineImage: '/assets/projects/mcfabels-foods/11b.jpg',
        inlineImageLabel: 'McFabels Foods — Image 11',
        appendColorPalette: true,
        midImageLayout: 'cinema',
        midImage: '/assets/projects/mcfabels-foods/13.jpg',
        midImageLabel: 'McFabels Foods — Image 13',
        appendImageLayout: 'ultrawide',
        appendImage: '/assets/projects/mcfabels-foods/12.webm',
        appendImageLabel: 'McFabels Foods — Image 12',
      },
      {
        heading: 'Brand Collaterals',
        body: 'With the visual identity established, the system was extended across a full suite of branded touchpoints — each one an opportunity to deepen McFabels\' presence in the world.',
        prefixImageLayout: 'wide',
        prefixImage: '/assets/projects/mcfabels-foods/1.jpg',
        prefixImageLabel: 'McFabels Foods — Image 1',
      },
      {
        heading: 'Outcome',
        body: 'McFabels Foods now has a complete brand system built to grow with them — from farm to shelf, from local market to global ambition. Every element of the identity, from the leaf-crowned "mf" emblem to the colour ratios and collateral applications, works together to position McFabels as a modern, dependable, and forward-looking African food brand rooted in the freshness of nature and the reliability of good food.',
      },
    ],
    nextProject: 'merit-and-mark',
  },
  {
    slug: 'merit-and-mark',
    title: 'Merit & Mark',
    subtitle: 'A premium brand identity built on distinction, craftsmanship, and trust.',
    year: '2025',
    client: 'Merit & Mark',
    sector: 'Corporate Gifting',
    tags: ['Brand Identity', 'Logo Design', 'Brand Guidelines'],
    thumbnail: '/assets/projects/merit-and-mark/hero.jpg',
    heroImage: '/assets/projects/merit-and-mark/hero.jpg',
    description:
      'Merit & Mark is a corporate gifting brand committed to meaningful, refined presentation. The goal of this project was to design a visual identity that communicates prestige and permanence without feeling cold or inaccessible. The result is a system anchored by a bespoke monogram emblem, a considered colour palette of warm golds and soft neutrals, and a typographic pairing that balances tradition with modern clarity — a brand that feels as intentional as the gifts it represents.',
    gradient: ['#C9A96E', '#1A1714'],
    placeholderCount: 2,
    placeholderLayout: ['wide', 'banner'],
    images: [
      '/assets/projects/merit-and-mark/1 copy.jpg',
      '/assets/projects/merit-and-mark/2 copy.jpg',
    ],
    gridBeforeSections: true,
    imageParallax: true,
    sections: [
      {
        heading: '',
        body: '',
        pullQuote: 'The M&M monogram emblem was crafted to symbolise connection and partnership — its soft-edged enclosure lending structure and trust to every touchpoint.',
        pullQuoteCardColor: '#191818',
      },
      { heading: '', body: '', prefixImageLayout: 'wide', prefixImage: '/assets/projects/merit-and-mark/3.jpg', prefixImageLabel: 'Merit & Mark — Image 3' },
      { heading: '', body: '', prefixImageLayout: 'wide', prefixImage: '/assets/projects/merit-and-mark/4.jpg', prefixImageLabel: 'Merit & Mark — Image 4' },
      { heading: '', body: '', prefixImageLayout: 'wide', prefixImage: '/assets/projects/merit-and-mark/5.jpg', prefixImageLabel: 'Merit & Mark — Image 5' },
      { heading: '', body: '', prefixImageLayout: 'wide', prefixImage: '/assets/projects/merit-and-mark/6.jpg', prefixImageLabel: 'Merit & Mark — Image 6' },
      {
        heading: '',
        body: '',
        pairedImages: [
          { aspectRatio: 'square', image: '/assets/projects/merit-and-mark/8.jpg', label: 'Merit & Mark — Image 8' },
          { aspectRatio: 'square', image: '/assets/projects/merit-and-mark/9.jpg', label: 'Merit & Mark — Image 9' },
        ],
      },
      { heading: '', body: '', prefixImageLayout: 'wide', prefixImage: '/assets/projects/merit-and-mark/7.jpg', prefixImageLabel: 'Merit & Mark — Image 7' },
    ],
    nextProject: 'creative-africa-exchange',
  },
  {
    slug: 'creative-africa-exchange',
    title: 'The Creative Africa Exchange',
    thumbnail: '/assets/projects/creative-africa-exchange/1.gif',
    year: '2020',
    tags: ['Event Branding', 'Social Media', 'Digital Strategy', 'Media Kit'],
    description:
      'The Creative Africa Exchange is a pan-African event for the entertainment and creative industry, organised by Times Multimedia and sponsored by Afreximbank. Engaged to handle digital strategy, event branding, and social media communications for the second edition held in Kigali, Rwanda (January 17–18, 2020). Outstanding results led to an ongoing engagement under Smartedge agency for digital media activities.',
    gradient: ['#C41230', '#1A1A2E'],
    placeholderCount: 6,
    placeholderLayout: ['wide', 'wide', 'wide', 'wide', 'square', 'square'],
    images: [
      '/assets/projects/creative-africa-exchange/1.gif',
      '/assets/projects/creative-africa-exchange/2.jpg',
      '/assets/projects/creative-africa-exchange/3.jpg',
      '/assets/projects/creative-africa-exchange/4.jpg',
      '/assets/projects/creative-africa-exchange/5.jpg',
      '/assets/projects/creative-africa-exchange/6.jpg',
    ],
    nextProject: 'brand-and-stitch',
  },
  {
    slug: 'brand-and-stitch',
    title: 'Brand & Stitch',
    thumbnail: '/assets/projects/brand-and-stitch/02.jpg',
    year: '2020',
    tags: ['Packaging Design', 'Social Media', 'Web Banners', 'Lead Generation'],
    description:
      'In the wake of Covid-19, Brand & Stitch pivoted to create customised face masks for companies and organisations. Designed the product packaging and social media creatives for their awareness and lead generation campaign. Also created social media and website visuals for their broader clothing line including jumpsuits and t-shirts.',
    gradient: ['#1A3A5C', '#2D6A4F'],
    placeholderCount: 6,
    placeholderLayout: ['wide', 'wide', 'square', 'square', 'square', 'wide'],
    images: [
      '/assets/projects/brand-and-stitch/01.jpg',
      '/assets/projects/brand-and-stitch/02.jpg',
      '/assets/projects/brand-and-stitch/03.jpg',
      '/assets/projects/brand-and-stitch/04.jpg',
      '/assets/projects/brand-and-stitch/05.jpg',
      '/assets/projects/brand-and-stitch/06.jpg',
    ],
    nextProject: 'global-accelerex',
  },
  {
    slug: 'global-accelerex',
    title: 'Global Accelerex',
    year: '2019–2021',
    tags: ['Social Media', 'Newsletter', 'Marketing Documents', 'Internal Comms'],
    description:
      'Global Accelerex is a leading provider of electronic payment and financial technology solutions across Nigeria, Ghana & Kenya. After an agency failed to deliver on time and quality, I took over all digital media output solely for 2+ years — creating marketing documents for their products, internal and external communications, social media flyers, profiles, magazines, and more.',
    gradient: ['#C41230', '#0D0D14'],
    placeholderCount: 10,
    placeholderLayout: ['square', 'square', 'square', 'square', 'wide', 'wide', 'square', 'square', 'square', 'square'],
    images: [
      '/assets/projects/global-accelerex/03.jpg',
      '/assets/projects/global-accelerex/04.jpg',
      '/assets/projects/global-accelerex/05.jpg',
      '/assets/projects/global-accelerex/10.jpg',
      '/assets/projects/global-accelerex/01.jpg',
      '/assets/projects/global-accelerex/02.jpg',
      '/assets/projects/global-accelerex/06.jpg',
      '/assets/projects/global-accelerex/07.jpg',
      '/assets/projects/global-accelerex/08.jpg',
      '/assets/projects/global-accelerex/09.jpg',
    ],
    nextProject: 'prints-social-media',
  },
  {
    slug: 'prints-social-media',
    title: 'Prints & Social Media Projects',
    year: '2019–2024',
    tags: ['Print Design', 'Social Media', 'Various Clients'],
    description:
      'A collection of print and social media design work across various clients and sectors — including product packaging, event flyers, church communications, and promotional social media posts.',
    gradient: ['#2C2C3E', '#1A1A2E'],
    placeholderCount: 18,
    placeholderLayout: ['square', 'square', 'wide', 'wide', 'square', 'square', 'square', 'square', 'tall', 'tall', 'square', 'square', 'square', 'square', 'square', 'square', 'square', 'square'],
    images: [
      '/assets/projects/prints-social-media/01.jpg',
      '/assets/projects/prints-social-media/03.jpg',
      '/assets/projects/prints-social-media/02.jpg',
      '/assets/projects/prints-social-media/04.png',
      '/assets/projects/prints-social-media/05.jpg',
      '/assets/projects/prints-social-media/06.jpg',
      '/assets/projects/prints-social-media/07.jpg',
      '/assets/projects/prints-social-media/18.jpg',
      '/assets/projects/prints-social-media/08.jpg',
      '/assets/projects/prints-social-media/09.jpg',
      '/assets/projects/prints-social-media/10.jpg',
      '/assets/projects/prints-social-media/11.jpg',
      '/assets/projects/prints-social-media/12.jpg',
      '/assets/projects/prints-social-media/13.jpg',
      '/assets/projects/prints-social-media/14.jpg',
      '/assets/projects/prints-social-media/15.jpg',
      '/assets/projects/prints-social-media/16.jpg',
      '/assets/projects/prints-social-media/17.jpg',
    ],
    nextProject: 'video-projects',
  },
  {
    slug: 'video-projects',
    title: 'Video Projects',
    year: '2019–2025',
    tags: ['Video Production', 'Motion Design', 'Brand Film'],
    description:
      'A collection of video and motion projects across various clients and sectors — including brand films, social media videos, motion graphics, and event highlights.',
    gradient: ['#1A1A2E', '#2C1A4A'],
    placeholderCount: 7,
    placeholderLayout: ['wide', 'wide', 'wide', 'wide', 'wide', 'wide', 'wide'],
    gridItemLabel: 'Video',
    images: [
      'https://youtu.be/wj04KlM7-VQ',
      'https://youtu.be/KkQvHKKDSvI',
      'https://youtu.be/oeIq5MKRz0M',
      'https://youtu.be/PfppRz5al_A',
      'https://youtu.be/LJ7jJjBNoDc',
      'https://youtu.be/iosrVDL6qFM',
      'https://youtu.be/_ZC_MR2zNlA',
    ],
    nextProject: 'mcfabels-foods',
  },
]
