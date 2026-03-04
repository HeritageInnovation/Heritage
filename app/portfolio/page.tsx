"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useActiveAccount, useWalletBalance } from "thirdweb/react"
import { client, ethereum } from "@/lib/client"
import { Wallet, TrendingUp, Shield, Gem } from "lucide-react"

interface Asset {
  id: string
  name: string
  category: string
  tokenAmount: string
  value: string
  image: string
  tokenAddress: string
}

export default function ProfilePage() {
  const account = useActiveAccount()
  const { data: balance, isLoading: balanceLoading } = useWalletBalance({
    client: client,
    address: account?.address,
    chain: ethereum,
    tokenAddress: undefined, // ETH
  })
  
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Mock Heritage assets (would come from NFT contract or API)
  const heritageAssets: Asset[] = [
    {
      id: "1",
      name: "Sovereign Gold Reserve",
      category: "Precious Metals",
      tokenAmount: "1,240",
      value: "$1,240,000",
      image: "/images/lot-01.jpg",
      tokenAddress: "0xGold",
    },
    {
      id: "2",
      name: "Patek Philippe Ref. 5711",
      category: "Horological Assets",
      tokenAmount: "892",
      value: "$892,000",
      image: "/images/lot-02.jpg",
      tokenAddress: "0xPatek",
    },
  ]

  if (!mounted) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="pt-32 pb-16 px-6 lg:px-12 flex items-center justify-center">
          <div className="animate-pulse text-gold font-serif text-xl">Loading Profile...</div>
        </div>
        <Footer />
      </main>
    )
  }

  if (!account) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="pt-32 pb-16 px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="text-center">
            <div className="mb-8">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full border-2 border-gold/20 flex items-center justify-center">
                <Wallet className="w-10 h-10 text-gold" />
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-ivory leading-[0.95] text-balance mb-4">
                Connect Your Wallet
              </h1>
              <p className="text-xl text-muted-foreground font-sans max-w-2xl mx-auto mb-8">
                Connect your wallet to view your Heritage Assets and manage your fractional real world assets.
              </p>
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
            <span className="text-[10px] tracking-[0.4em] text-gold uppercase font-sans">
              Portfolio
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-ivory leading-[0.95] text-balance">
            Your Heritage
          </h1>
          <p className="text-muted-foreground mt-4 font-sans max-w-2xl">
            Manage your fractional real world assets and track your portfolio performance.
          </p>
        </div>

        {/* Wallet Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="border border-border bg-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <Wallet className="w-5 h-5 text-gold" />
              <p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase font-sans">
                Wallet Address
              </p>
            </div>
            <p className="text-lg font-mono text-ivory truncate">
              {account.address.slice(0, 8)}...{account.address.slice(-6)}
            </p>
          </div>
          
          <div className="border border-border bg-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-5 h-5 text-gold" />
              <p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase font-sans">
                ETH Balance
              </p>
            </div>
            <p className="text-2xl font-serif text-ivory">
              {balanceLoading ? "Loading..." : balance?.displayValue || "0.00"} ETH
            </p>
          </div>
          
          <div className="border border-border bg-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-5 h-5 text-gold" />
              <p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase font-sans">
                Portfolio Value
              </p>
            </div>
            <p className="text-2xl font-serif text-gold">$2,132,000</p>
          </div>
        </div>

        {/* Heritage Assets */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-8">
            <Gem className="w-5 h-5 text-gold" />
            <h2 className="font-serif text-2xl text-ivory">Your Assets</h2>
            <span className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase font-sans ml-auto">
              {heritageAssets.length} Items
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {heritageAssets.map((asset) => (
              <div
                key={asset.id}
                className="group border border-border bg-card/50 backdrop-blur-sm overflow-hidden hover:bg-card/70 transition-all duration-500 rounded-lg"
              >
                <div className="flex">
                  {/* Image */}
                  <div className="relative w-32 h-32 flex-shrink-0 bg-muted">
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground font-sans text-xs">
                      {asset.category}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-5 flex-1">
                    <p className="text-[9px] tracking-[0.3em] text-gold uppercase mb-1 font-sans">
                      {asset.category}
                    </p>
                    <h3 className="font-serif text-lg text-ivory mb-3">
                      {asset.name}
                    </h3>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[9px] tracking-[0.2em] text-muted-foreground uppercase font-sans">
                          Tokens
                        </p>
                        <p className="text-sm text-ivory font-sans">{asset.tokenAmount}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[9px] tracking-[0.2em] text-muted-foreground uppercase font-sans">
                          Value
                        </p>
                        <p className="text-sm text-gold font-sans">{asset.value}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Empty State if no assets */}
        {heritageAssets.length === 0 && (
          <div className="border border-border bg-card p-12 text-center">
            <Gem className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-serif text-xl text-ivory mb-2">No Assets Yet</h3>
            <p className="text-muted-foreground font-sans text-sm mb-6">
              Start building your Heritage portfolio by trading fractional luxury assets.
            </p>
            <a
              href="/#lots"
              className="inline-block px-6 py-3 border border-gold/40 text-gold text-[10px] tracking-[0.2em] uppercase hover:bg-gold hover:text-background transition-all duration-300 font-sans"
            >
              Browse Lots
            </a>
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
