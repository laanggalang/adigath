import { create } from "zustand"
import { persist } from "zustand/middleware"
import { CartItem } from "./types"

type CartState = {
  items: CartItem[]
  add: (item: CartItem) => void
  remove: (productId: string, color: string, size: string) => void
  setQty: (productId: string, color: string, size: string, qty: number) => void
  clear: () => void
}

const key = (i: Pick<CartItem, "product_id" | "color" | "size">) =>
  `${i.product_id}|${i.color}|${i.size}`

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      add: (item) =>
        set((s) => {
          const idx = s.items.findIndex((i) => key(i) === key(item))
          if (idx >= 0) {
            const items = [...s.items]
            items[idx] = { ...items[idx], qty: items[idx].qty + item.qty }
            return { items }
          }
          return { items: [...s.items, item] }
        }),
      remove: (productId, color, size) =>
        set((s) => ({
          items: s.items.filter((i) => key(i) !== `${productId}|${color}|${size}`),
        })),
      setQty: (productId, color, size, qty) =>
        set((s) => ({
          items: s.items
            .map((i) => (key(i) === `${productId}|${color}|${size}` ? { ...i, qty } : i))
            .filter((i) => i.qty > 0),
        })),
      clear: () => set({ items: [] }),
    }),
    { name: "adigath-cart" }
  )
)

export function cartTotal(items: CartItem[]) {
  return items.reduce((sum, i) => sum + i.price * i.qty, 0)
}
