'use client'
// app/admin/experiences/page.tsx
import { useState, useEffect } from 'react'
import { toast } from 'sonner'

interface Experience {
  id: string
  company: string
  role: string
  description?: string
  startDate: string
  endDate?: string
  type: string
  order: number
}

const empty = { company: '', role: '', description: '', startDate: '', endDate: '', type: 'Full-time', order: 0 }
const types = ['Full-time', 'Part-time', 'Freelance', 'Internship']

export default function AdminExperiences() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState<'add' | 'edit' | null>(null)
  const [current, setCurrent] = useState<Partial<Experience>>(empty)
  const [saving, setSaving] = useState(false)

  const fetchExp = async () => {
    const res = await fetch('/api/admin/experiences')
    setExperiences(await res.json())
    setLoading(false)
  }

  useEffect(() => { fetchExp() }, [])

  const handleSave = async () => {
    if (!current.company || !current.role) return toast.error('Perusahaan & jabatan wajib diisi')
    setSaving(true)
    const payload = { ...current, endDate: current.endDate || null }
    try {
      if (modal === 'add') {
        await fetch('/api/admin/experiences', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        toast.success('Pengalaman ditambahkan!')
      } else {
        await fetch(`/api/admin/experiences/${current.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        toast.success('Pengalaman diperbarui!')
      }
      setModal(null); setCurrent(empty); fetchExp()
    } catch { toast.error('Gagal menyimpan') }
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin hapus?')) return
    await fetch(`/api/admin/experiences/${id}`, { method: 'DELETE' })
    toast.success('Pengalaman dihapus')
    fetchExp()
  }

  return (
    <div className="p-8 md:p-10">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-syne font-black text-2xl tracking-tight mb-1">Kelola Pengalaman</h1>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>{experiences.length} pengalaman</p>
        </div>
        <button onClick={() => { setCurrent(empty); setModal('add') }} className="btn-primary">+ Tambah</button>
      </div>

      {loading ? (
        <div className="text-sm" style={{ color: 'var(--muted)' }}>Memuat...</div>
      ) : (
        <div className="border" style={{ borderColor: 'var(--border)' }}>
          {experiences.map((exp, i) => (
            <div
              key={exp.id}
              className="flex items-start justify-between gap-4 p-5 hover:bg-[var(--card)] transition-colors"
              style={{ borderBottom: i < experiences.length - 1 ? '1px solid var(--border)' : 'none' }}
            >
              <div className="flex gap-4 flex-1 min-w-0">
                <div
                  className="w-1 flex-shrink-0 mt-1.5 self-stretch"
                  style={{ background: exp.endDate ? 'var(--border)' : 'var(--accent)' }}
                />
                <div className="min-w-0">
                  <div className="font-syne font-bold">{exp.company}</div>
                  <div className="text-sm mb-1" style={{ color: 'var(--muted)' }}>{exp.role}</div>
                  <div className="text-xs" style={{ color: 'var(--muted)' }}>
                    {exp.startDate} — {exp.endDate || <span style={{ color: 'var(--accent)' }}>Sekarang</span>}
                    <span className="ml-3 px-2 py-0.5 border text-[10px] tracking-widest uppercase" style={{ borderColor: 'var(--border)' }}>{exp.type}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => { setCurrent(exp); setModal('edit') }} className="px-3 py-1.5 text-xs hover:text-accent transition-colors" style={{ border: '1px solid var(--border)', color: 'var(--muted)' }}>Edit</button>
                <button onClick={() => handleDelete(exp.id)} className="px-3 py-1.5 text-xs hover:text-red-400 transition-colors" style={{ border: '1px solid var(--border)', color: 'var(--muted)' }}>Hapus</button>
              </div>
            </div>
          ))}
          {experiences.length === 0 && (
            <div className="p-10 text-center text-sm" style={{ color: 'var(--muted)' }}>Belum ada pengalaman</div>
          )}
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)' }}>
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto p-8" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <h2 className="font-syne font-bold text-xl mb-8">{modal === 'add' ? 'Tambah Pengalaman' : 'Edit Pengalaman'}</h2>
            <div className="space-y-4">
              {[
                { label: 'Perusahaan *', key: 'company', placeholder: 'PT. Nama Perusahaan' },
                { label: 'Jabatan *', key: 'role', placeholder: 'Senior Developer' },
              ].map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label className="text-xs tracking-widest uppercase block mb-2" style={{ color: 'var(--muted)' }}>{label}</label>
                  <input
                    type="text" value={(current as any)[key] || ''}
                    onChange={(e) => setCurrent({ ...current, [key]: e.target.value })}
                    placeholder={placeholder}
                    className="w-full px-4 py-3 text-sm bg-transparent outline-none"
                    style={{ border: '1px solid var(--border)', color: 'var(--text)' }}
                  />
                </div>
              ))}
              <div>
                <label className="text-xs tracking-widest uppercase block mb-2" style={{ color: 'var(--muted)' }}>Deskripsi</label>
                <textarea
                  rows={3} value={current.description || ''}
                  onChange={(e) => setCurrent({ ...current, description: e.target.value })}
                  placeholder="Apa yang kamu kerjakan di sini..."
                  className="w-full px-4 py-3 text-sm bg-transparent outline-none resize-none"
                  style={{ border: '1px solid var(--border)', color: 'var(--text)' }}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs tracking-widest uppercase block mb-2" style={{ color: 'var(--muted)' }}>Mulai</label>
                  <input type="text" value={current.startDate || ''} onChange={(e) => setCurrent({ ...current, startDate: e.target.value })} placeholder="Jan 2023" className="w-full px-4 py-3 text-sm bg-transparent outline-none" style={{ border: '1px solid var(--border)', color: 'var(--text)' }} />
                </div>
                <div>
                  <label className="text-xs tracking-widest uppercase block mb-2" style={{ color: 'var(--muted)' }}>Selesai (kosong = sekarang)</label>
                  <input type="text" value={current.endDate || ''} onChange={(e) => setCurrent({ ...current, endDate: e.target.value })} placeholder="Des 2024" className="w-full px-4 py-3 text-sm bg-transparent outline-none" style={{ border: '1px solid var(--border)', color: 'var(--text)' }} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs tracking-widest uppercase block mb-2" style={{ color: 'var(--muted)' }}>Tipe</label>
                  <select value={current.type || 'Full-time'} onChange={(e) => setCurrent({ ...current, type: e.target.value })} className="w-full px-4 py-3 text-sm outline-none" style={{ border: '1px solid var(--border)', background: 'var(--card)', color: 'var(--text)' }}>
                    {types.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs tracking-widest uppercase block mb-2" style={{ color: 'var(--muted)' }}>Urutan</label>
                  <input type="number" value={current.order || 0} onChange={(e) => setCurrent({ ...current, order: Number(e.target.value) })} className="w-full px-4 py-3 text-sm bg-transparent outline-none" style={{ border: '1px solid var(--border)', color: 'var(--text)' }} />
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-8">
              <button onClick={() => setModal(null)} className="btn-outline flex-1">Batal</button>
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
