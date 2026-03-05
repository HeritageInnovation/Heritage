"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CurationDashboard } from "@/components/Curation/CurationDashboard"
import { Shield, Info } from "lucide-react"

export default function MatrixPage() {
  const [mounted, setMounted] = useState(false)
  const [userRole, setUserRole] = useState<"participant" | "professional" | "investor">("participant")

  useEffect(() => { setMounted(true) }, [])

  if (!mounted) return null

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-12 max-w-[1600px] mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/5 pb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-gold" />
              <span className="text-[10px] tracking-[0.4em] text-gold uppercase font-bold">Protocol Layer</span>
            </div>
            <h1 className="font-serif text-5xl lg:text-6xl text-ivory leading-none">Curation Matrix</h1>
            <p className="text-muted-foreground mt-4 max-w-xl font-sans text-sm lg:text-base">
              The 51/49 Governance engine. Authenticate assets, verify provenance, and participate in community-led luxury curation.
            </p>
          </div>

          {/* View Switcher - Standalone UI */}
          <div className="bg-white/5 border border-white/10 p-1.5 rounded-2xl flex items-center gap-1 self-start md:self-auto">
            {(['participant', 'professional', 'investor'] as const).map((role) => (
              <button
                key={role}
                onClick={() => setUserRole(role)}
                className={`px-5 py-2.5 rounded-xl text-[10px] tracking-widest uppercase transition-all whitespace-nowrap ${
                  userRole === role 
                    ? 'bg-gold text-black font-bold shadow-[0_0_20px_rgba(212,175,55,0.3)]' 
                    : 'text-muted-foreground hover:text-white hover:bg-white/5'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* Matrix Dashboard Body */}
        <div className="relative">
          <div className="absolute inset-0 bg-gold/5 blur-[120px] rounded-full -z-10 opacity-30" />
          <CurationDashboard userAddress="0x123...7890" userRole={userRole} />
        </div>

        {/* Protocol Footer Note */}
        <div className="mt-12 p-6 border border-white/5 bg-white/[0.02] rounded-2xl flex items-start gap-4">
          <Info className="w-5 h-5 text-gold shrink-0 mt-0.5" />
          <p className="text-[11px] text-muted-foreground leading-relaxed uppercase tracking-wider">
            All submissions in the Matrix are subject to Heritage 51% Governance mandate. Assets must pass Participant staking (USDT) and Professional provenance verification before being admitted to the secondary market.
          </p>
        </div>
      </div>

      <Footer />
    </main>
  )
}
