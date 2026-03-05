import { createThirdwebClient, getContract } from "thirdweb"
import { defineChain, ethereum } from "thirdweb/chains"

// Create Thirdweb client
const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "",
})

// Define the staking contract interface
interface StakingContractConfig {
  address: string
  chain: any
}

// Mock staking contract address (replace with actual deployed contract)
const STAKING_CONTRACT_ADDRESS = "0x1234567890123456789012345678901234567890" // Replace with real address

export interface StakeParams {
  userAddress: string
  amount: number // USDT amount
  submissionId?: string // Optional submission ID for curation staking
}

export interface UnstakeParams {
  userAddress: string
  amount: number
  submissionId?: string
}

export interface StakeInfo {
  userAddress: string
  totalStaked: number
  stakedPositions: Array<{
    amount: number
    timestamp: string
    submissionId?: string
    rewards: number
  }>
}

// Get staking contract instance
export function getStakingContract(config?: Partial<StakingContractConfig>) {
  const contractConfig: StakingContractConfig = {
    address: config?.address || STAKING_CONTRACT_ADDRESS,
    chain: config?.chain || ethereum,
  }

  return getContract({
    client,
    address: contractConfig.address,
    chain: contractConfig.chain,
  })
}

// Stake USDT tokens
export async function stakeUSDT(params: StakeParams): Promise<{ success: boolean; transactionHash?: string; error?: string }> {
  try {
    const contract = getStakingContract()
    
    // Convert USDT amount to wei/smallest unit
    const amountInWei = params.amount * 10 ** 6 // USDT has 6 decimals

    // Mock transaction preparation (removed stake function call)
    console.log("Staking transaction prepared for amount:", amountInWei)
    
    // Simulate transaction success
    const mockTransactionHash = `0x${Math.random().toString(16).substr(2, 64)}`
    
    return {
      success: true,
      transactionHash: mockTransactionHash,
    }
  } catch (error: any) {
    console.error("Error staking USDT:", error)
    return {
      success: false,
      error: error.message || "Failed to stake USDT",
    }
  }
}

// Unstake USDT tokens
export async function unstakeUSDT(params: UnstakeParams): Promise<{ success: boolean; transactionHash?: string; error?: string }> {
  try {
    const contract = getStakingContract()
    
    // Convert USDT amount to wei/smallest unit
    const amountInWei = params.amount * 10 ** 6

    // Mock transaction preparation (removed stake function call)
    console.log("Unstaking transaction prepared for amount:", amountInWei)
    
    // Simulate transaction success
    const mockTransactionHash = `0x${Math.random().toString(16).substr(2, 64)}`
    
    return {
      success: true,
      transactionHash: mockTransactionHash,
    }
  } catch (error: any) {
    console.error("Error unstaking USDT:", error)
    return {
      success: false,
      error: error.message || "Failed to unstake USDT",
    }
  }
}

// Get user's staking information
export async function getUserStakeInfo(userAddress: string): Promise<StakeInfo | null> {
  try {
    const contract = getStakingContract()
    
    // In a real implementation, you would query the contract for user's staking info
    // For now, we'll return mock data
    const mockStakeInfo: StakeInfo = {
      userAddress,
      totalStaked: 1000, // Mock total staked amount
      stakedPositions: [
        {
          amount: 500,
          timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
          submissionId: "submission-1",
          rewards: 25.5,
        },
        {
          amount: 500,
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
          submissionId: "submission-2",
          rewards: 10.2,
        },
      ],
    }
    
    return mockStakeInfo
  } catch (error: any) {
    console.error("Error fetching stake info:", error)
    return null
  }
}

// Calculate staking rewards based on duration and amount
export function calculateStakingRewards(
  amount: number,
  durationDays: number,
  apr: number = 0.05 // 5% APR default
): number {
  // Simple interest calculation: rewards = principal * rate * time
  const annualRewards = amount * apr
  const dailyRewards = annualRewards / 365
  return dailyRewards * durationDays
}

// Get staking APR based on user reputation and market conditions
export function getStakingAPR(userReputationScore: number): number {
  // Base APR
  let apr = 0.05 // 5% base APR
  
  // Reputation bonus: +0.5% per 100 reputation points, max +2.5%
  const reputationBonus = Math.min(userReputationScore / 100 * 0.005, 0.025)
  apr += reputationBonus
  
  return Math.min(apr, 0.10) // Cap at 10% APR
}

// Validate staking amount
export function validateStakeAmount(amount: number, userBalance: number): {
  isValid: boolean
  error?: string
} {
  if (amount <= 0) {
    return {
      isValid: false,
      error: "Amount must be greater than 0",
    }
  }
  
  if (amount > userBalance) {
    return {
      isValid: false,
      error: "Insufficient balance",
    }
  }
  
  const MIN_STAKE_AMOUNT = 100 // Minimum 100 USDT
  if (amount < MIN_STAKE_AMOUNT) {
    return {
      isValid: false,
      error: `Minimum stake amount is ${MIN_STAKE_AMOUNT} USDT`,
    }
  }
  
  return {
    isValid: true,
  }
}

// Simulate staking contract deployment (for development)
export function deployStakingContract(): string {
  // In a real implementation, this would deploy the actual contract
  console.log("Deploying staking contract...")
  const mockContractAddress = `0x${Math.random().toString(16).substr(2, 40)}`
  console.log(`Staking contract deployed at: ${mockContractAddress}`)
  return mockContractAddress
}

// Get contract ABI for staking functions
export const STAKING_CONTRACT_ABI = [
  {
    inputs: [
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "stake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "unstake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "user", type: "address" },
    ],
    name: "getStakeInfo",
    outputs: [
      { internalType: "uint256", name: "totalStaked", type: "uint256" },
      { internalType: "uint256", name: "pendingRewards", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
]
