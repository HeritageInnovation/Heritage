"use client"

export const dynamic = 'force-dynamic';

import { useEffect, useState, useLayoutEffect } from "react"
import { Navbar } from "@/components/navbar"
import { TradingViewChart } from "@/components/trading-view-chart"
import { Footer } from "@/components/footer"
import dynamicImport from "next/dynamic"
import { USDT_ADDRESS } from '@/constants/addresses'
import '@uniswap/widgets/fonts.css'

// Supported assets for trading
const SUPPORTED_ASSETS = [
  { symbol: 'ETH', ticker: 'BINANCE:ETHUSD', address: 'NATIVE' },
  { symbol: 'BTC', ticker: 'BINANCE:BTCUSD', address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599' },
  { symbol: 'USDT', ticker: 'BINANCE:USDTUSD', address: USDT_ADDRESS },
]

// Dynamically import SwapReset with SSR disabled
const SwapReset = dynamicImport(
  () => import("@/components/Trade/SwapReset").then((mod) => mod.SwapReset),
  {
    ssr: false,
    loading: () => (
      <div className="h-[500px] flex items-center justify-center border border-border bg-card">
        <div className="animate-pulse text-gold font-serif text-xl">Loading Swap Interface...</div>
      </div>
    ),
  }
)

export default function TradePage() {
  const [mounted, setMounted] = useState(false)
  
  // Centralized trade state
  const [activeAsset, setActiveAsset] = useState(SUPPORTED_ASSETS[0]) // Default to ETH

  useLayoutEffect(() => {
    // Apply window.Browser patch immediately on load to kill Brotli crash
    if (typeof window !== 'undefined') {
      (window as any).Browser = (window as any).Browser || { T: () => {} };
    }
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="pt-24 pb-16 px-6 lg:px-12">
        {/* Prototype Title */}
        <h1 className="text-muted-gold font-mono text-sm mb-4">(Prototype)</h1>

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-gold" />
            <span className="text-[10px] tracking-[0.4em] text-gold uppercase font-sans">
              Instant Trading
            </span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-ivory leading-[0.95] text-balance">
            Trade Fractional
            <br />
            <span className="italic text-gold">Luxury Assets</span>
          </h2>
          <p className="text-muted-foreground mt-4 font-sans max-w-2xl">
            Swap between ETH, BTC, and USDT instantly on Ethereum Mainnet. 
            Connect your wallet to begin trading.
          </p>
        </div>

        {/* Curated Lot Buttons */}
        <div className="mb-8">
          <div className="flex items-center gap-4">
            {SUPPORTED_ASSETS.map((asset) => (
              <button
                key={asset.symbol}
                onClick={() => setActiveAsset(asset)}
                className={`px-6 py-3 rounded-xl border transition-all duration-300 font-sans text-sm tracking-[0.2em] uppercase backdrop-blur-md bg-white/5 border-white/10 ${
                  activeAsset.symbol === asset.symbol
                    ? 'border-gold-500 shadow-[0_0_15px_rgba(218,165,32,0.4)]'
                    : 'border-white/20 hover:border-gold-500/50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-gold/20 flex items-center justify-center">
                    <span className="text-xs font-bold text-gold">{asset.symbol[0]}</span>
                  </div>
                  {asset.symbol}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:col-span-1">
            <TradingViewChart 
              key={activeAsset.ticker} 
            />
          </div>

          <div className="lg:col-span-1">
            <div className="border border-border bg-card p-6">
              <div className="mb-6">
                <h2 className="font-serif text-2xl text-ivory mb-2">Swap {activeAsset.symbol}</h2>
                <p className="text-muted-foreground text-sm font-sans">
                  {activeAsset.symbol} to USDT on Ethereum
                </p>
              </div>
              
              <SwapReset
                defaultInputTokenAddress={activeAsset.address}
                defaultOutputTokenAddress={USDT_ADDRESS}
                key={activeAsset.address} // Force re-render on asset change
              />

              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-muted-foreground uppercase font-sans">
                  <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
                  Powered by Uniswap Protocol
                </div>
              </div>
            </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
