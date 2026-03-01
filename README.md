# 🔥 Portfolio Yudis — Setup Guide

## Stack
- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS
- **Database**: NeonDB (PostgreSQL) + Prisma ORM
- **Auth**: NextAuth.js
- **Deploy**: Vercel (recommended)

---

## 🚀 Cara Setup (Step by Step)

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup NeonDB
1. Buka [neon.tech](https://neon.tech) dan buat akun gratis
2. Buat project baru (pilih region terdekat, misal Singapore)
3. Copy connection string dari dashboard NeonDB
4. Ada 2 connection string yang dibutuhkan:
   - **Pooled** (untuk `DATABASE_URL`) — pakai ini untuk query normal
   - **Direct** (untuk `DIRECT_URL`) — pakai ini untuk migrations

### 3. Setup Environment Variables
```bash
# Salin file contoh
cp .env.example .env.local

# Isi dengan data kamu:
DATABASE_URL="postgresql://USER:PASS@ep-xxx.neon.tech/neondb?sslmode=require"
DIRECT_URL="postgresql://USER:PASS@ep-xxx.neon.tech/neondb?sslmode=require"
NEXTAUTH_SECRET="buat-random-string-panjang-disini"
NEXTAUTH_URL="http://localhost:3000"
```

> **Generate NEXTAUTH_SECRET:**
> ```bash
> openssl rand -base64 32
> ```

### 4. Push Schema ke Database
```bash
# Generate Prisma client
npm run db:generate

# Push schema ke NeonDB
npm run db:push
```

### 5. Seed Data Awal
```bash
npm run db:seed
```
Ini akan membuat:
- User admin: `yudis@portfolio.com` / `admin123`
- Skills, pengalaman, dan proyek contoh

### 6. Jalankan Dev Server
```bash
npm run dev
```

Buka:
- **Portfolio**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin

---

## 📁 Struktur Project
```
├── app/
│   ├── page.tsx              # Halaman portfolio utama
│   ├── admin/
│   │   ├── page.tsx          # Dashboard admin
│   │   ├── projects/         # Kelola proyek
│   │   ├── skills/           # Kelola keahlian
│   │   ├── experiences/      # Kelola pengalaman
│   │   ├── messages/         # Kotak masuk pesan
│   │   └── settings/         # Pengaturan situs
│   └── api/
│       ├── auth/             # NextAuth endpoint
│       ├── contact/          # Form kontak
│       └── admin/            # CRUD API
├── components/
│   ├── sections/             # Section-section portfolio
│   ├── Cursor.tsx            # Custom cursor
│   ├── Navbar.tsx
│   └── Footer.tsx
├── lib/
│   ├── prisma.ts             # Database client
│   └── auth.ts               # NextAuth config
└── prisma/
    ├── schema.prisma         # Database schema
    └── seed.ts               # Data awal
```

---

## 🌐 Deploy ke Vercel

1. Push code ke GitHub
2. Buka [vercel.com](https://vercel.com) dan import repo
3. Tambahkan environment variables di Vercel dashboard:
   - `DATABASE_URL`
   - `DIRECT_URL`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` = `https://domain-kamu.vercel.app`
4. Deploy!

---

## 🔑 Ganti Password Admin

Setelah login, kamu bisa update password via Prisma Studio:
```bash
npm run db:studio
```

Atau buat script custom di `prisma/change-password.ts`.

---

## ✨ Fitur

| Fitur | Keterangan |
|-------|-----------|
| Portfolio | Hero, About, Projects, Experience, Contact |
| Admin Dashboard | Stats overview + pesan terbaru |
| Kelola Proyek | CRUD lengkap dengan status draft/publik |
| Kelola Keahlian | Per kategori dengan level progress bar |
| Kelola Pengalaman | Timeline kerja yang bisa diedit |
| Kotak Masuk | Baca dan balas pesan dari form kontak |
| Pengaturan | Edit semua teks di portfolio tanpa coding |
| Custom Cursor | Kursor kustom keren |
| Animasi | Fade-in scroll, parallax, hover effects |
| Responsive | Mobile-friendly |

---

Dibuat dengan ❤️ — yudis_299
