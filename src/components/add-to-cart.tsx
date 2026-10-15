"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ShoppingCart, MessageCircle } from "lucide-react"
import { useCart } from "@/lib/cart"
import { buildProductWaLink } from "@/lib/wa"
import { Product } from "@/lib/types"
import { cn } from "@/lib/utils"

export function AddToCart({ product, waNumber }: { product: Product; waNumber: string }) {
  const add = useCart((s) => s.add)
  const [color, setColor] = useState(product.colors[0])
  const [size, setSize] = useState(product.sizes[0])
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  const outOfStock = product.stock === 0
  const maxQty = Math.min(product.stock, 10)

  function handleAdd() {
    add({
      product_id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0],
      color,
      size,
      qty,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="space-y-5">
      {/* Warna */}
      <div>
        <Label className="text-sm">Warna: {color}</Label>
        <div className="mt-2 flex flex-wrap gap-2">
          {product.colors.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                color === c ? "border-primary bg-primary text-primary-foreground" : "hover:border-primary"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Ukuran */}
      <div>
        <Label className="text-sm">Ukuran</Label>
        <div className="mt-2 flex flex-wrap gap-2">
          {product.sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={cn(
                "min-w-11 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors",
                size === s ? "border-primary bg-primary text-primary-foreground" : "hover:border-primary"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Qty */}
      <div>
        <Label className="text-sm">Jumlah</Label>
        <div className="mt-2 flex items-center gap-3">
          <Button variant="outline" size="icon" onClick={() => setQty(Math.max(1, qty - 1))}>−</Button>
          <span className="w-8 text-center font-medium">{qty}</span>
          <Button variant="outline" size="icon" onClick={() => setQty(Math.min(maxQty, qty + 1))}>+</Button>
          <span className="text-sm text-muted-foreground">Stok: {product.stock}</span>
        </div>
      </div>

      {/* Aksi */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button size="lg" className="flex-1" onClick={handleAdd} disabled={outOfStock}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          {added ? "Ditambahkan ✓" : "Tambah ke Keranjang"}
        </Button>
        <Button size="lg" variant="outline" className="flex-1" asChild>
          <a
            href={buildProductWaLink(waNumber, product.name)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Tanya via WA
          </a>
        </Button>
      </div>
    </div>
  )
}
