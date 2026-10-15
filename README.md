# Adigath — Web Katalog & Marketplace

Katalog + marketplace simple untuk brand fashion **Adigath**.
Stack: Next.js 14 (App Router) · Tailwind CSS · Supabase · TypeScript · shadcn/ui

## Fitur

- **Storefront**: Home, Katalog (filter kategori + search), Detail Produk (varian warna, size, stok), Keranjang (localStorage), Checkout via WhatsApp
- **Admin** (`/admin`): Login, CRUD Produk + upload foto, Kelola Kategori, Pengaturan Toko (nomor WA dll)
- **Mode dummy**: Tanpa konfigurasi Supabase, situs jalan dengan 16 produk dummy

## Menjalankan Locally

```bash
npm install
npm run dev
```

Buka http://localhost:3000

## Setup Supabase (aktifkan mode beneran)

1. Buat akun di [supabase.com](https://supabase.com) → **New Project**
2. Buka **SQL Editor** → paste isi `supabase/schema.sql` → Run
   (ini bikin tabel, RLS policies, storage bucket, dan seed kategori)
3. Copy `.env.example` jadi `.env.local`, isi:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   ```
   (Ambil dari **Settings → API** di dashboard Supabase)
4. Restart dev server
5. Buat user admin: **Authentication → Users → Add user** (email + password)

## Deploy ke Vercel

1. Push repo ke GitHub
2. [vercel.com](https://vercel.com) → **Import** repo
3. Tambahkan env variables yang sama (NEXT_PUBLIC_SUPABASE_URL & ANON_KEY)
4. Deploy → dapat domain `adigath.vercel.app` gratis
5. (Opsional) Beli domain sendiri → **Settings → Domains**

## Struktur

```
src/
  app/
    page.tsx              → Home
    katalog/              → Katalog + filter + search
    produk/[slug]/        → Detail produk
    keranjang/            → Keranjang + checkout WA
    admin/                → Dashboard (login-protected)
  components/             → Navbar, ProductCard, forms, ui/
  lib/
    data.ts               → Dummy data 16 produk
    queries.ts            → Fetch Supabase (fallback ke dummy)
    cart.ts               → Cart store (zustand + localStorage)
    wa.ts                 → Generator link WhatsApp
    types.ts              → Tipe data
supabase/schema.sql       → Skema DB + RLS + storage
```

## Migrasi Dummy Data ke Supabase (opsional)

Untuk mengisi produk awal dari data dummy ke database Supabase:

```bash
# butuh SUPABASE_SERVICE_ROLE_KEY (Settings -> API -> service_role, JANGAN di-commit)
export SUPABASE_SERVICE_ROLE_KEY=eyJ...
export $(grep -v '^#' .env.local | xargs)
npx tsx scripts/migrate-dummy.ts
```

Atau tambahkan produk langsung lewat dashboard admin.
