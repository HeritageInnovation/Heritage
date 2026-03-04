"use client"

import { useState } from "react"
import dynamicImport from "next/dynamic"
import { useActiveAccount, useActiveWallet } from "thirdweb/react"
import { getUniswapProvider } from '@/lib/uniswap-bridge'
import TOKEN_LIST from '@uniswap/default-token-list'
import { USDT_ADDRESS } from '@/constants/addresses'
import '@uniswap/widgets/fonts.css'

// Filter tokens to only include valid Ethereum addresses
const filteredTokens = TOKEN_LIST.tokens.filter(token => token.address.match(/^0x[a-fA-F0-9]{40}$/))

// Heritage Theme for Uniswap Widget
const heritageTheme = {
  container: '#000000',
  accent: '#DAA520',
  outline: '#1A1A1A',
}

// Create a unified provider using the bridge
function useUniswapProvider() {
  const wallet = useActiveWallet()
  const [provider, setProvider] = useState<any>(null)

  // Apply window.Browser patch immediately on load
  if (typeof window !== "undefined") {
    (window as any).Browser = (window as any).Browser || { T: () => {} };
  }

  // Apply the patch in a useLayoutEffect to kill Brotli crash immediately
  if (typeof window !== "undefined") {
    (window as any).Browser = (window as any).Browser || { T: () => {} };
  }

  return provider
}

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

interface SwapResetProps {
  defaultInputTokenAddress?: string
  defaultOutputTokenAddress?: string
}

export function SwapReset({ 
  defaultInputTokenAddress = "NATIVE", 
  defaultOutputTokenAddress = USDT_ADDRESS 
}: SwapResetProps) {
  const provider = useUniswapProvider()

  return (
    <div className="mx-auto" style={{ maxWidth: '480px' }}>
      <SwapWidget
        theme={heritageTheme}
        provider={provider || undefined}
        defaultInputTokenAddress={defaultInputTokenAddress}
        defaultOutputTokenAddress={defaultOutputTokenAddress}
        tokenList={filteredTokens}
        width="100%"
      />
    </div>
  )
}
