'use client'

import { useRef, useEffect } from 'react'
import { prefersReducedMotion } from '@/app/lib/particles/util'
import { createParticleDirector } from '@/app/lib/particles/director'

interface Props {
  onReady?: () => void
}

export function ParticleCanvas({ onReady }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) {
      onReady?.()
      return
    }
    if (!canvasRef.current) return

    const { destroy } = createParticleDirector(canvasRef.current, onReady)
    return destroy
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
        mixBlendMode: 'difference',
      }}
      aria-hidden="true"
    />
  )
}
