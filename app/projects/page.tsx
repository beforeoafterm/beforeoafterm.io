import { Button } from '@/components/ui/button'
import './page.css'
import { Project } from '@/types/Project.types'
import { ProjectCard } from '@/components/project-card'

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
    name: 'A NFT marketplace for adult content creators',
    description:
      'nftreats.art aims to provide an inclusive, passionate, and open platform for lovers and creators of erotic arts.',
    url: 'https://market.nftreats.art',
    coverImageSrc: '/images/zendmo.png',
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
    name: 'Tioi Network',
    description: 'Talent management focused on remote work productivity',
    url: 'https://tioi.network',
    coverImageSrc: '/images/zendmo.png',
    techStack: [
      'React',
      'Contentful',
      'Firebase',
      'Tailwind CSS',
      'Percy',
      'TanStack Query',
      'GitHub Actions',
      'Sentry'
    ]
  }
]

export default function Page() {
  return (
    <section className="ProjectsPage">
      <h1 className="ProjectsPage_headingText">Projects</h1>
      <div className="Projects">
        {projects.map((project) => (
          <ProjectCard key={project.url} project={project} />
        ))}
      </div>
    </section>
  )
}
