import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'
import typography from '@tailwindcss/typography'

export default {
  content: ['./app/**/*.{ts,tsx}', './content/**/*.mdx', './public/**/*.svg'],
  theme: {
    extend: {
      fontFamily: {
        slabSerif: ['var(--font-slab-serif)', ...fontFamily.serif],
        serif: ['var(--font-serif)', ...fontFamily.serif]
      }
    }
  },
  future: {
    hoverOnlyWhenSupported: true
  },
  plugins: [typography]
} satisfies Config
