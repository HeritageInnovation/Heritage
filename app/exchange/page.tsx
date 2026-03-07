"use client"

export const dynamic = 'force-dynamic';

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { TradingViewChart } from "@/components/trading-view-chart"
import { Footer } from "@/components/footer"
import { CurationDashboard } from "@/components/Curation/CurationDashboard"
import { Shield, Activity, Zap, TrendingUp, Landmark } from "lucide-react"

const ASSET_MAP = {
  ETH: { fullName: 'Ethereum', ticker: 'BINANCE:ETHUSD', currentPrice: 2450.80, dailyChange: 1.8, category: 'protocol' },
  BTC: { fullName: 'Bitcoin', ticker: 'BINANCE:BTCUSD', currentPrice: 64200.00, dailyChange: 2.1, category: 'protocol' },
  USDT: { fullName: 'Tether', ticker: 'BINANCE:USDTUSD', currentPrice: 1.00, dailyChange: 0.0, category: 'protocol' },
  GOLD: { fullName: 'Fine Gold Bullion', ticker: 'OANDA:XAUUSD', currentPrice: 2040.50, dailyChange: 2.4, category: 'heritage' },
  PATEK: { fullName: 'Patek Philippe Nautilus', ticker: 'INDEX:WATCHES', currentPrice: 89200.00, dailyChange: -1.2, category: 'heritage' },
  DIAMOND: { fullName: 'Cerulean Investment Diamond', ticker: 'INDEX:DIAMONDS', currentPrice: 37800.00, dailyChange: 5.6, category: 'heritage' },
  ROTHKO: { fullName: 'Rothko Studio Offering', ticker: 'INDEX:ART', currentPrice: 510000.00, dailyChange: 3.8, category: 'heritage' }
} as const;

const CRYPTO_ASSETS = ['ETH', 'BTC', 'USDT'] as const;
const LUXURY_ASSETS = ['GOLD', 'PATEK', 'DIAMOND', 'ROTHKO'] as const;

