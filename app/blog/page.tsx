import { Link } from 'next-view-transitions'
import { Suspense } from 'react'
import ViewCounter from './view-counter'
import { getViewsCount } from '@/lib/db/queries'
import { getBlogPosts } from '@/lib/db/blog'
import { ClosingSection } from '@/components/closing-section'

export const metadata = {
  title: 'Blog',
  description: 'Read my thoughts on software development, design, and more.',
  openGraph: {
    images: ['/og?title=Blog&kicker=Notes from the pod']
  }
}

export default function BlogPage() {
  const allBlogs = getBlogPosts()

  return (
    <section className="w-full">
      <h1 className="mb-6">read my blog</h1>
      <div className="flex flex-col gap-5">
        {allBlogs
          .sort((a, b) => {
            if (
              new Date(a.metadata.publishedAt) >
              new Date(b.metadata.publishedAt)
            ) {
              return -1
            }
            return 1
          })
          .map((post) => (
            <Link
              key={post.slug}
              className="group flex flex-col gap-1 no-underline"
              href={`/blog/${post.slug}`}
            >
              <span className="font-serif text-xl font-bold text-foreground transition-colors duration-300 group-hover:text-muted-foreground lg:text-2xl">
                {post.metadata.title}
              </span>
              <Suspense fallback={<span className="h-5" />}>
                <Views slug={post.slug} />
              </Suspense>
            </Link>
          ))}
      </div>
      <ClosingSection />
    </section>
  )
}

async function Views({ slug }: { slug: string }) {
  const views = await getViewsCount()
  return <ViewCounter allViews={views} slug={slug} />
}
