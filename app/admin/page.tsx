export const dynamic = 'force-dynamic'
// app/admin/page.tsx
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

async function getStats() {
  const [projects, skills, experiences, messages, unread] = await Promise.all([
    prisma.project.count(),
    prisma.skill.count(),
    prisma.experience.count(),
    prisma.message.count(),
    prisma.message.count({ where: { read: false } }),
  ])
  return { projects, skills, experiences, messages, unread }
}

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)
  const stats = await getStats()
  const recentMessages = await prisma.message.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
  })

  const cards = [
    { label: 'Total Proyek', value: stats.projects, href: '/admin/projects', color: '#c8f65e' },
    { label: 'Keahlian', value: stats.skills, href: '/admin/skills', color: '#60a5fa' },
    { label: 'Pengalaman', value: stats.experiences, href: '/admin/experiences', color: '#a78bfa' },
    { label: 'Pesan Masuk', value: stats.messages, badge: stats.unread, href: '/admin/messages', color: '#ff6b35' },
  ]

  return (
    <div className="p-8 md:p-10">
      <div className="mb-10">
        <h1 className="font-syne font-black text-2xl tracking-tight mb-1">
          Selamat datang, {session?.user?.name} 👋
        </h1>
        <p className="text-sm" style={{ color: 'var(--muted)' }}>
          Kelola konten portfolio kamu dari sini.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="p-6 transition-all duration-200 relative"
            style={{ background: 'var(--card)', border: '1px solid var(--border)', textDecoration: 'none' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = card.color }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)' }}
          >
            {card.badge ? (
              <span
                className="absolute top-3 right-3 text-xs px-2 py-0.5 rounded-full font-bold"
                style={{ background: card.color, color: '#0a0a0a' }}
              >
                {card.badge} baru
              </span>
            ) : null}
            <div
              className="font-syne font-black text-4xl mb-2"
              style={{ color: card.color }}
            >
              {card.value}
            </div>
            <div className="text-xs tracking-widest uppercase" style={{ color: 'var(--muted)' }}>
              {card.label}
            </div>
          </Link>
        ))}
      </div>

      {/* Recent messages */}
      <div>
        <div className="flex justify-between items-center mb-5">
          <h2 className="font-syne font-bold text-lg">Pesan Terbaru</h2>
          <Link href="/admin/messages" className="text-xs tracking-widest uppercase hover:text-accent transition-colors" style={{ color: 'var(--muted)', textDecoration: 'none' }}>
            Lihat Semua →
          </Link>
        </div>
        <div
          className="border"
          style={{ borderColor: 'var(--border)' }}
        >
          {recentMessages.length === 0 ? (
            <div className="p-8 text-center text-sm" style={{ color: 'var(--muted)' }}>
              Belum ada pesan masuk
            </div>
          ) : (
            recentMessages.map((msg, i) => (
              <div
                key={msg.id}
                className="flex items-start justify-between gap-4 p-4 transition-colors duration-150 hover:bg-[var(--card)]"
                style={{ borderBottom: i < recentMessages.length - 1 ? '1px solid var(--border)' : 'none' }}
              >
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  {!msg.read && (
                    <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent" />
                  )}
                  {msg.read && <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: 'var(--border)' }} />}
                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate">{msg.name}</div>
                    <div className="text-xs truncate" style={{ color: 'var(--muted)' }}>{msg.subject}</div>
                  </div>
                </div>
                <div className="text-xs flex-shrink-0" style={{ color: 'var(--muted)' }}>
                  {new Date(msg.createdAt).toLocaleDateString('id-ID')}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
