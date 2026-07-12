import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArrowTopRightIcon } from '@radix-ui/react-icons'
import { BackLink } from '@/components/back-link'
import { Button } from '@/components/ui/button'
import { CoverImage, coverBackdrop } from '@/components/cover-image'
import { getProject, projectLinkLabel, projects } from '@/lib/projects'

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }))
}

export function generateMetadata({
  params
}: {
  params: { slug: string }
}): Metadata {
  const project = getProject(params.slug)
  if (!project) return {}
  return {
    title: project.name,
    description: project.description,
    openGraph: {
      title: project.name,
      description: project.description,
      images: [project.coverImageSrc]
    }
  }
}

export default function Page({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug)
  if (!project) notFound()
  return (
    <section className="flex w-full flex-col gap-6 lg:gap-8">
      <BackLink href="/projects" label="All projects" />
      <div
        className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-ring md:aspect-[21/9]"
        style={coverBackdrop(project)}
      >
        <CoverImage
          project={project}
          priority
          sizes="(min-width: 1024px) 60vw, 92vw"
          vtName={`cover-${project.slug}`}
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/75 via-black/30 to-transparent"
        />
        <h1 className="absolute inset-x-0 bottom-0 mb-0 p-6 font-serif text-3xl font-bold text-white lg:p-8 lg:text-5xl">
          {project.name}
        </h1>
      </div>
      <p className="max-w-[65ch] text-lg leading-relaxed text-muted-foreground">
        {project.description}
      </p>
      {(project.role || project.period) && (
        <dl className="flex flex-wrap gap-x-12 gap-y-4">
          {project.role && (
            <div>
              <dt className="font-slabSerif text-xs uppercase tracking-widest text-muted-foreground">
                Role
              </dt>
              <dd className="mt-1">{project.role}</dd>
            </div>
          )}
          {project.period && (
            <div>
              <dt className="font-slabSerif text-xs uppercase tracking-widest text-muted-foreground">
                Period
              </dt>
              <dd className="mt-1">{project.period}</dd>
            </div>
          )}
        </dl>
      )}
      {project.highlights && project.highlights.length > 0 && (
        <ul className="max-w-[65ch] list-disc space-y-2 pl-5">
          {project.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      )}
      <div className="flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <span key={tech} className="_label">
            {tech}
          </span>
        ))}
      </div>
      <div>
        <Button asChild variant="outline" size="sm">
          <a
            className="no-underline hover:text-primary-foreground"
            href={project.url}
            target="_blank"
            rel="noreferrer"
          >
            {projectLinkLabel(project.url)}
            <ArrowTopRightIcon className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>
    </section>
  )
}
