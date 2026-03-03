"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

const navLinks = [
  { label: "LOTS", href: "#lots" },
  { label: "PROTOCOL", href: "#protocol" },
  { label: "SECURITY", href: "#security" },
  { label: "PROVENANCE", href: "#provenance" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex items-center justify-between px-6 py-4 lg:px-12 lg:py-5">
        {/* Logo */}
        <a href="#" className="flex flex-col leading-none">
          <span className="font-serif text-lg tracking-[0.15em] text-ivory">
            RICKY PARK
          </span>
          <span className="text-[10px] tracking-[0.35em] text-gold uppercase mt-0.5">
            Auction House
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[11px] tracking-[0.3em] text-muted-foreground hover:text-gold transition-colors duration-300 font-sans"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Connect Wallet Button */}
        <div className="hidden lg:block">
          <button className="border border-gold/40 text-gold text-[10px] tracking-[0.35em] uppercase px-8 py-3 hover:bg-gold hover:text-background transition-all duration-500 font-sans">
            CONNECT WALLET
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-ivory"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-background/95 backdrop-blur-md border-t border-border px-6 pb-8 pt-4">
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-[11px] tracking-[0.3em] text-muted-foreground hover:text-gold transition-colors duration-300 font-sans"
              >
                {link.label}
              </a>
            ))}
            <button className="border border-gold/40 text-gold text-[10px] tracking-[0.35em] uppercase px-8 py-3 hover:bg-gold hover:text-background transition-all duration-500 font-sans mt-2 w-fit">
              CONNECT WALLET
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
