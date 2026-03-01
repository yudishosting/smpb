export const dynamic = 'force-dynamic'
// app/api/admin/skills/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const skills = await prisma.skill.findMany({ orderBy: { order: 'asc' } })
  return NextResponse.json(skills)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const skill = await prisma.skill.create({ data: body })
  return NextResponse.json(skill)
}
