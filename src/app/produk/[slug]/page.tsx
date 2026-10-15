import { notFound } from "next/navigation"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { AddToCart } from "@/components/add-to-cart"
import { ProductCard } from "@/components/product-card"
import { getProducts, getProductBySlug, getStoreSettings } from "@/lib/queries"
import { formatRupiah } from "@/lib/data"

export const dynamic = "force-dynamic"

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) notFound()

  const [related, settings] = await Promise.all([
    getProducts(),
    getStoreSettings(),
  ])
  const relatedProducts = related
    .filter((p) => p.category_id === product.category_id && p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Galeri */}
        <div className="space-y-3">
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-muted">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-2 gap-3">
              {product.images.slice(1).map((src) => (
                <div key={src} className="relative aspect-[4/5] overflow-hidden rounded-lg bg-muted">
                  <Image src={src} alt={product.name} fill className="object-cover" sizes="25vw" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <Badge variant="outline">{product.category?.name}</Badge>
          <h1 className="mt-3 text-3xl font-bold">{product.name}</h1>
          <p className="mt-2 text-2xl font-semibold text-primary">
            {formatRupiah(product.price)}
          </p>
          <p className="mt-4 text-muted-foreground">{product.description}</p>

          <Separator className="my-6" />

          <AddToCart product={product} waNumber={settings.wa_number} />
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-bold">Produk Serupa</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}