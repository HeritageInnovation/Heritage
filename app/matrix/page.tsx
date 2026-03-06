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

        {/* Matrix Stats - Consistent with Vault */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="border border-white/10 bg-card/30 p-6 rounded-xl hover:border-gold/30 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <Wallet className="w-4 h-4 text-gold" />
              <p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase font-sans">
                Identity
              </p>
            </div>
            <p className="text-lg font-mono text-ivory truncate">
              {account?.address ? `${account.address.slice(0, 8)}...${account.address.slice(-6)}` : "0x1234...5678"}
            </p>
          </div>
          
          <div className="border border-white/10 bg-card/30 p-6 rounded-xl hover:border-gold/30 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <Grid3x3 className="w-4 h-4 text-blue-400" />
              <p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase font-sans">
                Total Assets
              </p>
            </div>
            <p className="text-2xl font-serif text-ivory">
              47 <span className="text-sm text-muted-foreground font-sans">Lots</span>
            </p>
          </div>
          
          <div className="border border-gold/20 bg-card/30 p-6 rounded-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-3xl -mr-10 -mt-10" />
            <div className="flex items-center gap-3 mb-4 relative z-10">
              <Shield className="w-4 h-4 text-gold" />
              <p className="text-[10px] tracking-[0.2em] text-gold uppercase font-sans font-bold">
                Verified
              </p>
            </div>
            <p className="text-3xl font-serif text-ivory tracking-tight relative z-10">23</p>
          </div>

          <div className="border border-green-500/20 bg-card/30 p-6 rounded-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-3xl -mr-10 -mt-10" />
            <div className="flex items-center gap-3 mb-4 relative z-10">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <p className="text-[10px] tracking-[0.2em] text-green-400 uppercase font-sans font-bold">
                Active Stakes
              </p>
            </div>
            <p className="text-3xl font-serif text-green-400 tracking-tight relative z-10 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              12
            </p>
          </div>
        </div>

        {/* Curation Dashboard Content */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
            <Gem className="w-5 h-5 text-gold" />
            <h2 className="font-serif text-2xl text-ivory">Active Curation</h2>
            <span className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase font-sans ml-auto bg-white/5 px-3 py-1 rounded-full">
              Governance Mode
            </span>
          </div>

          <CurationDashboard userAddress={account?.address || ""} />
        </div>

        {/* Protocol Information - Consistent with Vault styling */}
        <div className="border border-white/10 bg-card/30 p-8 rounded-2xl">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
              <Info className="w-5 h-5 text-gold" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] tracking-[0.2em] text-gold uppercase font-sans mb-4">
                Protocol Mandate
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <p className="text-sm text-ivory font-medium">Governance Requirements</p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <div className="w-1 h-1 bg-gold rounded-full mt-2 flex-shrink-0" />
                      51% community approval for asset entry
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1 h-1 bg-gold rounded-full mt-2 flex-shrink-0" />
                      Professional verification ensures authenticity
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1 h-1 bg-gold rounded-full mt-2 flex-shrink-0" />
                      USDT staking required for participation
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <p className="text-sm text-ivory font-medium">Trading Protocol</p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <div className="w-1 h-1 bg-gold rounded-full mt-2 flex-shrink-0" />
                      Fractional trading post-verification
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1 h-1 bg-gold rounded-full mt-2 flex-shrink-0" />
                      Liquidity pools enable seamless exchange
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1 h-1 bg-gold rounded-full mt-2 flex-shrink-0" />
                      Real-time provenance tracking
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