"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Trash2, Minus, Plus, MessageCircle } from "lucide-react"
import { useCart, cartTotal } from "@/lib/cart"
import { buildWaLink } from "@/lib/wa"
import { formatRupiah } from "@/lib/data"
import { createClient } from "@/lib/supabase-browser"
import type { StoreSettings } from "@/lib/types"

const fallbackSettings: StoreSettings = {
  wa_number: "6281234567890",
  store_name: "Adigath",
  tagline: "",
}

export default function KeranjangPage() {
  const { items, remove, setQty, clear } = useCart()
  const [note, setNote] = useState("")
  const [mounted, setMounted] = useState(false)
  const [settings, setSettings] = useState<StoreSettings>(fallbackSettings)

  // hindari hydration mismatch (localStorage)
  useEffect(() => {
    setMounted(true)
    const supabase = createClient()
    supabase
      .from("store_settings")
      .select("*")
      .eq("id", 1)
      .maybeSingle()
      .then(({ data }) => {
        if (data) setSettings(data)
      })
  }, [])

  const total = cartTotal(items)

  function handleCheckout() {
    const link = buildWaLink(settings.wa_number, items, note)
    window.open(link, "_blank")
  }

  if (mounted && items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Keranjang kosong</h1>
        <p className="mt-2 text-muted-foreground">Yuk mulai belanja koleksi Adigath!</p>
        <Button asChild className="mt-6">
          <Link href="/katalog">Lihat Katalog</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold">Keranjang</h1>

      <div className="mt-8 space-y-4">
        {items.map((i) => (
          <Card key={`${i.product_id}|${i.color}|${i.size}`}>
            <CardContent className="flex gap-4 p-4">
              <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-md bg-muted">
                <Image src={i.image} alt={i.name} fill className="object-cover" sizes="80px" />
              </div>
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <Link href={`/produk/${i.slug}`} className="font-medium hover:underline">
                    {i.name}
                  </Link>
                  <p className="text-sm text-muted-foreground">
                    {i.color} · {i.size}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => setQty(i.product_id, i.color, i.size, i.qty - 1)}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-6 text-center text-sm font-medium">{i.qty}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => setQty(i.product_id, i.color, i.size, i.qty + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={() => remove(i.product_id, i.color, i.size)}
                  aria-label="Hapus"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <p className="font-semibold">{formatRupiah(i.price * i.qty)}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator className="my-6" />

      <div>
        <Label htmlFor="note">Catatan (opsional)</Label>
        <Textarea
          id="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Contoh: ukuran L warna navy tolong dicek ketersediaannya"
          className="mt-2"
        />
      </div>

      <div className="mt-6 flex items-center justify-between text-lg font-bold">
        <span>Total</span>
        <span>{formatRupiah(total)}</span>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button size="lg" className="flex-1" onClick={handleCheckout}>
          <MessageCircle className="mr-2 h-4 w-4" />
          Checkout via WhatsApp
        </Button>
        <Button size="lg" variant="outline" onClick={clear}>
          Kosongkan Keranjang
        </Button>
      </div>
    </div>
  )
}
