'use client'

import { useEffect } from 'react'

/**
 * Adds `data-revealed` to any element with a `data-reveal` attribute once it
 * scrolls into view, driving the CSS reveal transitions in globals.css.
 */
export function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-revealed', '')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )

    els.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])
}
