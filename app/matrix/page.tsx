"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CurationDashboard } from "@/components/Curation/CurationDashboard"
import { useActiveAccount, ConnectButton } from "thirdweb/react"
import { client } from "@/lib/client"
import { Shield, Info, Plus, Lock } from "lucide-react"

export default function MatrixPage() {
  const [mounted, setMounted] = useState(false)
  const [userRole, setUserRole] = useState<"participant" | "professional" | "investor">("participant")
  
  // Super Smart Logic: Dynamically fetch the connected identity
  const account = useActiveAccount()
  const userAddress = account?.address || null

  useEffect(() => { setMounted(true) }, [])

  if (!mounted) return null

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="pt-32 pb-16 px-6 lg:px-12 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-gold" />
            <span className="text-[10px] tracking-[0.4em] text-gold uppercase font-sans font-bold">
              Protocol Layer
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-ivory leading-[0.95] text-balance">
            Curation Matrix
          </h1>
          <p className="text-muted-foreground mt-4 font-sans max-w-2xl">
            The 51/49 Governance engine. Authenticate assets, verify provenance, and participate in community-led luxury curation.
          </p>
        </div>

        {/* User Role Selector */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-gold" />
            <span className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase font-sans">
              Select Your Role
            </span>
          </div>
          
          <div className="bg-black/50 backdrop-blur-xl border border-white/10 p-1.5 rounded-2xl flex items-center gap-1">
            {(['participant', 'professional', 'investor'] as const).map((role) => (
              <button
                key={role}
                onClick={() => setUserRole(role)}
                className={`px-6 py-3 rounded-xl text-[10px] tracking-[0.3em] uppercase transition-all duration-300 whitespace-nowrap ${
                  userRole === role 
                    ? 'bg-gold/10 border border-gold/30 text-gold font-bold shadow-[0_0_15px_rgba(212,175,55,0.15)]' 
                    : 'text-muted-foreground border border-transparent hover:text-ivory hover:bg-white/5'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* Matrix Dashboard Body */}
        <div className="relative">
          {!userAddress ? (
            // Gated View if wallet is not connected
            <div className="border border-white/10 bg-card/30 p-16 text-center rounded-2xl">
              <Lock className="w-12 h-12 text-muted-foreground/30 mx-auto mb-6" />
              <h3 className="font-serif text-2xl text-ivory mb-3">Identity Verification Required</h3>
              <p className="text-muted-foreground font-sans text-sm mb-8 max-w-md mx-auto">
                Please connect your wallet to access the Matrix, stake USDT, and review active provenance mandates.
              </p>
              <div className="max-w-xs mx-auto">
                <div className="p-[1px] bg-gradient-to-b from-gold/50 to-transparent rounded-xl shadow-lg">
                  <div className="bg-background rounded-xl p-1">
                    <ConnectButton 
                      client={client}
                      theme="dark"
                      connectButton={{
                        label: "Connect Heritage Wallet",
                        style: {
                          width: "100%",
                          height: "48px",
                          fontSize: "14px",
                          fontWeight: "600",
                          letterSpacing: "0.05em",
                          textTransform: "uppercase",
                          borderRadius: "8px",
                          background: "linear-gradient(to bottom, rgba(212, 175, 55, 0.1), transparent)",
                          border: "1px solid rgba(212, 175, 55, 0.3)",
                          color: "#D4AF37"
                        }
                      }}
                      connectModal={{
                        title: "Matrix Access",
                        showThirdwebBranding: false,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Connected View
            <div className="animate-in fade-in duration-1000">
              <CurationDashboard userAddress={userAddress} userRole={userRole} />
            </div>
          )}
        </div>

        {/* Protocol Footer Note */}
        <div className="mt-12 border border-white/10 bg-card/30 p-6 rounded-2xl flex items-start gap-4 transition-all hover:border-gold/30">
          <Info className="w-5 h-5 text-gold shrink-0 mt-0.5" />
          <div>
            <p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase font-sans mb-2">
              <span className="text-ivory font-bold">Mandate Protocol:</span>
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed font-sans">
              All submissions in the Matrix are subject to the Heritage 51% Governance mandate. Assets must pass Participant staking (USDT) and Professional provenance verification before being admitted to the secondary market.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}