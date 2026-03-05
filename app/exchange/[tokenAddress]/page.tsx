"use client"

import { useParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useState, useEffect } from "react"
import { SafeSwapWidget } from "@/components/safe-swap-widget"

// Token metadata mapping for display
const tokenMetadata: Record<string, { name: string; symbol: string }> = {
  "0xGold": { name: "Sovereign Gold Reserve", symbol: "GOLD" },
  "0xPatek": { name: "Patek Philippe Ref. 5711", symbol: "PATEK" },
  "0xDiamond": { name: "The Cerulean Diamond", symbol: "DIAMOND" },
  "0xRothko": { name: "Rothko No. 14 Study", symbol: "ROTHKO" },
  "0xWine": { name: "Romanee-Conti 1945", symbol: "WINE" },
  "0xFerrari": { name: "Ferrari 250 GTO Title", symbol: "FERRARI" },
}

// Luxury Dark Theme for Uniswap Widget
const luxuryTheme = {
  // Primary colors
  primary: "#D4AF37", // Gold
  secondary: "#B8977E", // Light gold
  
  // Background colors
  container: "#050505",
  module: "#0A0A0A",
  accent: "#D4AF37",
  outline: "#1E1E28",
  
  // Interactive states
  dialog: "#0A0A0A",
  scrim: "rgba(5, 5, 5, 0.8)",
  
  // Text colors
  onAccent: "#050505",
  primaryDark: "#050505",
  secondaryDark: "#7F1D1D",
  
  // Hover and active states
  onHover: "#1A1A1F",
  deepShadow: "#000000",
  
  // Network colors
  chainBg: "#0A0A0A",
  chainText: "#D4AF37",
  
  // State colors
  active: "#D4AF37",
  error: "#7F1D1D",
  success: "#22C55E",
  warning: "#EAB308",
  info: "#3B82F6",
  
  // Font
  fontFamily: "\"Playfair Display\", Georgia, serif",
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

        {/* Uniswap Swap Widget */}
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
                <SafeSwapWidget
                  theme={luxuryTheme}
                  defaultInputTokenAddress="0xdAC17F958D2ee523a2206206994597C13D831ec7"
                  defaultOutputTokenAddress={tokenAddress}
                  width="100%"
                />
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-muted-foreground uppercase font-sans">
                  <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
                  Powered by Uniswap Protocol
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
            <p className="text-2xl font-serif text-gold">Uniswap v3</p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
