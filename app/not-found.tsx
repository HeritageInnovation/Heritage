import Link from "next/link"
import { ArrowLeft, Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="font-serif text-6xl text-ivory mb-4">404</h1>
          <p className="text-muted-foreground mb-4">
            The page you're looking for doesn't exist.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-background font-sans text-sm tracking-wider uppercase hover:bg-gold-light transition-colors"
        >
          <Home className="w-4 h-4" />
          Go Back Home
        </Link>
      </div>
    </div>
  )
}
