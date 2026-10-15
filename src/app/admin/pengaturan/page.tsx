"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase-browser"

export default function AdminSettingsPage() {
  const router = useRouter()
  const [storeName, setStoreName] = useState("")
  const [tagline, setTagline] = useState("")
  const [waNumber, setWaNumber] = useState("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data } = await supabase.from("store_settings").select("*").eq("id", 1).maybeSingle()
      if (data) {
        setStoreName(data.store_name)
        setTagline(data.tagline)
        setWaNumber(data.wa_number)
      }
      setLoading(false)
    }
    load()
  }, [])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setMessage("")
    const supabase = createClient()
    const { error } = await supabase
      .from("store_settings")
      .update({ store_name: storeName, tagline, wa_number: waNumber.replace(/\D/g, "") })
      .eq("id", 1)
    setSaving(false)
    setMessage(error ? `Gagal: ${error.message}` : "Pengaturan tersimpan ✓")
    if (!error) router.refresh()
  }

  if (loading) return <p className="text-muted-foreground">Memuat...</p>

  return (
    <div className="max-w-xl">
      <h2 className="mb-4 text-xl font-semibold">Pengaturan Toko</h2>
      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <Label htmlFor="storeName">Nama Toko</Label>
              <Input id="storeName" value={storeName} onChange={(e) => setStoreName(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="tagline">Tagline</Label>
              <Input id="tagline" value={tagline} onChange={(e) => setTagline(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="wa">Nomor WhatsApp</Label>
              <Input
                id="wa"
                value={waNumber}
                onChange={(e) => setWaNumber(e.target.value)}
                placeholder="6281234567890"
                required
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Format internasional tanpa + dan tanpa 0 di depan. Contoh: 0812-3456-7890 → 6281234567890
              </p>
            </div>
            {message && <p className="text-sm">{message}</p>}
            <Button type="submit" disabled={saving}>
              {saving ? "Menyimpan..." : "Simpan Pengaturan"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
