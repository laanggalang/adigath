-- ============================================
-- Adigath — Supabase Schema
-- Jalankan di SQL Editor Supabase
-- ============================================

-- Tabel kategori
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now()
);

-- Tabel produk
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text not null default '',
  price integer not null check (price >= 0),
  category_id uuid references public.categories(id) on delete set null,
  images text[] not null default '{}',
  colors text[] not null default '{}',
  sizes text[] not null default '{}',
  stock integer not null default 0 check (stock >= 0),
  is_featured boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Tabel pengaturan toko (single row)
create table if not exists public.store_settings (
  id integer primary key default 1 check (id = 1),
  store_name text not null default 'Adigath',
  tagline text not null default 'Fashion lokal, kualitas premium',
  wa_number text not null default '6281234567890'
);

insert into public.store_settings (id) values (1) on conflict (id) do nothing;

-- ============================================
-- Row Level Security
-- ============================================
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.store_settings enable row level security;

-- Publik bisa BACA
create policy "Public read categories" on public.categories
  for select using (true);

create policy "Public read products" on public.products
  for select using (true);

create policy "Public read settings" on public.store_settings
  for select using (true);

-- Hanya admin (user login) bisa TULIS
create policy "Admin write categories" on public.categories
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "Admin write products" on public.products
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "Admin write settings" on public.store_settings
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- ============================================
-- Storage bucket untuk foto produk
-- ============================================
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

-- Publik bisa lihat foto
create policy "Public read product images" on storage.objects
  for select using (bucket_id = 'product-images');

-- Admin bisa upload/update/hapus
create policy "Admin write product images" on storage.objects
  for all using (
    bucket_id = 'product-images' and auth.role() = 'authenticated'
  ) with check (
    bucket_id = 'product-images' and auth.role() = 'authenticated'
  );

-- ============================================
-- Seed kategori awal
-- ============================================
insert into public.categories (name, slug) values
  ('Kemeja', 'kemeja'),
  ('Koko', 'koko'),
  ('Jaket', 'jaket'),
  ('Outer / Cardigan', 'outer')
on conflict (slug) do nothing;
