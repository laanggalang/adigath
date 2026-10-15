import { Category, Product, StoreSettings } from "./types"

export const storeSettings: StoreSettings = {
  wa_number: "6281234567890",
  store_name: "Adigath",
  tagline: "Fashion lokal, kualitas premium",
}

export const dummyCategories: Category[] = [
  { id: "cat-kemeja", name: "Kemeja", slug: "kemeja" },
  { id: "cat-koko", name: "Koko", slug: "koko" },
  { id: "cat-jaket", name: "Jaket", slug: "jaket" },
  { id: "cat-outer", name: "Outer / Cardigan", slug: "outer" },
]

function img(seed: string) {
  return `https://picsum.photos/seed/adigath-${seed}/600/750`
}

type DummyProduct = Omit<Product, "category"> & { category_id: string }

const raw: DummyProduct[] = [
  { id: "p01", name: "Kemeja Oxford Putih", slug: "kemeja-oxford-putih", description: "Kemeja oxford bahan katun premium, adem dan tidak nerawang. Cocok untuk formal maupun semi-formal.", price: 189000, category_id: "cat-kemeja", images: [img("oxford1"), img("oxford2")], colors: ["Putih", "Biru Muda"], sizes: ["S", "M", "L", "XL"], stock: 25, is_featured: true, is_active: true, created_at: "2026-09-01T00:00:00Z" },
  { id: "p02", name: "Kemeja Flanel Kotak", slug: "kemeja-flanel-kotak", description: "Flanel kotak-kotak klasik, bahan tebal berkualitas, jahitan rapi.", price: 165000, category_id: "cat-kemeja", images: [img("flanel1"), img("flanel2")], colors: ["Merah", "Hijau", "Navy"], sizes: ["M", "L", "XL", "XXL"], stock: 18, is_featured: true, is_active: true, created_at: "2026-09-02T00:00:00Z" },
  { id: "p03", name: "Kemeja Linen Cokelat", slug: "kemeja-linen-cokelat", description: "Kemeja linen premium, ringan dan adem, perfect untuk liburan.", price: 215000, category_id: "cat-kemeja", images: [img("linen1"), img("linen2")], colors: ["Cokelat", "Krem"], sizes: ["S", "M", "L", "XL"], stock: 12, is_featured: false, is_active: true, created_at: "2026-09-03T00:00:00Z" },
  { id: "p04", name: "Kemeja Denim Washed", slug: "kemeja-denim-washed", description: "Denim washed, semi-overcut, stylish untuk daily outfit.", price: 199000, category_id: "cat-kemeja", images: [img("denim1"), img("denim2")], colors: ["Biru"], sizes: ["M", "L", "XL"], stock: 9, is_featured: false, is_active: true, created_at: "2026-09-04T00:00:00Z" },
  { id: "p05", name: "Koko Kurta Pria", slug: "koko-kurta-pria", description: "Koko kurta modern, bahan katunRayon, adem, cocok untuk kondangan maupun harian.", price: 175000, category_id: "cat-koko", images: [img("kurta1"), img("kurta2")], colors: ["Hitam", "Putih", "Mocha"], sizes: ["S", "M", "L", "XL", "XXL"], stock: 30, is_featured: true, is_active: true, created_at: "2026-09-05T00:00:00Z" },
  { id: "p06", name: "Koko Bordir Elegan", slug: "koko-bordir-elegan", description: "Koko dengan bordir eksklusif di bagian dada, kesan mewah.", price: 229000, category_id: "cat-koko", images: [img("bordir1"), img("bordir2")], colors: ["Hitam", "Abu"], sizes: ["M", "L", "XL"], stock: 15, is_featured: true, is_active: true, created_at: "2026-09-06T00:00:00Z" },
  { id: "p07", name: "Koko Polos Premium", slug: "koko-polos-premium", description: "Koko polos daily wear, bahan jade, lembut dan menyerap keringat.", price: 129000, category_id: "cat-koko", images: [img("polos1"), img("polos2")], colors: ["Putih", "Hitam", "Navy", "Sage"], sizes: ["S", "M", "L", "XL"], stock: 40, is_featured: false, is_active: true, created_at: "2026-09-07T00:00:00Z" },
  { id: "p08", name: "Koko Kancing Kayu", slug: "koko-kancing-kayu", description: "Koko dengan aksen kancing kayu, nuansa earthy dan natural.", price: 155000, category_id: "cat-koko", images: [img("kancing1"), img("kancing2")], colors: ["Krem", "Cokelat"], sizes: ["M", "L", "XL"], stock: 20, is_featured: false, is_active: true, created_at: "2026-09-08T00:00:00Z" },
  { id: "p09", name: "Jaket Bomber Classic", slug: "jaket-bomber-classic", description: "Bomber jacket water-repellent, lining halus, cocok untuk motor dan hangout.", price: 329000, category_id: "cat-jaket", images: [img("bomber1"), img("bomber2")], colors: ["Hitam", "Navy"], sizes: ["M", "L", "XL"], stock: 10, is_featured: true, is_active: true, created_at: "2026-09-09T00:00:00Z" },
  { id: "p10", name: "Jaket Denim Regular", slug: "jaket-denim-regular", description: "Jaket denim non-stretch, potongan regular, timeless.", price: 289000, category_id: "cat-jaket", images: [img("jdenim1"), img("jdenim2")], colors: ["Biru Tua", "Hitam"], sizes: ["M", "L", "XL", "XXL"], stock: 8, is_featured: false, is_active: true, created_at: "2026-09-10T00:00:00Z" },
  { id: "p11", name: "Jaket Hoodie Fleece", slug: "jaket-hoodie-fleece", description: "Hoodie fleece tebal, warm and comfy, unisex.", price: 245000, category_id: "cat-jaket", images: [img("hoodie1"), img("hoodie2")], colors: ["Abu", "Hitam", "Krem"], sizes: ["M", "L", "XL"], stock: 22, is_featured: true, is_active: true, created_at: "2026-09-11T00:00:00Z" },
  { id: "p12", name: "Jaket Coach Original", slug: "jaket-coach-original", description: "Coach jacket dengan lining satin, snap button, streetwear vibes.", price: 279000, category_id: "cat-jaket", images: [img("coach1"), img("coach2")], colors: ["Hitam", "Krem"], sizes: ["L", "XL"], stock: 6, is_featured: false, is_active: true, created_at: "2026-09-12T00:00:00Z" },
  { id: "p13", name: "Cardigan Rajut Knit", slug: "cardigan-rajut-knit", description: "Cardigan rajut halus, layering essential untuk cuaca dingin.", price: 219000, category_id: "cat-outer", images: [img("cardi1"), img("cardi2")], colors: ["Beige", "Cokelat", "Hitam"], sizes: ["M", "L", "XL"], stock: 14, is_featured: true, is_active: true, created_at: "2026-09-13T00:00:00Z" },
  { id: "p14", name: "Outer Kimono Modern", slug: "outer-kimono-modern", description: "Kimono outer dengan motif modern, flowy dan elegan.", price: 239000, category_id: "cat-outer", images: [img("kimono1"), img("kimono2")], colors: ["Navy", "Maroon"], sizes: ["Free Size"], stock: 11, is_featured: false, is_active: true, created_at: "2026-09-14T00:00:00Z" },
  { id: "p15", name: "Varsity Jacket Premium", slug: "varsity-jacket-premium", description: "Varsity jacket wool blend, aksen kulit sintetis, bold statement.", price: 399000, category_id: "cat-outer", images: [img("varsity1"), img("varsity2")], colors: ["Navy-Krem", "Hitam-Putih"], sizes: ["M", "L", "XL"], stock: 5, is_featured: true, is_active: true, created_at: "2026-09-15T00:00:00Z" },
  { id: "p16", name: "Outer Vest Puffer", slug: "outer-vest-puffer", description: "Vest puffer ringan, warm tanpa berat, cocok untuk layering.", price: 259000, category_id: "cat-outer", images: [img("vest1"), img("vest2")], colors: ["Hitam", "Olive"], sizes: ["M", "L", "XL"], stock: 13, is_featured: false, is_active: true, created_at: "2026-09-16T00:00:00Z" },
]

export const dummyProducts: Product[] = raw.map((p) => ({
  ...p,
  category: dummyCategories.find((c) => c.id === p.category_id),
}))

export function formatRupiah(n: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n)
}
