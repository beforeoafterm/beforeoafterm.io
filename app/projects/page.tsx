import { Button } from '@/components/ui/button'
import './page.css'
import { Project } from '@/types/Project.types'
import { ProjectCard } from '@/components/project-card'
import { url } from 'inspector'
import { CalendarIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

const projects: Array<Project> = [
  {
    name: 'A digital library of playbooks for mastering delegation',
    description:
      'Built the frontend with React to use Contentful for publishing and managing the Playbooks content of athenago.com.',
    url: 'https://playbooks.athenago.com',
    coverImageSrc: '/images/playbooks.athenago.com.jpg',
    techStack: [
      'Contentful',
      'ESLint',
      'Firebase',
      'GitHub Actions',
      'Mixpanel',
      'Percy',
      'React',
      'Sentry',
      'Tailwind CSS',
      'TanStack Query'
    ]
  },
  {
    name: 'A NFT marketplace for erotic art creators (NSFW)',
    description:
      'Consulted for The Treat Factory to build an inclusive, passionate, and open Web3 platform for lovers and creators of erotic art.',
    url: 'https://market.nftreats.art',
    coverImageSrc: '/images/nftreats.art.webp',
    techStack: [
      'ESLint',
      'ethereumjs',
      'GitHub Actions',
      'Nuxt.js',
      'Solidity',
      'Percy',
      'Polygon (Matic)',
      'Tailwind CSS',
      'Truffle'
    ]
  },
  {
    name: 'A learning platform for recording artists',
    description:
      'Developed an online educational platform for creatives, offering various courses and workshops using Thinkific.',
    url: 'http://web.archive.org/web/20221128085646/https://www.artkipelago.com/',
    coverImageSrc: '/images/artkipelago.com.jpg',
    techStack: ['PHP', 'Thinkific', 'CSS', 'HTML', 'JavaScript']
  }
]

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
          href="https://calendly.com/n-tioi-network/meet-greet"
        >
          Book a call with me
          <CalendarIcon className="ml-2 h-4 w-4" />
        </Link>
      </Button>
      <div className="ProjectsPage_grid">
        {projects.map((project) => (
          <ProjectCard key={project.url} project={project} />
        ))}
      </div>
    </section>
  )
}
