'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'next-view-transitions'
import { ArrowTopRightIcon } from '@radix-ui/react-icons'
import { CoverImage, coverBackdrop } from './cover-image'
import { DUR, EASE } from '@/lib/motion'
import { Project } from '@/types/Project.types'
import { cx } from 'class-variance-authority'

const INITIAL_PILLS = 4

export function ProjectCard({
  project,
  index = 0
}: {
  project: Project
  index?: number
}) {
  const [showAllTech, setShowAllTech] = useState<boolean>(false)
  const shouldReduceMotion = useReducedMotion()
  const visibleTech = showAllTech
    ? project.techStack
    : project.techStack.slice(0, INITIAL_PILLS)
  const hiddenCount = project.techStack.length - INITIAL_PILLS
  // above-fold cards paint immediately (LCP); the rest stagger in once.
  // transform-only reveal: if rAF ever stalls (backgrounded tab, crawler),
  // a frozen animation leaves the card readable instead of invisible
  const reveal = !shouldReduceMotion && index >= 2
  return (
    <motion.article
      initial={reveal ? { y: 12 } : false}
      whileInView={reveal ? { y: 0 } : undefined}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: DUR.base,
        ease: EASE,
        delay: (index % 2) * 0.06
      }}
      className="group flex w-full flex-col overflow-hidden rounded-3xl border border-ring bg-muted transition-all duration-300 hover:border-input hover:shadow-xl motion-safe:hover:-translate-y-1"
    >
      <Link
        href={`/projects/${project.slug}`}
        className="relative block aspect-[16/10] overflow-hidden no-underline"
        style={coverBackdrop(project)}
      >
        <CoverImage
          project={project}
          priority={index < 2}
          sizes="(min-width: 1024px) 28vw, (min-width: 768px) 45vw, 92vw"
          vtName={`cover-${project.slug}`}
          className="motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:group-hover:scale-[1.03]"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/75 via-black/30 to-transparent"
        />
        <h2 className="absolute inset-x-0 bottom-0 mb-0 p-5 font-serif text-xl font-bold text-white lg:p-6 lg:text-2xl">
          {project.name}
          <ArrowTopRightIcon className="ml-2 inline h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </h2>
      </Link>
      <div className="flex flex-1 flex-col p-5 lg:p-6">
        <p className="text-sm font-normal leading-relaxed text-muted-foreground lg:text-base">
          {project.description}
        </p>
        <div className="mt-auto flex flex-wrap gap-2 pt-5">
          {visibleTech.map((tech) => (
            <span key={tech} className="_label">
              {tech}
            </span>
          ))}
          {!showAllTech && hiddenCount > 0 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                setShowAllTech(true)
              }}
              className={cx(
                '_label cursor-pointer transition-colors duration-300 hover:border-input hover:text-foreground'
              )}
              aria-label={`Show ${hiddenCount} more technologies`}
            >
              +{hiddenCount} more
            </button>
          )}
        </div>
      </div>
    </motion.article>
  )
}
