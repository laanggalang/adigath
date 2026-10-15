import { createClient } from "./supabase-server"
import { Category, Product, StoreSettings } from "./types"
import { dummyCategories, dummyProducts, storeSettings } from "./data"

const useSupabase = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export async function getCategories(): Promise<Category[]> {
  if (!useSupabase) return dummyCategories
  try {
    const supabase = createClient()
    const { data } = await supabase.from("categories").select("*").order("name")
    return data && data.length > 0 ? data : dummyCategories
  } catch {
    return dummyCategories
  }
}

export async function getProducts(opts?: {
  categorySlug?: string
  q?: string
  featuredOnly?: boolean
}): Promise<Product[]> {
  if (!useSupabase) {
    let list = dummyProducts.filter((p) => p.is_active)
    if (opts?.categorySlug) list = list.filter((p) => p.category?.slug === opts.categorySlug)
    if (opts?.q) list = list.filter((p) => p.name.toLowerCase().includes(opts.q!.toLowerCase()))
    if (opts?.featuredOnly) list = list.filter((p) => p.is_featured)
    return list
  }
  try {
    const supabase = createClient()
    let query = supabase
      .from("products")
      .select("*, category:categories(*)")
      .eq("is_active", true)
      .order("created_at", { ascending: false })
    if (opts?.featuredOnly) query = query.eq("is_featured", true)
    const { data } = await query
    let list: Product[] = data ?? []
    if (opts?.categorySlug) list = list.filter((p) => p.category?.slug === opts.categorySlug)
    if (opts?.q) list = list.filter((p) => p.name.toLowerCase().includes(opts.q!.toLowerCase()))
    return list
  } catch {
    return []
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!useSupabase) return dummyProducts.find((p) => p.slug === slug && p.is_active) ?? null
  try {
    const supabase = createClient()
    const { data } = await supabase
      .from("products")
      .select("*, category:categories(*)")
      .eq("slug", slug)
      .eq("is_active", true)
      .maybeSingle()
    return data
  } catch {
    return null
  }
}

export async function getStoreSettings(): Promise<StoreSettings> {
  if (!useSupabase) return storeSettings
  try {
    const supabase = createClient()
    const { data } = await supabase.from("store_settings").select("*").eq("id", 1).maybeSingle()
    return data ?? storeSettings
  } catch {
    return storeSettings
  }
}
