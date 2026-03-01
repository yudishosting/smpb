'use client'
import { SessionProvider, signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Session } from 'next-auth'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '◈' },
  { href: '/admin/projects', label: 'Proyek', icon: '◻' },
  { href: '/admin/skills', label: 'Keahlian', icon: '◎' },
  { href: '/admin/experiences', label: 'Pengalaman', icon: '◉' },
  { href: '/admin/messages', label: 'Pesan', icon: '◈' },
  { href: '/admin/settings', label: 'Pengaturan', icon: '◷' },
]

export default function AdminLayoutClient({ children, session }: { children: React.ReactNode, session: Session }) {
  const pathname = usePathname()
  return (
    <SessionProvider session={session}>
      <div className="admin-layout min-h-screen flex" style={{ background: '#0a0a0a' }}>
        <aside className="w-60 flex-shrink-0 flex flex-col py-8 px-5" style={{ background: 'var(--surface)', borderRight: '1px solid var(--border)' }}>
          <div className="font-syne font-black text-lg mb-10 px-2">
            yudis<span style={{ color: 'var(--accent)' }}>.</span>
            <span className="text-xs ml-2 font-normal tracking-widest uppercase" style={{ color: 'var(--muted)' }}>admin</span>
          </div>
          <nav className="flex-1 space-y-1">
            {navItems.map((item) => {
              const active = pathname === item.href
              return (
                <Link key={item.href} href={item.href} className="flex items-center gap-3 px-3 py-2.5 text-sm tracking-wide transition-all duration-150 relative" style={{ color: active ? 'var(--accent)' : 'var(--muted)', background: active ? 'rgba(200,246,94,0.06)' : 'transparent', borderLeft: active ? '2px solid var(--accent)' : '2px solid transparent' }}>
                  <span className="text-xs">{item.icon}</span>
                  {item.label}
                </Link>
              )
            })}
          </nav>
          <div className="pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
            <div className="px-3 mb-3">
              <div className="text-sm font-medium">{session.user?.name}</div>
              <div className="text-xs" style={{ color: 'var(--muted)' }}>{session.user?.email}</div>
            </div>
            <button onClick={() => signOut({ callbackUrl: '/admin/login' })} className="w-full text-left px-3 py-2 text-xs tracking-widest uppercase transition-colors duration-150 hover:text-red-400" style={{ color: 'var(--muted)' }}>
              Keluar
            </button>
          </div>
        </aside>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </SessionProvider>
  )
}
