"use client"

import React, { useEffect, useRef, memo } from 'react';

interface ChartProps {
  initialAsset: {
    ticker: string;
    symbol: string;
    name: string;
  };
}

const TradingViewChartComponent = ({ initialAsset }: ChartProps) => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Clear previous widget if it exists
    if (container.current) {
      container.current.innerHTML = "";
    }

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    
    // THE OVERRIDE: Eliminating all blues/purples for Gold & Neutrals
    script.innerHTML = JSON.stringify({
      "autosize": true,
      "symbol": initialAsset.ticker,
      "interval": "D",
      "timezone": "Etc/UTC",
      "theme": "dark",
      "style": "2", // Line style for luxury gold line
      "locale": "en",
      "enable_publishing": false,
      "hide_top_toolbar": true,
      "hide_legend": true,
      "save_image": false,
      "backgroundColor": "rgba(10, 10, 10, 1)", // Match your background
      "gridColor": "rgba(212, 175, 55, 0.03)", // Ultra-faint gold grid
      "range": "1M",
      "allow_symbol_change": false,
      "details": false,
      "hotlist": false,
      "calendar": false,
      "show_popup_button": false,
      "overrides": {
        // Line Style Colors
        "mainSeriesProperties.lineStyle.color": "#D4AF37",
        "mainSeriesProperties.lineStyle.linewidth": 2,
        "mainSeriesProperties.lineStyle.linestyle": 0,

        // Interface Neutrals
        "paneProperties.background": "#0a0a0a",
        "paneProperties.vertGridProperties.color": "rgba(212, 175, 55, 0.02)",
        "paneProperties.horzGridProperties.color": "rgba(212, 175, 55, 0.02)",
        "scalesProperties.lineColor": "rgba(212, 175, 55, 0.1)",
        "scalesProperties.textColor": "#8F8F8F",
        "mainSeriesProperties.priceLineColor": "#D4AF37"
      }
    });

    if (container.current) {
      container.current.appendChild(script);
    }
  }, [initialAsset.ticker]); // Re-renders only when ticker changes

  return (
    <div className="group relative flex flex-col h-full w-full border border-white/5 bg-[#0a0a0a] overflow-hidden rounded-sm transition-all duration-700 hover:border-gold/20">
      {/* Glossy Header Overlay */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 py-4 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
        <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gold uppercase tracking-[0.4em] mb-1">
              {initialAsset.name} / USD
            </span>
            <span className="text-[9px] text-muted-foreground uppercase tracking-widest font-mono">
              Live Protocol Feed
            </span>
        </div>
      </div>
      
      {/* Chart Container */}
      <div 
        ref={container} 
        className="flex-grow w-full grayscale-[0.2] contrast-[1.1]" 
      />

      {/* Subtle Bottom Vignette */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </div>
  );
};

export const TradingViewChart = memo(TradingViewChartComponent);