"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useActiveAccount, useWalletBalance, ConnectButton } from "thirdweb/react"
import { client, ethereum } from "@/lib/client" // Ensure client is properly exported from this path
import { Wallet, TrendingUp, Shield, Gem } from "lucide-react"

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
  
  // Guard the hook: passes client securely and waits for account
  const { data: balance, isLoading: balanceLoading } = useWalletBalance({
    client: client,
    address: account?.address,
    chain: ethereum,
  })

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

  // Safe loading state before browser takes over
  if (!mounted) {
    return (
      <main className="min-h-screen bg-background text-foreground flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-gold font-serif text-xl tracking-widest uppercase text-[10px]">Authenticating Vault...</div>
        </div>
        <Footer />
      </main>
    )
  }

  // 3. Authenticated Check - CRASH FIXED HERE (Added client={client})
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
            
            {/* The secure Thirdweb connection portal */}
            <div className="p-[1px] bg-gradient-to-b from-gold/50 to-transparent rounded-xl shadow-lg">
              <div className="bg-background rounded-xl p-1">
                <ConnectButton 
                  client={client} // The critical fix
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

  // 4. The Active "Super Smart" Dashboard
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

        {/* Wealth Engine Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="border border-white/10 bg-card/30 backdrop-blur-md p-6 rounded-xl hover:border-gold/30 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <Wallet className="w-4 h-4 text-gold" />
              <p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase font-sans">
                Identity
              </p>
            </div>
            <p className="text-lg font-mono text-ivory truncate">
              {account.address.slice(0, 8)}...{account.address.slice(-6)}
            </p>
          </div>
          
          <div className="border border-white/10 bg-card/30 backdrop-blur-md p-6 rounded-xl hover:border-gold/30 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <img src="/icons/eth.svg" alt="ETH" className="w-4 h-4 opacity-70" onError={(e) => e.currentTarget.style.display = 'none'} />
              <p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase font-sans">
                Liquid Balance
              </p>
            </div>
            <p className="text-2xl font-serif text-ivory">
              {balanceLoading ? "..." : balance?.displayValue.slice(0, 5) || "0.00"} <span className="text-sm text-muted-foreground font-sans">ETH</span>
            </p>
          </div>
          
          <div className="border border-gold/20 bg-card/30 backdrop-blur-md p-6 rounded-xl shadow-[0_0_15px_rgba(212,175,55,0.05)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-3xl -mr-10 -mt-10" />
            <div className="flex items-center gap-3 mb-4 relative z-10">
              <Shield className="w-4 h-4 text-gold" />
              <p className="text-[10px] tracking-[0.2em] text-gold uppercase font-sans font-bold">
                Vaulted Value
              </p>
            </div>
            <p className="text-3xl font-serif text-ivory tracking-tight relative z-10">$2,132,000</p>
          </div>

          <div className="border border-green-500/20 bg-card/30 backdrop-blur-md p-6 rounded-xl shadow-[0_0_15px_rgba(34,197,94,0.05)] relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-3xl -mr-10 -mt-10" />
            <div className="flex items-center gap-3 mb-4 relative z-10">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <p className="text-[10px] tracking-[0.2em] text-green-400 uppercase font-sans font-bold">
                Accrued Yield
              </p>
            </div>
            <p className="text-3xl font-serif text-green-400 tracking-tight relative z-10 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              ${heritageAssets.reduce((total, asset) => {
                // Sanitize the value string (remove $, commas, etc.)
                const cleanValue = parseFloat(asset.value.replace(/[^0-9.]/g, '')) || 0;
                const assetYield = (cleanValue * (asset.yield / 100));
                return total + assetYield;
              }, 0).toLocaleString(undefined, { 
                minimumFractionDigits: 2, 
                maximumFractionDigits: 2 
              })}
            </p>
          </div>
        </div>

        {/* Heritage Asset Ledger */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
            <Gem className="w-5 h-5 text-gold" />
            <h2 className="font-serif text-2xl text-ivory">Secured Holdings</h2>
            <span className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase font-sans ml-auto bg-white/5 px-3 py-1 rounded-full">
              {heritageAssets.length} Active Lots
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {heritageAssets.map((asset) => (
              <div
                key={asset.id}
                className="group border border-white/10 bg-card/40 backdrop-blur-md overflow-hidden hover:border-gold/40 hover:bg-card/60 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] transition-all duration-500 rounded-2xl relative"
              >
                {/* 51/49 Authenticity Badge */}
                <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md border border-gold/30 px-3 py-1 rounded-full flex items-center gap-2">
                  <Shield className="w-3 h-3 text-gold" />
                  <span className="text-[8px] tracking-widest text-gold uppercase font-bold">Verified Vaulted</span>
                </div>

                <div className="flex flex-col sm:flex-row h-full">
                  {/* Image/Visualizer Container */}
                  <div className="relative w-full sm:w-48 h-48 sm:h-auto flex-shrink-0 bg-black border-b sm:border-b-0 sm:border-r border-white/10 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-gold/20 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground font-sans text-xs tracking-[0.2em] uppercase z-10">
                      [ {asset.category} ]
                    </div>
                  </div>
                  
                  {/* Ledger Details */}
                  <div className="p-6 flex-1 flex flex-col justify-between relative z-10">
                    <div>
                      <h3 className="font-serif text-xl text-ivory mb-6 leading-tight group-hover:text-gold transition-colors duration-300">
                        {asset.name}
                      </h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-white/5">
                          <div>
                            <p className="text-[9px] tracking-[0.2em] text-muted-foreground uppercase font-sans mb-1">
                              Fractions Held
                            </p>
                            <p className="text-sm text-ivory font-mono">{asset.tokenAmount}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-[9px] tracking-[0.2em] text-muted-foreground uppercase font-sans mb-1">
                              Current Value
                            </p>
                            <p className="text-sm text-ivory font-mono">{asset.value}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-[9px] tracking-[0.2em] text-muted-foreground uppercase font-sans mb-1">
                              Live Yield
                            </p>
                            <p className="text-sm text-green-400 font-mono flex items-center gap-1">
                              <TrendingUp className="w-3 h-3" />
                              +{asset.yield}% APY
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-[9px] tracking-[0.2em] text-muted-foreground uppercase font-sans mb-1">
                              Syndicate Share
                            </p>
                            <p className="text-sm text-gold font-mono">{asset.share}%</p>
                          </div>
                        </div>
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
          <div className="border border-white/10 bg-card/30 backdrop-blur-md p-16 text-center rounded-2xl">
            <Gem className="w-12 h-12 text-gold/50 mx-auto mb-6" />
            <h3 className="font-serif text-2xl text-ivory mb-3">Your Vault is Empty</h3>
            <p className="text-muted-foreground font-sans text-sm mb-8 max-w-md mx-auto">
              You haven't acquired any fractional physical assets yet. Start building your Heritage portfolio by participating in the active curation market.
            </p>
            <a
              href="/trade"
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