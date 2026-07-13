import { HomeHero } from '@/components/home-hero'
import { getRecentShipments } from '@/lib/commits'

export default function Page() {
  return <HomeHero shipments={getRecentShipments()} />
}
