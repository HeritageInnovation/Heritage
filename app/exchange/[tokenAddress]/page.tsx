"use client"

import { useParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useState, useEffect } from "react"

// Token metadata mapping for display
const tokenMetadata: Record<string, { name: string; symbol: string }> = {
  "0xGold": { name: "Sovereign Gold Reserve", symbol: "GOLD" },
  "0xPatek": { name: "Patek Philippe Ref. 5711", symbol: "PATEK" },
  "0xDiamond": { name: "The Cerulean Diamond", symbol: "DIAMOND" },
  "0xRothko": { name: "Rothko No. 14 Study", symbol: "ROTHKO" },
  "0xWine": { name: "Romanee-Conti 1945", symbol: "WINE" },
  "0xFerrari": { name: "Ferrari 250 GTO Title", symbol: "FERRARI" },
}

export default function TokenTradePage() {
  const params = useParams()
  const tokenAddress = params?.tokenAddress as string
  const [mounted, setMounted] = useState(false)
  
  const tokenInfo = tokenMetadata[tokenAddress] || { 
    name: "Luxury Asset Token", 
    symbol: tokenAddress?.slice(0, 6).toUpperCase() || "TOKEN" 
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="pt-24 pb-16 px-6 lg:px-12 flex items-center justify-center">
          <div className="animate-pulse text-gold font-serif text-xl">Loading...</div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="pt-24 pb-16 px-6 lg:px-12 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-gold" />
            <span className="text-[10px] tracking-[0.4em] text-gold uppercase font-sans">
              Direct Trading
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-ivory leading-[0.95] text-balance">
            Trade {tokenInfo.name}
          </h1>
          <p className="text-muted-foreground mt-4 font-sans max-w-2xl">
            Swap tokens directly on the decentralized exchange. 
            Token Address: <span className="text-gold font-mono text-sm">{tokenAddress}</span>
          </p>
        </div>

        {/* Trading Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 lg:col-start-4">
            <div className="border border-border bg-card p-6">
              <div className="mb-6">
                <h2 className="font-serif text-2xl text-ivory mb-2">Swap</h2>
                <p className="text-muted-foreground text-sm font-sans">
                  Trade {tokenInfo.symbol} tokens instantly
                </p>
              </div>
              
              <div className="relative">
                <div className="bg-card/30 backdrop-blur-md border border-white/10 p-6 lg:p-8 rounded-3xl text-center">
                  <div className="text-gold text-sm mb-2">Trading Interface</div>
                  <div className="text-ivory/60 text-xs">
                    Trading interface coming soon.
                  </div>
                  <div className="text-ivory/40 text-xs mt-2">
                    Please connect your wallet to continue.
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-muted-foreground uppercase font-sans">
                  <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
                  Trading Platform
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Token Info Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-border bg-card p-6">
            <p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-2 font-sans">
              Token Symbol
            </p>
            <p className="text-2xl font-serif text-ivory">{tokenInfo.symbol}</p>
          </div>
          <div className="border border-border bg-card p-6">
            <p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-2 font-sans">
              Asset Class
            </p>
            <p className="text-2xl font-serif text-ivory">Fractional RWA</p>
          </div>
          <div className="border border-border bg-card p-6">
            <p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-2 font-sans">
              Liquidity Source
            </p>
            <p className="text-2xl font-serif text-gold">Trading Platform</p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
