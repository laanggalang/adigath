import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Product } from "@/lib/types"
import { formatRupiah } from "@/lib/data"

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/produk/${product.slug}`} className="group">
      <Card className="overflow-hidden pt-0 transition-shadow group-hover:shadow-lg">
        <div className="relative aspect-[4/5] overflow-hidden bg-muted">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          {product.stock === 0 && (
            <Badge variant="secondary" className="absolute left-2 top-2">Stok Habis</Badge>
          )}
          {product.is_featured && product.stock > 0 && (
            <Badge className="absolute left-2 top-2">Unggulan</Badge>
          )}
        </div>
        <CardContent className="p-3">
          <p className="text-xs text-muted-foreground">{product.category?.name}</p>
          <h3 className="line-clamp-1 font-medium">{product.name}</h3>
        </CardContent>
        <CardFooter className="p-3 pt-0">
          <p className="font-semibold">{formatRupiah(product.price)}</p>
        </CardFooter>
      </Card>
    </Link>
  )
}
