'use client'
// components/sections/Contact.tsx
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

interface ContactProps {
  config: Record<string, string>
}

export default function Contact({ config }: ContactProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle('visible', e.isIntersecting)),
      { threshold: 0.1 }
    )
    sectionRef.current?.querySelectorAll('.fade-in').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      toast.error('Mohon isi semua field yang wajib')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        toast.success('Pesan terkirim! Saya akan segera membalas.')
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        toast.error('Gagal mengirim pesan. Coba lagi.')
      }
    } catch {
      toast.error('Terjadi kesalahan. Coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="kontak" ref={sectionRef} className="px-8 md:px-14 py-28" style={{ background: 'var(--bg)' }}>
      <div className="section-label fade-in">04 — Kontak</div>

      <div className="grid md:grid-cols-2 gap-20 items-start">
        {/* Left */}
        <div>
          <h2
            className="font-syne font-black leading-[1] tracking-[-0.04em] mb-6 fade-in"
            style={{ fontSize: 'clamp(48px, 7vw, 100px)' }}
          >
            Ayo<br />
            <span
              style={{
                color: 'transparent',
                WebkitTextStroke: '1px rgba(200,246,94,0.5)',
              }}
            >
              Kerja
            </span>
            <br />
            Sama.
          </h2>
          <p className="mb-10 fade-in" style={{ color: 'var(--muted)', lineHeight: '1.7', maxWidth: '320px' }}>
            Punya proyek seru? Atau sekadar mau ngobrol soal teknologi? Hubungi saya kapan saja.
          </p>
          <div className="space-y-3 fade-in">
            {config.contact_email && (
              <a
                href={`mailto:${config.contact_email}`}
                className="flex items-center gap-3 text-sm transition-colors duration-200 hover:text-accent"
                style={{ color: 'var(--muted)', textDecoration: 'none' }}
              >
                <span className="w-8 h-px" style={{ background: 'var(--border)' }} />
                {config.contact_email}
              </a>
            )}
            {config.github_url && (
              <a
                href={config.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm transition-colors duration-200 hover:text-accent"
                style={{ color: 'var(--muted)', textDecoration: 'none' }}
              >
                <span className="w-8 h-px" style={{ background: 'var(--border)' }} />
                GitHub
              </a>
            )}
            {config.linkedin_url && (
              <a
                href={config.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm transition-colors duration-200 hover:text-accent"
                style={{ color: 'var(--muted)', textDecoration: 'none' }}
              >
                <span className="w-8 h-px" style={{ background: 'var(--border)' }} />
                LinkedIn
              </a>
            )}
          </div>
        </div>

        {/* Right - Form */}
        <form onSubmit={handleSubmit} className="space-y-4 fade-in">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs tracking-widest uppercase block mb-2" style={{ color: 'var(--muted)' }}>
                Nama *
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 text-sm bg-transparent outline-none transition-all duration-200"
                style={{ border: '1px solid var(--border)', color: 'var(--text)' }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                placeholder="Nama kamu"
              />
            </div>
            <div>
              <label className="text-xs tracking-widest uppercase block mb-2" style={{ color: 'var(--muted)' }}>
                Email *
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 text-sm bg-transparent outline-none transition-all duration-200"
                style={{ border: '1px solid var(--border)', color: 'var(--text)' }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                placeholder="email@kamu.com"
              />
            </div>
          </div>
          <div>
            <label className="text-xs tracking-widest uppercase block mb-2" style={{ color: 'var(--muted)' }}>
              Subjek
            </label>
            <input
              type="text"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="w-full px-4 py-3 text-sm bg-transparent outline-none transition-all duration-200"
              style={{ border: '1px solid var(--border)', color: 'var(--text)' }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
              placeholder="Topik pesan"
            />
          </div>
          <div>
            <label className="text-xs tracking-widest uppercase block mb-2" style={{ color: 'var(--muted)' }}>
              Pesan *
            </label>
            <textarea
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-3 text-sm bg-transparent outline-none resize-none transition-all duration-200"
              style={{ border: '1px solid var(--border)', color: 'var(--text)' }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
              placeholder="Cerita proyekmu..."
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full"
            style={{ opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Mengirim...' : 'Kirim Pesan'}
          </button>
        </form>
      </div>
    </section>
  )
}
