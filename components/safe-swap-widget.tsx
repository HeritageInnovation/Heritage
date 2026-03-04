"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

// Dynamically import SwapWidget with SSR disabled
const SwapWidget = dynamic(
  () => import("@uniswap/widgets").then((mod) => mod.SwapWidget),
  {
    ssr: false,
    loading: () => (
      <div className="h-[500px] flex items-center justify-center">
        <div className="animate-pulse text-[#D4AF37] font-serif text-xl">Loading Swap Interface...</div>
      </div>
    ),
  }
)

// Wrapper component that suppresses styled-components prop warnings
export function SafeSwapWidget({ 
  theme, 
  defaultInputTokenAddress,
  defaultOutputTokenAddress, 
  width 
}: { 
  theme: any
  defaultInputTokenAddress?: string
  defaultOutputTokenAddress: string
  width: string
}) {
  const [suppressErrors, setSuppressErrors] = useState(false)

  useEffect(() => {
    // Suppress specific React warnings from Uniswap Widget
    const originalConsoleError = console.error
    console.error = (...args: any[]) => {
      const message = args[0]?.toString() || ""
      // Filter out Uniswap Widget styled-components prop warnings
      if (
        message.includes("React does not recognize") &&
        (message.includes("iconSize") ||
          message.includes("maxHeight") ||
          message.includes("shouldUseDisabledColor") ||
          message.includes("hasAction"))
      ) {
        return // Suppress this error
      }
      if (
        message.includes("Received") &&
        message.includes("for a non-boolean attribute") &&
        (message.includes("flex") ||
          message.includes("grow") ||
          message.includes("padded") ||
          message.includes("narrow") ||
          message.includes("expanded"))
      ) {
        return // Suppress this error
      }
      originalConsoleError.apply(console, args)
    }

    setSuppressErrors(true)

    return () => {
      console.error = originalConsoleError
    }
  }, [])

  if (!suppressErrors) {
    return (
      <div className="h-[500px] flex items-center justify-center">
        <div className="animate-pulse text-[#D4AF37] font-serif text-xl">Initializing...</div>
      </div>
    )
  }

  return (
    <SwapWidget
      theme={theme}
      defaultInputTokenAddress={defaultInputTokenAddress}
      defaultOutputTokenAddress={defaultOutputTokenAddress}
      width={width}
    />
  )
}
