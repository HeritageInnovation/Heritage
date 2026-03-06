"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { Clock, ArrowUpRight, Share2, Copy, MessageCircle } from "lucide-react"
import { urlFor } from "@/lib/sanity.image"

interface LuxuryItem {
  _id: string
  title: string
  category: string
  reserve: number
  lotNumber: string
  timeLeft?: string
  tokenAddress: string
  currentBid?: string
  image?: any
  featured?: boolean
}

interface LuxuryCardProps {
  item: LuxuryItem
  priority?: boolean
  fallbackImageIndex?: number // 0-5 for lot-01.jpg to lot-06.jpg
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value)
}

export function LuxuryCard({ item, priority = false, fallbackImageIndex = 0 }: LuxuryCardProps) {
  const [showShareMenu, setShowShareMenu] = useState(false)
  const shareMenuRef = useRef<HTMLDivElement>(null)
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target as Node)) {
        setShowShareMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  
  // Generate image URL from Sanity or use local fallback image
  const localFallbackImages = [
    "/images/lot-01.jpg",
    "/images/lot-02.jpg",
    "/images/lot-03.jpg",
    "/images/lot-04.jpg",
    "/images/lot-05.jpg",
    "/images/lot-06.jpg",
  ]
  
  const imageUrl = item.image
    ? urlFor(item.image).width(800).height(1000).url()
    : localFallbackImages[fallbackImageIndex % localFallbackImages.length]

  const reserveDisplay = item.currentBid || formatCurrency(item.reserve)

  return (
    <div className="group relative bg-card overflow-hidden border border-border hover:border-gold/30 transition-all duration-700">
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={imageUrl}
          alt={item.title}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Zoom Overlay on Hover */}
        <div className="absolute inset-0 bg-background/0 group-hover:bg-background/10 transition-all duration-700" />

        {/* Top Info Bar */}
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start">
          <span className="text-[9px] tracking-[0.3em] text-ivory/80 uppercase bg-background/50 backdrop-blur-sm px-3 py-1.5 font-sans">
            LOT {item.lotNumber}
          </span>
          <div className="flex items-center gap-1.5 bg-background/50 backdrop-blur-sm px-3 py-1.5">
            <Clock className="w-3 h-3 text-gold" />
            <span className="text-[9px] tracking-[0.2em] text-ivory/80 font-sans">
              {item.timeLeft || "--"}
            </span>
          </div>
        </div>

        {/* Bottom Glassmorphism Panel */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
          <div className="bg-background/60 backdrop-blur-xl border-t border-ivory/10 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[9px] tracking-[0.3em] text-gold uppercase font-sans">
                  Current Bid
                </p>
                <p className="text-lg font-serif text-ivory mt-0.5">
                  {reserveDisplay}
                </p>
              </div>
              <div className="flex items-center gap-2 relative">
                {/* Share Dropdown */}
                <div className="relative" ref={shareMenuRef}>
                  <button
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="px-3 py-2 border border-gold/40 text-gold text-[9px] tracking-[0.2em] uppercase hover:bg-gold hover:text-background transition-all duration-300 font-sans flex items-center gap-1"
                  >
                    <Share2 className="w-3 h-3" />
                    Share
                  </button>
                  
                  {showShareMenu && (
                    <div className="absolute bottom-full right-0 mb-1 bg-background border border-gold/30 rounded-lg shadow-xl z-50 min-w-[140px]">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(window.location.origin + `/exchange/${item.tokenAddress}`)
                          alert('Link copied to clipboard!')
                          setShowShareMenu(false)
                        }}
                        className="w-full px-3 py-2 text-left text-[9px] tracking-[0.1em] text-ivory hover:text-gold hover:bg-gold/10 transition-colors duration-200 font-sans flex items-center gap-2"
                      >
                        <Copy className="w-3 h-3" />
                        Copy Link
                      </button>
                      <button
                        onClick={() => {
                          const text = `Check out this amazing ${item.title} from ${item.category} - Reserve: ${formatCurrency(item.reserve)} - Current Bid: ${reserveDisplay}`
                          const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.origin + `/exchange/${item.tokenAddress}`)}`
                          window.open(url, '_blank')
                          setShowShareMenu(false)
                        }}
                        className="w-full px-3 py-2 text-left text-[9px] tracking-[0.1em] text-ivory hover:text-gold hover:bg-gold/10 transition-colors duration-200 font-sans flex items-center gap-2"
                      >
                        <Share2 className="w-3 h-3" />
                        Twitter
                      </button>
                      <button
                        onClick={() => {
                          const text = `Check out this amazing ${item.title} from ${item.category} - Reserve: ${formatCurrency(item.reserve)} - Current Bid: ${reserveDisplay}`
                          const url = `https://reddit.com/submit?url=${encodeURIComponent(window.location.origin + `/exchange/${item.tokenAddress}`)}&title=${encodeURIComponent(text)}`
                          window.open(url, '_blank')
                          setShowShareMenu(false)
                        }}
                        className="w-full px-3 py-2 text-left text-[9px] tracking-[0.1em] text-ivory hover:text-gold hover:bg-gold/10 transition-colors duration-200 font-sans flex items-center gap-2"
                      >
                        <MessageCircle className="w-3 h-3" />
                        Reddit
                      </button>
                      <button
                        onClick={() => {
                          const text = `Check out this amazing ${item.title} from ${item.category} - Reserve: ${formatCurrency(item.reserve)} - Current Bid: ${reserveDisplay}`
                          const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin + `/exchange/${item.tokenAddress}`)}`
                          window.open(url, '_blank')
                          setShowShareMenu(false)
                        }}
                        className="w-full px-3 py-2 text-left text-[9px] tracking-[0.1em] text-ivory hover:text-gold hover:bg-gold/10 transition-colors duration-200 font-sans flex items-center gap-2"
                      >
                        <Share2 className="w-3 h-3" />
                        Facebook
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 lg:p-6">
        <p className="text-[9px] tracking-[0.3em] text-gold uppercase mb-2 font-sans">
          {item.category}
        </p>
        <h3 className="font-serif text-lg text-ivory mb-4 group-hover:text-gold transition-colors duration-500">
          {item.title}
        </h3>

        {/* Data Row */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            <p className="text-[9px] tracking-[0.2em] text-muted-foreground uppercase font-sans">
              Reserve
            </p>
            <p className="text-sm text-ivory font-sans mt-0.5">
              {formatCurrency(item.reserve)}
            </p>
          </div>
          <Link
            href={`/exchange/${item.tokenAddress}`}
            className="group relative inline-flex items-center justify-center px-3 py-2 bg-black border border-gold/50 text-gold text-[10px] tracking-[0.15em] uppercase font-sans font-medium rounded-sm hover:bg-gold hover:text-black hover:border-gold hover:shadow-lg transition-all duration-500 ease-out overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-1.5">
              <span>Enter Auction</span>
              <ArrowUpRight className="w-3 h-3 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-gold/20 to-gold/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left" />
          </Link>
        </div>
      </div>

    </div>
  )
}
