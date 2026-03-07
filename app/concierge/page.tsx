import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Mail, MessageCircle, FileText, Shield, Clock, HelpCircle } from "lucide-react"

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="pt-24 pb-12 px-6 lg:px-12 max-w-7xl mx-auto">
        {/* Header - Mobile Optimized */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-6 lg:w-8 h-[1px] bg-gold" />
            <span className="text-[8px] lg:text-[10px] tracking-[0.4em] text-gold uppercase font-sans">
              Client Relations
            </span>
            <div className="w-6 lg:w-8 h-[1px] bg-gold" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-6xl text-ivory leading-[0.95] text-balance mb-4">
            Concierge & Advisory
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto font-sans text-sm leading-relaxed px-4">
            Personalized stewardship for global collectors and institutional partners. 
            Our specialists are available to facilitate your transactions and asset management.
          </p>
        </div>

        {/* Support Channels - Mobile Optimized */}
        <div className="space-y-4 mb-12">
          {[
            {
              icon: Mail,
              title: "Private Correspondence",
              description: "Formal inquiries, documentation, institutional requests",
              contact: "relations@heritage.luxury",
              hours: "Next business day",
            },
            {
              icon: MessageCircle,
              title: "Direct Desk",
              description: "Real-time facilitation for active trading",
              contact: "09:00—18:00 EST",
              hours: "Immediate",
            },
            {
              icon: Shield,
              title: "Asset Security",
              description: "Vaulting, verification, account protection",
              contact: "security@heritage.luxury",
              hours: "4-hour priority",
            },
          ].map((channel, i) => (
            <div
              key={i}
              className="border border-border bg-card p-4 lg:p-8 hover:border-gold/40 transition-colors duration-500"
            >
              <div className="flex items-start gap-4">
                <channel.icon className="w-4 h-4 lg:w-5 lg:h-5 text-gold stroke-[1.5px] flex-shrink-0 mt-1" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif text-lg lg:text-xl text-ivory mb-2">{channel.title}</h3>
                  <p className="text-muted-foreground text-sm font-sans mb-3 leading-relaxed">
                    {channel.description}
                  </p>
                  <p className="text-gold text-sm font-sans font-medium tracking-tight break-all">{channel.contact}</p>
                  <p className="text-[8px] lg:text-[9px] tracking-[0.2em] text-muted-foreground uppercase font-sans mt-2 border-t border-border pt-2">
                    {channel.hours}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section - Mobile Simplified */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle className="w-3 h-3 lg:w-4 lg:h-4 text-gold" />
            <h2 className="font-serif text-xl lg:text-2xl text-ivory tracking-tight">Platform Intelligence</h2>
          </div>

          <div className="space-y-3">
            {[
              {
                question: "Fractional Ownership",
                answer: "Assets are legally structured into discrete fractional interests with verifiable claims on physical assets via immutable ledger entries.",
              },
              {
                question: "Physical Integrity Protocol",
                answer: "Every asset undergoes rigorous authentication and appraisal by certified specialists before being secured in Tier-IV climate-controlled vaults.",
              },
              {
                question: "Identity Verification",
                answer: "All participants must complete institutional-grade KYC/AML screening. Onboarding typically concludes within one business cycle.",
              },
              {
                question: "Brokerage Fees",
                answer: "Heritage maintains a transparent 0.3% brokerage fee per execution covering global custody, insurance, and ledger maintenance.",
              },
              {
                question: "Custodial Safeguards",
                answer: "Physical holdings are protected by comprehensive insurance. Digital positions use institutional cold storage with multi-signature protocols.",
              },
            ].map((faq, i) => (
              <div key={i} className="border border-border bg-card p-4 lg:p-6">
                <h3 className="font-serif text-base lg:text-lg text-ivory mb-2">{faq.question}</h3>
                <p className="text-muted-foreground text-sm font-sans leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Resources - Mobile Stacked */}
        <div className="space-y-4 mb-12">
          <div className="border border-border bg-card p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-3 h-3 lg:w-4 lg:h-4 text-gold" />
              <h3 className="font-serif text-lg lg:text-xl text-ivory">Resources</h3>
            </div>
            <ul className="space-y-3">
              {[
                "Protocol Whitepaper",
                "Asset Valuation Framework",
                "Custodial Standards",
                "Legal & Regulatory Overview",
                "API Documentation",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-muted-foreground text-sm font-sans">
                  <div className="w-1 h-[1px] bg-gold" />
                  <a href="#" className="hover:text-gold transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-border bg-card p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-3 h-3 lg:w-4 lg:h-4 text-gold" />
              <h3 className="font-serif text-lg lg:text-xl text-ivory">Service Standards</h3>
            </div>
            <ul className="space-y-3 text-sm font-sans">
              <li className="flex justify-between border-b border-border pb-2 text-muted-foreground">
                <span>Advisory</span>
                <span className="text-ivory">24—48h</span>
              </li>
              <li className="flex justify-between border-b border-border pb-2 text-muted-foreground">
                <span>Stewardship</span>
                <span className="text-ivory">12—24h</span>
              </li>
              <li className="flex justify-between border-b border-border pb-2 text-muted-foreground">
                <span>Security</span>
                <span className="text-gold font-medium">4h</span>
              </li>
              <li className="flex justify-between text-muted-foreground">
                <span>Digital</span>
                <span className="text-ivory">Immediate</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Form - Mobile Simplified */}
        <div className="border border-border bg-card p-6 lg:p-16">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-2xl lg:text-3xl text-ivory mb-2 text-center tracking-tight">Formal Request</h2>
            <p className="text-center text-muted-foreground text-[9px] lg:text-[10px] uppercase tracking-[0.3em] mb-8 lg:mb-12 font-sans">Submit for Executive Review</p>
            
            <form className="space-y-6">
              <div className="space-y-4">
                <div className="group">
                  <label className="block text-[9px] lg:text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-2 lg:mb-3 font-sans group-focus-within:text-gold transition-colors">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-transparent border-b border-border py-2 text-ivory outline-none focus:border-gold transition-colors duration-500 font-sans text-sm"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="group">
                  <label className="block text-[9px] lg:text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-2 lg:mb-3 font-sans group-focus-within:text-gold transition-colors">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full bg-transparent border-b border-border py-2 text-ivory outline-none focus:border-gold transition-colors duration-500 font-sans text-sm"
                    placeholder="email@example.com"
                  />
                </div>
              </div>
              <div className="group">
                <label className="block text-[9px] lg:text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-2 lg:mb-3 font-sans group-focus-within:text-gold transition-colors">
                  Inquiry Type
                </label>
                <select className="w-full bg-transparent border-b border-border py-2 text-ivory outline-none focus:border-gold transition-colors duration-500 font-sans text-sm appearance-none cursor-pointer">
                  <option className="bg-card">General Advisory</option>
                  <option className="bg-card">Trade Execution</option>
                  <option className="bg-card">Security Protocol</option>
                  <option className="bg-card">Compliance Inquiry</option>
                  <option className="bg-card">Asset Liquidation</option>
                </select>
              </div>
              <div className="group">
                <label className="block text-[9px] lg:text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-2 lg:mb-3 font-sans group-focus-within:text-gold transition-colors">
                  Message
                </label>
                <textarea
                  rows={3}
                  className="w-full bg-transparent border-b border-border py-2 text-ivory outline-none focus:border-gold transition-colors duration-500 font-sans resize-none text-sm leading-relaxed"
                  placeholder="Describe your inquiry..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gold hover:bg-gold-light text-background text-[9px] lg:text-[10px] tracking-[0.5em] uppercase py-4 lg:py-5 transition-all duration-500 font-sans font-bold"
              >
                Dispatch Request
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}