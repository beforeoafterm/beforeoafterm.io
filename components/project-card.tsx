'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  ArrowTopRightIcon,
  EyeClosedIcon,
  EyeOpenIcon
} from '@radix-ui/react-icons'
import { Button } from './ui/button'
import { Project } from '@/types/Project.types'
import { cx } from 'class-variance-authority'

export function ProjectCard({
  project,
  priority = false
}: {
  project: Project
  priority?: boolean
}) {
  const [isTechStackVisible, setIsTechStackVisible] = useState<boolean>(false)
  return (
    <article className="group flex w-full flex-col overflow-hidden rounded-3xl border border-ring bg-muted transition-all duration-300 hover:border-input hover:shadow-xl motion-safe:hover:-translate-y-1">
      <a
        href={project.url}
        target="_blank"
        rel="noreferrer"
        className="relative block aspect-[16/10] overflow-hidden no-underline"
        style={
          project.coverFit === 'contain'
            ? // matches the SVG cover's own paper fill so letterbox bars read as canvas
              { backgroundColor: '#f2eae3' }
            : undefined
        }
      >
        {project.coverFit === 'contain' ? (
          // SVG covers skip the optimizer; plain img avoids next/image's
          // spurious dev fill-height warning inside an aspect-ratio parent
          <img
            src={project.coverImageSrc}
            alt={`${project.name} cover`}
            loading={priority ? 'eager' : 'lazy'}
            className="absolute inset-0 h-full w-full object-contain motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:group-hover:scale-[1.03]"
          />
        ) : (
          <Image
            src={project.coverImageSrc}
            alt={`${project.name} cover`}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 28vw, (min-width: 768px) 45vw, 92vw"
            className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:group-hover:scale-[1.03]"
          />
        )}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/75 via-black/30 to-transparent"
        />
        <h2 className="absolute inset-x-0 bottom-0 mb-0 p-5 font-serif text-xl font-bold text-white lg:p-6 lg:text-2xl">
          {project.name}
          <ArrowTopRightIcon className="ml-2 inline h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </h2>
      </a>
      <div className="flex flex-1 flex-col p-5 lg:p-6">
        <p className="text-sm font-normal leading-relaxed text-muted-foreground lg:text-base">
          {project.description}
        </p>
        <Button
          className="-ml-3 mt-4 self-start"
          size="sm"
          variant="link"
          onClick={(event) => {
            event.stopPropagation()
            setIsTechStackVisible((prev) => !prev)
          }}
        >
          {isTechStackVisible ? 'Hide' : 'Tech Stack'}
          {isTechStackVisible ? (
            <EyeClosedIcon className="ml-2 h-4 w-4" />
          ) : (
            <EyeOpenIcon className="ml-2 h-4 w-4" />
          )}
        </Button>
        <div
          className={cx('mt-auto flex flex-wrap gap-2 pt-4', {
            hidden: !isTechStackVisible
          })}
        >
          {project.techStack.map((tech) => (
            <span key={tech} className="_label">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}
