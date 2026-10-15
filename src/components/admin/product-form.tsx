"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ImagePlus, X } from "lucide-react"
import { createClient } from "@/lib/supabase-browser"
import { Category, Product } from "@/lib/types"

type Props = {
  product: Product | null
  categories: Category[]
  onSaved: () => void
}

export function ProductForm({ product, categories, onSaved }: Props) {
  const [name, setName] = useState(product?.name ?? "")
  const [slug, setSlug] = useState(product?.slug ?? "")
  const [description, setDescription] = useState(product?.description ?? "")
  const [price, setPrice] = useState(product?.price?.toString() ?? "")
  const [categoryId, setCategoryId] = useState(product?.category_id ?? "")
  const [colors, setColors] = useState(product?.colors.join(", ") ?? "")
  const [sizes, setSizes] = useState(product?.sizes.join(", ") ?? "")
  const [stock, setStock] = useState(product?.stock?.toString() ?? "0")
  const [isFeatured, setIsFeatured] = useState(product?.is_featured ?? false)
  const [isActive, setIsActive] = useState(product?.is_active ?? true)
  const [images, setImages] = useState<string[]>(product?.images ?? [])
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const fileRef = useRef<HTMLInputElement>(null)

  function slugify(s: string) {
    return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
  }

  async function handleUpload(files: FileList | null) {
    if (!files || files.length === 0) return
    setUploading(true)
    setError("")
    const supabase = createClient()
    const uploaded: string[] = []
    for (const file of Array.from(files)) {
      if (!file.type.startsWith("image/")) continue
      if (file.size > 3 * 1024 * 1024) {
        setError(`${file.name} terlalu besar (max 3MB)`)
        continue
      }
      const ext = file.name.split(".").pop()
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const { error } = await supabase.storage
        .from("product-images")
        .upload(path, file)
      if (error) {
        setError(error.message)
        continue
      }
      const { data } = supabase.storage.from("product-images").getPublicUrl(path)
      uploaded.push(data.publicUrl)
    }
    setImages((prev) => [...prev, ...uploaded])
    setUploading(false)
    if (fileRef.current) fileRef.current.value = ""
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError("")

    const supabase = createClient()
    const payload = {
      name,
      slug: slug || slugify(name),
      description,
      price: parseInt(price) || 0,
      category_id: categoryId || null,
      colors: colors.split(",").map((s) => s.trim()).filter(Boolean),
      sizes: sizes.split(",").map((s) => s.trim()).filter(Boolean),
      stock: parseInt(stock) || 0,
      is_featured: isFeatured,
      is_active: isActive,
      images,
    }

    const { error } = product
      ? await supabase.from("products").update(payload).eq("id", product.id)
      : await supabase.from("products").insert(payload)

    if (error) {
      setError(error.message)
      setSaving(false)
      return
    }
    onSaved()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Nama Produk *</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              if (!product) setSlug(slugify(e.target.value))
            }}
            required
          />
        </div>
        <div>
          <Label htmlFor="slug">Slug (URL)</Label>
          <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Deskripsi</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <Label htmlFor="price">Harga (Rp) *</Label>
          <Input
            id="price"
            type="number"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="stock">Stok</Label>
          <Input
            id="stock"
            type="number"
            min="0"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="category">Kategori</Label>
          <select
            id="category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="">— Pilih —</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="colors">Warna (pisahkan koma)</Label>
          <Input
            id="colors"
            value={colors}
            onChange={(e) => setColors(e.target.value)}
            placeholder="Hitam, Navy, Putih"
          />
        </div>
        <div>
          <Label htmlFor="sizes">Ukuran (pisahkan koma)</Label>
          <Input
            id="sizes"
            value={sizes}
            onChange={(e) => setSizes(e.target.value)}
            placeholder="S, M, L, XL"
          />
        </div>
      </div>

      {/* Upload foto */}
      <div>
        <Label>Foto Produk</Label>
        <div className="mt-2 flex flex-wrap gap-3">
          {images.map((src) => (
            <div key={src} className="relative h-20 w-20 overflow-hidden rounded-md border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="foto produk" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => setImages(images.filter((i) => i !== src))}
                className="absolute right-0 top-0 rounded-bl bg-destructive p-0.5 text-white"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="flex h-20 w-20 flex-col items-center justify-center rounded-md border border-dashed text-muted-foreground hover:border-primary hover:text-primary"
          >
            <ImagePlus className="h-5 w-5" />
            <span className="text-[10px]">{uploading ? "Upload..." : "Upload"}</span>
          </button>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => handleUpload(e.target.files)}
        />
        <p className="mt-1 text-xs text-muted-foreground">Max 3MB per foto. Format JPG/PNG/WebP.</p>
      </div>

      <div className="flex gap-6">
        <div className="flex items-center gap-2">
          <Switch id="featured" checked={isFeatured} onCheckedChange={setIsFeatured} />
          <Label htmlFor="featured">Produk Unggulan</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch id="active" checked={isActive} onCheckedChange={setIsActive} />
          <Label htmlFor="active">Aktif</Label>
        </div>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex justify-end gap-2">
        <Button type="submit" disabled={saving}>
          {saving ? "Menyimpan..." : "Simpan"}
        </Button>
      </div>
    </form>
  )
}
