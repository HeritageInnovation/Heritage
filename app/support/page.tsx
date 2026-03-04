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
              Assistance
            </span>
            <div className="w-8 h-[1px] bg-gold" />
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-ivory leading-[0.95] text-balance mb-6">
            Support Center
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto font-sans text-sm leading-relaxed">
            Dedicated assistance for collectors, traders, and asset holders. 
            Our concierge team is available to guide you through every step of your journey.
          </p>
        </div>

        {/* Support Channels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: Mail,
              title: "Email Support",
              description: "Detailed inquiries and documentation requests",
              contact: "support@heritage.demo",
              hours: "24-48 hour response",
            },
            {
              icon: MessageCircle,
              title: "Live Chat",
              description: "Real-time assistance for urgent matters",
              contact: "Available 9AM-6PM EST",
              hours: "Instant response",
            },
            {
              icon: Shield,
              title: "Security Team",
              description: "Account security and verification issues",
              contact: "security@heritage.demo",
              hours: "Priority handling",
            },
          ].map((channel, i) => (
            <div
              key={i}
              className="border border-border bg-card p-8 hover:border-gold/40 transition-colors duration-500"
            >
              <channel.icon className="w-6 h-6 text-gold mb-4" />
              <h3 className="font-serif text-xl text-ivory mb-2">{channel.title}</h3>
              <p className="text-muted-foreground text-sm font-sans mb-4">
                {channel.description}
              </p>
              <p className="text-gold text-sm font-sans">{channel.contact}</p>
              <p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase font-sans mt-2">
                {channel.hours}
              </p>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <HelpCircle className="w-5 h-5 text-gold" />
            <h2 className="font-serif text-2xl text-ivory">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "How does fractional ownership work?",
                answer:
                  "Fractional ownership allows multiple investors to collectively own a high-value asset. Each share represents a percentage of ownership, entitling holders to proportional benefits including potential appreciation and revenue streams.",
              },
              {
                question: "What is the Physical Integrity Protocol?",
                answer:
                  "Our proprietary protocol ensures every asset is authenticated, insured, and stored in world-class facilities. Blockchain verification provides immutable provenance records, while regular third-party audits maintain 99.8% integrity assurance.",
              },
              {
                question: "How do I verify my identity for trading?",
                answer:
                  "Complete KYC verification through your profile settings. You'll need a government-issued ID and proof of address. Verification typically completes within 24 hours, unlocking full trading capabilities.",
              },
              {
                question: "What are the trading fees?",
                answer:
                  "Heritage charges a 0.3% protocol fee per trade. Network gas fees apply for blockchain transactions. No hidden charges or withdrawal fees for verified accounts.",
              },
              {
                question: "How is asset custody handled?",
                answer:
                  "All physical assets are stored in specialized facilities with climate control, security systems, and comprehensive insurance. Digital assets are held in institutional-grade cold storage with multi-signature protection.",
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
              <FileText className="w-5 h-5 text-gold" />
              <h3 className="font-serif text-xl text-ivory">Documentation</h3>
            </div>
            <ul className="space-y-3">
              {[
                "Platform Overview",
                "Trading Guide",
                "Wallet Setup Tutorial",
                "Asset Verification Process",
                "API Documentation",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-muted-foreground text-sm font-sans">
                  <div className="w-1 h-1 bg-gold rounded-full" />
                  <a href="#" className="hover:text-gold transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-border bg-card p-8">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-5 h-5 text-gold" />
              <h3 className="font-serif text-xl text-ivory">Response Times</h3>
            </div>
            <ul className="space-y-3 text-sm font-sans">
              <li className="flex justify-between text-muted-foreground">
                <span>General Inquiries</span>
                <span className="text-ivory">24-48 hours</span>
              </li>
              <li className="flex justify-between text-muted-foreground">
                <span>Account Issues</span>
                <span className="text-ivory">12-24 hours</span>
              </li>
              <li className="flex justify-between text-muted-foreground">
                <span>Security Concerns</span>
                <span className="text-gold">4 hours priority</span>
              </li>
              <li className="flex justify-between text-muted-foreground">
                <span>Live Chat</span>
                <span className="text-ivory">Instant</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Form */}
        <div className="border border-border bg-card p-8 lg:p-12">
          <h2 className="font-serif text-2xl text-ivory mb-8 text-center">Submit a Request</h2>
          <form className="max-w-2xl mx-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-2 font-sans">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full bg-background border border-border px-4 py-3 text-ivory outline-none focus:border-gold transition-colors duration-300 font-sans"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-2 font-sans">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full bg-background border border-border px-4 py-3 text-ivory outline-none focus:border-gold transition-colors duration-300 font-sans"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-2 font-sans">
                Subject
              </label>
              <select className="w-full bg-background border border-border px-4 py-3 text-ivory outline-none focus:border-gold transition-colors duration-300 font-sans">
                <option>General Inquiry</option>
                <option>Account Issue</option>
                <option>Trading Question</option>
                <option>Security Concern</option>
                <option>Asset Verification</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-2 font-sans">
                Message
              </label>
              <textarea
                rows={5}
                className="w-full bg-background border border-border px-4 py-3 text-ivory outline-none focus:border-gold transition-colors duration-300 font-sans resize-none"
                placeholder="Describe your inquiry in detail..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gold hover:bg-gold-light text-background text-sm tracking-[0.3em] uppercase py-4 transition-colors duration-300 font-sans"
            >
              Submit Request
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </main>
  )
}
