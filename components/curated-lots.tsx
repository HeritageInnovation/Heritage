"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { sanityClient } from "@/lib/sanity"
import { LuxuryCard } from "@/components/luxury-card"
import { ArrowUpRight } from "lucide-react"

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

// Mock data upgraded with valid Ethereum hex addresses to prevent downstream crashes
const mockLuxuryItems: LuxuryItem[] = [
  {
    _id: "001",
    title: "Sovereign Gold Reserve",
    category: "Precious Metals",
    reserve: 712747,
    lotNumber: "001",
    timeLeft: "2d 14h",
    tokenAddress: "0x68749665FF8D2d112Fa859AA293F07A622782F38",
    currentBid: "$5,123.75",
    featured: true,
  },
  {
    _id: "002",
    title: "Patek Philippe Ref. 5711",
    category: "Horological Assets",
    reserve: 750000,
    lotNumber: "002",
    timeLeft: "1d 8h",
    tokenAddress: "0x0000000000000000000000000000000000000002",
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
    tokenAddress: "0x0000000000000000000000000000000000000003",
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
    tokenAddress: "0x0000000000000000000000000000000000000004",
    currentBid: "$5,100,000",
    featured: true,
  },
  {
    _id: "005",
    title: "Romanée-Conti 1945",
    category: "Fine Wine",
    reserve: 500000,
    lotNumber: "005",
    timeLeft: "3d 5h",
    tokenAddress: "0x0000000000000000000000000000000000000005",
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
    tokenAddress: "0x0000000000000000000000000000000000000006",
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
          _id, title, category, reserve, lotNumber, timeLeft, tokenAddress, currentBid, image, featured
        }`
        const data = await sanityClient.fetch(query)
        
        if (!data || data.length === 0) {
          setItems(mockLuxuryItems)
        } else {
          setItems(data)
        }
      } catch (err) {
        console.error("Matrix Sync Error: Cannot fetch sanity data.", err)
        setItems(mockLuxuryItems)
      } finally {
        setLoading(false)
      }
    }

    fetchItems()
  }, [])

  return (
    <section id="markets" className="py-24 lg:py-40 px-6 lg:px-12 max-w-[1600px] mx-auto bg-[#050505]">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 lg:mb-24">
        <div>
          <div className="flex items-center gap-3 mb-6 animate-in fade-in slide-in-from-left-4 duration-700">
            <div className="w-8 h-[1px] bg-gold shadow-[0_0_8px_#D4AF37]" />
            <span className="text-[10px] tracking-[0.4em] text-gold uppercase font-sans font-bold">
              Tranche III
            </span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-ivory leading-[0.95] text-balance tracking-tighter">
            Curated Lots
          </h2>
        </div>
        
        {/* Interactive Stats & Routing */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase font-sans">
              {loading ? "--" : items.length} Active Assets
            </span>
          </div>
          <div className="w-px h-8 bg-white/10 hidden sm:block" />
          <Link 
            href="/exchange" 
            className="group flex items-center gap-2 px-4 py-2 border border-gold/40 text-gold text-[10px] tracking-[0.2em] uppercase hover:bg-gold hover:text-background transition-all duration-300 font-sans rounded-sm"
          >
            <span>View Exchange</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Grid Layout - Hairline Borders */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-white/10 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        {loading ? (
          /* Institutional Skeleton Loaders */
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-[#0a0a0a] h-[450px] p-8 flex flex-col justify-end relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
              <div className="w-1/3 h-2 bg-white/5 rounded mb-4" />
              <div className="w-3/4 h-6 bg-white/5 rounded mb-8" />
              <div className="w-full h-px bg-white/5 mb-6" />
              <div className="w-1/2 h-3 bg-white/5 rounded" />
            </div>
          ))
        ) : (
          /* Actual Luxury Cards */
          items.map((item, index) => (
            <div key={item._id} className="bg-[#050505] animate-in fade-in duration-1000" style={{ animationDelay: `${index * 100}ms` }}>
              <LuxuryCard 
                item={item} 
                priority={index < 2} 
                fallbackImageIndex={index}
              />
            </div>
          ))
        )}
      </div>
    </section>
  )
}