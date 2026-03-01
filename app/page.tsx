export const dynamic = 'force-dynamic'
// app/page.tsx
import { prisma } from '@/lib/prisma'
import Navbar from '@/components/Navbar'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Projects from '@/components/sections/Projects'
import Experience from '@/components/sections/Experience'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/Footer'
import Cursor from '@/components/Cursor'

async function getData() {
  const [projects, skills, experiences, messages, configs] = await Promise.all([
    prisma.project.findMany({
      where: { status: 'published' },
      orderBy: { order: 'asc' },
    }),
    prisma.skill.findMany({ orderBy: { order: 'asc' } }),
    prisma.experience.findMany({ orderBy: { order: 'asc' } }),
    prisma.message.count({ where: { read: false } }),
    prisma.siteConfig.findMany(),
  ])

  const config: Record<string, string> = {}
  configs.forEach((c) => { config[c.key] = c.value })

  return { projects, skills, experiences, config }
}

export default async function Home() {
  const { projects, skills, experiences, config } = await getData()

  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <Hero config={config} />
        <About skills={skills} config={config} />
        <Projects projects={projects} />
        <Experience experiences={experiences} />
        <Contact config={config} />
      </main>
      <Footer config={config} />
    </>
  )
}
