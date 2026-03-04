"use client"

export const dynamic = 'force-dynamic';

import { useActiveAccount, useWalletBalance } from "thirdweb/react"
import { ethereum } from "@/lib/client"

export default function PortfolioPage() {
  const account = useActiveAccount()
  const { data: balance, isLoading } = useWalletBalance({
    address: account?.address,
    chain: ethereum,
  })

  if (!account) {
    return (
      <main className="min-h-screen bg-[#050505] text-[#f0f0f0] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#D4AF37] font-serif text-2xl mb-4">Connect Your Wallet</p>
          <p className="text-gray-400 font-sans text-sm">Please connect to view your portfolio</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#050505] text-[#f0f0f0] p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-serif text-4xl text-[#D4AF37] mb-8">Your Portfolio</h1>
        
        <div className="border border-[#1E1E28] bg-[#0A0A0A] p-6 mb-6">
          <p className="text-[10px] tracking-[0.2em] text-gray-500 uppercase mb-2">Wallet</p>
          <p className="font-mono text-sm text-[#f0f0f0]">
            {account.address.slice(0, 6)}...{account.address.slice(-4)}
          </p>
        </div>

        <div className="border border-[#1E1E28] bg-[#0A0A0A] p-6">
          <p className="text-[10px] tracking-[0.2em] text-gray-500 uppercase mb-2">Balance</p>
          <p className="font-serif text-3xl text-[#D4AF37]">
            {isLoading ? "Loading..." : `${balance?.displayValue || "0"} ${balance?.symbol || "ETH"}`}
          </p>
        </div>
      </div>
    </main>
  )
}
