'use client'

import { Button } from '@/components/ui/button'
import styles from './page.module.css'
import {
  ArrowRightIcon,
  EyeOpenIcon,
  LinkedInLogoIcon
} from '@radix-ui/react-icons'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()
  return (
    <section className={styles.Home}>
      <h1 className={styles.Home_headingText}>
        Hello, you may call me <strong className="font-slabSerif">N</strong>. 👋🏼
      </h1>
      <p className={styles.Home_subheadingText}>
        I am a Philippine-based software engineer, technical leader & mentor.
      </p>
      <p className={styles.Home_subheadingText}>
        I work with people to build scalable full-stack systems and co-found
        companies working on fintech, Web3, and remote team productivity.
      </p>
      <div className={styles.Home_cta}>
        <Button asChild size="sm">
          <Link
            className="no-underline hover:text-primary-foreground"
            target="_blank"
            href="https://linkedin.com/in/beforeoafterm"
          >
            Connect with me on LinkedIn
            <LinkedInLogoIcon className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <Button asChild variant="link" size="sm">
          <Link
            className="no-underline"
            target="_blank"
            href="https://1drv.ms/b/s!Ar9Jwg9549pZgf5VAUAUEA6B-PAPQQ?e=2Kt90m"
          >
            View my resume
            <EyeOpenIcon className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
      <Button
        variant="link"
        className="mx-auto mt-8 w-fit md:mr-0"
        onClick={() => router.push('/projects')}
      >
        Check my projects
        <ArrowRightIcon className="ml-2 h-4 w-4" />
      </Button>
    </section>
  )
}
