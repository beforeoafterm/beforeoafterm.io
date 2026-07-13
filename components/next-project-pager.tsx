'use client'

import { ArrowRightIcon } from '@radix-ui/react-icons'
import { Link } from 'next-view-transitions'
import { CoverImage, coverBackdrop } from './cover-image'
import { Project } from '@/types/Project.types'

// the thumb carries the next slug's view-transition name, so clicking it
// morphs the thumbnail into the next case page's header
export function NextProjectPager({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group mt-12 flex w-full flex-col gap-4 rounded-3xl border border-ring bg-muted p-5 no-underline transition-all duration-300 hover:border-input hover:shadow-xl motion-safe:hover:-translate-y-1 sm:flex-row sm:items-center sm:justify-between lg:p-6"
    >
      <div className="flex flex-col gap-2">
        <span className="font-slabSerif text-xs uppercase tracking-widest text-muted-foreground">
          Next project
        </span>
        <span className="flex items-center font-serif text-2xl font-bold text-foreground lg:text-3xl">
          {project.name}
          <ArrowRightIcon className="ml-3 h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
      <span
        className="relative block aspect-[16/10] w-full overflow-hidden rounded-2xl sm:w-56"
        style={coverBackdrop(project)}
      >
        <CoverImage
          project={project}
          sizes="(min-width: 640px) 14rem, 92vw"
          vtName={`cover-${project.slug}`}
          className="motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:group-hover:scale-[1.03]"
        />
      </span>
    </Link>
  )
}
