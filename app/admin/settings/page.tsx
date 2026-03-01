export const dynamic = 'force-dynamic'
'use client'
// app/admin/settings/page.tsx
import { useState, useEffect } from 'react'
import { toast } from 'sonner'

interface Config {
  hero_title: string
  hero_subtitle: string
  about_text: string
  about_text2: string
  contact_email: string
  github_url: string
  linkedin_url: string
  available: string
}

const defaultConfig: Config = {
  hero_title: '',
  hero_subtitle: '',
  about_text: '',
  about_text2: '',
  contact_email: '',
  github_url: '',
  linkedin_url: '',
  available: 'true',
}

export default function AdminSettings() {
  const [config, setConfig] = useState<Config>(defaultConfig)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch('/api/admin/config')
      .then(r => r.json())
      .then(data => { setConfig({ ...defaultConfig, ...data }); setLoading(false) })
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      await fetch('/api/admin/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      })
      toast.success('Pengaturan disimpan!')
    } catch {
      toast.error('Gagal menyimpan')
    }
    setSaving(false)
  }

  if (loading) return (
    <div className="p-8 text-sm" style={{ color: 'var(--muted)' }}>Memuat...</div>
  )

  return (
    <div className="p-8 md:p-10 max-w-2xl">
      <div className="mb-10">
        <h1 className="font-syne font-black text-2xl tracking-tight mb-1">Pengaturan Situs</h1>
        <p className="text-sm" style={{ color: 'var(--muted)' }}>Kelola konten dan informasi yang tampil di portfolio</p>
      </div>

      <div className="space-y-8">
        {/* Hero Section */}
        <div>
          <h2 className="font-syne font-bold text-sm tracking-widest uppercase mb-4" style={{ color: 'var(--accent)' }}>
            Bagian Hero
          </h2>
          <div className="space-y-4 p-6" style={{ border: '1px solid var(--border)' }}>
            <div>
              <label className="text-xs tracking-widest uppercase block mb-2" style={{ color: 'var(--muted)' }}>
                Subtitle / Posisi
              </label>
              <input
                type="text"
                value={config.hero_subtitle}
                onChange={(e) => setConfig({ ...config, hero_subtitle: e.target.value })}
                className="w-full px-4 py-3 text-sm bg-transparent outline-none"
                style={{ border: '1px solid var(--border)', color: 'var(--text)' }}
                placeholder="Full-Stack Developer"
              />
            </div>
            <div>
              <label className="text-xs tracking-widest uppercase block mb-2" style={{ color: 'var(--muted)' }}>
                Judul Hero (pisah baris dengan \n)
              </label>
              <textarea
                rows={3}
                value={config.hero_title}
                onChange={(e) => setConfig({ ...config, hero_title: e.target.value })}
                className="w-full px-4 py-3 text-sm bg-transparent outline-none resize-none"
                style={{ border: '1px solid var(--border)', color: 'var(--text)' }}
                placeholder="Membangun\nPengalaman\nDigital."
              />
            </div>
            <div>
              <label className="text-xs tracking-widest uppercase block mb-2" style={{ color: 'var(--muted)' }}>
                Status Ketersediaan
              </label>
              <button
                type="button"
                onClick={() => setConfig({ ...config, available: config.available === 'true' ? 'false' : 'true' })}
                className="px-4 py-2.5 text-sm tracking-wide transition-all duration-200"
                style={{
                  border: config.available === 'true' ? '1px solid #22c55e' : '1px solid var(--border)',
                  color: config.available === 'true' ? '#22c55e' : 'var(--muted)',
                  background: config.available === 'true' ? 'rgba(34,197,94,0.06)' : 'transparent',
                }}
              >
                {config.available === 'true' ? '● Tersedia untuk kerja' : '○ Tidak tersedia'}
              </button>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div>
          <h2 className="font-syne font-bold text-sm tracking-widest uppercase mb-4" style={{ color: 'var(--accent)' }}>
            Bagian Tentang
          </h2>
          <div className="space-y-4 p-6" style={{ border: '1px solid var(--border)' }}>
            <div>
              <label className="text-xs tracking-widest uppercase block mb-2" style={{ color: 'var(--muted)' }}>Paragraf 1</label>
              <textarea
                rows={3}
                value={config.about_text}
                onChange={(e) => setConfig({ ...config, about_text: e.target.value })}
                className="w-full px-4 py-3 text-sm bg-transparent outline-none resize-none"
                style={{ border: '1px solid var(--border)', color: 'var(--text)' }}
              />
            </div>
            <div>
              <label className="text-xs tracking-widest uppercase block mb-2" style={{ color: 'var(--muted)' }}>Paragraf 2</label>
              <textarea
                rows={3}
                value={config.about_text2}
                onChange={(e) => setConfig({ ...config, about_text2: e.target.value })}
                className="w-full px-4 py-3 text-sm bg-transparent outline-none resize-none"
                style={{ border: '1px solid var(--border)', color: 'var(--text)' }}
              />
            </div>
          </div>
        </div>

        {/* Contact & Social */}
        <div>
          <h2 className="font-syne font-bold text-sm tracking-widest uppercase mb-4" style={{ color: 'var(--accent)' }}>
            Kontak & Sosial Media
          </h2>
          <div className="space-y-4 p-6" style={{ border: '1px solid var(--border)' }}>
            {[
              { label: 'Email Kontak', key: 'contact_email', placeholder: 'kamu@email.com' },
              { label: 'URL GitHub', key: 'github_url', placeholder: 'https://github.com/username' },
              { label: 'URL LinkedIn', key: 'linkedin_url', placeholder: 'https://linkedin.com/in/username' },
            ].map(({ label, key, placeholder }) => (
              <div key={key}>
                <label className="text-xs tracking-widest uppercase block mb-2" style={{ color: 'var(--muted)' }}>{label}</label>
                <input
                  type="text"
                  value={(config as any)[key]}
                  onChange={(e) => setConfig({ ...config, [key]: e.target.value })}
                  placeholder={placeholder}
                  className="w-full px-4 py-3 text-sm bg-transparent outline-none"
                  style={{ border: '1px solid var(--border)', color: 'var(--text)' }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-primary"
          style={{ opacity: saving ? 0.7 : 1 }}
        >
          {saving ? 'Menyimpan...' : 'Simpan Semua Perubahan'}
        </button>
      </div>
    </div>
  )
}
