'use client'

import { Button } from '@/components/ui/button'
import styles from '@/app/page.module.css'
import {
  ArrowRightIcon,
  CalendarIcon,
  LinkedInLogoIcon
} from '@radix-ui/react-icons'
import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { useTransitionRouter } from 'next-view-transitions'
import { Magnetic } from '@/components/magnetic'
import { DUR, EASE } from '@/lib/motion'
import { CALENDLY_URL } from '@/lib/site'
import { Shipment } from '@/lib/commits'

export function HomeHero({ shipments }: { shipments: Array<Shipment> }) {
  const router = useTransitionRouter()
  const shouldReduceMotion = useReducedMotion()
  // one-time entrance, transform-only so stalled rAF never hides the hero
  const rise = (order: number) => ({
    initial: shouldReduceMotion ? false : { y: 14 },
    animate: { y: 0 },
    transition: { duration: DUR.slow, ease: EASE, delay: order * 0.07 }
  })
  return (
    <section className={styles.Home}>
      <div className={styles.Home_content}>
        <motion.h1 className={styles.Home_headingText} {...rise(0)}>
          Hello, you may call me <strong>N</strong>.{' '}
          <span className="text-[0.7em]">👋🏼</span>
        </motion.h1>
        <motion.p className={styles.Home_subheadingText} {...rise(1)}>
          I am an <span className="_highlight">agent-native</span> engineering
          leader based in the Philippines. 13+ years across fintech, Web3, and
          SaaS, most recently leading engineering at W3.io and AR Data.
        </motion.p>
        <motion.p className={styles.Home_subheadingText} {...rise(2)}>
          I run AI-native delivery, where a small pod of agents owns scoped
          features end to end, and I stay close enough to the code to make the
          build-vs-buy calls myself. Available now, open to fractional or
          interim-to-permanent.
        </motion.p>
        <motion.div className={styles.Home_cta} {...rise(3)}>
          <Magnetic>
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
          </Magnetic>
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
        </motion.div>
        {shipments.length > 0 && (
          <motion.div className="mt-6 flex flex-col gap-2" {...rise(4)}>
            <p className="font-slabSerif text-xs uppercase tracking-widest text-muted-foreground">
              Recently shipped by the pod
            </p>
            <ul className="flex flex-col gap-1">
              {shipments.map((shipment) => (
                <li
                  key={`${shipment.subject}-${shipment.date}`}
                  className="flex items-baseline gap-3 text-sm text-muted-foreground"
                >
                  <span className="font-mono text-xs text-foreground/60">
                    {shipment.date}
                  </span>
                  <span className="truncate">{shipment.subject}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
      <div className="mx-auto my-6 w-fit md:mr-0">
        <Magnetic>
          <Button onClick={() => router.push('/projects')}>
            Check my projects
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Button>
        </Magnetic>
      </div>
    </section>
  )
}
