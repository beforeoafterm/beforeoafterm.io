import { getBlogPosts } from '@/lib/db/blog'
import { projects } from '@/lib/projects'

export default async function sitemap() {
  const blogs = getBlogPosts().map((post) => ({
    url: `https://beforeoafterm-io.vercel.app/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt
  }))

  const projectPages = projects.map((project) => ({
    url: `https://beforeoafterm-io.vercel.app/projects/${project.slug}`,
    lastModified: new Date().toISOString().split('T')[0]
  }))

  const routes = ['', '/projects'].map((route) => ({
    url: `https://beforeoafterm-io.vercel.app${route}`,
    lastModified: new Date().toISOString().split('T')[0]
  }))

  return [...routes, ...projectPages, ...blogs]
}
