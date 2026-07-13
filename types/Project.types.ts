export interface Project {
  slug: string
  name: string
  description: string
  url: string
  coverImageSrc: string
  // presentation only: how the cover fills the card's 16:10 media zone
  coverFit?: 'cover' | 'contain'
  // presentation only: object-position for wide banner crops (case headers)
  coverPosition?: string
  techStack: Array<string>
  // optional case-study fields; rendered only when present
  role?: string
  period?: string
  highlights?: Array<string>
}
