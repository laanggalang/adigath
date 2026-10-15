// Script migrasi: masukkan 16 produk dummy ke Supabase (sekali jalan)
// Jalankan: npx tsx scripts/migrate-dummy.ts
import { createClient } from "@supabase/supabase-js"
import { dummyProducts } from "../src/lib/data"

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!url || !key) {
  console.error("Env belum diisi. Jalankan lewat: npx tsx --env-file=.env.local scripts/migrate-dummy.ts")
  process.exit(1)
}

const supabase = createClient(url, key)

async function main() {
  // map kategori slug -> id
  const { data: cats, error: catErr } = await supabase.from("categories").select("*")
  if (catErr || !cats) {
    console.error("Gagal ambil kategori:", catErr?.message)
    process.exit(1)
  }

  const rows = dummyProducts.map((p) => ({
    name: p.name,
    slug: p.slug,
    description: p.description,
    price: p.price,
    category_id: cats.find((c) => c.slug === p.category?.slug)?.id ?? null,
    images: p.images,
    colors: p.colors,
    sizes: p.sizes,
    stock: p.stock,
    is_featured: p.is_featured,
    is_active: p.is_active,
  }))

  // skip yang slug-nya udah ada
  const { data: existing } = await supabase.from("products").select("slug")
  const existingSlugs = new Set((existing ?? []).map((e) => e.slug))
  const toInsert = rows.filter((r) => !existingSlugs.has(r.slug))

  if (toInsert.length === 0) {
    console.log("Semua produk sudah ada, tidak ada yang dimigrasi.")
    return
  }

  const { error } = await supabase.from("products").insert(toInsert)
  if (error) {
    console.error("Gagal insert:", error.message)
    process.exit(1)
  }
  console.log(`Sukses migrasi ${toInsert.length} produk ke Supabase ✅`)
}

main()
