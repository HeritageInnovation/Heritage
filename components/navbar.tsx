"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { client } from "@/lib/client" 
import { ConnectButton } from "thirdweb/react"
import { Shield, Menu, X } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => setMounted(true), [])

  const navLinks = [
    { name: "EXCHANGE", href: "/trade" },
    { name: "MATRIX", href: "/matrix" },
    { name: "VAULT", href: "/profile" },
    { name: "GOVERNANCE", href: "/protocol" },
    { name: "CONCIERGE", href: "/support" },
  ]

  if (!mounted) return null

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-black/60 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Brand Identity */}
        <Link href="/" className="flex items-center gap-2 group">
          <Shield className="w-6 h-6 text-gold transition-all group-hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
          <span className="font-serif text-2xl tracking-tighter text-ivory uppercase">Heritage</span>
        </Link>

        {/* Desktop Navigation - Elite Naming */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[10px] tracking-[0.4em] uppercase transition-all relative py-2 ${
                pathname === link.href 
                  ? "text-gold font-bold" 
                  : "text-muted-foreground hover:text-ivory"
              }`}
            >
              {link.name}
              {pathname === link.href && (
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gold shadow-[0_0_10px_#D4AF37]" />
              )}
            </Link>
          ))}
        </div>

        {/* Action Area */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <ConnectButton 
              client={client}
              theme="dark"
              connectButton={{
                className: "!bg-gold/10 !border !border-gold/30 !text-gold !rounded-full !px-6 !py-2 !text-[10px] !uppercase !tracking-widest hover:!bg-gold/20 transition-all",
                label: "Connect Identity"
              }}
            />
          </div>
          
          <button 
            className="lg:hidden text-ivory p-2 hover:bg-white/5 rounded-lg transition-colors" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden bg-black/95 backdrop-blur-2xl border-b border-white/10 p-8 flex flex-col gap-8 animate-in fade-in slide-in-from-top-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`text-[12px] tracking-[0.5em] uppercase ${
                pathname === link.href ? "text-gold" : "text-ivory/60"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-6 border-t border-white/10">
            <ConnectButton client={client} theme="dark" />
          </div>
        </div>
      )}
    </nav>
  )
}