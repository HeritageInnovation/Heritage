"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useActiveAccount, ConnectButton } from "thirdweb/react"
import { client } from "@/lib/client"
import { Shield, Wallet, TrendingUp, Landmark, Gem } from "lucide-react"

// 1. "Super Smart" Asset Interface with Yield and Share
interface Asset {
  id: string
  name: string
  category: string
  tokenAmount: string
  value: string
  image: string
  tokenAddress: string
  yield: number // APY percentage
  share: number // Ownership percentage of the 49% syndicate
}

export default function ProfilePage() {
  const [mounted, setMounted] = useState(false)
  const account = useActiveAccount()

  // 2. Prevent Hydration Mismatch & Premature SDK Execution
  useEffect(() => {
    setMounted(true)
  }, [])

  // Mock Heritage assets (Acting as the Digital Vault)
  const heritageAssets: Asset[] = [
    {
      id: "1",
      name: "Sovereign Gold Reserve",
      category: "Precious Metals",
      tokenAmount: "1,240",
      value: "$1,240,000",
      image: "/images/lot-01.jpg",
      tokenAddress: "0xGold",
      yield: 12.4,
      share: 2.5
    },
    {
      id: "2",
      name: "Patek Philippe Ref. 5711",
      category: "Horological Assets",
      tokenAmount: "892",
      value: "$892,000",
      image: "/images/lot-02.jpg",
      tokenAddress: "0xPatek",
      yield: 8.7,
      share: 1.8
    },
  ]

  // Pre-calculate yield to avoid expensive calculations on every render
  const totalYield = heritageAssets.reduce((total, asset) => {
    const cleanValue = parseFloat(asset.value.replace(/[^0-9.]/g, '')) || 0;
    const assetYield = (cleanValue * (asset.yield / 100));
    return total + assetYield;
  }, 0);

  // 3. Authentication Check with ConnectButton
  if (!mounted) {
    return (
      <main className="min-h-screen bg-background text-foreground flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mb-6 mx-auto rounded-full border-2 border-gold/20 flex items-center justify-center bg-gold/5 shadow-[0_0_30px_rgba(212,175,55,0.1)]">
              <Wallet className="w-8 h-8 text-gold animate-pulse" />
            </div>
            <h2 className="font-serif text-2xl text-ivory mb-3">Initializing Vault</h2>
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
              <Wallet className="w-10 h-10 text-gold" />
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-ivory leading-[0.95] text-balance mb-4">
              Enter the Vault
            </h1>
            <p className="text-xl text-muted-foreground font-sans max-w-2xl mx-auto mb-10">
              Connect your wallet to authenticate your Heritage identity and manage your physical fractional assets.
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
                    title: "Heritage Vault Login",
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
              Private Portfolio
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-ivory leading-[0.95] text-balance">
            Your Heritage
          </h1>
          <p className="text-muted-foreground mt-4 font-sans max-w-2xl">
            Monitor your fractional real-world assets, syndicate ownership, and active yield performance.
          </p>
        </div>

        {/* Wealth Engine Stats - Mobile Optimized */}
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
                <div className="w-3 h-3 rounded-full bg-blue-500 mb-2" />
                <p className="text-[8px] tracking-[0.1em] text-muted-foreground uppercase font-sans mb-1">
                  Balance
                </p>
                <p className="text-base sm:text-lg font-serif text-ivory">2.45</p>
                <p className="text-xs text-muted-foreground font-sans">ETH</p>
              </div>
            </div>
            
            <div className="border border-gold/20 bg-card/30 p-3 rounded-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-12 h-12 bg-gold/5 rounded-full blur-2xl -mr-4 -mt-4" />
              <div className="flex flex-col items-center text-center relative z-10">
                <Shield className="w-3 h-3 text-gold mb-2" />
                <p className="text-[8px] tracking-[0.1em] text-gold uppercase font-sans font-bold mb-1">
                  Vaulted
                </p>
                <p className="text-base sm:text-lg font-serif text-ivory">$2.13M</p>
              </div>
            </div>

            <div className="border border-green-500/20 bg-card/30 p-3 rounded-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-12 h-12 bg-green-500/5 rounded-full blur-2xl -mr-4 -mt-4" />
              <div className="flex flex-col items-center text-center relative z-10">
                <TrendingUp className="w-3 h-3 text-green-400 mb-2" />
                <p className="text-[8px] tracking-[0.1em] text-green-400 uppercase font-sans font-bold mb-1">
                  Yield
                </p>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <p className="text-base sm:text-lg font-serif text-green-400">${(totalYield / 1000).toFixed(1)}k</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Heritage Asset Ledger - Mobile Simplified */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-3">
            <Gem className="w-4 h-4 text-gold" />
            <h2 className="font-serif text-lg sm:text-xl text-ivory">Holdings</h2>
            <span className="text-[8px] tracking-[0.2em] text-muted-foreground uppercase font-sans ml-auto bg-white/5 px-2 py-1 rounded-full">
              {heritageAssets.length} Assets
            </span>
          </div>

          <div className="space-y-3">
            {heritageAssets.map((asset) => (
              <div
                key={asset.id}
                className="border border-white/10 bg-card/40 overflow-hidden hover:border-gold/40 hover:bg-card/60 transition-all duration-500 rounded-xl relative"
              >
                {/* Compact Badge */}
                <div className="absolute top-2 right-2 z-20 bg-black/60 border border-gold/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Shield className="w-2 h-2 text-gold" />
                  <span className="text-[6px] tracking-widest text-gold uppercase font-bold">Vaulted</span>
                </div>

                <div className="flex items-center gap-3 p-3">
                  {/* Image */}
                  <div className="relative w-16 h-16 flex-shrink-0 bg-black rounded-lg overflow-hidden border border-white/10">
                    <div className="absolute inset-0 bg-gradient-to-tr from-gold/20 via-transparent to-transparent opacity-50" />
                    <img 
                      src={asset.image} 
                      alt={asset.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-sm text-ivory mb-2 leading-tight truncate group-hover:text-gold transition-colors duration-300">
                      {asset.name}
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <p className="text-[7px] tracking-[0.2em] text-muted-foreground uppercase font-sans mb-0.5">
                          Fractions
                        </p>
                        <p className="text-ivory font-mono">{asset.tokenAmount}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[7px] tracking-[0.2em] text-muted-foreground uppercase font-sans mb-0.5">
                          Value
                        </p>
                        <p className="text-ivory font-mono">{asset.value}</p>
                      </div>
                      <div>
                        <p className="text-[7px] tracking-[0.2em] text-muted-foreground uppercase font-sans mb-0.5">
                          Yield
                        </p>
                        <p className="text-green-400 font-mono flex items-center gap-0.5">
                          <TrendingUp className="w-2 h-2" />
                          +{asset.yield}%
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[7px] tracking-[0.2em] text-muted-foreground uppercase font-sans mb-0.5">
                          Share
                        </p>
                        <p className="text-gold font-mono">{asset.share}%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {heritageAssets.length === 0 && (
          <div className="border border-white/10 bg-card/30 p-16 text-center rounded-2xl">
            <Gem className="w-12 h-12 text-gold/50 mx-auto mb-6" />
            <h3 className="font-serif text-2xl text-ivory mb-3">Your Vault is Empty</h3>
            <p className="text-muted-foreground font-sans text-sm mb-8 max-w-md mx-auto">
              You haven't acquired any fractional physical assets yet. Start building your Heritage portfolio by participating in the active curation market.
            </p>
            <a
              href="/exchange"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-black text-[10px] tracking-[0.3em] font-bold uppercase hover:bg-ivory transition-all duration-300 rounded-sm"
            >
              Enter Market
            </a>
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}