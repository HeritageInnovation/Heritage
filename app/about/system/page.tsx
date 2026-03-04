"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Shield, 
  Users, 
  TrendingUp, 
  CheckCircle, 
  ArrowRight, 
  Award, 
  Eye, 
  Lock, 
  Zap,
  ArrowDown,
  Circle
} from "lucide-react"

export default function SystemPage() {
  const [activeLifecycleStep, setActiveLifecycleStep] = useState(0)

  const lifecycleSteps = [
    {
      id: 0,
      title: "Asset Submission",
      description: "Participants submit luxury assets for curation",
      icon: <Users className="w-6 h-6" />,
      color: "text-blue-400"
    },
    {
      id: 1,
      title: "Community Staking",
      description: "USDT staking and upvoting by participants",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "text-green-400"
    },
    {
      id: 2,
      title: "Expert Review",
      description: "Technical provenance verification by professionals",
      icon: <Eye className="w-6 h-6" />,
      color: "text-purple-400"
    },
    {
      id: 3,
      title: "Platform Approval",
      description: "51% platform governance validation",
      icon: <Shield className="w-6 h-6" />,
      color: "text-gold"
    },
    {
      id: 4,
      title: "Tokenization",
      description: "Fractional tokens minted on blockchain",
      icon: <Zap className="w-6 h-6" />,
      color: "text-orange-400"
    },
    {
      id: 5,
      title: "Trading Launch",
      description: "49% available for public trading",
      icon: <Award className="w-6 h-6" />,
      color: "text-red-400"
    }
  ]

  const pillars = [
    {
      title: "Curation Matrix",
      description: "Role-based asset verification system combining community wisdom with expert analysis",
      icon: <Users className="w-8 h-8" />,
      features: [
        "Participant submissions",
        "Expert verification",
        "Reputation scoring",
        "USDT staking"
      ]
    },
    {
      title: "Fractional Ownership",
      description: "Tokenization of luxury assets enabling accessible investment opportunities",
      icon: <TrendingUp className="w-8 h-8" />,
      features: [
        "49% public trading",
        "51% platform control",
        "Blockchain verification",
        "Instant settlement"
      ]
    },
    {
      title: "Governance Protocol",
      description: "Decentralized decision-making with platform oversight and transparency",
      icon: <Shield className="w-8 h-8" />,
      features: [
        "51/49 ownership split",
        "Expert validation",
        "Community voting",
        "Transparent governance"
      ]
    }
  ]

  const roles = [
    {
      title: "Participant",
      description: "Community members who discover, submit, and stake on luxury assets",
      icon: <Users className="w-12 h-12" />,
      color: "border-blue-400/50 hover:border-blue-400",
      bgColor: "bg-blue-400/10 hover:bg-blue-400/20",
      abilities: [
        "Submit new assets",
        "Stake USDT on submissions",
        "Earn reputation rewards",
        "Vote on curation"
      ]
    },
    {
      title: "Professional",
      description: "Verified experts who provide technical provenance and authentication",
      icon: <Eye className="w-12 h-12" />,
      color: "border-purple-400/50 hover:border-purple-400",
      bgColor: "bg-purple-400/10 hover:bg-purple-400/20",
      abilities: [
        "Verify asset authenticity",
        "Provide expert analysis",
        "Access restricted data",
        "Earn higher rewards"
      ]
    },
    {
      title: "Platform",
      description: "Governance layer maintaining protocol integrity and 51% control",
      icon: <Shield className="w-12 h-12" />,
      color: "border-gold/50 hover:border-gold",
      bgColor: "bg-gold/10 hover:bg-gold/20",
      abilities: [
        "Final approval authority",
        "Smart contract control",
        "Treasury management",
        "Protocol upgrades"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-[#050505] text-ivory">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent" />
        <div className="relative container mx-auto px-6 pt-32 pb-16">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-gold/20 text-gold border-gold/30 text-sm">
              <Shield className="w-4 h-4 mr-2" />
              Heritage Protocol
            </Badge>
            <h1 className="font-serif text-6xl lg:text-7xl text-ivory leading-[0.9] mb-6">
              The Future of
              <br />
              <span className="italic text-gold">Luxury Asset</span>
              <br />
              Fractionalization
            </h1>
            <p className="text-xl text-muted-foreground font-sans max-w-2xl mx-auto leading-relaxed">
              A revolutionary protocol combining community curation, expert verification, 
              and decentralized governance to bring luxury assets on-chain.
            </p>
          </div>
        </div>
      </div>

      {/* Three Pillars Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl text-ivory mb-4">Three Pillars</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The foundation of our protocol built on transparency, expertise, and accessibility
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className="group relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mb-6 group-hover:bg-gold/30 transition-colors duration-300">
                  <div className="text-gold">{pillar.icon}</div>
                </div>
                
                <h3 className="font-serif text-2xl text-ivory mb-4 group-hover:text-gold transition-colors duration-300">
                  {pillar.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {pillar.description}
                </p>
                
                <div className="space-y-2">
                  {pillar.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Circle className="w-2 h-2 fill-gold text-gold" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Asset Lifecycle Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl text-ivory mb-4">Asset Lifecycle</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From submission to trading - the complete journey of a luxury asset
          </p>
        </div>

        <div className="relative">
          {/* Connection Lines */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold/30 to-transparent -translate-y-1/2 hidden lg:block" />
          
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
            {lifecycleSteps.map((step, index) => (
              <div key={index} className="relative">
                {/* Vertical Line */}
                {index < lifecycleSteps.length - 1 && (
                  <div className="absolute top-12 left-1/2 w-0.5 h-16 bg-gold/20 -translate-x-1/2 lg:hidden" />
                )}
                
                <div
                  className={`text-center cursor-pointer transition-all duration-300 ${
                    activeLifecycleStep === index ? 'scale-110' : 'hover:scale-105'
                  }`}
                  onClick={() => setActiveLifecycleStep(index)}
                >
                  {/* Step Circle */}
                  <div className={`relative w-24 h-24 mx-auto mb-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    activeLifecycleStep === index 
                      ? 'border-gold bg-gold/20 shadow-lg shadow-gold/30' 
                      : 'border-white/20 bg-white/5 hover:border-gold/50'
                  }`}>
                    <div className={step.color}>
                      {step.icon}
                    </div>
                    
                    {/* Step Number */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gold text-black text-sm font-bold flex items-center justify-center">
                      {index + 1}
                    </div>
                  </div>
                  
                  {/* Step Content */}
                  <h3 className={`font-serif text-lg mb-2 transition-colors duration-300 ${
                    activeLifecycleStep === index ? 'text-gold' : 'text-ivory'
                  }`}>
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Step Detail */}
        <div className="mt-16 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0`}>
              <div className={lifecycleSteps[activeLifecycleStep].color}>
                {lifecycleSteps[activeLifecycleStep].icon}
              </div>
            </div>
            <div>
              <h3 className="font-serif text-2xl text-gold mb-2">
                {lifecycleSteps[activeLifecycleStep].title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {lifecycleSteps[activeLifecycleStep].description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Role Cards Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl text-ivory mb-4">Protocol Roles</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Different participants with unique responsibilities and rewards
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {roles.map((role, index) => (
            <div
              key={index}
              className={`group relative backdrop-blur-xl bg-white/5 rounded-2xl p-8 transition-all duration-500 hover:scale-105 border-2 ${role.color}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className={`w-20 h-20 mx-auto mb-6 rounded-full ${role.bgColor} flex items-center justify-center transition-colors duration-300`}>
                  <div className="text-gold">{role.icon}</div>
                </div>
                
                <h3 className="font-serif text-2xl text-ivory mb-4 text-center group-hover:text-gold transition-colors duration-300">
                  {role.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 text-center leading-relaxed">
                  {role.description}
                </p>
                
                <div className="space-y-3">
                  {role.abilities.map((ability, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm">
                      <CheckCircle className="w-4 h-4 text-gold flex-shrink-0" />
                      <span className="text-muted-foreground group-hover:text-ivory transition-colors duration-300">
                        {ability}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Governance Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl text-ivory mb-4">Governance Protocol</h2>
            <p className="text-lg text-muted-foreground">
              Ensuring platform integrity through balanced ownership
            </p>
          </div>

          {/* The 51/49 Rule Callout */}
          <div className="relative backdrop-blur-xl bg-gradient-to-r from-gold/10 to-gold/5 border-2 border-gold rounded-2xl p-10 mb-12">
            <div className="absolute top-6 right-6">
              <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-black" />
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                <Lock className="w-8 h-8 text-gold" />
              </div>
              <div>
                <h3 className="font-serif text-3xl text-gold mb-4">The 51/49 Rule</h3>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Heritage Platform maintains 51% ownership of all tokenized assets, 
                  ensuring long-term protocol stability and governance control. 
                  The remaining 49% is available for public trading, creating 
                  perfect balance between accessibility and control.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="backdrop-blur bg-white/5 rounded-xl p-4">
                    <div className="text-2xl font-bold text-gold mb-2">51%</div>
                    <div className="text-sm text-muted-foreground">Platform Control</div>
                  </div>
                  <div className="backdrop-blur bg-white/5 rounded-xl p-4">
                    <div className="text-2xl font-bold text-ivory mb-2">49%</div>
                    <div className="text-sm text-muted-foreground">Public Trading</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Governance Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
              <h4 className="font-serif text-xl text-ivory mb-4">Platform Benefits</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Protocol governance and upgrades</span>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Treasury management for growth</span>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Final approval authority</span>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Risk management protocols</span>
                </li>
              </ul>
            </div>

            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
              <h4 className="font-serif text-xl text-ivory mb-4">Investor Benefits</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Liquidity and trading access</span>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Fractional ownership opportunities</span>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Professional curation assurance</span>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Transparent asset verification</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
