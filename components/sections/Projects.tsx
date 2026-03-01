'use client'
// components/sections/Projects.tsx
import { useEffect, useRef } from 'react'
import Image from 'next/image'

interface Project {
  id: string
  title: string
  description: string
  image?: string | null
  demoUrl?: string | null
  githubUrl?: string | null
  tags: string[]
  featured: boolean
}

interface ProjectsProps {
  projects: Project[]
}

export default function Projects({ projects }: ProjectsProps) {
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
    <section id="proyek" ref={sectionRef} className="px-8 md:px-14 py-28" style={{ background: 'var(--bg)' }}>
      <div className="section-label fade-in">02 — Proyek Pilihan</div>
      <div className="flex justify-between items-end mb-14 fade-in">
        <h2
          className="font-syne font-black leading-[1] tracking-[-0.03em]"
          style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}
        >
          Proyek yang<br />berarti.
        </h2>
        <a
          href="#"
          className="text-accent text-sm tracking-widest uppercase hidden md:block"
          style={{ textDecoration: 'none' }}
        >
          Lihat Semua →
        </a>
      </div>

      <div
        className="grid gap-px"
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          background: 'var(--border)',
        }}
      >
        {projects.map((project, i) => (
          <div
            key={project.id}
            className={`fade-in group relative p-10 transition-all duration-300 ${
              project.featured && i === 0 ? 'md:col-span-2' : ''
            }`}
            style={{
              background: 'var(--card)',
              transitionDelay: `${i * 0.08}s`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--surface)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--card)'
            }}
          >
            {/* Project image or placeholder */}
            {project.featured && i === 0 && (
              <div
                className="relative mb-8 overflow-hidden"
                style={{ height: '200px', background: 'var(--surface)' }}
              >
                {project.image ? (
                  <Image src={project.image} alt={project.title} fill className="object-cover opacity-60" />
                ) : (
                  <div className="absolute inset-4 border" style={{ borderColor: 'var(--border)' }}>
                    <div
                      className="absolute top-0 left-0 right-0 flex items-center gap-2 px-3"
                      style={{ height: '24px', background: 'rgba(255,255,255,0.03)' }}
                    >
                      <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
                      <span className="w-2 h-2 rounded-full bg-[#febc2e]" />
                      <span className="w-2 h-2 rounded-full bg-[#28c840]" />
                    </div>
                    <div
                      className="absolute inset-0 flex items-center justify-center text-xs tracking-widest uppercase"
                      style={{ color: 'var(--border)', paddingTop: '24px' }}
                    >
                      Preview Proyek
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Number */}
            <div className="text-xs tracking-[0.15em] mb-10" style={{ color: 'var(--accent)' }}>
              {String(i + 1).padStart(2, '0')}
            </div>

            {/* Title */}
            <h3
              className="font-syne font-bold text-2xl mb-3 tracking-[-0.02em] transition-colors duration-200 group-hover:text-accent"
            >
              {project.title}
            </h3>
            <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--muted)' }}>
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] tracking-widest uppercase px-2.5 py-1"
                  style={{ border: '1px solid var(--border)', color: 'var(--muted)' }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Arrow + links */}
            <div className="absolute bottom-10 right-10 flex gap-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center text-xs transition-all duration-200"
                  style={{ border: '1px solid var(--border)', color: 'var(--muted)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--accent)'
                    e.currentTarget.style.color = '#0a0a0a'
                    e.currentTarget.style.borderColor = 'var(--accent)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = 'var(--muted)'
                    e.currentTarget.style.borderColor = 'var(--border)'
                  }}
                >
                  GH
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center transition-all duration-200"
                  style={{ border: '1px solid var(--border)', color: 'var(--muted)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--accent)'
                    e.currentTarget.style.color = '#0a0a0a'
                    e.currentTarget.style.borderColor = 'var(--accent)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = 'var(--muted)'
                    e.currentTarget.style.borderColor = 'var(--border)'
                  }}
                >
                  ↗
                </a>
              )}
              {!project.demoUrl && !project.githubUrl && (
                <div
                  className="w-9 h-9 flex items-center justify-center transition-all duration-200"
                  style={{ border: '1px solid var(--border)', color: 'var(--muted)' }}
                >
                  ↗
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
