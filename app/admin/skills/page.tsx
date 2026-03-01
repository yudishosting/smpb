export const dynamic = 'force-dynamic'
'use client'
// app/admin/skills/page.tsx
import { useState, useEffect } from 'react'
import { toast } from 'sonner'

interface Skill {
  id: string
  name: string
  category: string
  level: number
  order: number
}

const empty = { name: '', category: 'Frontend', level: 80, order: 0 }
const categories = ['Frontend', 'Backend', 'Database', 'Tools']
const categoryColors: Record<string, string> = {
  Frontend: '#c8f65e', Backend: '#ff6b35', Database: '#60a5fa', Tools: '#a78bfa'
}

export default function AdminSkills() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState<'add' | 'edit' | null>(null)
  const [current, setCurrent] = useState<Partial<Skill>>(empty)
  const [saving, setSaving] = useState(false)

  const fetchSkills = async () => {
    const res = await fetch('/api/admin/skills')
    setSkills(await res.json())
    setLoading(false)
  }

  useEffect(() => { fetchSkills() }, [])

  const grouped = skills.reduce<Record<string, Skill[]>>((acc, s) => {
    if (!acc[s.category]) acc[s.category] = []
    acc[s.category].push(s)
    return acc
  }, {})

  const handleSave = async () => {
    if (!current.name) return toast.error('Nama wajib diisi')
    setSaving(true)
    try {
      if (modal === 'add') {
        await fetch('/api/admin/skills', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(current) })
        toast.success('Keahlian ditambahkan!')
      } else {
        await fetch(`/api/admin/skills/${current.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(current) })
        toast.success('Keahlian diperbarui!')
      }
      setModal(null); setCurrent(empty); fetchSkills()
    } catch { toast.error('Gagal menyimpan') }
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin hapus?')) return
    await fetch(`/api/admin/skills/${id}`, { method: 'DELETE' })
    toast.success('Keahlian dihapus')
    fetchSkills()
  }

  return (
    <div className="p-8 md:p-10">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-syne font-black text-2xl tracking-tight mb-1">Kelola Keahlian</h1>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>{skills.length} keahlian total</p>
        </div>
        <button onClick={() => { setCurrent(empty); setModal('add') }} className="btn-primary">+ Tambah</button>
      </div>

      {loading ? (
        <div className="text-sm" style={{ color: 'var(--muted)' }}>Memuat...</div>
      ) : (
        <div className="space-y-8">
          {categories.map((cat) => {
            const catSkills = grouped[cat] || []
            return (
              <div key={cat}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-2 h-2 rounded-full" style={{ background: categoryColors[cat] }} />
                  <span className="text-xs tracking-widest uppercase font-medium" style={{ color: categoryColors[cat] }}>
                    {cat}
                  </span>
                  <span className="text-xs" style={{ color: 'var(--muted)' }}>({catSkills.length})</span>
                </div>
                <div className="border" style={{ borderColor: 'var(--border)' }}>
                  {catSkills.map((skill, i) => (
                    <div
                      key={skill.id}
                      className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-[var(--card)] transition-colors"
                      style={{ borderBottom: i < catSkills.length - 1 ? '1px solid var(--border)' : 'none' }}
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="font-medium">{skill.name}</div>
                        <div className="flex-1 max-w-32">
                          <div className="h-1 w-full rounded-full" style={{ background: 'var(--border)' }}>
                            <div
                              className="h-1 rounded-full transition-all"
                              style={{ width: `${skill.level}%`, background: categoryColors[cat] }}
                            />
                          </div>
                        </div>
                        <span className="text-xs" style={{ color: 'var(--muted)' }}>{skill.level}%</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => { setCurrent(skill); setModal('edit') }}
                          className="px-3 py-1.5 text-xs hover:text-accent transition-colors"
                          style={{ border: '1px solid var(--border)', color: 'var(--muted)' }}
                        >Edit</button>
                        <button
                          onClick={() => handleDelete(skill.id)}
                          className="px-3 py-1.5 text-xs hover:text-red-400 transition-colors"
                          style={{ border: '1px solid var(--border)', color: 'var(--muted)' }}
                        >Hapus</button>
                      </div>
                    </div>
                  ))}
                  {catSkills.length === 0 && (
                    <div className="p-5 text-sm text-center" style={{ color: 'var(--muted)' }}>
                      Belum ada di kategori ini
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)' }}>
          <div className="w-full max-w-md p-8" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <h2 className="font-syne font-bold text-xl mb-8">{modal === 'add' ? 'Tambah Keahlian' : 'Edit Keahlian'}</h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs tracking-widest uppercase block mb-2" style={{ color: 'var(--muted)' }}>Nama *</label>
                <input
                  type="text" value={current.name || ''}
                  onChange={(e) => setCurrent({ ...current, name: e.target.value })}
                  className="w-full px-4 py-3 text-sm bg-transparent outline-none"
                  style={{ border: '1px solid var(--border)', color: 'var(--text)' }}
                  placeholder="React"
                />
              </div>
              <div>
                <label className="text-xs tracking-widest uppercase block mb-2" style={{ color: 'var(--muted)' }}>Kategori</label>
                <select
                  value={current.category || 'Frontend'}
                  onChange={(e) => setCurrent({ ...current, category: e.target.value })}
                  className="w-full px-4 py-3 text-sm outline-none"
                  style={{ border: '1px solid var(--border)', background: 'var(--card)', color: 'var(--text)' }}
                >
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs tracking-widest uppercase block mb-2" style={{ color: 'var(--muted)' }}>
                  Level: {current.level}%
                </label>
                <input
                  type="range" min={0} max={100}
                  value={current.level || 80}
                  onChange={(e) => setCurrent({ ...current, level: Number(e.target.value) })}
                  className="w-full accent-[var(--accent)]"
                  style={{ accentColor: 'var(--accent)' }}
                />
              </div>
              <div>
                <label className="text-xs tracking-widest uppercase block mb-2" style={{ color: 'var(--muted)' }}>Urutan</label>
                <input
                  type="number" value={current.order || 0}
                  onChange={(e) => setCurrent({ ...current, order: Number(e.target.value) })}
                  className="w-full px-4 py-3 text-sm bg-transparent outline-none"
                  style={{ border: '1px solid var(--border)', color: 'var(--text)' }}
                />
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
