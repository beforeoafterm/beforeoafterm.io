export interface Project {
  name: string
  description: string
  url: string
  coverImageSrc: string
  // presentation only: how the cover fills the card's 16:10 media zone
  coverFit?: 'cover' | 'contain'
  techStack: Array<string>
}
