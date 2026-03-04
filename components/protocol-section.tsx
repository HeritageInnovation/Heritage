import { Fingerprint, Lock, Scan, FileCheck, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const steps = [
  {
    number: "01",
    icon: Scan,
    title: "Physical Verification",
    description:
      "Multi-spectral analysis and biometric fingerprinting of each physical asset, producing a unique cryptographic hash.",
  },
  {
    number: "02",
    icon: Lock,
    title: "Sovereign Custody",
    description:
      "Assets are transferred to one of seven sovereign-grade vault facilities across three jurisdictions.",
  },
  {
    number: "03",
    icon: Fingerprint,
    title: "On-Chain Attestation",
    description:
      "A minimum 51% physical integrity quorum is maintained, verified by independent auditors every 72 hours.",
  },
  {
    number: "04",
    icon: FileCheck,
    title: "Insurance Binding",
    description:
      "Multi-layer insurance from Lloyd's syndicate partners, covering full replacement value plus 15% premium.",
  },
]

export function ProtocolSection() {
  return (
    <section id="protocol" className="py-24 lg:py-40 px-6 lg:px-12">
      {/* Section Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 lg:mb-32">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-gold" />
            <span className="text-[10px] tracking-[0.4em] text-gold uppercase font-sans">
              The Protocol
            </span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-ivory leading-[0.95] text-balance">
            51% Physical
            <br />
            <span className="italic text-gold-gradient">Integrity</span>
          </h2>
        </div>
        <div className="lg:col-span-5 lg:col-start-8 flex items-end">
          <p className="text-muted-foreground text-sm leading-relaxed max-w-md font-sans">
            Every asset in the Ricky Park auction ecosystem is bound by our
            proprietary integrity protocol. A minimum of 51% of any tokenized
            asset must maintain verified physical custody at all times.
          </p>
        </div>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-border">
        {steps.map((step) => (
          <div
            key={step.number}
            className="bg-background p-8 lg:p-10 group hover:bg-secondary/50 transition-colors duration-500"
          >
            <div className="flex items-center justify-between mb-8">
              <span className="text-[10px] tracking-[0.3em] text-muted-foreground font-sans">
                {step.number}
              </span>
              <step.icon className="w-5 h-5 text-gold/50 group-hover:text-gold transition-colors duration-500" />
            </div>
            <h3 className="font-serif text-lg text-ivory mb-4">{step.title}</h3>
            <p className="text-muted-foreground text-xs leading-relaxed font-sans">
              {step.description}
            </p>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="mt-16 text-center">
        <Link href="/protocol">
          <Button className="bg-gold hover:bg-gold/90 text-black font-sans">
            VIEW PROTOCOL
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </section>
  )
}
