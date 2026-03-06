"use client"

import { ArrowDown, Shield } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-vault.jpg"
          alt="Institutional vault interior with dramatic golden lighting"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 lg:px-12 pb-16 lg:pb-24 pt-32">
        {/* Protocol Badge */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-[1px] bg-gold" />
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-gold" />
            <span className="text-[10px] tracking-[0.4em] text-gold uppercase font-sans">
              Physical Integrity Protocol
            </span>
          </div>
        </div>

        {/* Asymmetric Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
          {/* Left - Headline */}
          <div className="lg:col-span-7">
            <h1 className="font-serif text-5xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl leading-[0.9] tracking-tight text-ivory text-balance">
              Where Physical
              <br />
              <span className="text-gold-gradient italic">Meets</span>
              <br />
              Protocol
            </h1>
          </div>

          {/* Right - Data Panel */}
          <div className="lg:col-span-5 lg:pl-8">
            <div className="border-l border-gold/30 pl-6 lg:pl-8">
              <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-md font-sans">
                Institutional-grade Real World Asset auctions & trades with sovereign custody,
                multi-jurisdictional insurance, and cryptographic proof of physical
                integrity.
              </p>

              {/* Live Data Strip */}
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <p className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase font-sans">
                    TVL
                  </p>
                  <p className="text-xl lg:text-2xl text-ivory font-serif mt-1">
                    $2.4B
                  </p>
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase font-sans">
                    Lots
                  </p>
                  <p className="text-xl lg:text-2xl text-ivory font-serif mt-1">
                    1,247
                  </p>
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase font-sans">
                    Integrity
                  </p>
                  <p className="text-xl lg:text-2xl text-gold font-serif mt-1">
                    99.7%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-16 lg:mt-24 flex items-center gap-3">
          <ArrowDown className="w-4 h-4 text-gold animate-bounce" />
          <span className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase font-sans">
            Explore Curated Lots (Demo)
          </span>
        </div>
      </div>
    </section>
  )
}
