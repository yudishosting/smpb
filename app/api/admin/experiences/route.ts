export const dynamic = 'force-dynamic'
// app/api/admin/experiences/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const experiences = await prisma.experience.findMany({ orderBy: { order: 'asc' } })
  return NextResponse.json(experiences)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const exp = await prisma.experience.create({ data: body })
  return NextResponse.json(exp)
}
