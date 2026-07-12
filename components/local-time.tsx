'use client'

import { useEffect, useState } from 'react'

const formatter = new Intl.DateTimeFormat('en-PH', {
  timeZone: 'Asia/Manila',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false
})

// renders nothing on the server so SSR and first client paint agree;
// the time appears on mount and ticks every half minute
export function LocalTime() {
  const [time, setTime] = useState<string | null>(null)
  useEffect(() => {
    const tick = () => setTime(formatter.format(new Date()))
    tick()
    const id = setInterval(tick, 30_000)
    return () => clearInterval(id)
  }, [])
  if (!time) return null
  return (
    <p className="font-slabSerif text-xs uppercase tracking-widest text-muted-foreground">
      Manila · {time} PHT
    </p>
  )
}
