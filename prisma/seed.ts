// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12)
  await prisma.user.upsert({
    where: { email: 'yudis@portfolio.com' },
    update: {},
    create: {
      email: 'yudis@portfolio.com',
      password: hashedPassword,
      name: 'Yudis',
    },
  })

  // Create site config
  const configs = [
    { key: 'hero_title', value: 'Membangun\nPengalaman\nDigital.' },
    { key: 'hero_subtitle', value: 'Full-Stack Developer' },
    { key: 'about_text', value: 'Saya seorang Full-Stack Developer dengan passion di web development. Saya suka bikin hal yang bukan cuma fungsional, tapi juga kelihatan keren dan terasa smooth.' },
    { key: 'about_text2', value: 'Fokus di React, Next.js, Node.js, dan selalu cari cara untuk push boundaries of what\'s possible di web.' },
    { key: 'contact_email', value: 'yudis299@gmail.com' },
    { key: 'github_url', value: 'https://github.com/yudis299' },
    { key: 'linkedin_url', value: 'https://linkedin.com/in/yudis299' },
    { key: 'available', value: 'true' },
  ]

  for (const config of configs) {
    await prisma.siteConfig.upsert({
      where: { key: config.key },
      update: { value: config.value },
      create: config,
    })
  }

  // Seed skills
  await prisma.skill.deleteMany()
  const skills = [
    { name: 'React', category: 'Frontend', level: 90, order: 1 },
    { name: 'Next.js', category: 'Frontend', level: 88, order: 2 },
    { name: 'TypeScript', category: 'Frontend', level: 85, order: 3 },
    { name: 'Tailwind CSS', category: 'Frontend', level: 92, order: 4 },
    { name: 'Node.js', category: 'Backend', level: 85, order: 5 },
    { name: 'Express.js', category: 'Backend', level: 82, order: 6 },
    { name: 'PostgreSQL', category: 'Database', level: 80, order: 7 },
    { name: 'Prisma', category: 'Database', level: 85, order: 8 },
    { name: 'Docker', category: 'Tools', level: 75, order: 9 },
    { name: 'Git', category: 'Tools', level: 90, order: 10 },
  ]
  await prisma.skill.createMany({ data: skills })

  // Seed experience
  await prisma.experience.deleteMany()
  const experiences = [
    {
      company: 'Tech Startup XYZ',
      role: 'Senior Full-Stack Developer',
      description: 'Memimpin tim frontend dalam membangun platform SaaS yang melayani 50k+ pengguna aktif. Bertanggung jawab atas arsitektur frontend dan performa aplikasi.',
      startDate: 'Jan 2023',
      endDate: null,
      type: 'Full-time',
      order: 1,
    },
    {
      company: 'Digital Agency ABC',
      role: 'Frontend Developer',
      description: 'Mengembangkan berbagai web application untuk klien enterprise menggunakan React dan Next.js. Berhasil meningkatkan performa loading sebesar 40%.',
      startDate: 'Mar 2021',
      endDate: 'Dec 2022',
      type: 'Full-time',
      order: 2,
    },
    {
      company: 'Freelance',
      role: 'Web Developer',
      description: 'Mengerjakan berbagai project website untuk UMKM dan startup lokal. Spesialisasi di landing page dan toko online.',
      startDate: 'Jan 2020',
      endDate: 'Feb 2021',
      type: 'Freelance',
      order: 3,
    },
  ]
  await prisma.experience.createMany({ data: experiences })

  // Seed projects
  await prisma.project.deleteMany()
  const projects = [
    {
      title: 'Platform E-Commerce',
      description: 'Full-stack e-commerce dengan real-time inventory, payment gateway Midtrans, dan dashboard admin yang powerful.',
      longDesc: 'Platform e-commerce lengkap dengan fitur manajemen produk, keranjang belanja real-time, integrasi payment gateway Midtrans, sistem notifikasi email, dan dashboard analytics untuk admin.',
      tags: ['Next.js', 'PostgreSQL', 'Redis', 'Midtrans'],
      featured: true,
      order: 1,
    },
    {
      title: 'Aplikasi Chat Real-time',
      description: 'Aplikasi chat dengan WebSocket, enkripsi end-to-end, dan support file sharing.',
      tags: ['Socket.io', 'React', 'Node.js'],
      featured: true,
      order: 2,
    },
    {
      title: 'Dashboard AI Analytics',
      description: 'Dashboard analytics dengan AI insights, visualisasi data interaktif, dan laporan otomatis.',
      tags: ['Python', 'FastAPI', 'D3.js'],
      featured: false,
      order: 3,
    },
    {
      title: 'CMS Headless Custom',
      description: 'Headless CMS custom dengan visual editor drag-and-drop dan multi-tenant support.',
      tags: ['TypeScript', 'GraphQL', 'Prisma'],
      featured: false,
      order: 4,
    },
  ]
  await prisma.project.createMany({ data: projects })

  console.log('✅ Seeding selesai!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
