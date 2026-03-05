"use client"

export const dynamic = 'force-dynamic';

import { useEffect, useState, useLayoutEffect } from "react"
import { Navbar } from "@/components/navbar"
import { TradingViewChart } from "@/components/trading-view-chart"
import { Footer } from "@/components/footer"
import { CurationDashboard } from "@/components/Curation/CurationDashboard"

// 1. Fixed ASSET_MAP: Added dailyChange to satisfy chart props
const ASSET_MAP = {
  ETH: { fullName: 'Ethereum', ticker: 'BINANCE:ETHUSD', currentPrice: 1234.80, dailyChange: 1.8 },
  BTC: { fullName: 'Bitcoin', ticker: 'BINANCE:BTCUSD', currentPrice: 12345.00, dailyChange: 2.1 },
  USDT: { fullName: 'Tether', ticker: 'BINANCE:USDTUSD', currentPrice: 1.00, dailyChange: 0.0 },
  GOLD: { fullName: 'Sovereign Gold', ticker: 'OANDA:XAUUSD', currentPrice: 2040.50, dailyChange: 2.4 },
  PATEK: { fullName: 'Patek Philippe 5711', ticker: 'INDEX:WATCHES', currentPrice: 89200.00, dailyChange: -1.2 },
  DIAMOND: { fullName: 'Cerulean Diamond', ticker: 'INDEX:DIAMONDS', currentPrice: 37800.00, dailyChange: 5.6 },
  ROTHKO: { fullName: 'Rothko Study', ticker: 'INDEX:ART', currentPrice: 510000.00, dailyChange: 3.8 }
} as const;

const assetConfig = {
  ETH: 'NATIVE',
  BTC: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', // Real WBTC
  // These are validly formatted "burn" addresses for testing
  GOLD: '0x0000000000000000000000000000000000000001', 
  PATEK: '0x0000000000000000000000000000000000000002',
  DIAMOND: '0x0000000000000000000000000000000000000003',
  ROTHKO: '0x0000000000000000000000000000000000000004'
} as const;

const CRYPTO_ASSETS = ['ETH', 'BTC', 'USDT'] as const;
const LUXURY_ASSETS = ['GOLD', 'PATEK', 'DIAMOND', 'ROTHKO'] as const;

const SwapReset = () => {
  return (
    <div className="bg-card/30 backdrop-blur-md border border-white/10 p-6 lg:p-8 rounded-3xl text-center">
      <div className="text-gold text-sm mb-2">Trading Interface</div>
      <div className="text-ivory/60 text-xs">
        Trading interface coming soon.
      </div>
      <div className="text-ivory/40 text-xs mt-2">
        Please connect your wallet to continue.
      </div>
    </div>
  );
};

