// Generate supabase/seed.sql dari dummy data (sekali jalan)
// Jalankan: npx tsx scripts/generate-seed.ts
import { dummyProducts } from "../src/lib/data"
import { writeFileSync } from "fs"

const esc = (s: string) => s.replace(/'/g, "''")

const rows = dummyProducts.map((p) => {
  const arr = (items: string[]) => `ARRAY[${items.map((i) => `'${esc(i)}'`).join(",")}]`
  return `('${esc(p.slug)}', '${esc(p.name)}', '${esc(p.description)}', ${p.price}, (select id from categories where slug = '${p.category?.slug}'), ${arr(p.images)}, ${arr(p.colors)}, ${arr(p.sizes)}, ${p.stock}, ${p.is_featured}, ${p.is_active})`
})

const sql = `-- Seed 16 produk Adigath (jalankan di SQL Editor Supabase)
insert into public.products (slug, name, description, price, category_id, images, colors, sizes, stock, is_featured, is_active) values
  ${rows.join(",\n  ")}
on conflict (slug) do nothing;
`

writeFileSync("supabase/seed.sql", sql)
console.log(`supabase/seed.sql dibuat ✅ (${dummyProducts.length} produk)`)
