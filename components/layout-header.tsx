import { GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons'
import XLogoIcon from '@/components/icons/x-logo-icon'
import Link from 'next/link'
import { Navbar } from './nav'

export function LayoutHeader() {
  return (
    <header>
      <div>
        <Link href="/" className="no-underline hover:text-primary">
          <h1 className="mb-2 font-slabSerif font-bold lg:text-4xl">
            Ronneil Petterson
          </h1>
        </Link>
        <h2 className="mb-4 font-serif font-bold lg:text-xl">
          Software engineer &amp; mentor
        </h2>
        <p className="text-muted-foreground lg:text-lg">
          I solve technical problems with user-centered solutions.
        </p>
      </div>
      <div className="flex-grow">
        <Navbar />
      </div>
      <div className="my-8 flex gap-6">
        <a
          href="https://github.com/beforeoafterm"
          target="_blank"
          className="text-[#368F8B] hover:text-primary"
        >
          <GitHubLogoIcon className="h-6 w-6" />
        </a>
        <a
          href="https://linkedin.com/in/beforeoafterm"
          target="_blank"
          className="text-[#368F8B] hover:text-primary"
        >
          <LinkedInLogoIcon className="h-6 w-6" />
        </a>
        <a
          href="https://x.com/beforeoafterm"
          target="_blank"
          className="text-[#368F8B] hover:text-primary"
        >
          <XLogoIcon className="h-6 w-6" />
        </a>
      </div>
    </header>
  )
}
