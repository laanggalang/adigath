export type Category = {
  id: string
  name: string
  slug: string
}

export type Product = {
  id: string
  name: string
  slug: string
  description: string
  price: number
  category_id: string
  images: string[]
  colors: string[]
  sizes: string[]
  stock: number
  is_featured: boolean
  is_active: boolean
  created_at: string
  category?: Category
}

export type CartItem = {
  product_id: string
  slug: string
  name: string
  price: number
  image: string
  color: string
  size: string
  qty: number
}

export type StoreSettings = {
  wa_number: string
  store_name: string
  tagline: string
}
