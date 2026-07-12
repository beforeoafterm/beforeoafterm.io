import { GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons'
import XLogoIcon from '@/components/icons/x-logo-icon'
import { Link } from 'next-view-transitions'
import { LocalTime } from './local-time'
import { Navbar } from './nav'

export function LayoutHeader() {
  return (
    <header>
      <div>
        <Link href="/" className="no-underline hover:text-primary">
          <h1 className="mb-2 font-bold lg:text-4xl">Ronneil Petterson</h1>
        </Link>
        <h2 className="mb-4 font-serif text-lg font-bold lg:text-xl">
          Engineering leader, hands-on with agents
        </h2>
        <p className="text-muted-foreground lg:text-lg">
          13+ years across fintech, Web3, and AI. Available now, open to
          fractional or interim-to-permanent.
        </p>
        <p className="mt-4 flex items-center gap-2 font-slabSerif text-xs uppercase tracking-widest text-muted-foreground">
          <span aria-hidden className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75 motion-safe:animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary" />
          </span>
          Available now
        </p>
      </div>
      <div className="flex-grow">
        <Navbar />
      </div>
      <div className="my-8 flex flex-col gap-4">
        <div className="flex gap-6">
          <a
            href="https://github.com/beforeoafterm"
            target="_blank"
            className="text-muted-foreground hover:text-foreground"
          >
            <GitHubLogoIcon className="h-6 w-6" />
          </a>
          <a
            href="https://linkedin.com/in/beforeoafterm"
            target="_blank"
            className="text-muted-foreground hover:text-foreground"
          >
            <LinkedInLogoIcon className="h-6 w-6" />
          </a>
          <a
            href="https://x.com/beforeoafterm"
            target="_blank"
            className="text-muted-foreground hover:text-foreground"
          >
            <XLogoIcon className="h-6 w-6" />
          </a>
        </div>
        <LocalTime />
      </div>
    </header>
  )
}
