"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CurationDashboard } from "@/components/Curation/CurationDashboard"
import { useActiveAccount, ConnectButton } from "thirdweb/react"
import { client } from "@/lib/client"
import { Shield, Info, Lock, Wallet, TrendingUp, Grid3x3, Activity, Users, Gem } from "lucide-react"


export default function MatrixPage() {
  const [mounted, setMounted] = useState(false)
  const account = useActiveAccount()

  // 2. Prevent Hydration Mismatch & Premature SDK Execution
  useEffect(() => {
    setMounted(true)
  }, [])

  // 3. Authentication Check with ConnectButton
  if (!mounted) {
    return (
      <main className="min-h-screen bg-background text-foreground flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mb-6 mx-auto rounded-full border-2 border-gold/20 flex items-center justify-center bg-gold/5 shadow-[0_0_30px_rgba(212,175,55,0.1)]">
              <Shield className="w-8 h-8 text-gold animate-pulse" />
            </div>
            <h2 className="font-serif text-2xl text-ivory mb-3">Initializing Matrix</h2>
            <p className="text-muted-foreground text-sm font-sans max-w-md mx-auto">
              Authenticating your Heritage identity and preparing secure access...
            </p>
            <div className="mt-6 flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  if (!account) {
    return (
      <main className="min-h-screen bg-background text-foreground flex flex-col">
        <Navbar />
        <div className="flex-1 pt-32 pb-16 px-6 lg:px-12 max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
          <div className="mb-8 flex flex-col items-center">
            <div className="w-20 h-20 mb-6 rounded-full border-2 border-gold/20 flex items-center justify-center bg-gold/5 shadow-[0_0_30px_rgba(212,175,55,0.1)]">
              <Lock className="w-10 h-10 text-gold" />
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-ivory leading-[0.95] text-balance mb-4">
              Enter the Matrix
            </h1>
            <p className="text-xl text-muted-foreground font-sans max-w-2xl mx-auto mb-10">
              Connect your wallet to authenticate your Heritage identity and participate in the curation governance.
            </p>
            
            <div className="p-[1px] bg-gradient-to-b from-gold/50 to-transparent rounded-xl shadow-lg">
              <div className="bg-background rounded-xl p-1">
                <ConnectButton 
                  client={client}
                  theme="dark"
                  connectButton={{
                    label: "Connect Heritage Wallet",
                  }}
                  connectModal={{
                    title: "Matrix Access Portal",
                    showThirdwebBranding: false,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="pt-32 pb-16 px-6 lg:px-12 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-gold" />
            <span className="text-[10px] tracking-[0.4em] text-gold uppercase font-sans font-bold">
              Curation Protocol
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-ivory leading-[0.95] text-balance">
            Heritage Matrix
          </h1>
          <p className="text-muted-foreground mt-4 font-sans max-w-2xl">
            The 51/49 Governance engine. Authenticate assets, verify provenance, and participate in community-led luxury curation.
          </p>
        </div>

        {/* Matrix Stats - Ultra Mobile Optimized */}
        <div className="space-y-3 mb-8">
          {/* Identity Card - Full Width */}
          <div className="border border-white/10 bg-card/30 p-3 rounded-xl hover:border-gold/30 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wallet className="w-3 h-3 text-gold" />
                <p className="text-[8px] tracking-[0.2em] text-muted-foreground uppercase font-sans">
                  Identity
                </p>
              </div>
              <p className="text-xs sm:text-sm font-mono text-ivory truncate">
                {account?.address ? `${account.address.slice(0, 4)}...${account.address.slice(-4)}` : "0x1234...5678"}
              </p>
            </div>
          </div>
          
          {/* Stats Grid - Compact 3 cards */}
          <div className="grid grid-cols-3 gap-2">
            <div className="border border-white/10 bg-card/30 p-3 rounded-xl hover:border-gold/30 transition-colors">
              <div className="flex flex-col items-center text-center">
                <Grid3x3 className="w-3 h-3 text-blue-400 mb-2" />
                <p className="text-[8px] tracking-[0.1em] text-muted-foreground uppercase font-sans mb-1">
                  Assets
                </p>
                <p className="text-base sm:text-lg font-serif text-ivory">47</p>
              </div>
            </div>
            
            <div className="border border-gold/20 bg-card/30 p-3 rounded-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-12 h-12 bg-gold/5 rounded-full blur-2xl -mr-4 -mt-4" />
              <div className="flex flex-col items-center text-center relative z-10">
                <Shield className="w-3 h-3 text-gold mb-2" />
                <p className="text-[8px] tracking-[0.1em] text-gold uppercase font-sans font-bold mb-1">
                  Verified
                </p>
                <p className="text-base sm:text-lg font-serif text-ivory">23</p>
              </div>
            </div>

            <div className="border border-green-500/20 bg-card/30 p-3 rounded-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-12 h-12 bg-green-500/5 rounded-full blur-2xl -mr-4 -mt-4" />
              <div className="flex flex-col items-center text-center relative z-10">
                <TrendingUp className="w-3 h-3 text-green-400 mb-2" />
                <p className="text-[8px] tracking-[0.1em] text-green-400 uppercase font-sans font-bold mb-1">
                  Stakes
                </p>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <p className="text-base sm:text-lg font-serif text-green-400">12</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Curation Dashboard Content - Simplified */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-3">
            <Gem className="w-4 h-4 text-gold" />
            <h2 className="font-serif text-lg sm:text-xl text-ivory">Curation</h2>
          </div>

          <CurationDashboard userAddress={account?.address || ""} />
        </div>

        {/* Protocol Information - Mobile Simplified */}
        <div className="border border-white/10 bg-card/30 p-4 rounded-xl">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
              <Info className="w-4 h-4 text-gold" />
            </div>
            <div className="flex-1">
              <p className="text-[8px] tracking-[0.2em] text-gold uppercase font-sans mb-3">
                Protocol
              </p>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-ivory font-medium mb-2">Governance</p>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-gold rounded-full flex-shrink-0" />
                      51% community approval
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-gold rounded-full flex-shrink-0" />
                      Professional verification
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs text-ivory font-medium mb-2">Trading</p>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-gold rounded-full flex-shrink-0" />
                      Fractional trading
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-gold rounded-full flex-shrink-0" />
                      Liquidity pools
                    </li>
                  </ul>
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