"use client"

export const dynamic = 'force-dynamic';

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { TradingViewChart } from "@/components/trading-view-chart"
import { Footer } from "@/components/footer"
import { useActiveAccount, useActiveWallet } from "thirdweb/react"
import dynamicImport from "next/dynamic"
import TOKEN_LIST from '@uniswap/default-token-list'
import { USDT_ADDRESS } from '@/constants/addresses'
import { getUniswapProvider } from '@/lib/uniswap-bridge'
import '@uniswap/widgets/fonts.css'

// Dynamically import SwapWidget with SSR disabled
const SwapWidget = dynamicImport(
  () => import("@uniswap/widgets").then((mod) => mod.SwapWidget),
  {
    ssr: false,
    loading: () => (
      <div className="h-[500px] flex items-center justify-center border border-border bg-card">
        <div className="animate-pulse text-gold font-serif text-xl">Loading Swap Interface...</div>
      </div>
    ),
  }
)

// Filter tokens to only include valid Ethereum addresses
const filteredTokens = TOKEN_LIST.tokens.filter(token => token.address.match(/^0x[a-fA-F0-9]{40}$/))

// Heritage Theme for Uniswap Widget
const heritageTheme = {
  primary: '#FFFFFF',
  secondary: '#A0A0A0',
  interactive: '#DAA520',
  container: '#000000',
  module: '#111111',
  outline: '#333333',
  dialog: '#000000',
  fontFamily: "\"Playfair Display\", Georgia, serif",
}

// Create a unified provider using the bridge
function useUniswapProvider() {
  const wallet = useActiveWallet()
  const [provider, setProvider] = useState<any>(null)

  useEffect(() => {
    if (wallet && typeof window !== "undefined") {
      try {
        const uniswapProvider = getUniswapProvider(wallet)
        setProvider(uniswapProvider)
      } catch (error) {
        console.error('Failed to get wallet provider:', error)
        setProvider(null)
      }
    } else {
      setProvider(null)
    }
  }, [wallet])

  return provider
}

export default function TradePage() {
  const provider = useUniswapProvider()
  const [mounted, setMounted] = useState(false)

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
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-gold" />
            <span className="text-[10px] tracking-[0.4em] text-gold uppercase font-sans">
              Instant Trading
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-ivory leading-[0.95] text-balance">
            Trade Fractional
            <br />
            <span className="italic text-gold">Luxury Assets</span>
          </h1>
          <p className="text-muted-foreground mt-4 font-sans max-w-2xl">
            Swap between ETH and USDT instantly on Ethereum Mainnet. 
            Connect your wallet to begin trading.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <TradingViewChart />
          </div>

          <div className="lg:col-span-4">
            <div className="border border-border bg-card p-6">
              <div className="mb-6">
                <h2 className="font-serif text-2xl text-ivory mb-2">Swap</h2>
                <p className="text-muted-foreground text-sm font-sans">
                  ETH to USDT on Ethereum
                </p>
              </div>
              
              <div className="mx-auto" style={{ maxWidth: '480px' }}>
                <SwapWidget
                  theme={heritageTheme}
                  provider={provider || undefined}
                  defaultInputTokenAddress="NATIVE"
                  defaultOutputTokenAddress={USDT_ADDRESS}
                  tokenList={filteredTokens}
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
      </div>

      <Footer />
    </main>
  )
}
