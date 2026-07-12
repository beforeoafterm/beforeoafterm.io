import { Button } from '@/components/ui/button'
import './page.css'
import { Project } from '@/types/Project.types'
import { ProjectCard } from '@/components/project-card'
import { CalendarIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

const projects: Array<Project> = [
  {
    name: 'Once Upon a Desk',
    description:
      'A cozy, no-fail 3D co-op browser game for two kids on one keyboard. Designed and tested through agent workflows, with a headless harness for deterministic, frame-by-frame verification.',
    url: 'https://once-upon-a-desk.vercel.app',
    coverImageSrc: '/images/once-upon-a-desk.jpg',
    techStack: [
      'React Three Fiber',
      'Rapier',
      'Three.js',
      'TypeScript',
      'Vite',
      'Vitest',
      'Zustand'
    ]
  },
  {
    name: 'Broker Copilot',
    description:
      'A self-initiated system design for an AI copilot for commercial insurance brokers. The first solution was handed to 13 adversarial AI agents that found two fatal flaws; both were rebuilt before ship. The method is the asset.',
    url: 'https://github.com/beforeoafterm/broker-copilot',
    coverImageSrc: '/images/broker-copilot.svg',
    coverFit: 'contain',
    techStack: [
      'System Design',
      'AI Agents',
      'Adversarial Review',
      'Product Strategy'
    ]
  },
  {
    name: 'Tioi Network',
    description:
      'The live marketing site for Tioi Network: a CI-gated, Lighthouse-budgeted Next.js build with a procedural canvas hero. The front door of an agent-orchestrated delivery workspace.',
    url: 'https://tioi.network',
    coverImageSrc: '/images/tioi.network.jpg',
    techStack: [
      'Next.js',
      'React',
      'Tailwind CSS',
      'TypeScript',
      'Playwright',
      'Vercel'
    ]
  },
  {
    name: 'W3.io',
    description:
      'A Web3 protocol and workflow-automation platform. Led the 7-person partner-integrations team, shipping the SDKs, actions, and onboarding that bring third-party teams onto the protocol.',
    url: 'https://w3.io',
    coverImageSrc: '/images/w3.io.jpg',
    techStack: [
      'Avalanche',
      'GitHub Actions',
      'Go',
      'MCP',
      'Solidity',
      'TypeScript'
    ]
  },
  {
    name: 'Dealsync',
    description:
      'Dealsync, the professional creator inbox: an AI-powered email tool that sorts brand opportunities and tracks partnerships so creators stop drowning in their inbox. Work spans the Node.js/Fastify microservices and the Dealsync 2.0 move to a Supabase-primary data architecture.',
    url: 'https://dealsync.creatorland.com',
    coverImageSrc: '/images/dealsync.creatorland.com.jpg',
    techStack: [
      'Fastify',
      'Google APIs',
      'Node.js',
      'Space and Time',
      'Supabase',
      'TypeScript'
    ]
  },
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
    url: 'https://pay.aqwire.io',
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
      'Jest',
      'MobX',
      'Percy',
      'React',
      'Sentry',
      'Tailwind CSS',
      'TanStack Query',
      'TypeScript'
    ]
  },
  {
    name: 'Athena Web Component Library',
    description:
      'A UI Kit to maintain design consistency across all Athena web products. Developed the library with React and Storybook.',
    url: 'https://web-component-library.web.app',
    coverImageSrc: '/images/web-component-library.web.app.jpg',
    techStack: [
      'ESLint',
      'Firebase',
      'GitHub Actions',
      'Jest',
      'React',
      'Rollup',
      'Storybook',
      'Tailwind CSS',
      'TypeScript'
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
    coverImageSrc: '/images/market.nftreats.art.jpg',
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
      'A reverse lookup SaaS platform. Designed solutions and led the modernization of reverse lookup online services.',
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
          href="https://calendly.com/n-tioi-network/intro-call"
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
            priority={index < 2}
          />
        ))}
      </div>
    </section>
  )
}
