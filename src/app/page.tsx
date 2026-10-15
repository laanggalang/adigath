import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { getCategories, getProducts, getStoreSettings } from "@/lib/queries"

export const dynamic = "force-dynamic"

export default async function HomePage() {
  const [featured, categories, settings] = await Promise.all([
    getProducts({ featuredOnly: true }),
    getCategories(),
    getStoreSettings(),
  ])

  return (
    <div>
      {/* Hero */}
      <section className="border-b bg-gradient-to-b from-muted/60 to-background">
        <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-20 text-center md:py-28">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">
            {settings.tagline}
          </p>
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight md:text-6xl">
            Fashion Lokal, Diproduksi Sendiri, Kualitas Premium
          </h1>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Kemeja, koko, jaket, sampai outer/cardigan. Langsung dari produsen, tanpa perantara.
          </p>
          <div className="mt-8 flex gap-3">
            <Button asChild size="lg">
              <Link href="/katalog">Lihat Katalog</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#kategori">Jelajahi Kategori</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Kategori */}
      <section id="kategori" className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="mb-6 text-2xl font-bold">Kategori</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/katalog?kategori=${c.slug}`}
              className="rounded-xl border bg-card p-6 text-center font-medium transition-colors hover:border-primary hover:text-primary"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Produk unggulan */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Produk Unggulan</h2>
          <Link href="/katalog" className="text-sm font-medium text-primary hover:underline">
            Lihat semua →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {featured.slice(0, 8).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  )
}
