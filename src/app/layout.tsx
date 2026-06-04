import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ThemeProvider from '@/components/ThemeProvider'

export const metadata: Metadata = {
  title: 'Victor Obukomena — Graphic Designer & Digital Communications Specialist',
  description:
    'Victor Obukomena is a graphic designer and digital communications specialist based in Lagos, Nigeria. Specialising in branding, motion graphics, and digital strategy.',
  keywords: ['graphic designer', 'digital communications', 'Lagos', 'Nigeria', 'branding', 'motion graphics'],
  openGraph: {
    title: 'Victor Obukomena',
    description: 'Graphic Designer & Digital Communications Specialist, Lagos Nigeria.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* General Sans from Fontshare — no Google Fonts */}
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=general-sans@700,600,500,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased transition-colors duration-300">
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');document.documentElement.classList.toggle('dark',t?t==='dark':true)}catch(e){document.documentElement.classList.add('dark')}})()`,
          }}
        />
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
