'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'

function computeDark(): boolean {
  try {
    const stored = localStorage.getItem('theme')
    if (stored) return stored === 'dark'
  } catch {}
  return matchMedia('(prefers-color-scheme: dark)').matches
}

function applyTheme(dark: boolean) {
  document.documentElement.classList.toggle('dark', dark)
  document.documentElement.classList.toggle('light', !dark)
}

// the pre-paint script in the layout handles first paint; this component
// re-applies the class after hydration and on route changes, because React's
// re-render of <html> on not-found/error documents wipes script-set classes
export function ThemeToggle() {
  const pathname = usePathname()
  const [isDark, setIsDark] = useState<boolean | null>(null)
  useEffect(() => {
    const dark = computeDark()
    applyTheme(dark)
    setIsDark(dark)
  }, [pathname])
  if (isDark === null) {
    return <span className="inline-block h-6 w-6" aria-hidden />
  }
  const toggle = () => {
    const next = !isDark
    applyTheme(next)
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light')
    } catch {}
    setIsDark(next)
  }
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="text-muted-foreground transition-colors duration-300 hover:text-foreground"
    >
      {isDark ? (
        <SunIcon className="h-6 w-6" />
      ) : (
        <MoonIcon className="h-6 w-6" />
      )}
    </button>
  )
}
