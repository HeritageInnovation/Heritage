'use client'

import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="font-serif text-6xl text-ivory mb-4">Error</h1>
          <p className="text-muted-foreground mb-4">
            Something went wrong. Please try again.
          </p>
          <p className="text-sm text-muted-foreground/60 mb-8">
            {error.message}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <button
            onClick={reset}
            className="w-full px-6 py-3 bg-gold text-background font-sans text-sm tracking-wider uppercase hover:bg-gold-light transition-colors"
          >
            Try Again
          </button>

          <Link
            href="/"
            className="w-full px-6 py-3 border border-gold/40 text-gold font-sans text-sm tracking-wider uppercase hover:bg-gold hover:text-background transition-all duration-300 flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  )
}
