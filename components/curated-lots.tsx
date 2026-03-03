"use client"

import Image from "next/image"
import { Clock, ArrowUpRight } from "lucide-react"

const lots = [
  {
    id: "001",
    title: "Sovereign Gold Reserve",
    category: "Precious Metals",
    currentBid: "$1,240,000",
    reserve: "$1,100,000",
    timeLeft: "2d 14h",
    integrity: "99.8%",
    image: "/images/lot-01.jpg",
    featured: true,
  },
  {
    id: "002",
    title: "Patek Philippe Ref. 5711",
    category: "Horological Assets",
    currentBid: "$892,000",
    reserve: "$750,000",
    timeLeft: "1d 8h",
    integrity: "99.9%",
    image: "/images/lot-02.jpg",
    featured: false,
  },
  {
    id: "003",
    title: "The Cerulean Diamond",
    category: "Gemstones",
    currentBid: "$3,780,000",
    reserve: "$3,200,000",
    timeLeft: "4d 2h",
    integrity: "100%",
    image: "/images/lot-03.jpg",
    featured: false,
  },
  {
    id: "004",
    title: "Rothko No. 14 Study",
    category: "Fine Art",
    currentBid: "$5,100,000",
    reserve: "$4,500,000",
    timeLeft: "6d 19h",
    integrity: "99.5%",
    image: "/images/lot-04.jpg",
    featured: true,
  },
  {
    id: "005",
    title: "Romanee-Conti 1945",
    category: "Fine Wine",
    currentBid: "$620,000",
    reserve: "$500,000",
    timeLeft: "3d 5h",
    integrity: "99.7%",
    image: "/images/lot-05.jpg",
    featured: false,
  },
  {
    id: "006",
    title: "Ferrari 250 GTO Title",
    category: "Automotive",
    currentBid: "$48,200,000",
    reserve: "$42,000,000",
    timeLeft: "8d 12h",
    integrity: "99.6%",
    image: "/images/lot-06.jpg",
    featured: false,
  },
]

function LotCard({
  lot,
}: {
  lot: (typeof lots)[0]
}) {
  return (
    <div className="group relative bg-card overflow-hidden border border-border hover:border-gold/30 transition-all duration-700">
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={lot.image}
          alt={lot.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Glassmorphism Overlay on Hover */}
        <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 backdrop-blur-0 group-hover:backdrop-blur-sm transition-all duration-700" />

        {/* Top Info Bar */}
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start">
          <span className="text-[9px] tracking-[0.3em] text-ivory/80 uppercase bg-background/50 backdrop-blur-sm px-3 py-1.5 font-sans">
            LOT {lot.id}
          </span>
          <div className="flex items-center gap-1.5 bg-background/50 backdrop-blur-sm px-3 py-1.5">
            <Clock className="w-3 h-3 text-gold" />
            <span className="text-[9px] tracking-[0.2em] text-ivory/80 font-sans">
              {lot.timeLeft}
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
                  {lot.currentBid}
                </p>
              </div>
              <button
                className="w-10 h-10 border border-gold/40 flex items-center justify-center text-gold hover:bg-gold hover:text-background transition-all duration-300"
                aria-label={`Place bid on ${lot.title}`}
              >
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 lg:p-6">
        <p className="text-[9px] tracking-[0.3em] text-gold uppercase mb-2 font-sans">
          {lot.category}
        </p>
        <h3 className="font-serif text-lg text-ivory mb-4 group-hover:text-gold transition-colors duration-500">
          {lot.title}
        </h3>

        {/* Data Row */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            <p className="text-[9px] tracking-[0.2em] text-muted-foreground uppercase font-sans">
              Reserve
            </p>
            <p className="text-sm text-ivory font-sans mt-0.5">{lot.reserve}</p>
          </div>
          <div className="text-right">
            <p className="text-[9px] tracking-[0.2em] text-muted-foreground uppercase font-sans">
              Integrity
            </p>
            <p className="text-sm text-gold font-sans mt-0.5">
              {lot.integrity}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function CuratedLots() {
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
            Curated Lots (DEMO)
          </h2>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase font-sans">
            {lots.length} Active Lots
          </span>
          <div className="w-12 h-[1px] bg-border" />
          <button className="text-[10px] tracking-[0.3em] text-gold uppercase hover:text-gold-light transition-colors duration-300 font-sans">
            View All
          </button>
        </div>
      </div>

      {/* Asymmetric Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-border">
        {lots.map((lot) => (
          <LotCard key={lot.id} lot={lot} />
        ))}
      </div>
    </section>
  )
}
