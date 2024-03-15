import './global.css'
import type { Metadata } from 'next'
import { Aleo as FontSlabSerif, Quicksand as FontSerif } from 'next/font/google'
import { Navbar } from './components/nav'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { SandpackCSS } from './blog/[slug]/sandpack'
import { cx } from 'lib/classnames'

const fontSlabSerif = FontSlabSerif({
  subsets: ['latin'],
  variable: '--font-slab-serif'
})
const fontSerif = FontSerif({
  subsets: ['latin'],
  variable: '--font-serif'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://beforeoafterm.tioi.network'),
  title: {
    default: 'Ronneil Petterson',
    template: '%s | Ronneil Petterson'
  },
  description: 'Software engineer, founder, and mentor.',
  openGraph: {
    title: 'Ronneil Petterson',
    description: 'Software engineer, founder, and mentor.',
    url: 'https://beforeoafterm.tioi.network',
    siteName: 'Ronneil Petterson',
    locale: 'en_US',
    type: 'website'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  twitter: {
    title: 'Ronneil Petterson',
    card: 'summary_large_image'
  },
  verification: {
    google: 'eZSdmzAXlLkKhNJzfgwDqWORghxnJ8qR9_CHdAh5-xw',
    yandex: '14d2e73487fa6c71'
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cx(fontSlabSerif.variable, fontSerif.variable)}>
      <head>
        <SandpackCSS />
      </head>
      <body>
        <main>
          <Navbar />
          {children}
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  )
}
