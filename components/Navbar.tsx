'use client'
// components/Navbar.tsx
import { useEffect, useState } from 'react'
import Link from 'next/link'

const links = [
  { href: '#tentang', label: 'Tentang' },
  { href: '#proyek', label: 'Proyek' },
  { href: '#pengalaman', label: 'Pengalaman' },
  { href: '#kontak', label: 'Kontak' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 md:px-14 py-6 transition-all duration-300 ${
        scrolled ? 'border-b border-[var(--border)] backdrop-blur-xl bg-black/80' : ''
      }`}
    >
      <Link href="/" className="font-syne font-black text-xl tracking-tight">
        yudis<span className="text-accent">.</span>
      </Link>

      {/* Desktop */}
      <ul className="hidden md:flex gap-9">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="text-[var(--muted)] hover:text-accent text-xs tracking-[0.1em] uppercase transition-colors duration-200"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Mobile hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-2"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menu"
      >
        <span className={`block w-6 h-0.5 bg-[var(--text)] transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`block w-6 h-0.5 bg-[var(--text)] transition-all ${menuOpen ? 'opacity-0' : ''}`} />
        <span className={`block w-6 h-0.5 bg-[var(--text)] transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[var(--surface)] border-b border-[var(--border)] py-6 px-8 flex flex-col gap-5 md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[var(--muted)] hover:text-accent text-sm tracking-widest uppercase"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
