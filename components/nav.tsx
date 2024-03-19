import Link from 'next/link'

const navItems = {
  '/': {
    name: 'portfolio'
  },
  '/work': {
    name: 'work'
  },
  '/blog': {
    name: 'blog'
  },
  '/guestbook': {
    name: 'guestbook'
  }
}

export function Navbar() {
  return (
    <footer className="sticky bottom-0 bg-background p-4 shadow-2xl">
      <nav
        className="fade relative flex scroll-pr-6 flex-row items-start"
        id="nav"
      >
        <div className="flex flex-row justify-between">
          {Object.entries(navItems).map(([path, { name }]) => {
            return (
              <Link
                key={path}
                href={path}
                className="relative flex px-3 py-1 align-middle text-base font-bold tracking-tighter no-underline"
              >
                {name}
              </Link>
            )
          })}
        </div>
      </nav>
    </footer>
  )
}
