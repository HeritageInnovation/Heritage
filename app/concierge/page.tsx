import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Mail, MessageCircle, FileText, Shield, Clock, HelpCircle } from "lucide-react"

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="pt-32 pb-16 px-6 lg:px-12 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-gold" />
            <span className="text-[10px] tracking-[0.4em] text-gold uppercase font-sans">
              Client Relations
            </span>
            <div className="w-8 h-[1px] bg-gold" />
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-ivory leading-[0.95] text-balance mb-6">
            Concierge & Advisory
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto font-sans text-sm leading-relaxed">
            Personalized stewardship for global collectors and institutional partners. 
            Our specialists are available to facilitate your transactions and asset management.
          </p>
        </div>

        {/* Support Channels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: Mail,
              title: "Private Correspondence",
              description: "For formal inquiries, documentation, and institutional requests",
              contact: "relations@heritage.luxury",
              hours: "Next business day response",
            },
            {
              icon: MessageCircle,
              title: "Direct Desk",
              description: "Real-time facilitation for active trading and platform navigation",
              contact: "09:00—18:00 EST",
              hours: "Immediate connectivity",
            },
            {
              icon: Shield,
              title: "Asset Security",
              description: "Protocol for vaulting, verification, and account protection",
              contact: "security@heritage.luxury",
              hours: "Priority 4-hour protocol",
            },
          ].map((channel, i) => (
            <div
              key={i}
              className="border border-border bg-card p-8 hover:border-gold/40 transition-colors duration-500"
            >
              <channel.icon className="w-5 h-5 text-gold mb-6 stroke-[1.5px]" />
              <h3 className="font-serif text-xl text-ivory mb-2">{channel.title}</h3>
              <p className="text-muted-foreground text-sm font-sans mb-4 leading-relaxed">
                {channel.description}
              </p>
              <p className="text-gold text-sm font-sans font-medium tracking-tight">{channel.contact}</p>
              <p className="text-[9px] tracking-[0.2em] text-muted-foreground uppercase font-sans mt-3 border-t border-border pt-3">
                {channel.hours}
              </p>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <HelpCircle className="w-4 h-4 text-gold" />
            <h2 className="font-serif text-2xl text-ivory tracking-tight">Platform Intelligence</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {[
              {
                question: "The Mechanics of Fractional Ownership",
                answer:
                  "Assets are legally structured into discrete fractional interests. Each unit represents a verifiable claim on the underlying physical asset, documented via immutable ledger entries and legally binding frameworks.",
              },
              {
                question: "The Physical Integrity Protocol",
                answer:
                  "Every asset undergoes rigorous authentication and appraisal by certified specialists before being secured in Tier-IV climate-controlled vaults. We maintain an audited 99.8% integrity assurance across the portfolio.",
              },
              {
                question: "Identity Verification & Compliance",
                answer:
                  "To maintain the security of our private marketplace, all participants must complete institutional-grade KYC/AML screening. Onboarding typically concludes within one business cycle.",
              },
              {
                question: "Brokerage & Protocol Surcharges",
                answer:
                  "Heritage maintains a transparent 0.3% brokerage fee per execution. This covers global custody, multi-risk insurance, and ledger maintenance. We operate with zero hidden carry costs.",
              },
              {
                question: "Custodial Safeguards",
                answer:
                  "Physical holdings are protected by comprehensive insurance and specialized security. Digital positions are secured via institutional cold storage with multi-signature authorization protocols.",
              },
            ].map((faq, i) => (
              <div key={i} className="border border-border bg-card p-6">
                <h3 className="font-serif text-lg text-ivory mb-3">{faq.question}</h3>
                <p className="text-muted-foreground text-sm font-sans leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="border border-border bg-card p-8">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-4 h-4 text-gold" />
              <h3 className="font-serif text-xl text-ivory">Institutional Resources</h3>
            </div>
            <ul className="space-y-4">
              {[
                "Protocol Whitepaper",
                "Asset Valuation Framework",
                "Custodial Standards",
                "Legal & Regulatory Overview",
                "API Technical Documentation",
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

          <div className="border border-border bg-card p-8">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-4 h-4 text-gold" />
              <h3 className="font-serif text-xl text-ivory">Service Standards</h3>
            </div>
            <ul className="space-y-4 text-sm font-sans">
              <li className="flex justify-between border-b border-border pb-2 text-muted-foreground">
                <span>Advisory Inquiries</span>
                <span className="text-ivory">24—48 Hours</span>
              </li>
              <li className="flex justify-between border-b border-border pb-2 text-muted-foreground">
                <span>Account Stewardship</span>
                <span className="text-ivory">12—24 Hours</span>
              </li>
              <li className="flex justify-between border-b border-border pb-2 text-muted-foreground">
                <span>Security Escalations</span>
                <span className="text-gold font-medium">4-Hour Priority</span>
              </li>
              <li className="flex justify-between text-muted-foreground">
                <span>Digital Concierge</span>
                <span className="text-ivory">Immediate</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Form */}
        <div className="border border-border bg-card p-8 lg:p-16">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl text-ivory mb-2 text-center tracking-tight">Formal Request</h2>
            <p className="text-center text-muted-foreground text-[10px] uppercase tracking-[0.3em] mb-12 font-sans">Submit for Executive Review</p>
            
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group">
                  <label className="block text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-3 font-sans group-focus-within:text-gold transition-colors">
                    Legal Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-transparent border-b border-border py-2 text-ivory outline-none focus:border-gold transition-colors duration-500 font-sans text-sm"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="group">
                  <label className="block text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-3 font-sans group-focus-within:text-gold transition-colors">
                    Institutional Email
                  </label>
                  <input
                    type="email"
                    className="w-full bg-transparent border-b border-border py-2 text-ivory outline-none focus:border-gold transition-colors duration-500 font-sans text-sm"
                    placeholder="email@example.com"
                  />
                </div>
              </div>
              <div className="group">
                <label className="block text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-3 font-sans group-focus-within:text-gold transition-colors">
                  Inquiry Classification
                </label>
                <select className="w-full bg-transparent border-b border-border py-2 text-ivory outline-none focus:border-gold transition-colors duration-500 font-sans text-sm appearance-none cursor-pointer">
                  <option className="bg-card">General Portfolio Advisory</option>
                  <option className="bg-card">High-Value Trade Execution</option>
                  <option className="bg-card">Custodial & Security Protocol</option>
                  <option className="bg-card">Regulatory & Compliance Inquiry</option>
                  <option className="bg-card">Asset Liquidation Request</option>
                </select>
              </div>
              <div className="group">
                <label className="block text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-3 font-sans group-focus-within:text-gold transition-colors">
                  Detailed Briefing
                </label>
                <textarea
                  rows={4}
                  className="w-full bg-transparent border-b border-border py-2 text-ivory outline-none focus:border-gold transition-colors duration-500 font-sans resize-none text-sm leading-relaxed"
                  placeholder="Describe your inquiry..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gold hover:bg-gold-light text-background text-[10px] tracking-[0.5em] uppercase py-5 transition-all duration-500 font-sans font-bold"
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