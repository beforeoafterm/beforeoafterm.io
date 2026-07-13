import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArrowTopRightIcon } from '@radix-ui/react-icons'
import { BackLink } from '@/components/back-link'
import { ClosingSection } from '@/components/closing-section'
import { Magnetic } from '@/components/magnetic'
import { NextProjectPager } from '@/components/next-project-pager'
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
      images: [`/og?slug=${project.slug}`]
    },
    twitter: {
      card: 'summary_large_image',
      title: project.name,
      description: project.description,
      images: [`/og?slug=${project.slug}`]
    }
  }
}

export default function Page({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug)
  if (!project) notFound()
  const nextProject =
    projects[(projects.findIndex((p) => p.slug === project.slug) + 1) %
      projects.length]
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
      <dl className="grid grid-cols-1 gap-6 rounded-3xl border border-foreground/10 p-5 sm:grid-cols-3 lg:p-6">
        {project.role && (
          <div>
            <dt className="font-slabSerif text-xs uppercase tracking-widest text-muted-foreground">
              Role
            </dt>
            <dd className="mt-2">{project.role}</dd>
          </div>
        )}
        {project.period && (
          <div>
            <dt className="font-slabSerif text-xs uppercase tracking-widest text-muted-foreground">
              Period
            </dt>
            <dd className="mt-2">{project.period}</dd>
          </div>
        )}
        <div
          className={
            project.role || project.period ? undefined : 'sm:col-span-3'
          }
        >
          <dt className="font-slabSerif text-xs uppercase tracking-widest text-muted-foreground">
            Stack
          </dt>
          <dd className="mt-2 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span key={tech} className="_label">
                {tech}
              </span>
            ))}
          </dd>
        </div>
      </dl>
      {project.highlights && project.highlights.length > 0 && (
        <div className="flex flex-col gap-4">
          <h2 className="mb-0 font-slabSerif text-xs font-normal uppercase tracking-widest text-muted-foreground">
            Highlights
          </h2>
          <ol className="flex max-w-[65ch] flex-col gap-4">
            {project.highlights.map((highlight, index) => (
              <li key={highlight} className="flex gap-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary font-serif text-sm font-bold text-secondary-foreground">
                  {index + 1}
                </span>
                <span className="leading-relaxed">{highlight}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
      <div>
        <Magnetic>
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
        </Magnetic>
      </div>
      <NextProjectPager project={nextProject} />
      <ClosingSection />
    </section>
  )
}
