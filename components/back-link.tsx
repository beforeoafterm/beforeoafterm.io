'use client'

import { Link } from 'next-view-transitions'
import { ArrowLeftIcon } from '@radix-ui/react-icons'

// client boundary so the view-transition Link intercepts the click
// (rendered straight from a server component it routes without morphing)
export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="flex w-fit items-center gap-2 font-slabSerif text-sm uppercase tracking-widest text-muted-foreground no-underline hover:text-foreground"
    >
      <ArrowLeftIcon className="h-4 w-4" />
      {label}
    </Link>
  )
}
