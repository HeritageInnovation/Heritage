"use client"

import { useState, useEffect } from "react"
import { ScoutView } from "./ScoutView"
import { ExpertView } from "./ExpertView"
import { InvestorView } from "./InvestorView"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Shield, TrendingUp, Eye } from "lucide-react"

type UserRole = "participant" | "professional" | "investor"
type ViewType = "scout" | "expert" | "investor"

interface CurationDashboardProps {
  userAddress: string
  userRole?: UserRole
}

export function CurationDashboard({ userAddress, userRole = "participant" }: CurationDashboardProps) {
  const [activeView, setActiveView] = useState<ViewType>(() => {
    // Set default view based on user role
    switch (userRole) {
      case "professional":
        return "expert"
      case "investor":
        return "investor"
      default:
        return "scout"
    }
  })

  const views = [
    {
      id: "scout" as ViewType,
      name: "Scout View",
      description: "Submit and upvote assets",
      icon: Users,
      allowedRoles: ["participant", "professional", "investor"],
      color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    },
    {
      id: "expert" as ViewType,
      name: "Expert View",
      description: "Review technical provenance",
      icon: Shield,
      allowedRoles: ["professional"],
      color: "bg-green-500/20 text-green-400 border-green-500/30",
    },
    {
      id: "investor" as ViewType,
      name: "Investor View",
      description: "Purchase fractional tokens",
      icon: TrendingUp,
      allowedRoles: ["investor", "professional"],
      color: "bg-gold/20 text-gold border-gold/30",
    },
  ]

  const availableViews = views.filter(view => view.allowedRoles.includes(userRole))

  const renderActiveView = () => {
    switch (activeView) {
      case "scout":
        return <ScoutView userAddress={userAddress} />
      case "expert":
        return <ExpertView userAddress={userAddress} />
      case "investor":
        return <InvestorView userAddress={userAddress} />
      default:
        return <ScoutView userAddress={userAddress} />
    }
  }

  const getRoleBadge = () => {
    switch (userRole) {
      case "professional":
        return (
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
            <Shield className="w-3 h-3 mr-1" />
            Professional
          </Badge>
        )
      case "investor":
        return (
          <Badge className="bg-gold/20 text-gold border-gold/30">
            <TrendingUp className="w-3 h-3 mr-1" />
            Investor
          </Badge>
        )
      default:
        return (
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
            <Users className="w-3 h-3 mr-1" />
            Participant
          </Badge>
        )
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-serif text-3xl text-ivory mb-2">Curation Matrix</h1>
              <p className="text-muted-foreground">Role-based asset curation and fractional investment platform</p>
            </div>
            
            <div className="flex items-center gap-4">
              {getRoleBadge()}
              <div className="text-sm text-muted-foreground">
                {userAddress.slice(0, 8)}...{userAddress.slice(-6)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* View Navigation */}
      <div className="border-b border-border bg-background">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-sans uppercase tracking-[0.2em] text-muted-foreground mr-4">
              Views:
            </span>
            {availableViews.map((view) => {
              const Icon = view.icon
              const isActive = activeView === view.id
              
              return (
                <Button
                  key={view.id}
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveView(view.id)}
                  className={`${
                    isActive 
                      ? view.color 
                      : "border-border text-muted-foreground hover:text-ivory"
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {view.name}
                </Button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Active View Content */}
      <div className="container mx-auto px-6 py-8">
        {renderActiveView()}
      </div>

      {/* View Information Panel */}
      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-card border border-border rounded-lg p-4 shadow-lg max-w-xs">
          <div className="flex items-center gap-2 mb-2">
            <Eye className="w-4 h-4 text-gold" />
            <span className="text-sm font-sans text-gold">Current View</span>
          </div>
          <div className="space-y-1">
            <div className="font-serif text-ivory">
              {views.find(v => v.id === activeView)?.name}
            </div>
            <div className="text-xs text-muted-foreground">
              {views.find(v => v.id === activeView)?.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
