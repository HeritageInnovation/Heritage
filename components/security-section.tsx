import { MapPin, Shield, Building2, BadgeCheck } from "lucide-react"

const vaults = [
  {
    city: "Zurich",
    country: "Switzerland",
    type: "Freeport Sovereign Vault",
    capacity: "CHF 4.2M",
    status: "Active",
  },
  {
    city: "Hong Kong",
    country: "China",
    type: "Le Freeport MBS",
    capacity: "HKD 2.8M",
    status: "Active",
  },
  {
    city: "Bangkok",
    country: "Thailand",
    type: "Siam Deep Storage",
    capacity: "THB 3.1B",
    status: "Active",
  },
  {
    city: "Dubai",
    country: "UAE",
    type: "DMCC Sovereign Hold",
    capacity: "AED 5.6M",
    status: "Active",
  },
]

const insurancePartners = [
  {
    name: "Lloyd's of London",
    coverage: "Full Replacement + 15%",
    syndicate: "Syndicate 2623",
  },
  {
    name: "Swiss Re",
    coverage: "Catastrophic Loss",
    syndicate: "Treaty 4410",
  },
  {
    name: "AXA XL",
    coverage: "Transit & Transfer",
    syndicate: "Programme RP-7",
  },
]

export function SecuritySection() {
  return (
    <section id="security" className="py-24 lg:py-40 px-6 lg:px-12">
      {/* Section Header */}
      <div className="mb-20 lg:mb-32">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-[1px] bg-gold" />
          <span className="text-[10px] tracking-[0.4em] text-gold uppercase font-sans">
            Custody & Insurance
          </span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6">
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-ivory leading-[0.95] text-balance">
              Institutional
              <br />
              <span className="italic text-gold-gradient">Security</span>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 flex items-end">
            <p className="text-muted-foreground text-sm leading-relaxed font-sans">
              Multi-jurisdictional vault network with sovereign-grade physical
              security. Every asset insured through Lloyd's syndicate partners.
            </p>
          </div>
        </div>
      </div>

      {/* Vault Locations */}
      <div className="mb-20 lg:mb-28">
        <div className="flex items-center gap-3 mb-10">
          <Building2 className="w-4 h-4 text-gold/60" />
          <span className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase font-sans">
            Vault Network
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-border">
          {vaults.map((vault) => (
            <div
              key={vault.city}
              className="bg-background p-8 group hover:bg-secondary/30 transition-colors duration-500"
            >
              <div className="flex items-center gap-2 mb-6">
                <MapPin className="w-3.5 h-3.5 text-gold" />
                <span className="text-[9px] tracking-[0.2em] text-gold uppercase font-sans">
                  {vault.status}
                </span>
              </div>

              <h3 className="font-serif text-2xl text-ivory mb-1">{vault.city}</h3>
              <p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-6 font-sans">
                {vault.country}
              </p>

              <div className="border-t border-border pt-4">
                <p className="text-[9px] tracking-[0.2em] text-muted-foreground uppercase mb-1 font-sans">
                  {vault.type}
                </p>
                <p className="text-sm text-ivory font-sans">
                  Capacity: {vault.capacity}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Insurance Partners */}
      <div>
        <div className="flex items-center gap-3 mb-10">
          <Shield className="w-4 h-4 text-gold/60" />
          <span className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase font-sans">
            Insurance Partners
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-border">
          {insurancePartners.map((partner) => (
            <div
              key={partner.name}
              className="bg-background p-8 lg:p-10 group hover:bg-secondary/30 transition-colors duration-500"
            >
              <div className="flex items-center gap-2 mb-6">
                <BadgeCheck className="w-4 h-4 text-gold/50 group-hover:text-gold transition-colors duration-500" />
                <span className="text-[9px] tracking-[0.2em] text-muted-foreground uppercase font-sans">
                  Verified Partner
                </span>
              </div>
              <h3 className="font-serif text-xl text-ivory mb-4">
                {partner.name}
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] tracking-[0.2em] text-muted-foreground uppercase font-sans">
                    Coverage
                  </span>
                  <span className="text-xs text-ivory font-sans">
                    {partner.coverage}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[9px] tracking-[0.2em] text-muted-foreground uppercase font-sans">
                    Reference
                  </span>
                  <span className="text-xs text-gold font-sans">
                    {partner.syndicate}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
