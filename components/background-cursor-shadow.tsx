'use client'

import React from 'react'
import { useMouse } from '@uidotdev/usehooks'
import { motion } from 'framer-motion'

const BackgroundCursorShadow: React.FC = () => {
  const [state, ref] = useMouse<HTMLDivElement>()

  const size = 500
  const halfSize = size / 2
  // drift the spotlight between the scheme's two muted hue families as the
  // cursor crosses the viewport (0 to 35% mix keeps it ambient, not loud)
  const fraction =
    typeof window === 'undefined' || !window.innerWidth
      ? 0
      : Math.min(Math.max(state.x / window.innerWidth, 0), 1)
  const mix = Math.round(fraction * 35)

  return (
    <div className="fixed inset-0 -z-10" ref={ref}>
      <motion.div
        className="pointer-events-none absolute left-0 top-0 opacity-80 blur-3xl"
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          backgroundColor: `color-mix(in oklab, var(--muted) ${100 - mix}%, var(--muted-foreground) ${mix}%)`,
          transform: `translate(${state.elementX - halfSize}px, ${state.elementY - halfSize}px)`
        }}
        transition={{ type: 'spring', damping: 15, stiffness: 200 }}
      />
    </div>
  )
}

export default BackgroundCursorShadow
