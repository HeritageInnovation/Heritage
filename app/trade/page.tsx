"use client"

export const dynamic = 'force-dynamic';

import { useEffect, useState, useLayoutEffect } from "react"
import { Navbar } from "@/components/navbar"
import { TradingViewChart } from "@/components/trading-view-chart"
import { Footer } from "@/components/footer"
import { CurationDashboard } from "@/components/Curation/CurationDashboard"
import dynamicImport from "next/dynamic"
import { USDT_ADDRESS } from '@/constants/addresses'
import '@uniswap/widgets/fonts.css'

// Unified asset map with all required data
const ASSET_MAP = {
  // Crypto Assets
  ETH: {
    fullName: 'Ethereum',
    contractAddress: 'NATIVE',
    currentPrice: 2450.80,
    dailyChange: 1.8,
    ticker: 'BINANCE:ETHUSD'
  },
  BTC: {
    fullName: 'Bitcoin',
    contractAddress: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
    currentPrice: 43250.00,
    dailyChange: 2.1,
    ticker: 'BINANCE:BTCUSD'
  },
  USDT: {
    fullName: 'Tether',
    contractAddress: USDT_ADDRESS,
    currentPrice: 1.00,
    dailyChange: 0.0,
    ticker: 'BINANCE:USDTUSD'
  },
  // Luxury Assets
  GOLD: {
    fullName: 'Sovereign Gold Reserve',
    contractAddress: '0x1234567890123456789012345678901234567890', // Mock luxury asset contract
    currentPrice: 1240.50,
    dailyChange: 2.4,
    ticker: 'NASDAQ:AAPL' // Placeholder for luxury assets
  },
  PATEK: {
    fullName: 'Patek Philippe 5711',
    contractAddress: '0x2345678901234567890123456789012345678901234', // Mock luxury asset contract
    currentPrice: 892.30,
    dailyChange: -1.2,
    ticker: 'NASDAQ:AAPL' // Placeholder for luxury assets
  },
  DIAMOND: {
    fullName: 'Cerulean Diamond',
    contractAddress: '0x3456789012345678901234567890123456789012345', // Mock luxury asset contract
    currentPrice: 3780.00,
    dailyChange: 5.6,
    ticker: 'NASDAQ:AAPL' // Placeholder for luxury assets
  },
  ROTHKO: {
    fullName: 'Rothko Study',
    contractAddress: '0x4567890123456789012345678901234567890123456', // Mock luxury asset contract
    currentPrice: 5100.00,
    dailyChange: 3.8,
    ticker: 'NASDAQ:AAPL' // Placeholder for luxury assets
  }
} as const

// Asset configuration with real contract addresses
const assetConfig = {
  GOLD: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', // Mock Gold contract
  PATEK: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', // Mock Patek contract
  DIAMOND: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', // Mock Diamond contract
  ROTHKO: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', // Mock Rothko contract
  ETH: 'NATIVE', // Native ETH
  BTC: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', // WBTC
  USDT: USDT_ADDRESS // USDT
} as const

