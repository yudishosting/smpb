'use client'
// components/sections/Experience.tsx
import { useEffect, useRef } from 'react'

interface Experience {
  id: string
  company: string
  role: string
  description?: string | null
  startDate: string
  endDate?: string | null
  type: string
}

interface ExperienceProps {
  experiences: Experience[]
}

export default function Experience({ experiences }: ExperienceProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle('visible', e.isIntersecting)),
      { threshold: 0.1 }
    )
    sectionRef.current?.querySelectorAll('.fade-in').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="pengalaman"
      ref={sectionRef}
      className="px-8 md:px-14 py-28"
      style={{ background: 'var(--surface)' }}
    >
      <div className="section-label fade-in">03 — Pengalaman</div>
      <h2
        className="font-syne font-black leading-[1] tracking-[-0.03em] mb-16 fade-in"
        style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}
      >
        Di mana saya<br />pernah berkarya.
      </h2>

      <div className="space-y-0">
        {experiences.map((exp, i) => (
          <div
            key={exp.id}
            className="fade-in group relative grid md:grid-cols-[200px_1fr_auto] gap-4 md:gap-10 py-8 border-b items-start transition-all duration-300 hover:pl-4"
            style={{
              borderColor: 'var(--border)',
              transitionDelay: `${i * 0.1}s`,
            }}
          >
            {/* Hover accent left border */}
            <div
              className="absolute left-0 top-0 bottom-0 w-0 group-hover:w-0.5 transition-all duration-300"
              style={{ background: 'var(--accent)' }}
            />

            <div
              className="font-syne text-xs tracking-widest mt-1"
              style={{ color: 'var(--muted)' }}
            >
              {exp.startDate} — {exp.endDate || <span style={{ color: 'var(--accent)' }}>Sekarang</span>}
            </div>

            <div>
              <div className="font-syne font-bold text-lg mb-1 tracking-tight">
                {exp.company}
              </div>
              <div className="text-sm mb-3" style={{ color: 'var(--muted)' }}>
                {exp.role}
              </div>
              {exp.description && (
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)', maxWidth: '520px' }}>
                  {exp.description}
                </p>
              )}
            </div>

            <div
              className="px-3 py-1.5 text-xs tracking-widest uppercase border self-start"
              style={{ borderColor: 'var(--accent)', color: 'var(--accent)', whiteSpace: 'nowrap' }}
            >
              {exp.type}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
