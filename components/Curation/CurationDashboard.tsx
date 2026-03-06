"use client"

import { useState, useEffect } from "react"
import { sanityClient } from "@/lib/sanity"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Zap, ShieldCheck, ShoppingCart, TrendingUp, Search, Plus } from "lucide-react"

type Stage = "discovery" | "verification" | "acquisition"

export function CurationDashboard({ userAddress }: { userAddress: string }) {
  // 1. All users start at the 'Verification' stage (Professional View)
  const [activeStage, setActiveStage] = useState<Stage>("verification")
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // 2. Optimized Fetching Logic
  useEffect(() => {
    async function fetchPipeline() {
      setLoading(true)
      try {
        // Fetching based on stage to keep the UI clean
        const query = activeStage === "acquisition" 
          ? `*[_type == "luxuryItem"] | order(featured desc)` 
          : `*[_type == "curationSubmission"] | order(submittedAt desc)`
        const data = await sanityClient.fetch(query)
        setItems(data)
      } finally {
        setLoading(false)
      }
    }
    fetchPipeline()
  }, [activeStage])

  // All stages are now visible to everyone
  const stages = [
    { id: "discovery", label: "Discovery" },
    { id: "verification", label: "Verification" },
    { id: "acquisition", label: "Acquisition" },
  ]

  return (
    <div className="w-full bg-[#050505] text-[#F4F4F1] antialiased">
      
      {/* 1. Sub-Header: Minimalist Metadata */}
      <div className="flex justify-between items-center py-4 border-b border-white/5">
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="rounded-none border-gold/20 text-gold text-[9px] uppercase px-3 py-1 bg-gold/5 tracking-[0.2em]">
             Professional Oversight Mode
          </Badge>
          <span className="text-[10px] font-mono text-white/20 hidden sm:inline">
            Node: {userAddress.slice(0, 10)}...
          </span>
        </div>
        
        {activeStage === "discovery" && (
          <Button variant="ghost" size="sm" className="text-gold text-[10px] uppercase tracking-widest hover:bg-gold/10">
            <Plus className="w-3 h-3 mr-2" /> Submit New Asset
          </Button>
        )}
      </div>

      {/* 2. Stage Navigation: MatrixPage Button Style */}
      <div className="bg-black/50 backdrop-blur-xl border border-white/10 p-1.5 rounded-2xl flex items-center gap-1 w-full">
        {stages.map((stage) => (
          <button
            key={stage.id}
            onClick={() => setActiveStage(stage.id as Stage)}
            className={`flex-1 px-4 py-3 rounded-xl text-[10px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.3em] uppercase transition-all duration-300 ${
              activeStage === stage.id 
                ? 'bg-gold/10 border border-gold/30 text-gold font-bold shadow-[0_0_15px_rgba(212,175,55,0.15)]' 
                : 'text-white/20 border border-transparent hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              {stage.label}
              {activeStage === stage.id && <Zap className="w-3 h-3 text-gold fill-gold animate-pulse" />}
            </span>
          </button>
        ))}
      </div>

      {/* 3. Unified Inventory: Sotheby's Catalog Style */}
      <div className="min-h-[600px]">
        {loading ? (
          <div className="py-40 text-center">
            <div className="inline-block w-8 h-[1px] bg-gold animate-bounce mb-4" />
            <p className="text-[10px] uppercase tracking-[0.5em] text-gold/40">Synchronizing Matrix</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {items.map((item, idx) => (
              <div key={item._id} className="group grid grid-cols-12 gap-6 items-center py-8 hover:bg-white/[0.01] transition-all px-2">
                
                {/* Indexing */}
                <div className="col-span-1 text-[10px] font-mono text-white/10 italic">
                  {String(idx + 1).padStart(2, '0')}
                </div>
                
                {/* Asset Detail */}
                <div className="col-span-11 md:col-span-5">
                  <h3 className="text-xl font-serif font-light tracking-wide group-hover:text-gold transition-colors duration-500">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-white/30">{item.category}</span>
                    <div className="h-1 w-1 rounded-full bg-gold/40" />
                    <span className="text-[9px] font-mono text-white/20 tracking-tighter uppercase">RWA-REF: {item._id.slice(-8)}</span>
                  </div>
                </div>

                {/* Valuation */}
                <div className="col-span-6 md:col-span-3 text-left md:text-right mt-4 md:mt-0">
                  <p className="text-[9px] uppercase tracking-widest text-white/20 mb-1">Current Valuation</p>
                  <p className="font-serif text-2xl text-gold/90 tabular-nums">
                    ${(item.reserve || item.estimatedValue)?.toLocaleString()}
                  </p>
                </div>

                {/* Contextual Action Button */}
                <div className="col-span-6 md:col-span-3 flex justify-end mt-4 md:mt-0">
                  {activeStage === "verification" ? (
                    <Button size="sm" className="rounded-none bg-gold text-black text-[9px] uppercase tracking-[0.2em] px-8 h-10 hover:bg-white transition-all font-bold">
                      <ShieldCheck className="w-3.5 h-3.5 mr-2" /> Run Audit
                    </Button>
                  ) : activeStage === "acquisition" ? (
                    <Button size="sm" className="rounded-none bg-gold text-black text-[9px] uppercase tracking-[0.2em] px-8 h-10 hover:bg-white transition-all font-bold">
                      <ShoppingCart className="w-3.5 h-3.5 mr-2" /> Buy Fractions
                    </Button>
                  ) : (
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                         <p className="text-[8px] uppercase tracking-widest text-white/20">Staked Yield</p>
                         <p className="text-xs font-mono text-white/60">${item.totalStaked || 0}</p>
                      </div>
                      <Button variant="outline" size="icon" className="border-white/10 rounded-none hover:border-gold hover:text-gold transition-colors">
                        <TrendingUp className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}