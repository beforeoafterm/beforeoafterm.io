import { Button } from '@/components/ui/button'
import './page.css'
import { ClosingSection } from '@/components/closing-section'
import { ProjectCard } from '@/components/project-card'
import { projects } from '@/lib/projects'
import { CALENDLY_URL } from '@/lib/site'
import { CalendarIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

export const metadata = {
  title: 'Projects',
  description:
    'Selected work across fintech, Web3, and AI, from flagship builds to earlier client projects.',
  openGraph: {
    images: ['/og?title=Projects&kicker=Selected work']
  }
}

export default function Page() {
  return (
    <section className="ProjectsPage">
      <h1 className="ProjectsPage_headingText">Projects</h1>
      <p className="ProjectsPage_subheadingText">
        Interested to hear war stories about any of my projects? Let's talk
        about it. I'm happy to share my experiences and learnings from building
        these wonderful products.
      </p>
      <Button asChild variant="outline" size="sm">
        <Link
          className="no-underline hover:text-primary-foreground"
          target="_blank"
          href={CALENDLY_URL}
        >
          Book a call with me
          <CalendarIcon className="ml-2 h-4 w-4" />
        </Link>
      </Button>
      <div className="ProjectsPage_grid">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.url}
            project={project}
            index={index}
            featured={index === 0}
          />
        ))}
      </div>
      <ClosingSection />
    </section>
  )
}
