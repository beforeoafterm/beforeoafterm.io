'use client'

import { cx } from 'class-variance-authority'
import { motion } from 'framer-motion'
import { Link } from 'next-view-transitions'
import { usePathname } from 'next/navigation'
import { DUR, EASE } from '@/lib/motion'

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
        // active = this section (subtree) is lit; current = exactly this page
        const isActive =
          path === '/' ? pathname === '/' : pathname.startsWith(path)
        const isCurrent = pathname === path
        return (
          <Link
            key={path}
            href={path}
            aria-current={isCurrent ? 'page' : undefined}
            className={cx(
              'relative flex w-fit select-none items-center py-1 pl-5 align-middle font-slabSerif text-xl font-bold tracking-tighter no-underline transition-colors duration-300',
              {
                'text-foreground': isActive,
                'pointer-events-none': isCurrent,
                'text-muted-foreground hover:text-foreground': !isActive
              }
            )}
          >
            {isActive && (
              <motion.span
                layoutId="nav-indicator"
                aria-hidden
                className="absolute left-0 h-1.5 w-1.5 rounded-full bg-secondary"
                transition={{ duration: DUR.base, ease: EASE }}
              />
            )}
            {name}
          </Link>
        )
      })}
    </nav>
  )
}
