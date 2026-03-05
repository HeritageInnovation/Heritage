"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Clock, ArrowUpRight } from "lucide-react"
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

  const [showModal, setShowModal] = useState(false)

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

        {/* Glassmorphism Overlay on Hover */}
        <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 backdrop-blur-0 group-hover:backdrop-blur-sm transition-all duration-700" />

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
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowModal(true)}
                  className="px-4 py-2 border border-gold/40 text-gold text-[9px] tracking-[0.2em] uppercase hover:bg-gold hover:text-background transition-all duration-300 font-sans"
                >
                  Trade
                </button>
                <button
                  className="w-10 h-10 border border-gold/40 flex items-center justify-center text-gold hover:bg-gold hover:text-background transition-all duration-300"
                  aria-label={`Place bid on ${item.title}`}
                >
                  <ArrowUpRight className="w-4 h-4" />
                </button>
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
            className="text-[10px] tracking-[0.2em] text-gold uppercase hover:text-gold-light transition-colors duration-300 font-sans"
          >
            Trade Now
          </Link>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
          <div className="bg-background p-6 rounded-lg max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-serif text-xl text-ivory mb-4">{item.title}</h3>
            <p className="text-[9px] tracking-[0.3em] text-gold uppercase mb-2 font-sans">{item.category}</p>
            <div className="space-y-2 mb-4">
              <div>
                <p className="text-[9px] tracking-[0.2em] text-muted-foreground uppercase font-sans">Lot Number</p>
                <p className="text-sm text-ivory">{item.lotNumber}</p>
              </div>
              <div>
                <p className="text-[9px] tracking-[0.2em] text-muted-foreground uppercase font-sans">Reserve</p>
                <p className="text-sm text-ivory">{formatCurrency(item.reserve)}</p>
              </div>
              <div>
                <p className="text-[9px] tracking-[0.2em] text-muted-foreground uppercase font-sans">Current Bid</p>
                <p className="text-sm text-ivory">{reserveDisplay}</p>
              </div>
              {item.timeLeft && (
                <div>
                  <p className="text-[9px] tracking-[0.2em] text-muted-foreground uppercase font-sans">Time Left</p>
                  <p className="text-sm text-ivory">{item.timeLeft}</p>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <Link
                href={`/exchange/${item.tokenAddress}`}
                className="px-4 py-2 bg-gold text-background text-[10px] tracking-[0.2em] uppercase font-sans hover:bg-gold-light transition-colors"
                onClick={() => setShowModal(false)}
              >
                Trade Now
              </Link>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gold/40 text-gold text-[10px] tracking-[0.2em] uppercase hover:bg-gold hover:text-background transition-all duration-300 font-sans"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
