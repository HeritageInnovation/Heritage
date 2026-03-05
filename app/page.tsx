import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { CuratedLots } from "@/components/curated-lots"
import { ProtocolSection } from "@/components/protocol-section"
import { SecuritySection } from "@/components/security-section"
import { ProvenanceSection } from "@/components/provenance-section"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <HeroSection />

      {/* Gold Divider */}
      <div className="px-6 lg:px-12">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      </div>

      <CuratedLots />

      <div className="px-6 lg:px-12">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      </div>

      <ProtocolSection />

      <div className="px-6 lg:px-12">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      </div>

      <SecuritySection />

      <div className="px-6 lg:px-12">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      </div>

      <ProvenanceSection />

      <Footer />
    </main>
  )
}