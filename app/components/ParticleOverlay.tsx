'use client'

import { useState } from 'react'
import { PageLoader } from './PageLoader'
import { ParticleCanvas } from './ParticleCanvas'

export function ParticleOverlay() {
  const [ready, setReady] = useState(false)

  return (
    <>
      <PageLoader ready={ready} />
      <ParticleCanvas onReady={() => setReady(true)} />
    </>
  )
}
