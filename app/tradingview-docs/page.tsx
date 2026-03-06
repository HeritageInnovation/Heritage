"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowRight, Code, Play, Download, Github, ExternalLink } from "lucide-react"

export default function TradingViewDocsPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [codeExample, setCodeExample] = useState("basic")

  return (
    <div className="min-h-screen bg-[#050505] text-ivory">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gold rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-black rounded-sm" />
                </div>
                <span className="font-serif text-xl">Lightweight Charts</span>
              </div>
              <nav className="hidden md:flex items-center gap-6">
                <button 
                  onClick={() => setActiveTab("overview")}
                  className={`text-sm transition-colors ${
                    activeTab === "overview" ? "text-gold" : "text-muted-foreground hover:text-ivory"
                  }`}
                >
                  Overview
                </button>
                <button 
                  onClick={() => setActiveTab("examples")}
                  className={`text-sm transition-colors ${
                    activeTab === "examples" ? "text-gold" : "text-muted-foreground hover:text-ivory"
                  }`}
                >
                  Examples
                </button>
                <button 
                  onClick={() => setActiveTab("api")}
                  className={`text-sm transition-colors ${
                    activeTab === "api" ? "text-gold" : "text-muted-foreground hover:text-ivory"
                  }`}
                >
                  API Reference
                </button>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 border border-white/20 rounded-lg text-sm hover:bg-white/10 transition-colors">
                <Github className="w-4 h-4" />
                GitHub
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gold text-black rounded-lg text-sm font-semibold hover:bg-gold/90 transition-colors">
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      {activeTab === "overview" && (
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-gold/30 rounded-full mb-6">
                <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
                <span className="text-[10px] tracking-[0.2em] text-gold uppercase">v4.1</span>
              </div>
              <h1 className="font-serif text-5xl md:text-7xl mb-6 leading-[0.9]">
                Financial Charts
                <span className="block text-gold">Made Simple</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
                A lightweight, fast, and customizable financial charting library built with modern JavaScript. 
                Perfect for displaying real-time market data with beautiful candlestick and line charts.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="flex items-center gap-2 px-6 py-3 bg-gold text-black rounded-lg font-semibold hover:bg-gold/90 transition-colors">
                  <Play className="w-4 h-4" />
                  Try Live Demo
                </button>
                <button className="flex items-center gap-2 px-6 py-3 border border-white/20 rounded-lg hover:bg-white/10 transition-colors">
                  <Code className="w-4 h-4" />
                  View Examples
                </button>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="p-6 border border-white/10 rounded-xl">
                <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center mb-4">
                  <div className="w-6 h-6 bg-gold rounded" />
                </div>
                <h3 className="font-serif text-xl mb-3">Lightweight</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Only 45KB gzipped. No external dependencies. Built with performance in mind for smooth rendering.
                </p>
              </div>
              <div className="p-6 border border-white/10 rounded-xl">
                <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center mb-4">
                  <div className="w-6 h-6 bg-gold rounded-full" />
                </div>
                <h3 className="font-serif text-xl mb-3">Customizable</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Extensive API for customization. Support for custom themes, colors, and chart behaviors.
                </p>
              </div>
              <div className="p-6 border border-white/10 rounded-xl">
                <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center mb-4">
                  <div className="w-6 h-6 bg-gold transform rotate-45" />
                </div>
                <h3 className="font-serif text-xl mb-3">Responsive</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Built-in responsive design. Charts automatically adapt to container size changes.
                </p>
              </div>
            </div>

            {/* Quick Start */}
            <div className="border border-white/10 rounded-xl p-8">
              <h2 className="font-serif text-2xl mb-6">Quick Start</h2>
              <div className="bg-black/50 rounded-lg p-4 font-mono text-sm mb-6">
                <div className="text-gold mb-2"># Install via npm</div>
                <div>npm install lightweight-charts</div>
              </div>
              <div className="bg-black/50 rounded-lg p-4 font-mono text-sm">
                <div className="text-gold mb-2"># Basic usage</div>
                <pre>{`import { createChart } from 'lightweight-charts';

const chart = createChart(container, {
  width: 600,
  height: 300,
  layout: {
    backgroundColor: '#ffffff',
    textColor: '#333',
  },
});

const lineSeries = chart.addLineSeries();
lineSeries.setData([
  { time: '2019-04-11', value: 80.01 },
  { time: '2019-04-12', value: 96.63 },
  { time: '2019-04-13', value: 76.64 },
]);`}</pre>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Examples Section */}
      {activeTab === "examples" && (
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <h1 className="font-serif text-4xl md:text-5xl mb-12">Examples</h1>
            
            {/* Example Selector */}
            <div className="flex flex-wrap gap-2 mb-8">
              {["basic", "candlestick", "realtime", "custom"].map((example) => (
                <button
                  key={example}
                  onClick={() => setCodeExample(example)}
                  className={`px-4 py-2 rounded-lg text-sm font-mono transition-colors ${
                    codeExample === example 
                      ? "bg-gold text-black" 
                      : "border border-white/20 hover:bg-white/10"
                  }`}
                >
                  {example.charAt(0).toUpperCase() + example.slice(1)}
                </button>
              ))}
            </div>

            {/* Code Examples */}
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-black/50 border border-white/10 rounded-xl p-6">
                <h3 className="font-serif text-xl mb-4">Code</h3>
                <div className="bg-black/70 rounded-lg p-4 font-mono text-xs overflow-x-auto">
                  {codeExample === "basic" && (
                    <pre>{`// Basic Line Chart
const chart = createChart(container, {
  width: 800,
  height: 400,
  layout: {
    backgroundColor: '#1a1a1a',
    textColor: '#d1d5db',
  },
});

const lineSeries = chart.addLineSeries({
  color: '#f59e0b',
  lineWidth: 2,
});

lineSeries.setData([
  { time: '2023-01-01', value: 100 },
  { time: '2023-01-02', value: 120 },
  { time: '2023-01-03', value: 110 },
  { time: '2023-01-04', value: 140 },
]);`}</pre>
                  )}
                  {codeExample === "candlestick" && (
                    <pre>{`// Candlestick Chart
const chart = createChart(container, {
  layout: {
    backgroundColor: '#050505',
    textColor: '#f3f4f6',
  },
  grid: {
    vertLines: { color: '#1f2937' },
    horzLines: { color: '#1f2937' },
  },
});

const candlestickSeries = chart.addCandlestickSeries({
  upColor: '#10b981',
  downColor: '#ef4444',
  borderUpColor: '#10b981',
  borderDownColor: '#ef4444',
});

candlestickSeries.setData([
  { time: 1640995200, open: 47500, high: 48500, low: 47000, close: 48000 },
  { time: 1641081600, open: 48000, high: 49000, low: 47500, close: 48500 },
]);`}</pre>
                  )}
                  {codeExample === "realtime" && (
                    <pre>{`// Real-time Updates
const chart = createChart(container, {
  timeScale: {
    timeVisible: true,
    secondsVisible: false,
  },
});

const series = chart.addLineSeries({
  color: '#f59e0b',
});

// Update with new data
setInterval(() => {
  const newPoint = {
    time: Math.floor(Date.now() / 1000),
    value: Math.random() * 100 + 50,
  };
  series.update(newPoint);
}, 1000);`}</pre>
                  )}
                  {codeExample === "custom" && (
                    <pre>{`// Custom Theme
const chart = createChart(container, {
  layout: {
    backgroundColor: '#0f172a',
    textColor: '#e2e8f0',
  },
  grid: {
    vertLines: { color: '#1e293b' },
    horzLines: { color: '#1e293b' },
  },
  crosshair: {
    mode: CrosshairMode.Normal,
    vertLine: {
      color: '#3b82f6',
      labelBackgroundColor: '#3b82f6',
    },
    horzLine: {
      color: '#3b82f6',
      labelBackgroundColor: '#3b82f6',
    },
  },
});`}</pre>
                  )}
                </div>
              </div>

              <div className="bg-black/50 border border-white/10 rounded-xl p-6">
                <h3 className="font-serif text-xl mb-4">Preview</h3>
                <div className="bg-black/70 rounded-lg p-4 h-96 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                      <div className="w-8 h-8 bg-gold rounded" />
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Interactive chart preview would render here
                    </p>
                    <p className="text-muted-foreground text-xs mt-2">
                      Try the code in your browser to see the live chart
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* API Reference */}
      {activeTab === "api" && (
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <h1 className="font-serif text-4xl md:text-5xl mb-12">API Reference</h1>
            
            <div className="space-y-12">
              {/* createChart */}
              <div className="border border-white/10 rounded-xl p-8">
                <h2 className="font-serif text-2xl mb-4 text-gold">createChart</h2>
                <p className="text-muted-foreground mb-6">
                  Creates a new chart instance with the specified container and options.
                </p>
                <div className="bg-black/50 rounded-lg p-4 font-mono text-sm mb-4">
                  <pre>{`createChart(container: HTMLElement, options: ChartOptions): IChartApi`}</pre>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Parameters</h4>
                    <div className="space-y-2 text-sm">
                      <div><span className="text-gold">container</span> - HTMLElement where the chart will be rendered</div>
                      <div><span className="text-gold">options</span> - Chart configuration options</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Returns</h4>
                    <div className="text-sm">IChartApi - Chart instance interface</div>
                  </div>
                </div>
              </div>

              {/* Chart Options */}
              <div className="border border-white/10 rounded-xl p-8">
                <h2 className="font-serif text-2xl mb-4 text-gold">Chart Options</h2>
                <div className="space-y-6">
                  <div className="bg-black/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">layout</h4>
                    <div className="bg-black/70 rounded p-3 font-mono text-xs">
                      <pre>{`{
  backgroundColor: string,
  textColor: string,
  fontSize: number,
  fontFamily: string,
}`}</pre>
                    </div>
                  </div>
                  <div className="bg-black/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">grid</h4>
                    <div className="bg-black/70 rounded p-3 font-mono text-xs">
                      <pre>{`{
  vertLines: {
    color: string,
    style: LineStyle,
    visible: boolean,
  },
  horzLines: {
    color: string,
    style: LineStyle,
    visible: boolean,
  },
}`}</pre>
                    </div>
                  </div>
                  <div className="bg-black/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">timeScale</h4>
                    <div className="bg-black/70 rounded p-3 font-mono text-xs">
                      <pre>{`{
  borderColor: string,
  visible: boolean,
  timeVisible: boolean,
  secondsVisible: boolean,
}`}</pre>
                    </div>
                  </div>
                </div>
              </div>

              {/* Series Types */}
              <div className="border border-white/10 rounded-xl p-8">
                <h2 className="font-serif text-2xl mb-4 text-gold">Series Types</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-black/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Line Series</h4>
                    <div className="font-mono text-xs mb-2">
                      <pre>{`chart.addLineSeries(options?)`}</pre>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Displays data as a continuous line. Perfect for showing trends over time.
                    </p>
                  </div>
                  <div className="bg-black/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Candlestick Series</h4>
                    <div className="font-mono text-xs mb-2">
                      <pre>{`chart.addCandlestickSeries(options?)`}</pre>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Displays OHLC data as candlesticks. Ideal for financial market data.
                    </p>
                  </div>
                  <div className="bg-black/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Bar Series</h4>
                    <div className="font-mono text-xs mb-2">
                      <pre>{`chart.addBarSeries(options?)`}</pre>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Displays data as vertical bars. Good for volume or discrete values.
                    </p>
                  </div>
                  <div className="bg-black/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Area Series</h4>
                    <div className="font-mono text-xs mb-2">
                      <pre>{`chart.addAreaSeries(options?)`}</pre>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Displays data as a filled area. Great for showing accumulation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gold rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-black rounded-sm" />
              </div>
              <span className="font-serif text-xl">Lightweight Charts</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-ivory transition-colors">Documentation</a>
              <a href="#" className="hover:text-ivory transition-colors">Examples</a>
              <a href="#" className="hover:text-ivory transition-colors">GitHub</a>
              <a href="#" className="hover:text-ivory transition-colors">NPM</a>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-sm hover:text-gold transition-colors">
                <Github className="w-4 h-4" />
                GitHub
              </button>
              <button className="flex items-center gap-2 text-sm hover:text-gold transition-colors">
                <ExternalLink className="w-4 h-4" />
                TradingView
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
