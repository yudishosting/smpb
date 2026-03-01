'use client'
// components/Cursor.tsx
import { useEffect, useRef } from 'react'

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const ring = ringRef.current
    if (!cursor || !ring) return

    const move = (e: MouseEvent) => {
      cursor.style.left = e.clientX + 'px'
      cursor.style.top = e.clientY + 'px'
      setTimeout(() => {
        ring.style.left = e.clientX + 'px'
        ring.style.top = e.clientY + 'px'
      }, 80)
    }

    const enlarge = () => {
      cursor.style.width = '20px'
      cursor.style.height = '20px'
      ring.style.width = '50px'
      ring.style.height = '50px'
    }

    const shrink = () => {
      cursor.style.width = '12px'
      cursor.style.height = '12px'
      ring.style.width = '36px'
      ring.style.height = '36px'
    }

    document.addEventListener('mousemove', move)
    document.querySelectorAll('a, button, [data-cursor="pointer"]').forEach((el) => {
      el.addEventListener('mouseenter', enlarge)
      el.addEventListener('mouseleave', shrink)
    })

    return () => {
      document.removeEventListener('mousemove', move)
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 bg-accent rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-[width,height] duration-200"
        style={{ mixBlendMode: 'difference' }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-9 h-9 border border-accent rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 opacity-50 transition-all duration-150"
      />
    </>
  )
}
