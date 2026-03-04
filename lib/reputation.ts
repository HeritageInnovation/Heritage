import { sanityClient } from './sanity'

export interface UserReputation {
  reputationScore: number
  successfulCurations: number
  totalStaked: number
  rewardMultiplier: number
}

export interface CurationReward {
  baseReward: number
  bonusReward: number
  totalReward: number
  multiplier: number
}

// Calculate reward multiplier based on user's reputation and successful curations
export function calculateRewardMultiplier(user: {
  reputationScore: number
  successfulCurations: number
  totalStaked: number
}): number {
  const { reputationScore, successfulCurations, totalStaked } = user
  
  // Base multiplier starts at 1.0x
  let multiplier = 1.0
  
  // Reputation bonus: +0.1x per 100 reputation points, max +0.5x
  const reputationBonus = Math.min(reputationScore / 1000, 0.5)
  multiplier += reputationBonus
  
  // Success bonus: +0.2x per 5 successful curations, max +1.0x
  const successBonus = Math.min((successfulCurations / 5) * 0.2, 1.0)
  multiplier += successBonus
  
  // Staking bonus: +0.1x per 1000 USDT staked, max +0.3x
  const stakingBonus = Math.min(totalStaked / 10000, 0.3)
  multiplier += stakingBonus
  
  return Math.round(multiplier * 100) / 100 // Round to 2 decimal places
}

// Calculate curation rewards based on multiplier
export function calculateCurationReward(
  baseReward: number,
  multiplier: number
): CurationReward {
  const bonusReward = baseReward * (multiplier - 1)
  const totalReward = baseReward * multiplier
  
  return {
    baseReward,
    bonusReward,
    totalReward,
    multiplier,
  }
}

// Update user reputation after successful curation
export async function updateUserReputation(
  walletAddress: string,
  curationSuccess: boolean,
  stakedAmount: number = 0
): Promise<UserReputation> {
  try {
    // Get current user data
    const user = await sanityClient.fetch(
      `*[_type == "user" && walletAddress == $walletAddress][0]`,
      { walletAddress }
    )
    
    if (!user) {
      throw new Error('User not found')
    }
    
    // Update reputation based on curation success
    let newReputationScore = user.reputationScore
    let newSuccessfulCurations = user.successfulCurations
    
    if (curationSuccess) {
      // Add reputation points for successful curation
      newReputationScore += 50
      newSuccessfulCurations += 1
    } else {
      // Subtract reputation points for failed curation
      newReputationScore = Math.max(0, newReputationScore - 25)
    }
    
    // Update total staked amount
    const newTotalStaked = user.totalStaked + stakedAmount
    
    // Calculate new multiplier
    const updatedUser = {
      reputationScore: newReputationScore,
      successfulCurations: newSuccessfulCurations,
      totalStaked: newTotalStaked,
    }
    
    const rewardMultiplier = calculateRewardMultiplier(updatedUser)
    
    // Update user in database
    await sanityClient.patch(user._id).set({
      reputationScore: newReputationScore,
      successfulCurations: newSuccessfulCurations,
      totalStaked: newTotalStaked,
    }).commit()
    
    return {
      ...updatedUser,
      rewardMultiplier,
    }
  } catch (error) {
    console.error('Error updating user reputation:', error)
    throw error
  }
}

// Get user reputation data
export async function getUserReputation(walletAddress: string): Promise<UserReputation | null> {
  try {
    const user = await sanityClient.fetch(
      `*[_type == "user" && walletAddress == $walletAddress][0]{
        reputationScore,
        successfulCurations,
        totalStaked
      }`,
      { walletAddress }
    )
    
    if (!user) {
      return null
    }
    
    const rewardMultiplier = calculateRewardMultiplier(user)
    
    return {
      ...user,
      rewardMultiplier,
    }
  } catch (error) {
    console.error('Error fetching user reputation:', error)
    return null
  }
}

// Get reputation tier based on score
export function getReputationTier(reputationScore: number): {
  tier: string
  color: string
  minScore: number
} {
  if (reputationScore >= 1000) {
    return { tier: 'Platinum', color: 'text-platinum-400', minScore: 1000 }
  } else if (reputationScore >= 500) {
    return { tier: 'Gold', color: 'text-gold-400', minScore: 500 }
  } else if (reputationScore >= 250) {
    return { tier: 'Silver', color: 'text-silver-400', minScore: 250 }
  } else if (reputationScore >= 100) {
    return { tier: 'Bronze', color: 'text-bronze-400', minScore: 100 }
  } else {
    return { tier: 'New', color: 'text-muted-foreground', minScore: 0 }
  }
}
