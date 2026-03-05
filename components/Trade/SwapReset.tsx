"use client"

import { useState, useEffect } from "react"
import dynamicImport from "next/dynamic"
import { useActiveWallet } from "thirdweb/react"
import { getUniswapProvider } from '@/lib/uniswap-bridge'
import TOKEN_LIST from '@uniswap/default-token-list'
import { USDT_ADDRESS } from '@/constants/addresses'
import { HERITAGE_THEME } from '@/constants/theme'

// 1. Global Patch: Must run outside the component to catch early imports
if (typeof window !== "undefined") {
  (window as any).Browser = (window as any).Browser || { T: () => {} };
}

// Filter tokens (Memoize this if possible to prevent re-renders)
const filteredTokens = TOKEN_LIST.tokens.filter(token => 
  token.address.match(/^0x[a-fA-F0-9]{40}$/)
)

const SwapWidget = dynamicImport(
  () => import("@uniswap/widgets").then((mod) => mod.SwapWidget),
  { ssr: false }
)

export function SwapReset() {
  const wallet = useActiveWallet()
  const [uniswapProvider, setUniswapProvider] = useState<any>(undefined)

  useEffect(() => {
    async function syncProvider() {
      if (wallet) {
        // Ensure getUniswapProvider returns the internal 'provider' 
        // or a wrapped EIP-1193 object
        const p = await getUniswapProvider(wallet)
        setUniswapProvider(p)
      } else {
        setUniswapProvider(undefined)
      }
    }
    syncProvider()
  }, [wallet])

  return (
    <div className="mx-auto w-full max-w-[480px]">
      <SwapWidget
        theme={HERITAGE_THEME}
        provider={uniswapProvider} // Now actually populated
        tokenList={filteredTokens}
        defaultOutputTokenAddress={USDT_ADDRESS}
        width="100%"
      />
    </div>
  )
}