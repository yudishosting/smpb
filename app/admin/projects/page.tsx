'use client'
// app/admin/projects/page.tsx
import { useState, useEffect } from 'react'
import { toast } from 'sonner'

interface Project {
  id: string
  title: string
  description: string
  longDesc?: string
  image?: string
  demoUrl?: string
  githubUrl?: string
  tags: string[]
  featured: boolean
  status: string
  order: number
}

const empty: Omit<Project, 'id'> = {
  title: '', description: '', longDesc: '', image: '', demoUrl: '', githubUrl: '',
  tags: [], featured: false, status: 'published', order: 0,
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState<'add' | 'edit' | null>(null)
  const [current, setCurrent] = useState<Partial<Project>>(empty)
  const [tagInput, setTagInput] = useState('')
  const [saving, setSaving] = useState(false)

  const fetchProjects = async () => {
    const res = await fetch('/api/admin/projects')
    const data = await res.json()
    setProjects(data)
    setLoading(false)
  }

  useEffect(() => { fetchProjects() }, [])

  const openAdd = () => { setCurrent(empty); setTagInput(''); setModal('add') }
  const openEdit = (p: Project) => { setCurrent(p); setTagInput(p.tags.join(', ')); setModal('edit') }
  const closeModal = () => { setModal(null); setCurrent(empty); setTagInput('') }

  const handleSave = async () => {
    if (!current.title) return toast.error('Judul wajib diisi')
    setSaving(true)
    const payload = {
      ...current,
      tags: tagInput.split(',').map(t => t.trim()).filter(Boolean),
    }
    try {
      if (modal === 'add') {
        await fetch('/api/admin/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        toast.success('Proyek ditambahkan!')
      } else {
        await fetch(`/api/admin/projects/${current.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        toast.success('Proyek diperbarui!')
      }
      closeModal()
      fetchProjects()
    } catch { toast.error('Gagal menyimpan') }
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin hapus proyek ini?')) return
    await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' })
    toast.success('Proyek dihapus')
    fetchProjects()
  }

  return (
    <div className="p-8 md:p-10">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-syne font-black text-2xl tracking-tight mb-1">Kelola Proyek</h1>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>{projects.length} proyek total</p>
        </div>
        <button onClick={openAdd} className="btn-primary">+ Tambah Proyek</button>
      </div>

      {loading ? (
        <div className="text-sm" style={{ color: 'var(--muted)' }}>Memuat...</div>
      ) : (
        <div className="space-y-0 border" style={{ borderColor: 'var(--border)' }}>
          {projects.map((p, i) => (
            <div
              key={p.id}
              className="flex items-center justify-between gap-4 p-5 transition-colors hover:bg-[var(--card)]"
              style={{ borderBottom: i < projects.length - 1 ? '1px solid var(--border)' : 'none' }}
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div
                  className="w-1 h-10 flex-shrink-0"
                  style={{ background: p.featured ? 'var(--accent)' : 'var(--border)' }}
                />
                <div className="min-w-0">
                  <div className="font-medium truncate">{p.title}</div>
                  <div className="text-xs truncate" style={{ color: 'var(--muted)' }}>{p.description}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {p.featured && (
                  <span className="text-[10px] px-2 py-0.5 tracking-widest uppercase" style={{ background: 'rgba(200,246,94,0.1)', color: 'var(--accent)', border: '1px solid rgba(200,246,94,0.2)' }}>
                    Featured
                  </span>
                )}
                <span
                  className="text-[10px] px-2 py-0.5 tracking-widest uppercase"
                  style={{
                    border: '1px solid var(--border)',
                    color: p.status === 'published' ? '#22c55e' : 'var(--muted)'
                  }}
                >
                  {p.status === 'published' ? 'Publik' : 'Draft'}
                </span>
                <button
                  onClick={() => openEdit(p)}
                  className="px-3 py-1.5 text-xs tracking-wide transition-colors hover:text-accent"
                  style={{ border: '1px solid var(--border)', color: 'var(--muted)' }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="px-3 py-1.5 text-xs tracking-wide transition-colors hover:text-red-400"
                  style={{ border: '1px solid var(--border)', color: 'var(--muted)' }}
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
          {projects.length === 0 && (
            <div className="p-10 text-center text-sm" style={{ color: 'var(--muted)' }}>
              Belum ada proyek. Tambahkan yang pertama!
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)' }}>
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <h2 className="font-syne font-bold text-xl mb-8">
              {modal === 'add' ? 'Tambah Proyek' : 'Edit Proyek'}
            </h2>

            <div className="space-y-5">
              {[
                { label: 'Judul *', key: 'title', placeholder: 'Nama proyek' },
                { label: 'Deskripsi Singkat *', key: 'description', placeholder: 'Deskripsi 1-2 kalimat' },
                { label: 'URL Demo', key: 'demoUrl', placeholder: 'https://...' },
                { label: 'URL GitHub', key: 'githubUrl', placeholder: 'https://github.com/...' },
                { label: 'URL Gambar', key: 'image', placeholder: 'https://...' },
              ].map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label className="text-xs tracking-widest uppercase block mb-2" style={{ color: 'var(--muted)' }}>{label}</label>
                  <input
                    type="text"
                    value={(current as any)[key] || ''}
                    onChange={(e) => setCurrent({ ...current, [key]: e.target.value })}
                    placeholder={placeholder}
                    className="w-full px-4 py-3 text-sm bg-transparent outline-none"
                    style={{ border: '1px solid var(--border)', color: 'var(--text)' }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                  />
                </div>
              ))}

              <div>
                <label className="text-xs tracking-widest uppercase block mb-2" style={{ color: 'var(--muted)' }}>Deskripsi Panjang</label>
                <textarea
                  rows={4}
                  value={current.longDesc || ''}
                  onChange={(e) => setCurrent({ ...current, longDesc: e.target.value })}
                  placeholder="Deskripsi lengkap proyek..."
                  className="w-full px-4 py-3 text-sm bg-transparent outline-none resize-none"
                  style={{ border: '1px solid var(--border)', color: 'var(--text)' }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                />
              </div>

              <div>
                <label className="text-xs tracking-widest uppercase block mb-2" style={{ color: 'var(--muted)' }}>Tags (pisah dengan koma)</label>
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="React, Next.js, TypeScript"
                  className="w-full px-4 py-3 text-sm bg-transparent outline-none"
                  style={{ border: '1px solid var(--border)', color: 'var(--text)' }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-xs tracking-widest uppercase block mb-2" style={{ color: 'var(--muted)' }}>Status</label>
                  <select
                    value={current.status || 'published'}
                    onChange={(e) => setCurrent({ ...current, status: e.target.value })}
                    className="w-full px-4 py-3 text-sm outline-none"
                    style={{ border: '1px solid var(--border)', background: 'var(--card)', color: 'var(--text)' }}
                  >
                    <option value="published">Publik</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs tracking-widest uppercase block mb-2" style={{ color: 'var(--muted)' }}>Urutan</label>
                  <input
                    type="number"
                    value={current.order || 0}
                    onChange={(e) => setCurrent({ ...current, order: Number(e.target.value) })}
                    className="w-full px-4 py-3 text-sm bg-transparent outline-none"
                    style={{ border: '1px solid var(--border)', color: 'var(--text)' }}
                  />
                </div>
                <div>
                  <label className="text-xs tracking-widest uppercase block mb-2" style={{ color: 'var(--muted)' }}>Featured?</label>
                  <button
                    type="button"
                    onClick={() => setCurrent({ ...current, featured: !current.featured })}
                    className="w-full py-3 text-sm tracking-wide transition-all duration-200"
                    style={{
                      border: current.featured ? '1px solid var(--accent)' : '1px solid var(--border)',
                      color: current.featured ? 'var(--accent)' : 'var(--muted)',
                      background: current.featured ? 'rgba(200,246,94,0.06)' : 'transparent',
                    }}
                  >
                    {current.featured ? '✓ Ya' : 'Tidak'}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button onClick={closeModal} className="btn-outline flex-1">Batal</button>
              <button onClick={handleSave} disabled={saving} className="btn-primary flex-1" style={{ opacity: saving ? 0.7 : 1 }}>
                {saving ? 'Menyimpan...' : 'Simpan'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
