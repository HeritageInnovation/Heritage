export function Footer() {
  return (
    <footer className="border-t border-border px-6 lg:px-12 py-16 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 lg:mb-24">
        {/* Brand */}
        <div className="lg:col-span-4">
          <div className="flex flex-col leading-none mb-6">
            <span className="font-serif text-2xl tracking-[0.1em] text-ivory">
              RICKY PARK
            </span>
            <span className="text-[9px] tracking-[0.4em] text-gold uppercase mt-1.5">
              Auction House
            </span>
          </div>
          <p className="text-muted-foreground text-xs leading-relaxed max-w-xs font-sans">
            Institutional-grade Real World Asset tranding with sovereign
            custody and cryptographic proof of integrity.
          </p>
        </div>

        {/* Links */}
        <div className="lg:col-span-2 lg:col-start-6">
          <h4 className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-6 font-sans">
            Platform
          </h4>
          <div className="flex flex-col gap-3">
            {["Curated Lots", "Protocol", "Security", "Provenance"].map(
              (link) => (
                <a
                  key={link}
                  href="#"
                  className="text-xs text-ivory/60 hover:text-gold transition-colors duration-300 font-sans"
                >
                  {link}
                </a>
              )
            )}
          </div>
        </div>

        <div className="lg:col-span-2">
          <h4 className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-6 font-sans">
            Legal
          </h4>
          <div className="flex flex-col gap-3">
            {["Terms of Service", "Privacy Policy", "AML Policy", "Risk Disclosure"].map(
              (link) => (
                <a
                  key={link}
                  href="#"
                  className="text-xs text-ivory/60 hover:text-gold transition-colors duration-300 font-sans"
                >
                  {link}
                </a>
              )
            )}
          </div>
        </div>

        <div className="lg:col-span-2">
          <h4 className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-6 font-sans">
            Contact
          </h4>
          <div className="flex flex-col gap-3">
            {["Institutional Desk", "Press", "Careers", "Support"].map(
              (link) => (
                <a
                  key={link}
                  href="#"
                  className="text-xs text-ivory/60 hover:text-gold transition-colors duration-300 font-sans"
                >
                  {link}
                </a>
              )
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <p className="text-[10px] tracking-[0.2em] text-muted-foreground font-sans">
          MMXXVI RICKY PARK. ALL RIGHTS RESERVED.
        </p>
        <p className="text-[10px] tracking-[0.2em] text-muted-foreground font-sans">
          ZURICH / SINGAPORE / LONDON / DUBAI / HONG KONG / BANGKOK
        </p>
      </div>
    </footer>
  )
}
