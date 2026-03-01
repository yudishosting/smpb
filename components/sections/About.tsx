'use client'
// components/sections/About.tsx
import { useEffect, useRef } from 'react'

interface Skill {
  id: string
  name: string
  category: string
  level: number
}

interface AboutProps {
  skills: Skill[]
  config: Record<string, string>
}

const categoryColors: Record<string, string> = {
  Frontend: '#c8f65e',
  Backend: '#ff6b35',
  Database: '#60a5fa',
  Tools: '#a78bfa',
}

export default function About({ skills, config }: AboutProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle('visible', e.isIntersecting)),
      { threshold: 0.1 }
    )
    sectionRef.current?.querySelectorAll('.fade-in').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const grouped = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = []
    acc[skill.category].push(skill)
    return acc
  }, {})

  return (
    <section
      id="tentang"
      ref={sectionRef}
      className="px-8 md:px-14 py-28 grid md:grid-cols-2 gap-20 items-center"
      style={{ background: 'var(--surface)' }}
    >
      {/* Left - Avatar placeholder */}
      <div className="fade-in order-2 md:order-1">
        <div
          className="relative"
          style={{ aspectRatio: '3/4', background: 'var(--card)', overflow: 'hidden' }}
        >
          <div
            className="absolute inset-0 flex items-center justify-center font-syne font-black"
            style={{ fontSize: '8rem', color: 'rgba(200,246,94,0.08)' }}
          >
            Y
          </div>
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, rgba(200,246,94,0.06) 0%, transparent 60%)' }}
          />
          <div
            className="absolute bottom-5 right-5 border"
            style={{ width: '55%', height: '55%', borderColor: 'rgba(200,246,94,0.15)' }}
          />
          <div
            className="absolute top-5 left-5 text-xs tracking-widest uppercase"
            style={{ color: 'var(--muted)' }}
          >
            @yudis_299
          </div>
        </div>
      </div>

      {/* Right - Content */}
      <div className="order-1 md:order-2">
        <div className="section-label fade-in">01 — Tentang Saya</div>
        <h2
          className="font-syne font-black leading-[1] tracking-[-0.03em] mb-8 fade-in"
          style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}
        >
          Developer,<br />
          Designer &<br />
          <span style={{ color: 'var(--accent)' }}>Problem Solver.</span>
        </h2>
        <p className="mb-4 fade-in" style={{ color: 'var(--muted)', lineHeight: '1.8' }}>
          {config.about_text || 'Saya seorang Full-Stack Developer dengan passion di web development.'}
        </p>
        <p className="mb-10 fade-in" style={{ color: 'var(--muted)', lineHeight: '1.8' }}>
          {config.about_text2 || 'Fokus di React, Next.js, Node.js, dan selalu cari cara untuk push boundaries.'}
        </p>

        {/* Skills by category */}
        <div className="fade-in space-y-6">
          {Object.entries(grouped).map(([category, catSkills]) => (
            <div key={category}>
              <div
                className="text-xs tracking-widest uppercase mb-3 flex items-center gap-2"
                style={{ color: categoryColors[category] || 'var(--muted)' }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: categoryColors[category] || 'var(--muted)' }}
                />
                {category}
              </div>
              <div className="flex flex-wrap gap-2">
                {catSkills.map((skill) => (
                  <div
                    key={skill.id}
                    className="group relative px-4 py-2 text-xs tracking-wide transition-all duration-200"
                    style={{
                      border: '1px solid var(--border)',
                      color: 'var(--muted)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = categoryColors[category] || 'var(--accent)'
                      e.currentTarget.style.color = 'var(--text)'
                      e.currentTarget.style.background = 'rgba(200,246,94,0.04)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border)'
                      e.currentTarget.style.color = 'var(--muted)'
                      e.currentTarget.style.background = 'transparent'
                    }}
                  >
                    <span
                      className="absolute left-0 top-0 bottom-0 w-0.5"
                      style={{ background: categoryColors[category] || 'var(--accent)' }}
                    />
                    {skill.name}
                    <span className="ml-2 text-[10px] opacity-40">{skill.level}%</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
