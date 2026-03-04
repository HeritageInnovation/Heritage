"use client"

import { getReputationTier } from '@/lib/reputation'

interface ReputationBadgeProps {
  reputationScore: number
  showScore?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function ReputationBadge({ 
  reputationScore, 
  showScore = true, 
  size = 'md' 
}: ReputationBadgeProps) {
  const tier = getReputationTier(reputationScore)
  
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2'
  }
  
  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  }
  
  return (
    <div className={`inline-flex items-center gap-1.5 rounded-full border ${sizeClasses[size]} ${
      tier.tier === 'Platinum' 
        ? 'bg-platinum-500/10 border-platinum-500/30 text-platinum-400'
        : tier.tier === 'Gold'
        ? 'bg-gold-500/10 border-gold-500/30 text-gold-400'
        : tier.tier === 'Silver'
        ? 'bg-silver-500/10 border-silver-500/30 text-silver-400'
        : tier.tier === 'Bronze'
        ? 'bg-bronze-500/10 border-bronze-500/30 text-bronze-400'
        : 'bg-muted/10 border-muted/30 text-muted-foreground'
    }`}>
      {/* Tier Icon */}
      <div className={`rounded-full ${iconSizes[size]} ${
        tier.tier === 'Platinum' 
          ? 'bg-gradient-to-br from-platinum-400 to-platinum-600'
          : tier.tier === 'Gold'
          ? 'bg-gradient-to-br from-gold-400 to-gold-600'
          : tier.tier === 'Silver'
          ? 'bg-gradient-to-br from-silver-400 to-silver-600'
          : tier.tier === 'Bronze'
          ? 'bg-gradient-to-br from-bronze-400 to-bronze-600'
          : 'bg-gradient-to-br from-muted to-muted-foreground'
      }`} />
      
      {/* Tier Name */}
      <span className="font-medium tracking-[0.05em] uppercase">
        {tier.tier}
      </span>
      
      {/* Score */}
      {showScore && (
        <span className="opacity-70 font-mono text-xs">
          {reputationScore}
        </span>
      )}
    </div>
  )
}
