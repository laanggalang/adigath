import Link from "next/link"

export default function AdminIndexPage() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <Link href="/admin/produk" className="rounded-xl border p-6 transition-colors hover:border-primary">
        <h3 className="font-semibold">📦 Produk</h3>
        <p className="mt-1 text-sm text-muted-foreground">Kelola produk, harga, stok & foto</p>
      </Link>
      <Link href="/admin/kategori" className="rounded-xl border p-6 transition-colors hover:border-primary">
        <h3 className="font-semibold">🏷️ Kategori</h3>
        <p className="mt-1 text-sm text-muted-foreground">Kelola kategori produk</p>
      </Link>
      <Link href="/admin/pengaturan" className="rounded-xl border p-6 transition-colors hover:border-primary">
        <h3 className="font-semibold">⚙️ Pengaturan</h3>
        <p className="mt-1 text-sm text-muted-foreground">Nama toko, tagline & nomor WA</p>
      </Link>
    </div>
  )
}
