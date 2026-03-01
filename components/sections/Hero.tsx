'use client'
// components/sections/Hero.tsx
import { useEffect, useRef } from 'react'

interface HeroProps {
  config: Record<string, string>
}

export default function Hero({ config }: HeroProps) {
  const bgTextRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      if (bgTextRef.current) {
        bgTextRef.current.style.transform = `translate(-50%, calc(-50% + ${window.scrollY * 0.3}px)) rotate(-8deg)`
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isAvailable = config.available === 'true'

  return (
    <section
      id="beranda"
      className="min-h-screen flex flex-col justify-end px-8 md:px-14 pb-20 relative overflow-hidden"
    >
      {/* Background big text */}
      <div
        ref={bgTextRef}
        className="absolute top-1/2 left-1/2 font-syne font-black pointer-events-none select-none"
        style={{
          fontSize: '28vw',
          transform: 'translate(-50%, -50%) rotate(-8deg)',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(200,246,94,0.04)',
          whiteSpace: 'nowrap',
        }}
      >
        YUDIS
      </div>

      {/* Tag */}
      <div className="flex items-center gap-3 text-accent text-xs tracking-[0.15em] uppercase mb-6 z-10">
        <span className="block w-10 h-px bg-accent" />
        {config.hero_subtitle || 'Full-Stack Developer'}
      </div>

      {/* Heading */}
      <h1
        className="font-syne font-black leading-[0.92] tracking-[-0.04em] mb-10 z-10"
        style={{ fontSize: 'clamp(52px, 9vw, 130px)' }}
      >
        {(config.hero_title || 'Membangun\nPengalaman\nDigital.').split('\n').map((line, i) => (
          <span key={i} className={`block ${i === 1 ? 'text-transparent' : ''}`} style={i === 1 ? { WebkitTextStroke: '1px var(--text)' } : {}}>
            {line}
          </span>
        ))}
      </h1>

      {/* Bottom row */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-8 z-10">
        <div>
          <div className="flex items-center gap-2 text-sm mb-3" style={{ color: 'var(--muted)' }}>
            <span
              className="w-2 h-2 rounded-full"
              style={{
                background: isAvailable ? '#22c55e' : '#ef4444',
                boxShadow: isAvailable ? '0 0 0 4px rgba(34,197,94,0.15)' : '0 0 0 4px rgba(239,68,68,0.15)',
                animation: 'pulse 2s ease-in-out infinite',
              }}
            />
            {isAvailable ? 'Tersedia untuk kerja' : 'Sedang tidak tersedia'}
          </div>
          <p style={{ color: 'var(--muted)', maxWidth: '300px', lineHeight: '1.7', fontSize: '0.95rem' }}>
            Saya membangun aplikasi web yang cepat, scalable, dan indah — dari frontend hingga backend.
          </p>
        </div>

        <div className="flex items-center gap-5">
          <a href="#proyek" className="btn-primary">
            Lihat Proyek
          </a>
          <div className="flex flex-col items-center gap-2" style={{ color: 'var(--muted)', fontSize: '0.7rem', letterSpacing: '0.1em' }}>
            <div className="w-px h-12 bg-gradient-to-b from-[var(--muted)] to-transparent" style={{ animation: 'scrollAnim 2s ease-in-out infinite' }} />
            SCROLL
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollAnim {
          0% { transform: scaleY(0); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
          51% { transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.4); }
          50% { box-shadow: 0 0 0 6px rgba(34,197,94,0); }
        }
      `}</style>
    </section>
  )
}