export default function TradePage() {
  const [mounted, setMounted] = useState(false);
  const [showCurationMatrix, setShowCurationMatrix] = useState(false);
  const [activeAsset, setActiveAsset] = useState<keyof typeof ASSET_MAP>('ETH');
  const [livePrice, setLivePrice] = useState<number>(ASSET_MAP.ETH.currentPrice);
  const [userRole, setUserRole] = useState<"participant" | "professional" | "investor">("participant");

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* Hero Section - The Gallery Entrance */}
      <section className="relative min-h-[40vh] lg:min-h-[50vh] flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%, rgba(212,175,55,0.05)_0%, transparent_40%)]" />
        
        <div className="relative z-10 px-6 lg:px-12 pb-12 lg:pb-16 pt-24 max-w-7xl mx-auto w-full">
          {/* Status Badge */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-gold" />
            <span className="text-[10px] tracking-[0.4em] text-gold uppercase font-sans font-bold">
              Institutional Market Access
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            {/* Left - Primary Asset Info */}
            <div className="lg:col-span-8">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-ivory leading-[0.95] text-balance">
                {ASSET_MAP[activeAsset].fullName}
              </h1>
              <p className="text-muted-foreground mt-4 font-sans max-w-2xl">
                Execute institutional-grade allocations across sovereign protocols and verified heritage assets.
              </p>
              
              <div className="mt-6 space-y-4">
                <div>
                  <p className="text-[8px] tracking-[0.2em] text-gold uppercase font-sans font-bold mb-3">
                    Heritage Assets
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {LUXURY_ASSETS.map((key) => (
                      <button
                        key={key}
                        onClick={() => { setActiveAsset(key); setLivePrice(ASSET_MAP[key].currentPrice); }}
                        className={`relative px-3 py-2 text-[9px] tracking-[0.3em] uppercase transition-all duration-500 rounded-lg border ${
                          activeAsset === key
                            ? 'text-gold border-gold/30 bg-gold/5 font-medium'
                            : 'text-muted-foreground border-white/10 hover:text-ivory'
                        }`}
                      >
                        {key}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-[8px] tracking-[0.2em] text-muted-foreground uppercase font-sans font-bold mb-3">
                    Protocol Assets
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {CRYPTO_ASSETS.map((key) => (
                      <button
                        key={key}
                        onClick={() => { setActiveAsset(key); setLivePrice(ASSET_MAP[key].currentPrice); }}
                        className={`relative px-3 py-2 text-[9px] tracking-[0.3em] uppercase transition-all duration-500 rounded-lg border ${
                          activeAsset === key
                            ? 'text-gold border-gold/30 bg-gold/5 font-medium'
                            : 'text-muted-foreground border-white/10 hover:text-ivory'
                        }`}
                      >
                        {key}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Asset Context */}
            <div className="hidden lg:block lg:col-span-4 lg:border-l lg:border-gold/20 lg:pl-8">
              <div className="space-y-6">
                <p className="text-muted-foreground text-sm leading-relaxed font-sans">
                  This is a prototype demonstration. All market data, prices, and trading functionalities are simulated for visualization purposes only.
                </p>

                <div className="flex flex-col gap-4">
                  <div className="border border-white/10 bg-card/30 p-6 rounded-xl hover:border-gold/30 transition-colors">
                    <p className="text-[10px] tracking-[0.2em] text-gold uppercase font-sans font-bold mb-2">Valuation</p>
                    <p className="text-3xl font-serif text-ivory">
                      ${livePrice.toLocaleString()}
                    </p>
                  </div>
                  <div className="border border-white/10 bg-card/30 p-6 rounded-xl hover:border-gold/30 transition-colors">
                    <p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase font-sans font-bold mb-2">Market Momentum</p>
                    <p className={`text-3xl font-serif ${
                      ASSET_MAP[activeAsset].dailyChange >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {ASSET_MAP[activeAsset].dailyChange > 0 ? '+' : ''}{ASSET_MAP[activeAsset].dailyChange}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* Mobile Stats Bar */}
        <div className="lg:hidden px-6 py-4 bg-card/30 border-b border-white/10">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-[8px] tracking-[0.2em] text-gold uppercase font-sans mb-1">Valuation</p>
              <p className="text-lg font-serif text-ivory">${livePrice.toLocaleString()}</p>
            </div>
            <div className="text-center">
              <p className="text-[8px] tracking-[0.2em] text-muted-foreground uppercase font-sans mb-1">Momentum</p>
              <p className={`text-lg font-serif ${
                ASSET_MAP[activeAsset].dailyChange >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {ASSET_MAP[activeAsset].dailyChange > 0 ? '+' : ''}{ASSET_MAP[activeAsset].dailyChange}%
              </p>
            </div>
          </div>
        </div>

      {/* Architectural Divider */}
      <div className="px-6 lg:px-12 opacity-30">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent" />
      </div>

      {/* Market Execution Suite */}
      <section className="py-16 lg:py-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-gold" />
            <span className="text-[10px] tracking-[0.4em] text-gold uppercase font-sans font-bold">
              Market Execution
            </span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-ivory leading-[0.95] text-balance">
            Trading Interface
          </h2>
          <p className="text-muted-foreground mt-4 font-sans max-w-2xl">
            Advanced technical intelligence and capital allocation for institutional-grade trading.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-white/5 border border-white/10 shadow-2xl overflow-hidden rounded-2xl">
          
          {/* Intelligence Interface */}
          <div className="lg:col-span-8 bg-card/40 p-4 lg:p-12">
            <div className="flex items-center justify-between mb-6 lg:mb-12">
              <div className="flex items-center gap-3">
                <div className="w-1 h-1 bg-gold rounded-full shadow-[0_0_8px_#D4AF37]" />
                <span className="text-[8px] lg:text-[10px] tracking-[0.4em] text-gold uppercase font-sans font-bold">
                  Technical Intelligence
                </span>
              </div>
            </div>
            <div className="h-[400px] lg:h-[650px] grayscale-[0.5] hover:grayscale-0 transition-all duration-1000">
              <TradingViewChart 
                key={activeAsset} 
                initialAsset={{
                  ticker: ASSET_MAP[activeAsset].ticker,
                  symbol: activeAsset,
                  name: ASSET_MAP[activeAsset].fullName
                }}
              />
            </div>
          </div>

          {/* Allocation Panel */}
          <div className="lg:col-span-4 bg-card/30 p-4 lg:p-12">
            <div className="space-y-6 lg:space-y-12">
              <div className="flex items-center gap-3">
                <Zap className="w-3 h-3 lg:w-4 lg:h-4 text-gold" />
                <span className="text-[8px] lg:text-[10px] tracking-[0.2em] text-gold uppercase font-sans font-bold">Capital Allocation</span>
              </div>
              
              <div className="space-y-4 lg:space-y-8">
                <div className="group">
                  <label className="text-[8px] lg:text-[9px] tracking-[0.3em] text-muted-foreground uppercase font-sans block mb-2 lg:mb-3 group-focus-within:text-gold transition-colors">
                    Amount (USDT)
                  </label>
                  <div className="flex items-center border-b border-white/10 pb-3 lg:pb-4 group-focus-within:border-gold transition-all">
                    <input 
                      type="text" 
                      placeholder="0.00" 
                      className="bg-transparent text-xl lg:text-3xl font-serif text-ivory outline-none flex-1 tracking-tighter" 
                    />
                  </div>
                </div>
                
                <div className="group">
                  <label className="text-[8px] lg:text-[9px] tracking-[0.3em] text-muted-foreground uppercase font-sans block mb-2 lg:mb-3">
                    Position ({activeAsset})
                  </label>
                  <div className="flex items-center border-b border-white/10 pb-3 lg:pb-4">
                    <input 
                      type="text" 
                      readOnly 
                      placeholder="0.00" 
                      className="bg-transparent text-xl lg:text-3xl font-serif text-muted-foreground outline-none flex-1 tracking-tighter" 
                    />
                  </div>
                </div>
              </div>

              <button className="w-full group relative overflow-hidden border border-gold/30 text-gold py-3 lg:py-4 text-[9px] lg:text-[10px] tracking-[0.3em] font-bold uppercase transition-all duration-300 hover:border-gold hover:bg-gold hover:text-black rounded-xl">
                <div className="absolute inset-0 bg-gradient-to-r from-gold/0 via-gold/10 to-gold/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <span className="relative">Execute</span>
              </button>
              
              <p className="text-[8px] lg:text-[9px] text-center text-muted-foreground/60 uppercase tracking-[0.2em] font-sans">
                Heritage Liquidity Network
              </p>
            </div>

            {/* Verification Metadata - Simplified on Mobile */}
            <div className="mt-8 lg:mt-16 pt-6 lg:pt-10 border-t border-white/10 space-y-4 lg:space-y-8">
              <div className="flex items-center gap-3">
                <Shield className="w-3 h-3 lg:w-4 lg:h-4 text-gold opacity-80" />
                <span className="text-[8px] lg:text-[10px] tracking-[0.2em] text-ivory uppercase font-sans">
                  Credentials
                </span>
              </div>
              
              <div className="space-y-3 lg:space-y-5">
                <div className="flex justify-between items-center text-[8px] lg:text-[9px] tracking-[0.2em] uppercase">
                  <span className="text-muted-foreground">Audit</span>
                  <span className="text-gold underline cursor-pointer hover:text-ivory">GIA</span>
                </div>
                <div className="flex justify-between items-center text-[8px] lg:text-[9px] tracking-[0.2em] uppercase">
                  <span className="text-muted-foreground">Storage</span>
                  <span className="text-ivory">Geneva</span>
                </div>
                <div className="flex justify-between items-center text-[8px] lg:text-[9px] tracking-[0.2em] uppercase">
                  <span className="text-muted-foreground">Insurance</span>
                  <span className="text-emerald-500 font-bold underline">Lloyd's</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curation Intelligence Overlay */}
      {showCurationMatrix && (
        <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-3xl overflow-y-auto animate-in fade-in duration-700">
          <div className="sticky top-0 z-[110] bg-background/80 border-b border-gold/10 px-8 py-6">
            <div className="flex items-center justify-between max-w-[1700px] mx-auto">
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-[1px] bg-gold" />
                  <span className="font-serif text-2xl text-ivory italic">Advisory Matrix</span>
                </div>
                <div className="flex gap-1 bg-white/5 p-1 rounded-sm border border-white/10">
                  {(['participant', 'professional', 'investor'] as const).map((role) => (
                    <button
                      key={role}
                      onClick={() => setUserRole(role)}
                      className={`px-4 py-1.5 text-[9px] tracking-[0.3em] uppercase transition-all ${
                        userRole === role 
                          ? 'bg-gold text-background font-bold' 
                          : 'text-muted-foreground hover:text-ivory'
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>
              <button 
                onClick={() => setShowCurationMatrix(false)}
                className="text-gold font-sans text-[10px] tracking-[0.5em] uppercase border border-gold/30 px-6 py-2.5 hover:bg-gold/10 transition-all"
              >
                Exit Intelligence
              </button>
            </div>
          </div>
          <div className="p-8 lg:p-16 max-w-[1700px] mx-auto">
            <CurationDashboard userAddress="0x123...7890" />
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}