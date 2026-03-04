"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { TrendingUp, Activity } from "lucide-react"

export function TradingViewChart({ 
  onAssetChange,
  initialAsset
}: {
  onAssetChange?: (asset: any) => void
  initialAsset?: any
}) {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const [selectedAsset, setSelectedAsset] = useState(initialAsset)
  const [timeframe, setTimeframe] = useState("1D")
  const [chartWidget, setChartWidget] = useState<any>(null)
  const [isChartLoading, setIsChartLoading] = useState(true)

  // Handle asset selection
  const handleAssetSelect = useCallback((asset: any) => {
    setSelectedAsset(asset)
    onAssetChange?.(asset)
  }, [onAssetChange])

  // Initialize or update chart
  useEffect(() => {
    if (!chartContainerRef.current) return

    const loadTradingView = () => {
      setIsChartLoading(true)
      
      // Destroy existing widget if it exists
      if (chartWidget && typeof chartWidget.remove === 'function') {
        chartWidget.remove()
      }

      // Create new widget
      const widget = new (window as any).TradingView.widget({
        container_id: chartContainerRef.current?.id,
        autosize: true,
        symbol: selectedAsset.ticker || "NASDAQ:AAPL",
        interval: timeframe === "1H" ? "60" : timeframe === "1D" ? "D" : timeframe === "1W" ? "W" : "M",
        timezone: "Etc/UTC",
        theme: "dark",
        style: "1",
        locale: "en",
        toolbar_bg: "#06060A",
        enable_publishing: false,
        hide_side_toolbar: false,
        allow_symbol_change: false,
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
        onChartReady: () => {
          setIsChartLoading(false)
        },
      })

      setChartWidget(widget)
    }

    // Load TradingView script if not already loaded
    if (typeof window !== "undefined" && !(window as any).TradingView) {
      const script = document.createElement("script")
      script.src = "https://s3.tradingview.com/tv.js"
      script.async = true
      script.onload = loadTradingView
      document.head.appendChild(script)
    } else if (typeof window !== "undefined" && (window as any).TradingView) {
      loadTradingView()
    }

    return () => {
      if (chartWidget && typeof chartWidget.remove === 'function') {
        chartWidget.remove()
      }
    }
  }, [selectedAsset, timeframe])

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (chartWidget && typeof chartWidget.resize === 'function') {
        setTimeout(() => {
          chartWidget.resize()
        }, 100)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [chartWidget])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (chartWidget && typeof chartWidget.remove === 'function') {
        chartWidget.remove()
      }
    }
  }, [])

  // Format price display
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: price < 1 ? 4 : 2,
      maximumFractionDigits: price < 1 ? 4 : 2,
    }).format(price)
  }

  return (
    <div className="border border-border bg-card">
      {/* Asset Header */}
      <div className="border-b border-border p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Activity className="w-5 h-5 text-gold" />
            <div>
              <h2 className="font-serif text-xl text-ivory">{selectedAsset.name}</h2>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-2xl font-serif text-ivory">
                  {formatPrice(selectedAsset.price)}
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

          {/* Timeframe Selector */}
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
      </div>

      {/* Chart Container */}
      <div className="relative" style={{ height: "600px" }}>
        {isChartLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80">
            <div className="animate-pulse text-gold font-serif text-xl">Loading Chart...</div>
          </div>
        )}
        <div
          id="tradingview_chart"
          ref={chartContainerRef}
          className="absolute inset-0"
        />
      </div>

      {/* Market Statistics */}
      <div className="border-t border-border p-4 lg:p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-[9px] tracking-[0.2em] text-muted-foreground uppercase mb-1 font-sans">
              24h Volume
            </p>
            <p className="text-sm text-ivory font-sans">
              ${(selectedAsset.price * 1000000).toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </p>
          </div>
          <div>
            <p className="text-[9px] tracking-[0.2em] text-muted-foreground uppercase mb-1 font-sans">
              Market Cap
            </p>
            <p className="text-sm text-ivory font-sans">
              ${(selectedAsset.price * 10000000).toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </p>
          </div>
          <div>
            <p className="text-[9px] tracking-[0.2em] text-muted-foreground uppercase mb-1 font-sans">
              Liquidity
            </p>
            <p className="text-sm text-gold font-sans">
              ${(selectedAsset.price * 5000000).toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </p>
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
