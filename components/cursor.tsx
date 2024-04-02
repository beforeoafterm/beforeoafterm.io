'use client'

import React from 'react'
import { useMouse } from '@uidotdev/usehooks'
import { motion } from 'framer-motion'

const Cursor: React.FC = () => {
  const [state] = useMouse()

  const size = 500
  const halfSize = size / 2

  return (
    <motion.div
      className="bg-muted opacity-80 blur-3xl"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: size,
        height: size,
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: -9999,
        transform: `translate(${state.x - halfSize}px, ${state.y - halfSize}px)`
      }}
      transition={{ type: 'spring', damping: 15, stiffness: 200 }}
    />
  )
}

export default Cursor
