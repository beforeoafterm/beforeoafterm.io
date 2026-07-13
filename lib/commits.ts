import { execSync } from 'child_process'

export interface Shipment {
  subject: string
  date: string
}

// read at build time from the repo itself; the colophon claims an agent pod
// ships this site, so the site shows its own receipts. Fails open when git
// or history is unavailable.
export function getRecentShipments(count = 3): Array<Shipment> {
  try {
    const log = execSync(`git log -${count} --pretty=format:%s%x09%as`, {
      encoding: 'utf8',
      cwd: process.cwd()
    })
    return log
      .split('\n')
      .filter(Boolean)
      .map((line) => {
        const [subject, iso] = line.split('\t')
        const date = new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          timeZone: 'UTC'
        })
        return { subject: subject.slice(0, 64), date }
      })
  } catch {
    return []
  }
}