export default function TradePage() {
  const [mounted, setMounted] = useState(false);
  const [showCurationMatrix, setShowCurationMatrix] = useState(false);
  const [activeAsset, setActiveAsset] = useState<keyof typeof ASSET_MAP>('ETH');
  const [livePrice, setLivePrice] = useState<number>(ASSET_MAP.ETH.currentPrice);
  const [userRole, setUserRole] = useState<"participant" | "professional" | "investor">("participant");

  const handleAssetSelect = (assetKey: keyof typeof ASSET_MAP) => {
    setActiveAsset(assetKey);
    setLivePrice(ASSET_MAP[assetKey].currentPrice);
  };

  const handlePriceUpdate = (newPrice: number) => {
    setLivePrice(newPrice);
  };

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-background text-foreground relative">
      <Navbar />

      {/* LUXURY LIGHTBOX OVERLAY - Mobile Optimized */}
      {showCurationMatrix && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-3xl overflow-y-auto">
          {/* Sticky Header to prevent Exit button from scrolling away on mobile */}
          <div className="sticky top-0 z-[110] w-full bg-black/80 backdrop-blur-xl border-b border-white/10 px-4 py-4 sm:px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* View Switcher Buttons */}
            <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10 w-full sm:w-auto overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {(['participant', 'professional', 'investor'] as const).map((role) => (
                <button
                  key={role}
                  onClick={() => setUserRole(role)}
                  className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-[10px] tracking-widest uppercase transition-all whitespace-nowrap ${
                    userRole === role 
                      ? 'bg-gold text-black font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)]' 
                      : 'text-muted-foreground hover:text-white hover:bg-white/5'
                  }`}
                >
                  {role} View
                </button>
              ))}
            </div>

            <button 
              onClick={() => setShowCurationMatrix(false)}
              className="w-full sm:w-auto px-6 py-2 bg-gold/10 border border-gold/40 text-gold rounded-full hover:bg-gold/20 transition-all font-mono text-[10px] tracking-[0.3em] uppercase"
            >
              [ Exit Matrix ]
            </button>
          </div>

          <div className="p-4 sm:p-6 lg:p-12 min-h-screen">
            <CurationDashboard userAddress="0x123...7890" userRole={userRole} />
          </div>
        </div>
      )}

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-12 max-w-[1600px] mx-auto">
        <h1 className="text-muted-gold font-mono text-[10px] tracking-widest mb-4 uppercase opacity-50">(Heritage Prototype)</h1>

        {/* MOBILE RESPONSIVE ASSET NAVIGATION */}
        <div className="mb-10 flex flex-col xl:flex-row xl:items-center justify-between gap-6 border-b border-white/5 pb-8">
          
          {/* Horizontal Swipe Container for Mobile */}
          <div className="flex items-center gap-8 overflow-x-auto pb-4 -mx-4 px-4 xl:mx-0 xl:px-0 xl:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-[10px] tracking-[0.4em] text-muted-foreground uppercase font-sans">Crypto</span>
              <div className="flex gap-2">
                {CRYPTO_ASSETS.map((key) => (
                  <button key={key} onClick={() => setActiveAsset(key)} className={`px-4 py-2 rounded text-xs transition-all ${activeAsset === key ? 'bg-gold/20 text-gold border border-gold/50' : 'bg-white/5 text-muted-foreground border border-transparent hover:border-white/20'}`}>{key}</button>
                ))}
              </div>
            </div>
            
            <div className="w-px h-8 bg-white/10 hidden sm:block shrink-0" />

            <div className="flex items-center gap-3 shrink-0">
              <span className="text-[10px] tracking-[0.4em] text-gold uppercase font-sans font-bold">Luxury</span>
              <div className="flex gap-2">
                {LUXURY_ASSETS.map((key) => (
                  <button key={key} onClick={() => setActiveAsset(key)} className={`px-4 py-2 rounded text-xs transition-all ${activeAsset === key ? 'bg-gold/20 text-gold border border-gold/50' : 'bg-white/5 text-muted-foreground border border-transparent hover:border-white/20'}`}>{key}</button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CORE TRADE ENGINE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
          <div className="lg:col-span-8 min-h-[400px]">
            <TradingViewChart 
              key={activeAsset} 
              onAssetChange={(asset: { id: string; name: string; price: number; change: number; symbol: string; ticker: string }) => {
                const assetKey = Object.keys(ASSET_MAP).find(
                  key => ASSET_MAP[key as keyof typeof ASSET_MAP].ticker === asset.ticker
                ) as keyof typeof ASSET_MAP
                if (assetKey) {
                  handleAssetSelect(assetKey)
                }
                if (asset.price) {
                  handlePriceUpdate(asset.price)
                }
              }}
              initialAsset={{
                id: activeAsset,
                name: ASSET_MAP[activeAsset].fullName,
                price: livePrice,
                change: ASSET_MAP[activeAsset].dailyChange,
                symbol: activeAsset,
                ticker: ASSET_MAP[activeAsset].ticker
              }}
            />
          </div>

          <div className="lg:col-span-4">
            <div className="bg-card/30 backdrop-blur-md border border-white/10 p-6 lg:p-8 rounded-3xl relative overflow-hidden h-full">
              <div className="mb-8">
                <div className="text-[10px] tracking-[0.5em] text-gold uppercase mb-2">Live Valuation</div>
                <div className="text-4xl sm:text-5xl font-serif text-ivory tracking-tighter">
                  ${livePrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>

              <div className="w-full">
                <SwapReset
                  key={`${activeAsset}-widget`}
                />
              </div>
              
              <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-2">
                <div className="text-[9px] tracking-[0.3em] text-muted-foreground uppercase">Liquidity via DEX</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}