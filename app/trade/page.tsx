"use client"

export const dynamic = 'force-dynamic';

import { useEffect, useState, useLayoutEffect } from "react"
import { Navbar } from "@/components/navbar"
import { TradingViewChart } from "@/components/trading-view-chart"
import { Footer } from "@/components/footer"
import { CurationDashboard } from "@/components/Curation/CurationDashboard"
import dynamicImport from "next/dynamic"
import { USDT_ADDRESS } from '@/constants/addresses'
import '@uniswap/widgets/fonts.css'

const ASSET_MAP = {
  ETH: { fullName: 'Ethereum', ticker: 'BINANCE:ETHUSD', currentPrice: 2450.80 },
  BTC: { fullName: 'Bitcoin', ticker: 'BINANCE:BTCUSD', currentPrice: 43250.00 },
  USDT: { fullName: 'Tether', ticker: 'BINANCE:USDTUSD', currentPrice: 1.00 },
  GOLD: { fullName: 'Sovereign Gold', ticker: 'OANDA:XAUUSD', currentPrice: 2040.50 },
  PATEK: { fullName: 'Patek Philippe 5711', ticker: 'INDEX:WATCHES', currentPrice: 89200.00 },
  DIAMOND: { fullName: 'Cerulean Diamond', ticker: 'INDEX:DIAMONDS', currentPrice: 37800.00 },
  ROTHKO: { fullName: 'Rothko Study', ticker: 'INDEX:ART', currentPrice: 510000.00 }
} as const;

const assetConfig = {
  ETH: 'NATIVE',
  BTC: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
  USDT: USDT_ADDRESS,
  GOLD: '0x123...GOLD',
  PATEK: '0x234...PATEK',
  DIAMOND: '0x345...DIAMOND',
  ROTHKO: '0x456...ROTHKO'
} as const;

const CRYPTO_ASSETS = ['ETH', 'BTC', 'USDT'] as const;
const LUXURY_ASSETS = ['GOLD', 'PATEK', 'DIAMOND', 'ROTHKO'] as const;

const SwapReset = dynamicImport(
  () => import("@/components/Trade/SwapReset").then((mod) => mod.SwapReset),
  { ssr: false }
);

export default function TradePage() {
  const [mounted, setMounted] = useState(false);
  const [showCurationMatrix, setShowCurationMatrix] = useState(false);
  const [activeAsset, setActiveAsset] = useState<keyof typeof ASSET_MAP>('ETH');
  const [livePrice, setLivePrice] = useState<number>(ASSET_MAP.ETH.currentPrice);
  const [userRole, setUserRole] = useState<"participant" | "professional" | "investor">("participant");

  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).Browser = (window as any).Browser || { T: () => {} };
    }
  }, []);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-background text-foreground relative">
      <Navbar />

      {/* LUXURY LIGHTBOX OVERLAY */}
      {showCurationMatrix && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-3xl overflow-y-auto">
          <div className="min-h-screen p-6 lg:p-12 relative">
            <button 
              onClick={() => setShowCurationMatrix(false)}
              className="absolute top-8 right-8 z-[110] px-6 py-2 bg-gold/10 border border-gold/40 text-gold rounded-full hover:bg-gold/20 transition-all font-mono text-[10px] tracking-[0.3em] uppercase"
            >
              [ Exit Matrix ]
            </button>
            <CurationDashboard userAddress="0x123...7890" userRole={userRole} />
          </div>
        </div>
      )}

      <div className="pt-24 pb-16 px-6 lg:px-12">
        <h1 className="text-muted-gold font-mono text-[10px] tracking-widest mb-4 uppercase opacity-50">(Heritage Prototype)</h1>

        {/* CLEAN ASSET NAVIGATION (Timeframes Removed) */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-6 border-b border-white/5 pb-8">
          <div className="flex flex-wrap items-center gap-8">
            <div className="flex items-center gap-3">
              <span className="text-[10px] tracking-[0.4em] text-muted-foreground uppercase font-sans">Crypto</span>
              <div className="flex gap-2">
                {CRYPTO_ASSETS.map((key) => (
                  <button key={key} onClick={() => setActiveAsset(key)} className={`px-4 py-1 rounded text-xs transition-all ${activeAsset === key ? 'bg-gold/20 text-gold border border-gold/50' : 'text-muted-foreground border border-transparent hover:border-white/20'}`}>{key}</button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] tracking-[0.4em] text-gold uppercase font-sans font-bold">Luxury</span>
              <div className="flex gap-2">
                {LUXURY_ASSETS.map((key) => (
                  <button key={key} onClick={() => setActiveAsset(key)} className={`px-4 py-1 rounded text-xs transition-all ${activeAsset === key ? 'bg-gold/20 text-gold border border-gold/50' : 'text-muted-foreground border border-transparent hover:border-white/20'}`}>{key}</button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowCurationMatrix(true)}
            className="group flex items-center gap-3 px-5 py-2 rounded-full border border-gold/30 bg-gold/5 hover:bg-gold/10 transition-all"
          >
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="text-[10px] tracking-[0.2em] text-gold uppercase font-bold">Curation Matrix</span>
          </button>
        </div>

        {/* CORE TRADE ENGINE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
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
                change: (ASSET_MAP[activeAsset] as any).dailyChange,
                symbol: activeAsset,
                ticker: ASSET_MAP[activeAsset].ticker
              }}
            />
          </div>

          <div className="lg:col-span-4">
            <div className="bg-card/30 backdrop-blur-md border border-white/10 p-8 rounded-3xl relative overflow-hidden">
              <div className="mb-8">
                <div className="text-[10px] tracking-[0.5em] text-gold uppercase mb-2">Live Valuation</div>
                <div className="text-5xl font-serif text-ivory tracking-tighter">
                  ${livePrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>

              <SwapReset
                key={`${activeAsset}-widget`}
                defaultInputTokenAddress={assetConfig[activeAsset]}
                defaultOutputTokenAddress={USDT_ADDRESS}
              />
              
              <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-2">
                <div className="text-[9px] tracking-[0.3em] text-muted-foreground uppercase">Liquidity via Uniswap V4</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}