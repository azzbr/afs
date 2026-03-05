'use client'

import { useEffect, useRef } from 'react'

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

export function useSpotlight(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const cards = el.querySelectorAll<HTMLElement>('.spotlight')

    const handleMove = (e: MouseEvent) => {
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        card.style.setProperty('--x', `${x}px`)
        card.style.setProperty('--y', `${y}px`)
      })
    }

    el.addEventListener('mousemove', handleMove)
    return () => el.removeEventListener('mousemove', handleMove)
  }, [ref])
}

export function useTilt(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const cards = el.querySelectorAll<HTMLElement>('.tilt-card')

    cards.forEach((card) => {
      const handleMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5
        card.style.transform = `perspective(800px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateZ(10px)`
      }
      const handleLeave = () => {
        card.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) translateZ(0)'
      }
      card.addEventListener('mousemove', handleMove)
      card.addEventListener('mouseleave', handleLeave)
    })

    return () => {
      cards.forEach((card) => {
        card.replaceWith(card.cloneNode(true))
      })
    }
  }, [ref])
}