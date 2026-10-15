export function Footer() {
  return (
    <footer className="border-t py-8">
      <div className="mx-auto max-w-6xl px-4 text-center text-sm text-muted-foreground">
        <p className="font-semibold text-foreground">ADIGATH.</p>
        <p>Fashion lokal, kualitas premium. Produksi sendiri sejak 2020.</p>
        <p className="mt-2">© {new Date().getFullYear()} Adigath. All rights reserved.</p>
      </div>
    </footer>
  )
}
