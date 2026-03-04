"use client"

import { useEffect, useState } from "react"
import { sanityClient } from "@/lib/sanity"
import { LuxuryCard } from "@/components/luxury-card"

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

// Mock data for 6 luxury items matching the new schema
const mockLuxuryItems: LuxuryItem[] = [
  {
    _id: "001",
    title: "Sovereign Gold Reserve",
    category: "Precious Metals",
    reserve: 1100000,
    lotNumber: "001",
    timeLeft: "2d 14h",
    tokenAddress: "0xGold",
    currentBid: "$1,240,000",
    featured: true,
  },
  {
    _id: "002",
    title: "Patek Philippe Ref. 5711",
    category: "Horological Assets",
    reserve: 750000,
    lotNumber: "002",
    timeLeft: "1d 8h",
    tokenAddress: "0xPatek",
    currentBid: "$892,000",
    featured: false,
  },
  {
    _id: "003",
    title: "The Cerulean Diamond",
    category: "Gemstones",
    reserve: 3200000,
    lotNumber: "003",
    timeLeft: "4d 2h",
    tokenAddress: "0xDiamond",
    currentBid: "$3,780,000",
    featured: false,
  },
  {
    _id: "004",
    title: "Rothko No. 14 Study",
    category: "Fine Art",
    reserve: 4500000,
    lotNumber: "004",
    timeLeft: "6d 19h",
    tokenAddress: "0xRothko",
    currentBid: "$5,100,000",
    featured: true,
  },
  {
    _id: "005",
    title: "Romanee-Conti 1945",
    category: "Fine Wine",
    reserve: 500000,
    lotNumber: "005",
    timeLeft: "3d 5h",
    tokenAddress: "0xWine",
    currentBid: "$620,000",
    featured: false,
  },
  {
    _id: "006",
    title: "Ferrari 250 GTO Title",
    category: "Automotive",
    reserve: 42000000,
    lotNumber: "006",
    timeLeft: "8d 12h",
    tokenAddress: "0xFerrari",
    currentBid: "$48,200,000",
    featured: false,
  },
]

export function CuratedLots() {
  const [items, setItems] = useState<LuxuryItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchItems() {
      try {
        const query = `*[_type == "luxuryItem"] | order(featured desc, _createdAt desc) {
          _id,
          title,
          category,
          reserve,
          lotNumber,
          timeLeft,
          tokenAddress,
          currentBid,
          image,
          featured
        }`
        const data = await sanityClient.fetch(query)
        
        if (!data || data.length === 0) {
          setItems(mockLuxuryItems)
        } else {
          setItems(data)
        }
      } catch (err) {
        console.error("Error fetching luxury items:", err)
        setItems(mockLuxuryItems)
      } finally {
        setLoading(false)
      }
    }

    fetchItems()
  }, [])

  if (loading) {
    return (
      <section id="lots" className="py-24 lg:py-40 px-6 lg:px-12">
        <div className="flex items-center justify-center h-64">
          <div className="animate-pulse text-gold font-serif text-xl">Loading Curated Lots...</div>
        </div>
      </section>
    )
  }

  return (
    <section id="lots" className="py-24 lg:py-40 px-6 lg:px-12">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 lg:mb-24">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-gold" />
            <span className="text-[10px] tracking-[0.4em] text-gold uppercase font-sans">
              Season III
            </span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-ivory leading-[0.95] text-balance">
            Curated Lots
          </h2>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase font-sans">
            {items.length} Active Lots
          </span>
          <div className="w-12 h-[1px] bg-border" />
          <button className="text-[10px] tracking-[0.3em] text-gold uppercase hover:text-gold-light transition-colors duration-300 font-sans">
            View All
          </button>
        </div>
      </div>

      {/* Luxury Cards Grid - Render 6 cards using .map() */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-border">
        {items.map((item, index) => (
          <LuxuryCard 
            key={item._id} 
            item={item} 
            priority={index < 2} 
            fallbackImageIndex={index}
          />
        ))}
      </div>
    </section>
  )
}
