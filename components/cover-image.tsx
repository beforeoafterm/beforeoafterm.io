import Image from 'next/image'
import { Project } from '@/types/Project.types'
import { cx } from 'class-variance-authority'

// the SVG cover's own paper fill; letterbox bars must read as canvas
const CONTAIN_BACKDROP = '#f2eae3'

export function coverBackdrop(project: Project) {
  return project.coverFit === 'contain'
    ? { backgroundColor: CONTAIN_BACKDROP }
    : undefined
}

export function CoverImage({
  project,
  priority = false,
  sizes,
  vtName,
  className
}: {
  project: Project
  priority?: boolean
  sizes: string
  vtName?: string
  className?: string
}) {
  const style = {
    ...(vtName ? { viewTransitionName: vtName } : undefined),
    ...(project.coverPosition
      ? { objectPosition: project.coverPosition }
      : undefined)
  }
  if (project.coverFit === 'contain') {
    // SVG covers skip the optimizer; plain img avoids next/image's
    // spurious dev fill-height warning inside an aspect-ratio parent
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={project.coverImageSrc}
        alt={`${project.name} cover`}
        loading={priority ? 'eager' : 'lazy'}
        style={style}
        className={cx(
          'absolute inset-0 h-full w-full object-contain',
          className
        )}
      />
    )
  }
  return (
    <Image
      src={project.coverImageSrc}
      alt={`${project.name} cover`}
      fill
      priority={priority}
      sizes={sizes}
      style={style}
      className={cx('object-cover', className)}
    />
  )
}
