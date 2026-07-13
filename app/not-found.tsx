import { ArrowRightIcon } from '@radix-ui/react-icons'
import { BackLink } from '@/components/back-link'
import { Button } from '@/components/ui/button'
import { Link } from 'next-view-transitions'

export default function NotFound() {
  return (
    <section className="flex w-full flex-col gap-6">
      <h1 className="text-balance font-serif tracking-tight [font-size:clamp(2.5rem,6vw,5.5rem)] [line-height:1.02]">
        Lost? That page is a <span className="_highlight">404</span>.
      </h1>
      <p className="max-w-[62ch] text-lg leading-relaxed text-muted-foreground">
        It doesn't exist. It could, though; building things that don't exist
        yet is the whole job.
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-4">
        <Button asChild variant="outline" size="sm">
          <Link className="no-underline hover:text-primary-foreground" href="/">
            Back to start
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <BackLink href="/projects" label="Or see my projects" />
      </div>
    </section>
  )
}
