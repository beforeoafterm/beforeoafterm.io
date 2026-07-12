import {
  CalendarIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon
} from '@radix-ui/react-icons'
import { Button } from './ui/button'
import { CALENDLY_URL } from '@/lib/site'

export function ClosingSection() {
  return (
    <section className="mt-20 border-t border-foreground/10 pt-10 lg:mt-28 lg:pt-14">
      <h2 className="mb-6 text-3xl lg:text-5xl">Let's build something.</h2>
      <div className="flex flex-wrap items-center gap-6">
        <Button asChild variant="outline" size="sm">
          <a
            className="no-underline hover:text-primary-foreground"
            href={CALENDLY_URL}
            target="_blank"
            rel="noreferrer"
          >
            Book a call with me
            <CalendarIcon className="ml-2 h-4 w-4" />
          </a>
        </Button>
        <a
          href="https://github.com/beforeoafterm"
          target="_blank"
          rel="noreferrer"
          className="text-muted-foreground hover:text-foreground"
        >
          <GitHubLogoIcon className="h-6 w-6" />
        </a>
        <a
          href="https://linkedin.com/in/beforeoafterm"
          target="_blank"
          rel="noreferrer"
          className="text-muted-foreground hover:text-foreground"
        >
          <LinkedInLogoIcon className="h-6 w-6" />
        </a>
      </div>
      <p className="mt-10 font-slabSerif text-xs uppercase tracking-widest text-muted-foreground">
        Set in Fraunces &amp; Aleo · Built with Next.js · Shipped by an agent
        pod
      </p>
    </section>
  )
}
