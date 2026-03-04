"use client"

import { useEffect, useRef, useState } from "react"
import { TrendingUp, Activity } from "lucide-react"

const mockAssets = [
  { id: "GOLD", name: "Sovereign Gold Reserve", price: 1240.50, change: 2.4 },
  { id: "PATEK", name: "Patek Philippe 5711", price: 892.30, change: -1.2 },
  { id: "DIAMOND", name: "Cerulean Diamond", price: 3780.00, change: 5.6 },
  { id: "ROTHKO", name: "Rothko Study", price: 5100.00, change: 3.8 },
]

export function TradingViewChart() {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const [selectedAsset, setSelectedAsset] = useState(mockAssets[0])
  const [timeframe, setTimeframe] = useState("1D")

  useEffect(() => {
    if (!chartContainerRef.current) return

    const script = document.createElement("script")
    script.src = "https://s3.tradingview.com/tv.js"
    script.async = true
    script.onload = () => {
      if (typeof window !== "undefined" && (window as any).TradingView) {
        new (window as any).TradingView.widget({
          container_id: chartContainerRef.current?.id,
          autosize: true,
          symbol: "NASDAQ:AAPL",
          interval: "D",
          timezone: "Etc/UTC",
          theme: "dark",
          style: "1",
          locale: "en",
          toolbar_bg: "#06060A",
          enable_publishing: false,
          hide_side_toolbar: false,
          allow_symbol_change: true,
          backgroundColor: "#06060A",
          gridColor: "#1E1E28",
          hide_top_toolbar: false,
          hide_legend: false,
          save_image: false,
          studies: ["MASimple@tv-basicstudies"],
          overrides: {
            "mainSeriesProperties.candleStyle.upColor": "#B8977E",
            "mainSeriesProperties.candleStyle.downColor": "#7F1D1D",
            "mainSeriesProperties.candleStyle.borderUpColor": "#CDAF96",
            "mainSeriesProperties.candleStyle.borderDownColor": "#7F1D1D",
            "mainSeriesProperties.candleStyle.wickUpColor": "#B8977E",
            "mainSeriesProperties.candleStyle.wickDownColor": "#7F1D1D",
          },
        })
      }
    }
    document.head.appendChild(script)

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [selectedAsset])

  return (
    <div className="border border-border bg-card">
      <div className="border-b border-border p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Activity className="w-5 h-5 text-gold" />
            <div>
              <h2 className="font-serif text-xl text-ivory">{selectedAsset.name}</h2>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-2xl font-serif text-ivory">
                  ${selectedAsset.price.toLocaleString()}
                </span>
                <span
                  className={`text-sm font-sans ${
                    selectedAsset.change >= 0 ? "text-gold" : "text-destructive"
                  }`}
                >
                  {selectedAsset.change >= 0 ? "+" : ""}
                  {selectedAsset.change}%
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {["1H", "1D", "1W", "1M", "1Y"].map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`text-[10px] tracking-[0.2em] uppercase px-3 py-2 transition-colors duration-300 font-sans ${
                  timeframe === tf
                    ? "bg-gold text-background"
                    : "text-muted-foreground hover:text-gold"
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-6">
          {mockAssets.map((asset) => (
            <button
              key={asset.id}
              onClick={() => setSelectedAsset(asset)}
              className={`text-xs px-4 py-2 border transition-all duration-300 font-sans ${
                selectedAsset.id === asset.id
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-border text-muted-foreground hover:border-gold/30"
              }`}
            >
              {asset.id}
            </button>
          ))}
        </div>
      </div>

      <div className="relative" style={{ height: "600px" }}>
        <div
          id="tradingview_chart"
          ref={chartContainerRef}
          className="absolute inset-0"
        />
      </div>

      <div className="border-t border-border p-4 lg:p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-[9px] tracking-[0.2em] text-muted-foreground uppercase mb-1 font-sans">
              24h Volume
            </p>
            <p className="text-sm text-ivory font-sans">$2,847,392</p>
          </div>
          <div>
            <p className="text-[9px] tracking-[0.2em] text-muted-foreground uppercase mb-1 font-sans">
              Market Cap
            </p>
            <p className="text-sm text-ivory font-sans">$124.8M</p>
          </div>
          <div>
            <p className="text-[9px] tracking-[0.2em] text-muted-foreground uppercase mb-1 font-sans">
              Liquidity
            </p>
            <p className="text-sm text-gold font-sans">$8.4M</p>
          </div>
          <div>
            <p className="text-[9px] tracking-[0.2em] text-muted-foreground uppercase mb-1 font-sans">
              Integrity
            </p>
            <p className="text-sm text-gold font-sans">99.8%</p>
          </div>
        </div>
      </div>
    </div>
  )
}
