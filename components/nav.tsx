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
  }
}

export function Navbar() {
  const pathname = usePathname()
  return (
    <footer className="sticky bottom-0 border border-b-0 border-muted bg-background p-4 drop-shadow-2xl">
      <nav
        className="fade relative flex scroll-pr-6 flex-row items-start"
        id="nav"
      >
        <div className="flex flex-row justify-between">
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
        </div>
      </nav>
    </footer>
  )
}
