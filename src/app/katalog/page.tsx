import Link from "next/link"
import { Input } from "@/components/ui/input"
import { ProductCard } from "@/components/product-card"
import { getCategories, getProducts } from "@/lib/queries"
import { cn } from "@/lib/utils"

export const dynamic = "force-dynamic"

export default async function KatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ kategori?: string; q?: string }>
}) {
  const { kategori, q } = await searchParams
  const [products, categories] = await Promise.all([
    getProducts({ categorySlug: kategori, q }),
    getCategories(),
  ])

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold">Katalog</h1>
      <p className="mt-1 text-muted-foreground">
        Menampilkan {products.length} produk
      </p>

      <form className="mt-6 flex flex-col gap-3 sm:flex-row" action="/katalog">
        <input type="hidden" name="kategori" value={kategori ?? ""} />
        <Input
          name="q"
          defaultValue={q ?? ""}
          placeholder="Cari produk lalu tekan Enter..."
          className="sm:max-w-xs"
        />
      </form>

      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          href={`/katalog${q ? `?q=${q}` : ""}`}
          className={cn(
            "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
            !kategori ? "border-primary bg-primary text-primary-foreground" : "hover:border-primary"
          )}
        >
          Semua
        </Link>
        {categories.map((c) => (
          <Link
            key={c.id}
            href={`/katalog?kategori=${c.slug}${q ? `&q=${q}` : ""}`}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              kategori === c.slug
                ? "border-primary bg-primary text-primary-foreground"
                : "hover:border-primary"
            )}
          >
            {c.name}
          </Link>
        ))}
      </div>

      {products.length === 0 ? (
        <p className="mt-16 text-center text-muted-foreground">
          Produk tidak ditemukan.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  )
}
