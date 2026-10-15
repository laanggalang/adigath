import Link from "next/link"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase-server"
import { Button } from "@/components/ui/button"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <h1 className="text-xl font-bold">Mode Dummy</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Supabase belum dikonfigurasi. Copy <code>.env.example</code> jadi{" "}
          <code>.env.local</code>, isi kredensial Supabase, lalu restart dev server.
        </p>
      </div>
    )
  }

  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  async function signOut() {
    "use server"
    const supabase = createClient()
    await supabase.auth.signOut()
    redirect("/admin/login")
  }

  if (!user) return <>{children}</>

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard Admin</h1>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="/admin">Beranda</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/admin/produk">Produk</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/admin/kategori">Kategori</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/admin/pengaturan">Pengaturan</Link>
          </Button>
          <form action={signOut}>
            <Button variant="destructive" type="submit">Keluar</Button>
          </form>
        </div>
      </div>
      {children}
    </div>
  )
}
