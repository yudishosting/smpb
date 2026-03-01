'use client'
// components/SessionProvider.tsx
import { SessionProvider as NextAuthProvider } from 'next-auth/react'

export default function SessionProvider({ children }: { children: React.ReactNode }) {
  return <NextAuthProvider>{children}</NextAuthProvider>
}
