'use client'

import React from 'react'
import { useMouse } from '@uidotdev/usehooks'
import { motion } from 'framer-motion'

const BackgroundCursorShadow: React.FC = () => {
  const [state, ref] = useMouse<HTMLDivElement>()

  const size = 500
  const halfSize = size / 2

  return (
    <div className="fixed inset-0 -z-10" ref={ref}>
      <motion.div
        className="pointer-events-none absolute left-0 top-0 bg-muted opacity-80 blur-3xl"
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          transform: `translate(${state.elementX - halfSize}px, ${state.elementY - halfSize}px)`
        }}
        transition={{ type: 'spring', damping: 15, stiffness: 200 }}
      />
    </div>
  )
}

export default BackgroundCursorShadow
