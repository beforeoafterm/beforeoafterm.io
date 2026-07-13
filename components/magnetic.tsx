'use client'

import { useRef } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring
} from 'framer-motion'

const MAX_PULL = 6

// subtle cursor magnetism for primary CTAs; transform-only and skipped
// entirely under reduced motion
export function Magnetic({ children }: { children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.5 })
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.5 })
  if (shouldReduceMotion) return <div className="inline-block">{children}</div>
  const clamp = (value: number) => Math.max(-MAX_PULL, Math.min(MAX_PULL, value))
  return (
    <motion.div
      ref={ref}
      className="inline-block"
      style={{ x: springX, y: springY }}
      onPointerMove={(event) => {
        const rect = ref.current?.getBoundingClientRect()
        if (!rect) return
        x.set(clamp((event.clientX - (rect.left + rect.width / 2)) * 0.2))
        y.set(clamp((event.clientY - (rect.top + rect.height / 2)) * 0.2))
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}
