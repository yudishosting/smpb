// components/Footer.tsx
interface FooterProps {
  config: Record<string, string>
}

export default function Footer({ config }: FooterProps) {
  return (
    <footer
      className="px-8 md:px-14 py-6 flex flex-col md:flex-row justify-between items-center gap-4"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <p className="text-xs tracking-wide" style={{ color: 'var(--muted)' }}>
        © {new Date().getFullYear()} Yudis — Dibuat dengan ❤️ pakai Next.js + NeonDB
      </p>
      <a href="/admin" className="text-xs tracking-widest uppercase transition-colors duration-200 hover:text-accent" style={{ color: 'var(--muted)', textDecoration: 'none' }}>
        Admin Panel ↗
      </a>
    </footer>
  )
}
