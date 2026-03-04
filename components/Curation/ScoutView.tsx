"use client"

import { useState, useEffect } from "react"
import { sanityClient } from "@/lib/sanity"
import { ReputationBadge } from "@/components/ReputationBadge"
import { getUserReputation } from "@/lib/reputation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, ThumbsUp, DollarSign, TrendingUp } from "lucide-react"

interface CurationSubmission {
  _id: string
  title: string
  category: string
  description: string
  estimatedValue: number
  status: string
  upvotes: number
  totalStaked: number
  stakers: Array<{
    user: {
      username?: string
      walletAddress: string
      reputationScore: number
    }
    amount: number
    timestamp: string
  }>
  submitter: {
    username?: string
    walletAddress: string
    reputationScore: number
  }
  submittedAt: string
  images?: any[]
}

interface NewSubmission {
  title: string
  category: string
  description: string
  estimatedValue: string
}

export function ScoutView({ userAddress }: { userAddress: string }) {
  const [submissions, setSubmissions] = useState<CurationSubmission[]>([])
  const [userReputation, setUserReputation] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isStaking, setIsStaking] = useState(false)
  const [newSubmission, setNewSubmission] = useState<NewSubmission>({
    title: "",
    category: "",
    description: "",
    estimatedValue: "",
  })
  const [stakeAmount, setStakeAmount] = useState<string>("100")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const MIN_STAKE_AMOUNT = 100 // Minimum USDT to stake

  useEffect(() => {
    fetchSubmissions()
    fetchUserReputation()
  }, [userAddress])

  const fetchSubmissions = async () => {
    try {
      const data = await sanityClient.fetch(`
        *[_type == "curationSubmission" && status in ["pending", "under_review", "approved"]] | order(submittedAt desc) {
          _id,
          title,
          category,
          description,
          estimatedValue,
          status,
          upvotes,
          totalStaked,
          stakers[] {
            user->{username, walletAddress, reputationScore},
            amount,
            timestamp
          },
          submitter->{username, walletAddress, reputationScore},
          submittedAt,
          images
        }
      `)
      setSubmissions(data)
    } catch (error) {
      console.error("Error fetching submissions:", error)
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

  const handleSubmitSubmission = async () => {
    if (!newSubmission.title || !newSubmission.category || !newSubmission.description || !newSubmission.estimatedValue) {
      return
    }

    setIsSubmitting(true)
    try {
      // Get or create user
      let user = await sanityClient.fetch(
        `*[_type == "user" && walletAddress == $address][0]`,
        { address: userAddress }
      )

      if (!user) {
        // Create new user
        const newUser = await sanityClient.create({
          _type: "user",
          walletAddress: userAddress,
          role: "participant",
          reputationScore: 0,
          successfulCurations: 0,
          totalStaked: 0,
        })
        user = newUser
      }

      // Create submission
      await sanityClient.create({
        _type: "curationSubmission",
        title: newSubmission.title,
        category: newSubmission.category,
        description: newSubmission.description,
        estimatedValue: parseFloat(newSubmission.estimatedValue),
        submitter: {
          _type: "reference",
          _ref: user._id,
        },
        status: "pending",
        upvotes: 0,
        totalStaked: 0,
        stakers: [],
        submittedAt: new Date().toISOString(),
      })

      // Reset form
      setNewSubmission({
        title: "",
        category: "",
        description: "",
        estimatedValue: "",
      })
      setIsDialogOpen(false)

      // Refresh submissions
      fetchSubmissions()
    } catch (error) {
      console.error("Error submitting:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUpvoteAndStake = async (submissionId: string) => {
    const amount = parseFloat(stakeAmount)
    if (amount < MIN_STAKE_AMOUNT) {
      alert(`Minimum stake amount is ${MIN_STAKE_AMOUNT} USDT`)
      return
    }

    setIsStaking(true)
    try {
      // Get user
      const user = await sanityClient.fetch(
        `*[_type == "user" && walletAddress == $address][0]`,
        { address: userAddress }
      )

      if (!user) {
        throw new Error("User not found")
      }

      // Check if already staked
      const submission = await sanityClient.fetch(
        `*[_type == "curationSubmission" && _id == $id][0]`,
        { id: submissionId }
      )

      const existingStake = submission.stakers?.find(
        (s: any) => s.user?._ref === user._id
      )

      if (existingStake) {
        // Update existing stake
        await sanityClient
          .patch(submissionId)
          .set({
            [`stakers[${submission.stakers.indexOf(existingStake)}].amount`]: existingStake.amount + amount,
            upvotes: submission.upvotes + 1,
            totalStaked: submission.totalStaked + amount,
          })
          .commit()
      } else {
        // Add new stake
        await sanityClient
          .patch(submissionId)
          .append("stakers", [
            {
              user: { _type: "reference", _ref: user._id },
              amount,
              timestamp: new Date().toISOString(),
            },
          ])
          .set({
            upvotes: submission.upvotes + 1,
            totalStaked: submission.totalStaked + amount,
          })
          .commit()
      }

      // Update user's total staked
      await sanityClient
        .patch(user._id)
        .set({
          totalStaked: user.totalStaked + amount,
        })
        .commit()

      // Refresh data
      fetchSubmissions()
      fetchUserReputation()
    } catch (error) {
      console.error("Error staking:", error)
    } finally {
      setIsStaking(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-gold font-serif text-xl">Loading submissions...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-3xl text-ivory mb-2">Scout View</h2>
          <p className="text-muted-foreground">Submit and upvote promising luxury assets</p>
        </div>
        
        <div className="flex items-center gap-4">
          {userReputation && (
            <ReputationBadge reputationScore={userReputation.reputationScore} />
          )}
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gold hover:bg-gold/90 text-black font-sans">
                <Plus className="w-4 h-4 mr-2" />
                Submit Asset
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-background border-border">
              <DialogHeader>
                <DialogTitle className="text-ivory">Submit New Asset</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Asset Title"
                  value={newSubmission.title}
                  onChange={(e) => setNewSubmission({ ...newSubmission, title: e.target.value })}
                  className="bg-background border-border"
                />
                <Input
                  placeholder="Category (e.g., Watches, Art, Cars)"
                  value={newSubmission.category}
                  onChange={(e) => setNewSubmission({ ...newSubmission, category: e.target.value })}
                  className="bg-background border-border"
                />
                <textarea
                  placeholder="Description"
                  value={newSubmission.description}
                  onChange={(e) => setNewSubmission({ ...newSubmission, description: e.target.value })}
                  className="w-full h-24 px-3 py-2 bg-background border-border rounded-md resize-none"
                />
                <Input
                  placeholder="Estimated Value (USD)"
                  type="number"
                  value={newSubmission.estimatedValue}
                  onChange={(e) => setNewSubmission({ ...newSubmission, estimatedValue: e.target.value })}
                  className="bg-background border-border"
                />
                <Button 
                  onClick={handleSubmitSubmission}
                  disabled={isSubmitting}
                  className="w-full bg-gold hover:bg-gold/90 text-black"
                >
                  {isSubmitting ? "Submitting..." : "Submit Asset"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-gold mb-1">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-sans uppercase tracking-[0.2em]">Total Submissions</span>
          </div>
          <div className="text-2xl font-serif text-ivory">{submissions.length}</div>
        </div>
        <div className="border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-gold mb-1">
            <ThumbsUp className="w-4 h-4" />
            <span className="text-sm font-sans uppercase tracking-[0.2em]">Total Upvotes</span>
          </div>
          <div className="text-2xl font-serif text-ivory">
            {submissions.reduce((sum, s) => sum + s.upvotes, 0)}
          </div>
        </div>
        <div className="border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-gold mb-1">
            <DollarSign className="w-4 h-4" />
            <span className="text-sm font-sans uppercase tracking-[0.2em]">Total Staked</span>
          </div>
          <div className="text-2xl font-serif text-ivory">
            ${submissions.reduce((sum, s) => sum + s.totalStaked, 0).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Submissions */}
      <div className="space-y-4">
        {submissions.map((submission) => (
          <div key={submission._id} className="border border-border bg-card p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-serif text-xl text-ivory mb-2">{submission.title}</h3>
                <p className="text-muted-foreground mb-2">{submission.description}</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-gold">{submission.category}</span>
                  <span className="text-muted-foreground">
                    Est. ${submission.estimatedValue.toLocaleString()}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-sans uppercase tracking-[0.1em] ${
                    submission.status === 'approved' 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : submission.status === 'under_review'
                      ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                      : 'bg-muted/20 text-muted-foreground border border-muted/30'
                  }`}>
                    {submission.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
              
              <div className="text-right">
                <ReputationBadge 
                  reputationScore={submission.submitter.reputationScore} 
                  size="sm" 
                />
                <div className="text-xs text-muted-foreground mt-1">
                  {submission.submitter.username || submission.submitter.walletAddress.slice(0, 8)}...
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <ThumbsUp className="w-4 h-4 text-gold" />
                  <span className="text-ivory">{submission.upvotes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4 text-gold" />
                  <span className="text-ivory">${submission.totalStaked.toLocaleString()}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {submission.stakers.length} stakers
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Input
                  placeholder={`Min ${MIN_STAKE_AMOUNT} USDT`}
                  type="number"
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(e.target.value)}
                  className="w-32 bg-background border-border"
                  min={MIN_STAKE_AMOUNT}
                />
                <Button
                  onClick={() => handleUpvoteAndStake(submission._id)}
                  disabled={isStaking}
                  className="bg-gold hover:bg-gold/90 text-black"
                >
                  <ThumbsUp className="w-4 h-4 mr-2" />
                  {isStaking ? "Staking..." : "Upvote & Stake"}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
