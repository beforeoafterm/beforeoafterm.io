import { Button, buttonVariants } from '@/components/ui/button'
import styles from './page.module.css'

export default function Page() {
  return (
    <section className={styles.Home}>
      <h1 className={styles.Home_headingText}>
        Hello, you may call me <strong>N</strong>. 👋🏼
      </h1>
      <div className={styles.Home_cta}>
        <Button variant="default">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Check out my work</Button>
      </div>
      <p className={styles.Home_subheadingText}>
        I am a Philippine-based technical leader and software engineer.
      </p>
      <p className={styles.Home_subheadingText}>
        I work with people to build scalable full-stack systems and co-found
        companies with people working on Fintech, Web3, and remote productivity.
      </p>
    </section>
  )
}
