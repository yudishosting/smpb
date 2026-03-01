export const dynamic = 'force-dynamic'
// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().optional(),
  message: z.string().min(1),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = schema.parse(body)
    const message = await prisma.message.create({
      data: {
        name: data.name,
        email: data.email,
        subject: data.subject || 'Tanpa subjek',
        message: data.message,
      },
    })
    return NextResponse.json({ success: true, id: message.id })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Data tidak valid' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
