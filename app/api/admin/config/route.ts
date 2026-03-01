export const dynamic = 'force-dynamic'
// app/api/admin/config/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const configs = await prisma.siteConfig.findMany()
  const config: Record<string, string> = {}
  configs.forEach((c) => { config[c.key] = c.value })
  return NextResponse.json(config)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json() as Record<string, string>
  const updates = Object.entries(body).map(([key, value]) =>
    prisma.siteConfig.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    })
  )
  await Promise.all(updates)
  return NextResponse.json({ success: true })
}
