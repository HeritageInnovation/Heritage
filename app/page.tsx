"use client"

export const dynamic = 'force-dynamic';

import { useEffect, useState, useLayoutEffect } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { TradingViewChart } from "@/components/trading-view-chart"
import { Footer } from "@/components/footer"
import dynamicImport from "next/dynamic"
import { USDT_ADDRESS } from '@/constants/addresses'
import { ArrowUpRight } from "lucide-react"
import '@uniswap/widgets/fonts.css'

const ASSET_MAP = {
  ETH: { fullName: 'Ethereum', ticker: 'BINANCE:ETHUSD', currentPrice: 2450.80, dailyChange: 1.8 },
  BTC: { fullName: 'Bitcoin', ticker: 'BINANCE:BTCUSD', currentPrice: 43250.00, dailyChange: 2.1 },
  USDT: { fullName: 'Tether', ticker: 'BINANCE:USDTUSD', currentPrice: 1.00, dailyChange: 0.0 },
  GOLD: { fullName: 'Sovereign Gold', ticker: 'OANDA:XAUUSD', currentPrice: 2040.50, dailyChange: 2.4 },
  PATEK: { fullName: 'Patek Philippe 5711', ticker: 'INDEX:WATCHES', currentPrice: 89200.00, dailyChange: -1.2 },
  DIAMOND: { fullName: 'Cerulean Diamond', ticker: 'INDEX:DIAMONDS', currentPrice: 37800.00, dailyChange: 5.6 },
  ROTHKO: { fullName: 'Rothko Study', ticker: 'INDEX:ART', currentPrice: 510000.00, dailyChange: 3.8 }
} as const;

const assetConfig = {
  ETH: 'NATIVE',
  BTC: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
  USDT: USDT_ADDRESS,
  GOLD: '0x0000000000000000000000000000000000000001', 
  PATEK: '0x0000000000000000000000000000000000000002',
  DIAMOND: '0x0000000000000000000000000000000000000003',
  ROTHKO: '0x0000000000000000000000000000000000000004'
} as const;

const CRYPTO_ASSETS = ['ETH', 'BTC', 'USDT'] as const;
const LUXURY_ASSETS = ['GOLD', 'PATEK', 'DIAMOND', 'ROTHKO'] as const;

const SwapReset = dynamicImport(
  () => import("@/components/Trade/SwapReset").then((mod) => mod.SwapReset),
  { ssr: false }
);

export default function TradePage() {
  const [mounted, setMounted] = useState(false);
  const [activeAsset, setActiveAsset] = useState<keyof typeof ASSET_MAP>('ETH');
  const [livePrice, setLivePrice] = useState<number>(ASSET_MAP.ETH.currentPrice);

  const handleAssetSelect = (assetKey: keyof typeof ASSET_MAP) => {
    setActiveAsset(assetKey);
    setLivePrice(ASSET_MAP[assetKey].currentPrice);
  };

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

      <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-12 max-w-[1600px] mx-auto">
        {/* Responsive Asset Navigation */}
        <div className="mb-10 flex flex-col xl:flex-row xl:items-center justify-between gap-6 border-b border-white/5 pb-8">
          
          <div className="flex items-center gap-8 overflow-x-auto pb-4 xl:pb-0 no-scrollbar">
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-[10px] tracking-[0.4em] text-muted-foreground uppercase font-sans">Crypto</span>
              <div className="flex gap-2">
                {CRYPTO_ASSETS.map((key) => (
                  <button key={key} onClick={() => handleAssetSelect(key)} className={`px-4 py-2 rounded text-xs transition-all ${activeAsset === key ? 'bg-gold/20 text-gold border border-gold/50' : 'bg-white/5 text-muted-foreground border border-transparent hover:border-white/20'}`}>{key}</button>
                ))}
              </div>
            </div>
            
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-[10px] tracking-[0.4em] text-gold uppercase font-sans font-bold">Luxury</span>
              <div className="flex gap-2">
                {LUXURY_ASSETS.map((key) => (
                  <button key={key} onClick={() => handleAssetSelect(key)} className={`px-4 py-2 rounded text-xs transition-all ${activeAsset === key ? 'bg-gold/20 text-gold border border-gold/50' : 'bg-white/5 text-muted-foreground border border-transparent hover:border-white/20'}`}>{key}</button>
                ))}
              </div>
            </div>
          </div>

          {/* Link to Standalone Matrix Page */}
          <Link
            href="/matrix"
            className="group flex items-center justify-center gap-3 px-6 py-3 rounded-full border border-gold/30 bg-gold/5 hover:bg-gold/10 transition-all w-full xl:w-auto"
          >
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="text-[10px] tracking-[0.2em] text-gold uppercase font-bold">Launch Curation Matrix</span>
            <ArrowUpRight className="w-3 h-3 text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* CORE TRADE ENGINE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
          <div className="lg:col-span-8 min-h-[500px]">
            <TradingViewChart 
              key={activeAsset} 
              onAssetChange={(asset: any) => handleAssetSelect(asset.symbol as any)}
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

              <SwapReset
                key={`${activeAsset}-widget`}
                defaultInputTokenAddress={assetConfig[activeAsset]}
                defaultOutputTokenAddress={USDT_ADDRESS}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}