import { Button } from '@/components/ui/button'
import './page.css'
import { Project } from '@/types/Project.types'
import { ProjectCard } from '@/components/project-card'
import { url } from 'inspector'
import { CalendarIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import events from 'events'

const projects: Array<Project> = [
  {
    name: 'Artkipelago',
    description:
      'Customized an online educational platform for aspiring creatives, offering various courses and virtual workshops using Thinkific.',
    url: 'http://web.archive.org/web/20221128085646/https://www.artkipelago.com/',
    coverImageSrc: '/images/artkipelago.com.jpg',
    techStack: ['CSS', 'HTML', 'JavaScript', 'Liquid', 'Thinkific']
  },
  {
    name: 'AQWIRE Payment Portal',
    description:
      'Built the auto-debit facility of their cross border payments platform. Also, helped their team migrate the web app into a single-instance payment portal for all clients.',
    url: 'https://reversenumber.org',
    coverImageSrc: '/images/pay.aqwire.io.jpg',
    techStack: [
      'Angular',
      'Ant Design',
      'Bottle',
      'Gitlab',
      'MongoDB',
      'Python',
      'Stripe'
    ]
  },
  {
    name: 'Athena Playbook Library',
    description:
      'A digital library of playbooks for mastering delegation. Built the web app with React. This uses Contentful for managing the Playbooks content of athenago.com.',
    url: 'https://playbooks.athenago.com',
    coverImageSrc: '/images/playbooks.athenago.com.jpg',
    techStack: [
      'Contentful',
      'ESLint',
      'Firebase',
      'GitHub Actions',
      'MobX',
      'Percy',
      'React',
      'Sentry',
      'Tailwind CSS',
      'TanStack Query'
    ]
  },
  {
    name: 'The HIVE Virtual Events Hub',
    description:
      'Co-developed a 3D-rendered virtual events platform with system integrators, providing a personalized and immersive events experience during the pandemic.',
    url: 'https://www.facebook.com/weareliveph/videos/936486463619244',
    coverImageSrc: '/images/livehive.ph.jpg',
    techStack: [
      'AWS EC2',
      'Express',
      'Nuxt',
      'PostgreSQL',
      'Socket.io',
      'Strapi',
      'Vue'
    ]
  },
  {
    name: 'nftreats.art NFT Marketplace (NSFW)',
    description:
      'A NFT marketplace for erotic art creators. Consulted for the Treat Factory to build an inclusive, passionate, and open Web3 platform for lovers and creators of erotic art.',
    url: 'https://market.nftreats.art',
    coverImageSrc: '/images/nftreats.art.webp',
    techStack: [
      'ESLint',
      'Ethers.js',
      'GitHub Actions',
      'Nuxt.js',
      'Percy',
      'Polygon (Matic)',
      'Solidity',
      'Tailwind CSS',
      'Truffle',
      'Wallet Connect'
    ]
  },
  {
    name: 'ReverseNumber.org',
    description:
      'A reverse lookup online service. Designed solutions and led the modernization of reverse lookup services.',
    url: 'https://reversenumber.org',
    coverImageSrc: '/images/reversenumber.org.jpg',
    techStack: [
      'CSS',
      'GitHub',
      'HTML',
      'JavaScript',
      'MySQL',
      'PayPal',
      'PHP',
      'Stripe',
      'Twilio'
    ]
  },
  {
    name: 'STIHL iMow Web App',
    description:
      "A web app for managing and controlling a user's iMow Robot Mowers.",
    url: 'https://app.imow.stihl.com',
    coverImageSrc: '/images/app.imow.stihl.com.jpg',
    techStack: ['Angular', 'Bootstrap', 'Firebase', 'Git', 'PHP', 'Symfony']
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
