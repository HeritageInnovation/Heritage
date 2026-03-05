"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Shield, Users, TrendingUp, CheckCircle, ArrowRight, 
  Award, Eye, Lock, Zap, Circle, RefreshCw, ChevronRight 
} from "lucide-react"

export default function ProtocolPage() {
  const [activeLifecycleStep, setActiveLifecycleStep] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const lifecycleSteps = [
    { id: 0, title: "Submission", description: "Scouts submit luxury twins", icon: <Users className="w-5 h-5" />, color: "text-blue-400" },
    { id: 1, title: "Staking", description: "Community USDT backing", icon: <TrendingUp className="w-5 h-5" />, color: "text-green-400" },
    { id: 2, title: "Expertise", description: "Professional verification", icon: <Eye className="w-5 h-5" />, color: "text-purple-400" },
    { id: 3, title: "Platform", description: "51% Governance lock", icon: <Shield className="w-5 h-5" />, color: "text-gold" },
    { id: 4, title: "Minting", description: "ERC-3643 Tokenization", icon: <Zap className="w-5 h-5" />, color: "text-orange-400" },
    { id: 5, title: "Market", description: "49% Public Liquidity", icon: <Award className="w-5 h-5" />, color: "text-red-400" }
  ]

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#050505] text-ivory selection:bg-gold/30">
      <Navbar />
      
      {/* Hero Section - Upgraded with Glassmorphism */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent" />
        <div className="relative max-w-5xl mx-auto text-center">
          <Badge className="mb-8 bg-gold/10 text-gold border-gold/20 px-4 py-1 text-[10px] tracking-[0.3em] uppercase">
            Architectural Whitepaper
          </Badge>
          <h1 className="font-serif text-5xl md:text-8xl text-ivory leading-[0.85] mb-8 tracking-tighter">
            The <span className="italic text-gold">Heritage</span> <br />Protocol
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-sans max-w-2xl mx-auto leading-relaxed opacity-80">
            A tri-party consensus engine transforming physical luxury into high-fidelity liquid assets via the 51/49 ownership standard.
          </p>
        </div>
      </section>

      {/* Asset Lifecycle - Mobile Optimized Horizontal Scroll */}
      <section className="py-24 border-y border-white/5 bg-white/[0.01]">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-4 mb-16">
            <div className="h-[1px] w-12 bg-gold/50" />
            <h2 className="font-serif text-3xl text-ivory">Lifecycle Engine</h2>
          </div>

          <div className="relative">
            {/* Steps - Swipable on Mobile */}
            <div className="flex lg:grid lg:grid-cols-6 gap-4 overflow-x-auto pb-8 lg:pb-0 no-scrollbar snap-x">
              {lifecycleSteps.map((step, index) => (
                <div 
                  key={index} 
                  onClick={() => setActiveLifecycleStep(index)}
                  className={`snap-center min-w-[200px] lg:min-w-0 cursor-pointer group`}
                >
                  <div className={`p-6 rounded-2xl border transition-all duration-500 ${
                    activeLifecycleStep === index 
                    ? 'bg-gold/10 border-gold shadow-[0_0_30px_rgba(212,175,55,0.1)]' 
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 transition-transform duration-500 ${
                      activeLifecycleStep === index ? 'scale-110' : ''
                    } ${step.color} bg-black/40`}>
                      {step.icon}
                    </div>
                    <h3 className={`text-[10px] tracking-widest uppercase mb-2 ${
                      activeLifecycleStep === index ? 'text-gold' : 'text-muted-foreground'
                    }`}>Step 0{index + 1}</h3>
                    <p className="font-serif text-lg leading-tight">{step.title}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Dynamic Detail Card */}
            <div className="mt-8 p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col md:flex-row items-center gap-6">
               <div className={`w-16 h-16 rounded-full flex items-center justify-center shrink-0 bg-black/40 border border-white/10 ${lifecycleSteps[activeLifecycleStep].color}`}>
                 {lifecycleSteps[activeLifecycleStep].icon}
               </div>
               <div>
                 <h4 className="font-serif text-2xl text-gold mb-1">{lifecycleSteps[activeLifecycleStep].title} Phase</h4>
                 <p className="text-muted-foreground max-w-3xl">{lifecycleSteps[activeLifecycleStep].description}. This stage ensures the asset is cryptographically verified before moving to the next layer of the Heritage stack.</p>
               </div>
               <ChevronRight className="hidden md:block ml-auto w-6 h-6 text-white/20" />
            </div>
          </div>
        </div>
      </section>

      {/* The 51/49 Rule - Visualized */}
      <section className="py-24 container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-card border border-gold/30 rounded-3xl p-8 md:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-[100px] -mr-32 -mt-32" />
          
          <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2">
              <Badge className="bg-gold text-black mb-6">The Golden Ratio</Badge>
              <h2 className="font-serif text-4xl md:text-5xl mb-6 leading-none">The 51/49 <br />Ownership Rule</h2>
              <p className="text-muted-foreground mb-8">
                To prevent hostile takeovers and ensure physical asset security, the Heritage Platform retains a 51% controlling stake. This guarantees the asset remains in a bonded warehouse while 49% provides public liquidity.
              </p>
              
              {/* Visual Gauge */}
              <div className="w-full h-4 bg-white/5 rounded-full overflow-hidden flex border border-white/10">
                <div className="h-full bg-gold w-[51%] shadow-[0_0_15px_rgba(212,175,55,0.5)]" />
                <div className="h-full bg-ivory/20 w-[49%]" />
              </div>
              <div className="flex justify-between mt-4 text-[10px] tracking-widest uppercase font-mono">
                <span className="text-gold">51% Platform</span>
                <span className="text-muted-foreground">49% Market</span>
              </div>
            </div>

            <div className="w-full md:w-1/2 grid grid-cols-1 gap-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-4">
                <Shield className="w-5 h-5 text-gold shrink-0 mt-1" />
                <div>
                  <h4 className="text-sm font-bold text-ivory">Security Guarantee</h4>
                  <p className="text-xs text-muted-foreground">Legal title is held in trust by the 51% majority partner.</p>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-4">
                <RefreshCw className="w-5 h-5 text-gold shrink-0 mt-1" />
                <div>
                  <h4 className="text-sm font-bold text-ivory">Liquid Exit</h4>
                  <p className="text-xs text-muted-foreground">Public holders can trade 49% of supply 24/7 on Uniswap V4.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roles Section - With Role-Specific Colors */}
      <section className="py-24 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Reuse your Roles mapping here but wrap in different background gradients for Participant/Professional/Platform */}
        </div>
      </section>

      {/* Back to Top - Functional Fix */}
      <div className="py-24 text-center">
        <button 
          onClick={scrollToTop}
          className="group flex flex-col items-center gap-4 mx-auto"
        >
          <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-gold transition-colors duration-500">
            <RefreshCw className="w-4 h-4 text-muted-foreground group-hover:text-gold group-hover:rotate-180 transition-all duration-700" />
          </div>
          <span className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground group-hover:text-gold transition-colors">Return to Zenith</span>
        </button>
      </div>

      <Footer />
    </div>
  )
}