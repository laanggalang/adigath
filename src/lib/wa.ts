import { CartItem } from "./types"

export function buildWaLink(waNumber: string, items: CartItem[], note?: string) {
  const lines: string[] = []
  lines.push("Halo Adigath! Gue mau order nih:")
  lines.push("")
  items.forEach((i, idx) => {
    lines.push(
      `${idx + 1}. ${i.name} (${i.color}, ${i.size}) x${i.qty} — Rp${(i.price * i.qty).toLocaleString("id-ID")}`
    )
  })
  const total = items.reduce((s, i) => s + i.price * i.qty, 0)
  lines.push("")
  lines.push(`Total: Rp${total.toLocaleString("id-ID")}`)
  if (note) {
    lines.push("")
    lines.push(`Catatan: ${note}`)
  }
  const text = encodeURIComponent(lines.join("\n"))
  return `https://wa.me/${waNumber}?text=${text}`
}

export function buildProductWaLink(waNumber: string, itemName: string) {
  const text = encodeURIComponent(`Halo Adigath! Gue tertarik sama produk "${itemName}". Masih ready?`)
  return `https://wa.me/${waNumber}?text=${text}`
}
