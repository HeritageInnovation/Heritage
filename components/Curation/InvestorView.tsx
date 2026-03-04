"use client"

import { useState, useEffect } from "react"
import { sanityClient } from "@/lib/sanity"
import { getUserReputation } from "@/lib/reputation"
import { ReputationBadge } from "@/components/ReputationBadge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, TrendingUp, DollarSign, PieChart, Lock, Award } from "lucide-react"

interface LuxuryAsset {
  _id: string
  title: string
  category: string
  reserve: number
  lotNumber: string
  timeLeft: string
  tokenAddress: string
  currentBid: string
  image: any
  featured: boolean
  curators?: Array<{
    username?: string
    walletAddress: string
    reputationScore: number
  }>
  totalStaked?: number
  upvotes?: number
}

interface PurchaseOrder {
  assetId: string
  tokenAmount: number
  usdAmount: number
}

export function InvestorView({ userAddress }: { userAddress: string }) {
  const [assets, setAssets] = useState<LuxuryAsset[]>([])
  const [userReputation, setUserReputation] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isPurchasing, setIsPurchasing] = useState(false)
  const [selectedAsset, setSelectedAsset] = useState<LuxuryAsset | null>(null)
  const [purchaseAmount, setPurchaseAmount] = useState<string>("1000")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const FRACTIONAL_PERCENTAGE = 49 // 49% available for investors
  const MIN_PURCHASE = 100 // Minimum USD purchase

  useEffect(() => {
    fetchAssets()
    fetchUserReputation()
  }, [userAddress])

  const fetchAssets = async () => {
    try {
      const data = await sanityClient.fetch(`
        *[_type == "luxuryItem"] | order(featured desc, title asc) {
          _id,
          title,
          category,
          reserve,
          lotNumber,
          timeLeft,
          tokenAddress,
          currentBid,
          image,
          featured
        }
      `)
      
      // Simulate curation data for demo purposes
      const assetsWithCuration = data.map((asset: LuxuryAsset) => ({
        ...asset,
        curators: [
          {
            username: "ExpertCollector",
            walletAddress: "0x1234...5678",
            reputationScore: 850
          }
        ],
        totalStaked: Math.floor(Math.random() * 50000) + 10000,
        upvotes: Math.floor(Math.random() * 50) + 10
      }))
      
      setAssets(assetsWithCuration)
    } catch (error) {
      console.error("Error fetching assets:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchUserReputation = async () => {
    try {
      const reputation = await getUserReputation(userAddress)
      setUserReputation(reputation)
    } catch (error) {
      console.error("Error fetching user reputation:", error)
    }
  }

  const handlePurchase = async () => {
    if (!selectedAsset || !purchaseAmount || parseFloat(purchaseAmount) < MIN_PURCHASE) {
      return
    }

    setIsPurchasing(true)
    try {
      // Get user
      const user = await sanityClient.fetch(
        `*[_type == "user" && walletAddress == $address][0]`,
        { address: userAddress }
      )

      if (!user) {
        // Create new user
        await sanityClient.create({
          _type: "user",
          walletAddress: userAddress,
          role: "investor",
          reputationScore: 0,
          successfulCurations: 0,
          totalStaked: 0,
        })
      }

      // Simulate purchase transaction
      const purchaseOrder: PurchaseOrder = {
        assetId: selectedAsset._id,
        tokenAmount: parseFloat(purchaseAmount) / selectedAsset.reserve * 100, // Calculate token fraction
        usdAmount: parseFloat(purchaseAmount)
      }

      // In a real implementation, this would integrate with thirdweb to handle the actual purchase
      console.log("Processing purchase:", purchaseOrder)

      // Reset form
      setPurchaseAmount("1000")
      setIsDialogOpen(false)
      setSelectedAsset(null)

      // Show success message
      alert(`Successfully purchased $${purchaseAmount} of fractional tokens for ${selectedAsset.title}`)
    } catch (error: any) {
      console.error("Error processing purchase:", error)
      alert(error.message || "Error processing purchase")
    } finally {
      setIsPurchasing(false)
    }
  }

  const openPurchaseDialog = (asset: LuxuryAsset) => {
    setSelectedAsset(asset)
    setPurchaseAmount("1000")
    setIsDialogOpen(true)
  }

  const calculateFractionalPrice = (asset: LuxuryAsset, amount: number) => {
    const totalValue = asset.reserve
    const fractionalValue = (totalValue * FRACTIONAL_PERCENTAGE) / 100
    return (amount / fractionalValue) * 100
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-gold font-serif text-xl">Loading luxury assets...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-3xl text-ivory mb-2">Investor View</h2>
          <p className="text-muted-foreground">Purchase fractional ownership in curated luxury assets</p>
        </div>
        
        <div className="flex items-center gap-4">
          {userReputation && (
            <ReputationBadge reputationScore={userReputation.reputationScore} />
          )}
          
          <Badge className="bg-gold/20 text-gold border-gold/30">
            <Lock className="w-3 h-3 mr-1" />
            Verified Investor
          </Badge>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-gold mb-1">
            <ShoppingCart className="w-4 h-4" />
            <span className="text-sm font-sans uppercase tracking-[0.2em]">Available Assets</span>
          </div>
          <div className="text-2xl font-serif text-ivory">{assets.length}</div>
        </div>
        <div className="border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-gold mb-1">
            <PieChart className="w-4 h-4" />
            <span className="text-sm font-sans uppercase tracking-[0.2em]">Fractional Pool</span>
          </div>
          <div className="text-2xl font-serif text-ivory">{FRACTIONAL_PERCENTAGE}%</div>
        </div>
        <div className="border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-gold mb-1">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-sans uppercase tracking-[0.2em]">Total Value</span>
          </div>
          <div className="text-2xl font-serif text-ivory">
            ${assets.reduce((sum, asset) => sum + asset.reserve, 0).toLocaleString()}
          </div>
        </div>
        <div className="border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-gold mb-1">
            <Award className="w-4 h-4" />
            <span className="text-sm font-sans uppercase tracking-[0.2em]">Avg. Curation Score</span>
          </div>
          <div className="text-2xl font-serif text-ivory">
            {assets.length > 0 
              ? Math.round(assets.reduce((sum, asset) => sum + (asset.upvotes || 0), 0) / assets.length)
              : 0}
          </div>
        </div>
      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assets.map((asset) => (
          <div key={asset._id} className="border border-border bg-card overflow-hidden group">
            {/* Asset Image */}
            <div className="aspect-[4/3] bg-gradient-to-br from-gold/20 to-muted/20 relative overflow-hidden">
              {asset.featured && (
                <div className="absolute top-4 left-4 z-10">
                  <Badge className="bg-gold text-black border-gold">
                    <Award className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                </div>
              )}
              
              {asset.image ? (
                <img 
                  src={asset.image} 
                  alt={asset.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-gold/40 text-6xl font-serif">{asset.category[0]}</div>
                </div>
              )}
            </div>

            {/* Asset Details */}
            <div className="p-6">
              <div className="mb-4">
                <h3 className="font-serif text-xl text-ivory mb-2">{asset.title}</h3>
                <p className="text-muted-foreground text-sm mb-3">{asset.category}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-sm text-muted-foreground">Lot #{asset.lotNumber}</div>
                    <div className="text-lg font-serif text-gold">${asset.reserve.toLocaleString()}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">{asset.timeLeft}</div>
                    <div className="text-sm text-ivory">{asset.currentBid}</div>
                  </div>
                </div>

                {/* Curation Info */}
                {asset.curators && asset.curators.length > 0 && (
                  <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg mb-3">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {asset.curators.slice(0, 3).map((curator, index) => (
                          <div key={index} className="w-6 h-6 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center">
                            <span className="text-xs font-bold text-gold">
                              {curator.username?.[0] || curator.walletAddress[2]}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {asset.curators.length} curator{asset.curators.length > 1 ? 's' : ''}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-gold" />
                        <span>{asset.upvotes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3 text-gold" />
                        <span>${asset.totalStaked?.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Fractional Info */}
                <div className="p-3 bg-gold/10 border border-gold/30 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-sans text-gold">Fractional Available</span>
                    <span className="text-sm font-bold text-gold">{FRACTIONAL_PERCENTAGE}%</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    ${(asset.reserve * FRACTIONAL_PERCENTAGE / 100).toLocaleString()} value available
                  </div>
                </div>
              </div>

              {/* Purchase Button */}
              <Button
                onClick={() => openPurchaseDialog(asset)}
                className="w-full bg-gold hover:bg-gold/90 text-black font-sans"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Purchase Fractions
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Purchase Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-background border-border">
          <DialogHeader>
            <DialogTitle className="text-ivory">
              Purchase Fractional Tokens
            </DialogTitle>
          </DialogHeader>
          {selectedAsset && (
            <div className="space-y-4">
              <div>
                <h4 className="font-serif text-lg text-ivory mb-2">{selectedAsset.title}</h4>
                <p className="text-sm text-muted-foreground">{selectedAsset.category}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 p-4 bg-background/50 rounded-lg">
                <div>
                  <div className="text-sm text-muted-foreground">Total Asset Value</div>
                  <div className="text-lg font-serif text-gold">
                    ${selectedAsset.reserve.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Fractional Pool</div>
                  <div className="text-lg font-serif text-gold">
                    ${(selectedAsset.reserve * FRACTIONAL_PERCENTAGE / 100).toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-sans uppercase tracking-[0.2em] text-gold">
                  Purchase Amount (USD)
                </label>
                <Input
                  type="number"
                  placeholder={`Min $${MIN_PURCHASE}`}
                  value={purchaseAmount}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPurchaseAmount(e.target.value)}
                  className="bg-background border-border"
                  min={MIN_PURCHASE}
                />
                {parseFloat(purchaseAmount) >= MIN_PURCHASE && (
                  <div className="text-sm text-muted-foreground">
                    You will receive approximately {calculateFractionalPrice(selectedAsset, parseFloat(purchaseAmount)).toFixed(2)}% fractional ownership
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handlePurchase}
                  disabled={isPurchasing || parseFloat(purchaseAmount) < MIN_PURCHASE}
                  className="flex-1 bg-gold hover:bg-gold/90 text-black"
                >
                  {isPurchasing ? "Processing..." : "Complete Purchase"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="border-border"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
