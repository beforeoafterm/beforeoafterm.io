import { getBlogPosts } from 'app/db/blog'

export default async function sitemap() {
  const blogs = getBlogPosts().map((post) => ({
    url: `https://beforeoafterm.tioi.network/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt
  }))

  const routes = ['', '/blog', '/guestbook', '/uses', '/work'].map((route) => ({
    url: `https://beforeoafterm.tioi.network${route}`,
    lastModified: new Date().toISOString().split('T')[0]
  }))

  return [...routes, ...blogs]
}
