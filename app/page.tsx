'use client'

import { Button } from '@/components/ui/button'
import styles from './page.module.css'
import {
  ArrowRightIcon,
  CalendarIcon,
  LinkedInLogoIcon
} from '@radix-ui/react-icons'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()
  return (
    <section className={styles.Home}>
      <div className={styles.Home_content}>
        <h1 className={styles.Home_headingText}>
          Hello, you may call me <strong className="font-slabSerif">N</strong>.
          👋🏼
        </h1>
        <p className={styles.Home_subheadingText}>
          I am an agent-native engineering leader based in the Philippines. 13+
          years across fintech, Web3, and SaaS, most recently leading
          engineering at W3.io and AR Data.
        </p>
        <p className={styles.Home_subheadingText}>
          I run AI-native delivery, where a small pod of agents owns scoped
          features end to end, and I stay close enough to the code to make the
          build-vs-buy calls myself. Available now, open to fractional or
          interim-to-permanent.
        </p>
        <div className={styles.Home_cta}>
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
          <Button asChild variant="link" size="sm">
            <Link
              className="no-underline"
              target="_blank"
              href="https://linkedin.com/in/beforeoafterm"
            >
              Connect with me on LinkedIn
              <LinkedInLogoIcon className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
      <Button
        className="mx-auto my-6 w-fit md:mr-0"
        onClick={() => router.push('/projects')}
      >
        Check my projects
        <ArrowRightIcon className="ml-2 h-4 w-4" />
      </Button>
    </section>
  )
}