// Asset groups for navigation
const CRYPTO_ASSETS = ['ETH', 'BTC', 'USDT'] as const
const LUXURY_ASSETS = ['GOLD', 'PATEK', 'DIAMOND', 'ROTHKO'] as const

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
  const [showCurationMatrix, setShowCurationMatrix] = useState(false)
  const [userAddress, setUserAddress] = useState("0x1234567890123456789012345678901234567890") // Mock user address
  const [userRole, setUserRole] = useState<"participant" | "professional" | "investor">("participant")
  
  // Centralized trade state
  const [activeAsset, setActiveAsset] = useState<keyof typeof ASSET_MAP>('ETH') // Default to ETH
  const [outputTokenAddress, setOutputTokenAddress] = useState(USDT_ADDRESS)
  const [livePrice, setLivePrice] = useState<number>(ASSET_MAP.ETH.currentPrice)
  const [timeframe, setTimeframe] = useState("1D")

  // Handle asset selection
  const handleAssetSelect = (assetKey: keyof typeof ASSET_MAP) => {
    setActiveAsset(assetKey)
    setLivePrice(ASSET_MAP[assetKey].currentPrice)
    // Set output token based on selected asset
    if (assetKey === 'USDT') {
      setOutputTokenAddress(assetConfig.ETH)
    } else {
      setOutputTokenAddress(assetConfig.USDT)
    }
  }

  // Handle price updates from chart
  const handlePriceUpdate = (newPrice: number) => {
    setLivePrice(newPrice)
  }

  // Format price as Heritage Gold
  const formatHeritagePrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: price < 1 ? 4 : 2,
      maximumFractionDigits: price < 1 ? 4 : 2,
    }).format(price)
  }

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

      {/* Curation Matrix Overlay */}
      {showCurationMatrix && (
        <div className="fixed inset-0 z-100 bg-background/95 backdrop-blur-2xl">
          <div className="h-full overflow-y-auto">
            <div className="relative">
              <button
                onClick={() => setShowCurationMatrix(false)}
                className="absolute top-4 right-4 z-101 p-2 rounded-lg bg-gold/10 border border-gold/30 text-gold hover:bg-gold/20 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <CurationDashboard userAddress={userAddress} userRole={userRole} />
            </div>
          </div>
        </div>
      )}

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

        {/* Curation Matrix Toggle */}
        <div className="mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowCurationMatrix(true)}
              className="px-6 py-3 rounded-xl border transition-all duration-300 font-sans text-sm tracking-[0.2em] uppercase backdrop-blur-md bg-gold/10 border-gold/30 text-gold hover:bg-gold/20 hover:border-gold/50"
            >
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-gold/20 flex items-center justify-center">
                  <span className="text-xs font-bold text-gold">C</span>
                </div>
                Curation Matrix
              </div>
            </button>
            
            {/* Role Selector for Demo */}
            <select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value as any)}
              className="px-4 py-2 rounded-lg border border-border bg-background text-ivory text-sm"
            >
              <option value="participant">Participant</option>
              <option value="professional">Professional</option>
              <option value="investor">Investor</option>
            </select>
          </div>
        </div>

        {/* Unified Asset Navigation Bar */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-4">
            {/* Crypto Assets */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-sans uppercase tracking-[0.3em] text-muted-foreground mr-2">Crypto:</span>
              {CRYPTO_ASSETS.map((assetKey) => (
                <button
                  key={assetKey}
                  onClick={() => handleAssetSelect(assetKey)}
                  className={`px-4 py-2 rounded-lg border transition-all duration-300 font-sans text-sm tracking-[0.2em] uppercase backdrop-blur-md ${
                    activeAsset === assetKey
                      ? 'bg-gold/20 border-gold text-gold'
                      : 'bg-white/5 border-white/20 text-muted-foreground hover:border-gold/50 hover:text-gold'
                  }`}
                >
                  {assetKey}
                </button>
              ))}
            </div>

            {/* Luxury Assets */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-sans uppercase tracking-[0.3em] text-gold mr-2">Luxury:</span>
              {LUXURY_ASSETS.map((assetKey) => (
                <button
                  key={assetKey}
                  onClick={() => handleAssetSelect(assetKey)}
                  className={`px-4 py-2 rounded-lg border transition-all duration-300 font-sans text-sm tracking-[0.2em] uppercase backdrop-blur-md ${
                    activeAsset === assetKey
                      ? 'bg-gold/20 border-gold text-gold'
                      : 'bg-white/5 border-white/20 text-muted-foreground hover:border-gold/50 hover:text-gold'
                  }`}
                >
                  {assetKey}
                </button>
              ))}
            </div>

            {/* Timeframe Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-sans uppercase tracking-[0.3em] text-muted-foreground mr-2">Time:</span>
              {["1H", "1D", "1W", "1M", "1Y"].map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-3 py-2 rounded-lg border transition-all duration-300 font-sans text-xs tracking-[0.2em] uppercase backdrop-blur-md ${
                    timeframe === tf
                      ? 'bg-gold/20 border-gold text-gold'
                      : 'bg-white/5 border-white/20 text-muted-foreground hover:border-gold/50 hover:text-gold'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:col-span-1">
            <TradingViewChart 
              key={activeAsset}
              onAssetChange={(asset) => {
                // Update the active asset when chart changes
                const assetKey = Object.keys(ASSET_MAP).find(
                  key => ASSET_MAP[key as keyof typeof ASSET_MAP].ticker === asset.ticker
                ) as keyof typeof ASSET_MAP
                if (assetKey) {
                  handleAssetSelect(assetKey)
                }
                // Update live price from chart
                if (asset.price) {
                  handlePriceUpdate(asset.price)
                }
              }}
              initialAsset={{
                id: activeAsset,
                name: ASSET_MAP[activeAsset].fullName,
                price: livePrice,
                change: ASSET_MAP[activeAsset].dailyChange,
                symbol: activeAsset,
                ticker: ASSET_MAP[activeAsset].ticker
              }}
            />
          </div>

          <div className="lg:col-span-1">
            <div className="border border-border bg-card p-6">
              <div className="mb-6">
                <h2 className="font-serif text-2xl text-ivory mb-2">Swap {activeAsset}</h2>
                <p className="text-muted-foreground text-sm font-sans">
                  {ASSET_MAP[activeAsset].fullName} to USDT on Ethereum
                </p>
              </div>
              
              <SwapReset
                defaultInputTokenAddress={assetConfig[activeAsset]}
                defaultOutputTokenAddress={outputTokenAddress}
                key={`${activeAsset}-${livePrice}`} // Force re-render on asset or price change
              />

              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-muted-foreground uppercase font-sans">
                  <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
                  Powered by Uniswap Protocol
                </div>
              </div>
            </div>
          </div>
        </div> {/* Close for main content grid */}
      </div> {/* Close for pt-24 container */}
      <Footer />
    </main>
  )
}
