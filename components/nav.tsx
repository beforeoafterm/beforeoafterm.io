'use client'

import { cx } from 'class-variance-authority'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = {
  '/': {
    name: 'about'
  },
  '/projects': {
    name: 'projects'
  },
  '/work': {
    name: 'work'
  },
  '/blog': {
    name: 'blog'
  },
  '/meet': {
    name: 'meet me'
  }
}

export function Navbar() {
  const pathname = usePathname()
  return (
    <nav className="flex flex-wrap items-start justify-center gap-4">
      {Object.entries(navItems).map(([path, { name }]) => {
        return (
          <Link
            key={path}
            href={path}
            className={cx(
              'relative flex select-none px-3 py-1 align-middle text-base font-bold tracking-tighter ',
              {
                'pointer-events-none underline hover:text-foreground':
                  pathname === path,
                'text-muted-foreground no-underline hover:text-foreground':
                  pathname !== path
              }
            )}
          >
            {name}
          </Link>
        )
      })}
    </nav>
  )
}
