'use client'

import { useRef, useCallback } from 'react'

/**
 * Magnetic effect — the element gently follows the cursor when hovered.
 * Usage:
 *   const { ref, onMouseMove, onMouseLeave } = useMagneticButton(0.35)
 *   <button ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>…
 */
export function useMagneticButton(strength = 0.3) {
  const ref = useRef<HTMLElement | null>(null)

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`
      el.style.transition = 'transform 0.15s ease-out'
    },
    [strength],
  )

  const onMouseLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'translate(0px, 0px)'
    el.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
  }, [])

  return { ref, onMouseMove, onMouseLeave }
}