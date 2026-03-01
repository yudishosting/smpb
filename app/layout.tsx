// app/layout.tsx
import type { Metadata } from 'next'
import { Syne, DM_Sans } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '600', '700', '800'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['300', '400', '500'],
})

export const metadata: Metadata = {
  title: 'Yudis — Full-Stack Developer',
  description: 'Portfolio Yudis — Full-Stack Developer spesialis React, Next.js, dan Node.js.',
  keywords: ['Yudis', 'Full-Stack Developer', 'React', 'Next.js', 'Portfolio'],
  openGraph: {
    title: 'Yudis — Full-Stack Developer',
    description: 'Membangun pengalaman digital yang cepat, scalable, dan indah.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={`${syne.variable} ${dmSans.variable}`}>
      <body>
        {children}
        <Toaster
          position="bottom-right"
          theme="dark"
          toastOptions={{
            style: {
              background: '#161616',
              border: '1px solid #222',
              color: '#f0f0f0',
            },
          }}
        />
      </body>
    </html>
  )
}
