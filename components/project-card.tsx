'use client'

import { useState } from 'react'
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons'
import { Button } from './ui/button'
import { Project } from '@/types/Project.types'
import { cx } from 'class-variance-authority'

export function ProjectCard({ project }: { project: Project }) {
  const [isTechStackVisible, setIsTechStackVisible] = useState<boolean>(false)
  return (
    <article key={project.url} className="w-full">
      <div
        className="rounded-lg bg-muted bg-cover p-8 bg-blend-soft-light backdrop-blur transition-all duration-300"
        style={{
          backgroundImage: `url(${project.coverImageSrc})`
        }}
      >
        <a href={project.url} target="_blank">
          <h2 className="text-lg">{project.name}</h2>
        </a>
        <p className="font-normal text-secondary-foreground dark:text-secondary">
          {project.description}
        </p>
        <Button
          className="-ml-3 mt-4"
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
          className={cx('my-4 flex flex-wrap gap-2', {
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
