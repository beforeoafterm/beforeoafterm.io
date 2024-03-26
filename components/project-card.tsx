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
        className="relative rounded-lg border border-border bg-muted bg-cover bg-center p-8 bg-blend-soft-light shadow-md shadow-ring backdrop-blur-sm transition-all duration-300 hover:shadow-inner hover:shadow-muted-foreground dark:shadow-muted-foreground"
        style={{
          backgroundImage: `url(${project.coverImageSrc})`
        }}
      >
        <div className="absolute inset-0 -z-10 rounded-lg backdrop-blur-sm"></div>
        <a className="no-underline" href={project.url} target="_blank">
          <h2 className="mb-12 tracking-wider">{project.name}</h2>
        </a>
        <p className="font-normal text-muted-foreground">
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
