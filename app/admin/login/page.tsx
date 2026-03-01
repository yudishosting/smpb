'use client'
// app/admin/login/page.tsx
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const result = await signIn('credentials', {
      email: form.email,
      password: form.password,
      redirect: false,
    })
    if (result?.ok) {
      toast.success('Login berhasil!')
      router.push('/admin')
    } else {
      toast.error('Email atau password salah')
    }
    setLoading(false)
  }

  return (
    <div
      className="admin-layout min-h-screen flex items-center justify-center px-6"
      style={{ background: '#0a0a0a' }}
    >
      <div className="w-full max-w-sm">
        <div className="mb-10">
          <div className="font-syne font-black text-2xl mb-2">
            yudis<span style={{ color: 'var(--accent)' }}>.</span>
          </div>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>
            Masuk ke panel admin
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs tracking-widest uppercase block mb-2" style={{ color: 'var(--muted)' }}>
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 text-sm bg-transparent outline-none"
              style={{ border: '1px solid var(--border)', color: 'var(--text)' }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
              placeholder="yudis@portfolio.com"
              required
            />
          </div>
          <div>
            <label className="text-xs tracking-widest uppercase block mb-2" style={{ color: 'var(--muted)' }}>
              Password
            </label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-3 text-sm bg-transparent outline-none"
              style={{ border: '1px solid var(--border)', color: 'var(--text)' }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full mt-2"
            style={{ opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Masuk...' : 'Masuk'}
          </button>
        </form>

        <p className="text-xs mt-6 text-center" style={{ color: 'var(--muted)' }}>
          Default: yudis@portfolio.com / admin123
        </p>
      </div>
    </div>
  )
}
