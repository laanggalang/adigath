"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, Trash2 } from "lucide-react"
import { createClient } from "@/lib/supabase-browser"
import { Category } from "@/lib/types"

export default function AdminCategoriesPage() {
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  async function load() {
    const supabase = createClient()
    const { data } = await supabase.from("categories").select("*").order("name")
    setCategories(data ?? [])
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    const slug = name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
    if (!slug) return
    const supabase = createClient()
    const { error } = await supabase.from("categories").insert({ name, slug })
    if (error) {
      setError(error.message)
      return
    }
    setName("")
    load()
    router.refresh()
  }

  async function handleDelete(id: string, catName: string) {
    if (!confirm(`Hapus kategori "${catName}"? Produk di kategori ini jadi tanpa kategori.`)) return
    const supabase = createClient()
    await supabase.from("categories").delete().eq("id", id)
    load()
    router.refresh()
  }

  if (loading) return <p className="text-muted-foreground">Memuat...</p>

  return (
    <div className="max-w-xl">
      <h2 className="mb-4 text-xl font-semibold">Kelola Kategori</h2>

      <form onSubmit={handleAdd} className="mb-6 flex gap-2">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama kategori baru, misal: Kaos"
          required
        />
        <Button type="submit">
          <Plus className="mr-2 h-4 w-4" /> Tambah
        </Button>
      </form>

      {error && <p className="mb-4 text-sm text-destructive">{error}</p>}

      <Card>
        <CardContent className="p-0">
          {categories.map((c) => (
            <div
              key={c.id}
              className="flex items-center justify-between border-b p-4 last:border-0"
            >
              <div>
                <p className="font-medium">{c.name}</p>
                <p className="text-xs text-muted-foreground">/katalog?kategori={c.slug}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-destructive"
                onClick={() => handleDelete(c.id, c.name)}
                aria-label="Hapus"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {categories.length === 0 && (
            <p className="p-8 text-center text-muted-foreground">Belum ada kategori.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
