"use client"

import { ArrowUpRight, ExternalLink } from "lucide-react"

const provenanceEntries = [
  {
    date: "2026.03.01",
    event: "Season III Auction Opens",
    hash: "0x7a3f...e91c",
    block: "#19,847,231",
  },
  {
    date: "2026.02.28",
    event: "Vault Transfer Complete - Singapore",
    hash: "0x4b2e...d73a",
    block: "#19,846,944",
  },
  {
    date: "2026.02.25",
    event: "Physical Verification - Lot 006",
    hash: "0x9c1d...f28b",
    block: "#19,845,102",
  },
  {
    date: "2026.02.22",
    event: "Insurance Binding - Lloyd's 2623",
    hash: "0x3e8a...c45d",
    block: "#19,843,667",
  },
  {
    date: "2026.02.18",
    event: "Integrity Audit - 99.7% Confirmed",
    hash: "0x6f5b...a19e",
    block: "#19,841,330",
  },
]

export function ProvenanceSection() {
  return (
    <section id="provenance" className="py-24 lg:py-40 px-6 lg:px-12">
      {/* Section Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 lg:mb-24">
        <div className="lg:col-span-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-gold" />
            <span className="text-[10px] tracking-[0.4em] text-gold uppercase font-sans">
              On-Chain Record
            </span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-ivory leading-[0.95] text-balance">
            Provenance
            <br />
            <span className="italic text-gold-gradient">Ledger</span>
          </h2>
        </div>
        <div className="lg:col-span-4 lg:col-start-9 flex items-end">
          <p className="text-muted-foreground text-sm leading-relaxed font-sans">
            Every action in the Ricky Park ecosystem is permanently recorded
            on-chain. Full transparency, immutable provenance.
          </p>
        </div>
      </div>

      {/* Provenance Table */}
      <div className="border border-border">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 p-5 lg:p-6 border-b border-border bg-secondary/20">
          <div className="col-span-2">
            <span className="text-[9px] tracking-[0.3em] text-muted-foreground uppercase font-sans">
              Date
            </span>
          </div>
          <div className="col-span-5">
            <span className="text-[9px] tracking-[0.3em] text-muted-foreground uppercase font-sans">
              Event
            </span>
          </div>
          <div className="col-span-3 hidden md:block">
            <span className="text-[9px] tracking-[0.3em] text-muted-foreground uppercase font-sans">
              TX Hash
            </span>
          </div>
          <div className="col-span-2 hidden md:block text-right">
            <span className="text-[9px] tracking-[0.3em] text-muted-foreground uppercase font-sans">
              Block
            </span>
          </div>
        </div>

        {/* Table Rows */}
        {provenanceEntries.map((entry, index) => (
          <div
            key={index}
            className="grid grid-cols-12 gap-4 p-5 lg:p-6 border-b border-border last:border-b-0 group hover:bg-secondary/20 transition-colors duration-300"
          >
            <div className="col-span-3 md:col-span-2">
              <span className="text-xs text-muted-foreground font-mono">
                {entry.date}
              </span>
            </div>
            <div className="col-span-9 md:col-span-5">
              <span className="text-sm text-ivory font-sans">{entry.event}</span>
            </div>
            <div className="col-span-3 hidden md:flex items-center gap-2">
              <span className="text-xs text-gold font-mono">{entry.hash}</span>
              <ExternalLink className="w-3 h-3 text-gold/40 group-hover:text-gold transition-colors duration-300" />
            </div>
            <div className="col-span-2 hidden md:block text-right">
              <span className="text-xs text-muted-foreground font-mono">
                {entry.block}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10">
        <a
          href="https://etherscan.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 border border-gold/40 text-gold text-[10px] tracking-[0.35em] uppercase px-8 py-4 hover:bg-gold hover:text-background transition-all duration-500 font-sans"
        >
          <span>Explore Full Ledger</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
        </a>
        <span className="text-[10px] tracking-[0.2em] text-muted-foreground font-sans">
          All records verified on Ethereum L1
        </span>
      </div>
    </section>
  )
}
