"use client"

import Link from "next/link"

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-[#050505] px-6 lg:px-12 py-16 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 lg:mb-24">
        
        {/* Brand / Identity */}
        <div className="lg:col-span-4">
          <Link href="/" className="flex flex-col leading-none mb-6 group">
            <span className="font-serif text-2xl tracking-[0.1em] text-ivory group-hover:text-gold transition-colors">
              RICKY PARK
            </span>
            <span className="text-[9px] tracking-[0.4em] text-gold uppercase mt-1.5 font-bold">
              Heritage Protocol
            </span>
          </Link>
          <p className="text-muted-foreground text-[11px] leading-relaxed max-w-xs font-sans uppercase tracking-wider opacity-60">
            Institutional-grade Real World Asset trading with sovereign
            custody and cryptographic proof of integrity. 51/49 Mandate.
          </p>
        </div>

        {/* Platform - Refined Naming */}
        <div className="lg:col-span-2 lg:col-start-6">
          <h4 className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-8 font-sans font-bold">
            Platform
          </h4>
          <div className="flex flex-col gap-4">
            <Link href="/trade" className="text-[10px] tracking-widest text-ivory/60 hover:text-gold transition-all uppercase">Exchange</Link>
            <Link href="/matrix" className="text-[10px] tracking-widest text-ivory/60 hover:text-gold transition-all uppercase">Matrix</Link>
            <Link href="/profile" className="text-[10px] tracking-widest text-ivory/60 hover:text-gold transition-all uppercase">Vault</Link>
            <Link href="/protocol" className="text-[10px] tracking-widest text-ivory/60 hover:text-gold transition-all uppercase">Governance</Link>
          </div>
        </div>

        {/* Legal - Protocol Standard */}
        <div className="lg:col-span-2">
          <h4 className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-8 font-sans font-bold">
            Legal
          </h4>
          <div className="flex flex-col gap-4">
            {["Terms of Access", "Privacy Mandate", "AML Compliance", "Risk Disclosure"].map(
              (link) => (
                <a
                  key={link}
                  href="#"
                  className="text-[10px] tracking-widest text-ivory/60 hover:text-gold transition-all uppercase"
                >
                  {link}
                </a>
              )
            )}
          </div>
        </div>

        {/* Network - Global Desk */}
        <div className="lg:col-span-2">
          <h4 className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-8 font-sans font-bold">
            Network
          </h4>
          <div className="flex flex-col gap-4">
            <Link href="/support" className="text-[10px] tracking-widest text-ivory/60 hover:text-gold transition-all uppercase">Concierge</Link>
            <a href="#" className="text-[10px] tracking-widest text-ivory/60 hover:text-gold transition-all uppercase">Institutional Desk</a>
            <a href="#" className="text-[10px] tracking-widest text-ivory/60 hover:text-gold transition-all uppercase">Press</a>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Global Presence */}
      <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <p className="text-[9px] tracking-[0.3em] text-muted-foreground font-sans uppercase">
            © {currentYear} RICKY PARK. PROTOCOL STABLE.
          </p>
        </div>
        
        <p className="text-[9px] tracking-[0.4em] text-muted-foreground/50 font-sans text-center md:text-right leading-loose">
          ZURICH / SINGAPORE / LONDON / DUBAI / HONG KONG / BANGKOK
        </p>
      </div>
    </footer>
  )
}