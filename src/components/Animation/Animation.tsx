import React, { useEffect, useRef } from 'react'
import { Animator } from './Animator'

export const Animation = () => {
  const rootRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const animator = new Animator({ root })
    animator.start()

    return () => animator.destroy()
  }, [])

  return <div ref={rootRef} className="animation-root" />
}
