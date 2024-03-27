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
  }
}

export function Navbar() {
  const pathname = usePathname()
  return (
    <nav className="hidden lg:my-12 lg:flex lg:flex-col lg:gap-2">
      {Object.entries(navItems).map(([path, { name }]) => {
        return (
          <Link
            key={path}
            href={path}
            className={cx(
              'relative flex w-fit select-none py-1 align-middle font-serif text-xl font-bold tracking-tighter',
              {
                'pointer-events-none underline hover:text-foreground':
                  pathname === path,
                'text-[#368F8B] no-underline hover:text-foreground':
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
