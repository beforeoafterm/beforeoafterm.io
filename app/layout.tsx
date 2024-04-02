import './global.css'
import type { Metadata } from 'next'
import { Aleo as FontSlabSerif, Quicksand as FontSerif } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { SandpackCSS } from '@/app/blog/[slug]/sandpack'
import { LayoutHeader } from '@/components/layout-header'
import { cn } from '@/lib/utils'
import Cursor from '@/components/cursor'

const fontSlabSerif = FontSlabSerif({
  subsets: ['latin'],
  variable: '--font-slab-serif'
})
const fontSerif = FontSerif({
  subsets: ['latin'],
  variable: '--font-serif'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://beforeoafterm-io.vercel.app'),
  title: {
    default: 'Ronneil Petterson',
    template: '%s | Ronneil Petterson'
  },
  description: 'Software engineer, technical leader, and mentor.',
  openGraph: {
    title: 'Ronneil Petterson',
    description: 'Software engineer, technical leader, and mentor.',
    url: 'https://beforeoafterm-io.vercel.app',
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
    <html lang="en" className={cn(fontSlabSerif.variable, fontSerif.variable)}>
      <head>
        <SandpackCSS />
      </head>
      <body>
        <LayoutHeader />
        <main>{children}</main>
        {/* <footer className="RootLayout_footer sticky bottom-0 border border-b-0 border-muted bg-background p-4 drop-shadow-2xl">
          <Navbar />
        </footer> */}
        <Analytics />
        <SpeedInsights />
        <Cursor />
      </body>
    </html>
  )
}
