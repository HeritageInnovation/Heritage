"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CurationDashboard } from "@/components/Curation/CurationDashboard"
import { useActiveAccount } from "thirdweb/react"
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
    <main className="min-h-screen bg-[#050505] text-foreground selection:bg-gold/30 selection:text-gold relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold/5 blur-[150px] rounded-full pointer-events-none -z-10" />
      
      <Navbar />

      <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-12 max-w-[1600px] mx-auto min-h-[90vh] flex flex-col">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 border-b border-white/5 pb-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4 animate-in fade-in slide-in-from-left-4 duration-700">
              <div className="w-8 h-[1px] bg-gold shadow-[0_0_8px_#D4AF37]" />
              <span className="text-[10px] tracking-[0.5em] text-gold uppercase font-bold">Protocol Layer</span>
            </div>
            <h1 className="font-serif text-5xl lg:text-7xl text-ivory leading-none tracking-tighter mb-6">
              Curation Matrix
            </h1>
            <p className="text-[11px] text-muted-foreground leading-relaxed uppercase tracking-[0.2em] opacity-80">
              The 51/49 Governance engine. Authenticate assets, verify provenance, and participate in community-led luxury curation.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* View Switcher - Glassmorphism UI */}
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

            {/* The "Cooler" Submit Asset Button */}
            <button className="group relative flex items-center gap-3 px-8 py-3.5 bg-black border border-gold/40 hover:border-gold rounded-full overflow-hidden transition-all duration-500 shrink-0">
              {/* Animated background sweep */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-gold/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              
              <Plus className="w-4 h-4 text-gold group-hover:rotate-90 transition-transform duration-500 z-10" />
              <span className="text-[10px] tracking-[0.4em] text-gold uppercase font-bold z-10">
                Submit Asset
              </span>
            </button>
          </div>
        </div>

        {/* Matrix Dashboard Body */}
        <div className="relative flex-grow flex flex-col">
          {!userAddress ? (
            // Gated View if wallet is not connected
            <div className="flex-grow flex flex-col items-center justify-center border border-white/5 bg-white/[0.01] rounded-3xl p-12 text-center backdrop-blur-sm">
              <Lock className="w-12 h-12 text-muted-foreground/30 mb-6" />
              <h3 className="font-serif text-2xl text-ivory mb-2">Identity Verification Required</h3>
              <p className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase max-w-md mx-auto leading-loose">
                Please connect your wallet via the navigation bar to access the Matrix, stake USDT, and review active provenance mandates.
              </p>
            </div>
          ) : (
            // Connected View
            <div className="animate-in fade-in duration-1000">
              <CurationDashboard userAddress={userAddress} userRole={userRole} />
            </div>
          )}
        </div>

        {/* Protocol Footer Note */}
        <div className="mt-12 p-6 border border-white/5 bg-black/40 backdrop-blur-md rounded-2xl flex items-start gap-4 transition-all hover:border-white/10">
          <Info className="w-5 h-5 text-gold shrink-0 mt-0.5" />
          <p className="text-[10px] text-muted-foreground leading-relaxed uppercase tracking-[0.2em]">
            <span className="text-ivory font-bold">Mandate Protocol:</span> All submissions in the Matrix are subject to the Heritage 51% Governance mandate. Assets must pass Participant staking (USDT) and Professional provenance verification before being admitted to the secondary market.
          </p>
        </div>
      </div>

      <Footer />
    </main>
  )
}