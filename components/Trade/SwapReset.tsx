"use client"

import { useState, useEffect } from "react"
import { useActiveWallet } from "thirdweb/react"

export function SwapReset() {
  const wallet = useActiveWallet()

  return (
    <div className="mx-auto w-full max-w-[480px]">
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
  )
}