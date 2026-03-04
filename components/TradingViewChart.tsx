"use client"

import { useEffect, useRef } from "react"

// TypeScript declaration for TradingView widget
declare global {
  interface Window {
    TradingView?: {
      widget: (options: {
        container_id: string
        width: string
        height: number
        symbol: string
        interval: string
        theme: string
        style: string
        autosize: boolean
        hide_top_toolbar: boolean
        hide_legend: boolean
        save_image: boolean
        container: string
        locale: string
      }) => void
    }
  }
}

interface TradingViewChartProps {
  height?: number
}

export function TradingViewChart({ height = 600 }: TradingViewChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return

    // Initialize TradingView widget using global script
    if ((window as any).TradingView && containerRef.current) {
      new (window as any).TradingView.widget({
        container_id: containerRef.current.id,
        width: "100%",
        height: height,
        symbol: "BINANCE:ETHUSD",
        interval: "D",
        theme: "dark",
        style: "1",
        autosize: true,
        hide_top_toolbar: true,
        hide_legend: false,
        save_image: false,
        container: "chart",
        locale: "en",
      })
    }
  }, [height])

  return (
    <div 
      ref={containerRef} 
      id="tradingview-chart"
      className="w-full bg-background rounded-lg border border-border"
      style={{ height: `${height}px` }}
    >
      <div className="flex items-center justify-center h-full">
        <div className="animate-pulse text-gold font-serif text-xl">Loading Chart...</div>
      </div>
    </div>
  )
}
