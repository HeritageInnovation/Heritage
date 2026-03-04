"use client"

import { useState } from "react"
import { ArrowDown, Settings, Info } from "lucide-react"

const tokens = [
  { symbol: "GOLD", name: "Gold Reserve Shares", balance: 124.5, icon: "🏆" },
  { symbol: "PATEK", name: "Patek Philippe Shares", balance: 0, icon: "⌚" },
  { symbol: "DIAMOND", name: "Diamond Shares", balance: 45.2, icon: "💎" },
  { symbol: "USDC", name: "USD Coin", balance: 10000, icon: "💵" },
  { symbol: "ETH", name: "Ethereum", balance: 2.5, icon: "Ξ" },
]

export function SwapWidget() {
  const [fromToken, setFromToken] = useState(tokens[0])
  const [toToken, setToToken] = useState(tokens[3])
  const [fromAmount, setFromAmount] = useState("")
  const [toAmount, setToAmount] = useState("")
  const [slippage, setSlippage] = useState("0.5")

  const handleSwap = () => {
    const temp = fromToken
    setFromToken(toToken)
    setToToken(temp)
    setFromAmount(toAmount)
    setToAmount(fromAmount)
  }

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value)
    if (value && !isNaN(parseFloat(value))) {
      const rate = 1240.5
      setToAmount((parseFloat(value) * rate).toFixed(2))
    } else {
      setToAmount("")
    }
  }

  return (
    <div className="border border-border bg-card h-fit sticky top-24">
      <div className="border-b border-border p-4 lg:p-6 flex items-center justify-between">
        <h3 className="font-serif text-lg text-ivory">Swap Assets</h3>
        <button className="text-muted-foreground hover:text-gold transition-colors duration-300">
          <Settings className="w-4 h-4" />
        </button>
      </div>

      <div className="p-4 lg:p-6 space-y-4">
        <div className="border border-border bg-background/50 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[9px] tracking-[0.2em] text-muted-foreground uppercase font-sans">
              From
            </span>
            <span className="text-[9px] tracking-[0.2em] text-muted-foreground uppercase font-sans">
              Balance: {fromToken.balance.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="text"
              value={fromAmount}
              onChange={(e) => handleFromAmountChange(e.target.value)}
              placeholder="0.0"
              className="flex-1 bg-transparent text-2xl text-ivory outline-none font-serif"
            />
            <button className="flex items-center gap-2 bg-secondary/50 hover:bg-secondary px-4 py-2 transition-colors duration-300">
              <span className="text-xl">{fromToken.icon}</span>
              <span className="text-sm text-ivory font-sans">{fromToken.symbol}</span>
            </button>
          </div>
        </div>

        <div className="flex justify-center -my-2 relative z-10">
          <button
            onClick={handleSwap}
            className="bg-gold hover:bg-gold-light text-background p-2 transition-colors duration-300"
          >
            <ArrowDown className="w-4 h-4" />
          </button>
        </div>

        <div className="border border-border bg-background/50 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[9px] tracking-[0.2em] text-muted-foreground uppercase font-sans">
              To
            </span>
            <span className="text-[9px] tracking-[0.2em] text-muted-foreground uppercase font-sans">
              Balance: {toToken.balance.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="text"
              value={toAmount}
              readOnly
              placeholder="0.0"
              className="flex-1 bg-transparent text-2xl text-ivory outline-none font-serif"
            />
            <button className="flex items-center gap-2 bg-secondary/50 hover:bg-secondary px-4 py-2 transition-colors duration-300">
              <span className="text-xl">{toToken.icon}</span>
              <span className="text-sm text-ivory font-sans">{toToken.symbol}</span>
            </button>
          </div>
        </div>

        <div className="bg-secondary/20 border border-border p-4 space-y-2">
          <div className="flex items-center justify-between text-xs font-sans">
            <span className="text-muted-foreground">Rate</span>
            <span className="text-ivory">1 {fromToken.symbol} = 1,240.50 {toToken.symbol}</span>
          </div>
          <div className="flex items-center justify-between text-xs font-sans">
            <span className="text-muted-foreground">Slippage Tolerance</span>
            <span className="text-ivory">{slippage}%</span>
          </div>
          <div className="flex items-center justify-between text-xs font-sans">
            <span className="text-muted-foreground">Network Fee</span>
            <span className="text-ivory">~$2.40</span>
          </div>
          <div className="flex items-center justify-between text-xs font-sans">
            <span className="text-muted-foreground">Protocol Fee</span>
            <span className="text-gold">0.3%</span>
          </div>
        </div>

        <button
          disabled={!fromAmount || parseFloat(fromAmount) <= 0}
          className="w-full bg-gold hover:bg-gold-light text-background text-sm tracking-[0.3em] uppercase py-4 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-sans"
        >
          {!fromAmount || parseFloat(fromAmount) <= 0 ? "Enter Amount" : "Swap"}
        </button>

        <div className="flex items-start gap-2 bg-secondary/10 border border-border p-3">
          <Info className="w-4 h-4 text-gold shrink-0 mt-0.5" />
          <p className="text-[10px] leading-relaxed text-muted-foreground font-sans">
            Each fractional share represents ownership backed by physical custody
            with 99.8% integrity verification. All trades are subject to the
            Physical Integrity Protocol.
          </p>
        </div>
      </div>

      <div className="border-t border-border p-4 lg:p-6">
        <div className="space-y-2">
          <p className="text-[9px] tracking-[0.2em] text-muted-foreground uppercase font-sans">
            Recent Trades
          </p>
          {[
            { from: "GOLD", to: "USDC", amount: "24.5", time: "2m ago" },
            { from: "USDC", to: "DIAMOND", amount: "15,000", time: "8m ago" },
            { from: "PATEK", to: "ETH", amount: "12.3", time: "15m ago" },
          ].map((trade, i) => (
            <div
              key={i}
              className="flex items-center justify-between text-[10px] py-2 border-b border-border last:border-b-0 font-sans"
            >
              <span className="text-ivory">
                {trade.amount} {trade.from} → {trade.to}
              </span>
              <span className="text-muted-foreground">{trade.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
