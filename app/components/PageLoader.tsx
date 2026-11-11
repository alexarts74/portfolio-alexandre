'use client'

import { useEffect, useState } from 'react'

interface Props {
  ready: boolean
}

export function PageLoader({ ready }: Props) {
  const [visible, setVisible] = useState(true)
  const [mounted, setMounted] = useState(true)

  useEffect(() => {
    if (!ready) return
    setVisible(false)
    const t = setTimeout(() => setMounted(false), 700)
    return () => clearTimeout(t)
  }, [ready])

  if (!mounted) return null

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Chargement"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
        transition: 'opacity 0.6s ease',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '2.5rem',
          color: 'rgba(255,255,255,0.9)',
          letterSpacing: '0.4em',
          fontWeight: 300,
        }}
      >
        AA
      </span>

      <div className="loader-dots" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </div>
  )
}
