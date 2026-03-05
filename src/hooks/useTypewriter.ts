'use client'

import { useEffect, useState, useRef } from 'react'

/**
 * Typewriter effect hook.
 * Usage:
 *   const text = useTypewriter(['Hello World', 'Welcome to AFS'], 80, 2000)
 */
export function useTypewriter(phrases: string[], speed = 80, pause = 2200) {
  const [displayed, setDisplayed] = useState('')
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const current = phrases[phraseIdx]

    if (!deleting && charIdx <= current.length) {
      setDisplayed(current.slice(0, charIdx))
      timeoutRef.current = setTimeout(() => setCharIdx((c) => c + 1), speed)
    } else if (!deleting && charIdx > current.length) {
      // Pause before deleting
      timeoutRef.current = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && charIdx > 0) {
      setDisplayed(current.slice(0, charIdx - 1))
      timeoutRef.current = setTimeout(() => setCharIdx((c) => c - 1), speed / 2)
    } else if (deleting && charIdx === 0) {
      setDeleting(false)
      setPhraseIdx((p) => (p + 1) % phrases.length)
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [charIdx, deleting, phraseIdx, phrases, speed, pause])

  return displayed
}