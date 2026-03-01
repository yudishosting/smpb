export const dynamic = 'force-dynamic'
'use client'
// app/admin/messages/page.tsx
import { useState, useEffect } from 'react'
import { toast } from 'sonner'

interface Message {
  id: string
  name: string
  email: string
  subject: string
  message: string
  read: boolean
  createdAt: string
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Message | null>(null)
  const [filter, setFilter] = useState<'all' | 'unread'>('all')

  const fetchMessages = async () => {
    const res = await fetch('/api/admin/messages')
    setMessages(await res.json())
    setLoading(false)
  }

  useEffect(() => { fetchMessages() }, [])

  const handleRead = async (id: string) => {
    await fetch(`/api/admin/messages/${id}`, { method: 'PATCH' })
    fetchMessages()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin hapus pesan ini?')) return
    await fetch(`/api/admin/messages/${id}`, { method: 'DELETE' })
    toast.success('Pesan dihapus')
    setSelected(null)
    fetchMessages()
  }

  const openMessage = (msg: Message) => {
    setSelected(msg)
    if (!msg.read) handleRead(msg.id)
  }

  const filtered = filter === 'unread' ? messages.filter(m => !m.read) : messages
  const unreadCount = messages.filter(m => !m.read).length

  return (
    <div className="p-8 md:p-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-syne font-black text-2xl tracking-tight mb-1">Kotak Masuk</h1>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>
            {unreadCount > 0 ? <span style={{ color: 'var(--accent)' }}>{unreadCount} belum dibaca</span> : 'Semua sudah dibaca'}
            {' · '}{messages.length} total
          </p>
        </div>
        <div className="flex gap-2">
          {(['all', 'unread'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-4 py-2 text-xs tracking-widest uppercase transition-all duration-150"
              style={{
                border: '1px solid var(--border)',
                color: filter === f ? 'var(--accent)' : 'var(--muted)',
                background: filter === f ? 'rgba(200,246,94,0.06)' : 'transparent',
                borderColor: filter === f ? 'var(--accent)' : 'var(--border)',
              }}
            >
              {f === 'all' ? 'Semua' : 'Belum Dibaca'}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-sm" style={{ color: 'var(--muted)' }}>Memuat...</div>
      ) : (
        <div className="grid md:grid-cols-[360px_1fr] gap-0 border" style={{ borderColor: 'var(--border)', minHeight: '500px' }}>
          {/* List */}
          <div style={{ borderRight: '1px solid var(--border)' }}>
            {filtered.length === 0 ? (
              <div className="p-8 text-sm text-center" style={{ color: 'var(--muted)' }}>Tidak ada pesan</div>
            ) : (
              filtered.map((msg, i) => (
                <div
                  key={msg.id}
                  onClick={() => openMessage(msg)}
                  className="p-4 transition-all duration-150 cursor-pointer"
                  style={{
                    borderBottom: i < filtered.length - 1 ? '1px solid var(--border)' : 'none',
                    background: selected?.id === msg.id ? 'rgba(200,246,94,0.04)' : 'transparent',
                    borderLeft: selected?.id === msg.id ? '2px solid var(--accent)' : '2px solid transparent',
                  }}
                  onMouseEnter={(e) => { if (selected?.id !== msg.id) (e.currentTarget as HTMLElement).style.background = 'var(--card)' }}
                  onMouseLeave={(e) => { if (selected?.id !== msg.id) (e.currentTarget as HTMLElement).style.background = 'transparent' }}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      {!msg.read && <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--accent)' }} />}
                      <span className={`text-sm ${!msg.read ? 'font-semibold' : ''}`}>{msg.name}</span>
                    </div>
                    <span className="text-[10px] flex-shrink-0" style={{ color: 'var(--muted)' }}>
                      {new Date(msg.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                  <div className="text-xs mb-1 font-medium truncate" style={{ color: 'var(--muted)' }}>{msg.subject}</div>
                  <div className="text-xs truncate" style={{ color: 'var(--muted)', opacity: 0.7 }}>{msg.message}</div>
                </div>
              ))
            )}
          </div>

          {/* Detail */}
          <div className="p-8">
            {selected ? (
              <div>
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h2 className="font-syne font-bold text-xl mb-1">{selected.subject}</h2>
                    <div className="text-sm" style={{ color: 'var(--muted)' }}>
                      Dari: <strong style={{ color: 'var(--text)' }}>{selected.name}</strong>
                      {' · '}
                      <a href={`mailto:${selected.email}`} style={{ color: 'var(--accent)', textDecoration: 'none' }}>{selected.email}</a>
                    </div>
                    <div className="text-xs mt-1" style={{ color: 'var(--muted)' }}>
                      {new Date(selected.createdAt).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(selected.id)}
                    className="px-3 py-1.5 text-xs hover:text-red-400 transition-colors"
                    style={{ border: '1px solid var(--border)', color: 'var(--muted)' }}
                  >
                    Hapus
                  </button>
                </div>

                <div
                  className="p-6 text-sm leading-relaxed whitespace-pre-wrap"
                  style={{ background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--text)' }}
                >
                  {selected.message}
                </div>

                <div className="mt-6">
                  <a
                    href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                    className="btn-primary inline-block"
                  >
                    Balas via Email
                  </a>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-sm" style={{ color: 'var(--muted)' }}>
                Pilih pesan untuk membaca
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
