"use client"

import { useState, useEffect } from "react"
import { sanityClient } from "@/lib/sanity"
import { getUserReputation } from "@/lib/reputation"
import { ReputationBadge } from "@/components/ReputationBadge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Clock, FileText, Shield, Award } from "lucide-react"

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
  technicalProvenance: Array<{
    expert: {
      username?: string
      walletAddress: string
      reputationScore: number
    }
    verification: string
    notes?: string
    timestamp?: string
  }>
  submittedAt: string
  images?: any[]
}

interface ProvenanceReview {
  verification: string
  notes: string
}

export function ExpertView({ userAddress }: { userAddress: string }) {
  const [submissions, setSubmissions] = useState<CurationSubmission[]>([])
  const [userReputation, setUserReputation] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isReviewing, setIsReviewing] = useState(false)
  const [selectedSubmission, setSelectedSubmission] = useState<CurationSubmission | null>(null)
  const [review, setReview] = useState<ProvenanceReview>({
    verification: "pending",
    notes: "",
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    fetchSubmissions()
    fetchUserReputation()
  }, [userAddress])

  const fetchSubmissions = async () => {
    try {
      const data = await sanityClient.fetch(`
        *[_type == "curationSubmission" && status in ["under_review", "approved"]] | order(submittedAt desc) {
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
          technicalProvenance[] {
            expert->{username, walletAddress, reputationScore},
            verification,
            notes,
            timestamp
          },
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

  const handleSubmitReview = async () => {
    if (!selectedSubmission || !review.verification) {
      return
    }

    setIsReviewing(true)
    try {
      // Get user
      const user = await sanityClient.fetch(
        `*[_type == "user" && walletAddress == $address][0]`,
        { address: userAddress }
      )

      if (!user) {
        throw new Error("User not found")
      }

      // Check if user is verified professional
      if (!user.isVerifiedProfessional) {
        throw new Error("User is not a verified professional")
      }

      // Add technical provenance review
      await sanityClient
        .patch(selectedSubmission._id)
        .append("technicalProvenance", [
          {
            expert: { _type: "reference", _ref: user._id },
            verification: review.verification,
            notes: review.notes,
            timestamp: new Date().toISOString(),
          },
        ])
        .commit()

      // Update submission status based on reviews
      const updatedSubmission = await sanityClient.fetch(
        `*[_type == "curationSubmission" && _id == $id][0]{
          technicalProvenance[] {
            verification
          }
        }`,
        { id: selectedSubmission._id }
      )

      const reviews = updatedSubmission.technicalProvenance
      const verifiedCount = reviews.filter((r: any) => r.verification === "verified").length
      const rejectedCount = reviews.filter((r: any) => r.verification === "rejected").length

      let newStatus = selectedSubmission.status
      if (reviews.length >= 3) {
        if (verifiedCount >= 2) {
          newStatus = "approved"
        } else if (rejectedCount >= 2) {
          newStatus = "rejected"
        }
      }

      if (newStatus !== selectedSubmission.status) {
        await sanityClient
          .patch(selectedSubmission._id)
          .set({ status: newStatus })
          .commit()
      }

      // Reset form
      setReview({ verification: "pending", notes: "" })
      setIsDialogOpen(false)
      setSelectedSubmission(null)

      // Refresh submissions
      fetchSubmissions()
    } catch (error: any) {
      console.error("Error submitting review:", error)
      alert(error.message || "Error submitting review")
    } finally {
      setIsReviewing(false)
    }
  }

  const openReviewDialog = (submission: CurationSubmission) => {
    setSelectedSubmission(submission)
    setReview({ verification: "pending", notes: "" })
    setIsDialogOpen(true)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case "rejected":
        return <XCircle className="w-4 h-4 text-red-400" />
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-400" />
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "rejected":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      default:
        return "bg-muted/20 text-muted-foreground border-muted/30"
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
          <h2 className="font-serif text-3xl text-ivory mb-2">Expert View</h2>
          <p className="text-muted-foreground">Review and verify technical provenance</p>
        </div>
        
        <div className="flex items-center gap-4">
          {userReputation && (
            <ReputationBadge reputationScore={userReputation.reputationScore} />
          )}
          
          <Badge className="bg-gold/20 text-gold border-gold/30">
            <Shield className="w-3 h-3 mr-1" />
            Verified Expert
          </Badge>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-gold mb-1">
            <FileText className="w-4 h-4" />
            <span className="text-sm font-sans uppercase tracking-[0.2em]">Under Review</span>
          </div>
          <div className="text-2xl font-serif text-ivory">
            {submissions.filter(s => s.status === "under_review").length}
          </div>
        </div>
        <div className="border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-green-400 mb-1">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm font-sans uppercase tracking-[0.2em]">Verified</span>
          </div>
          <div className="text-2xl font-serif text-ivory">
            {submissions.filter(s => s.status === "approved").length}
          </div>
        </div>
        <div className="border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-red-400 mb-1">
            <XCircle className="w-4 h-4" />
            <span className="text-sm font-sans uppercase tracking-[0.2em]">Rejected</span>
          </div>
          <div className="text-2xl font-serif text-ivory">
            {submissions.filter(s => s.status === "rejected").length}
          </div>
        </div>
        <div className="border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-gold mb-1">
            <Award className="w-4 h-4" />
            <span className="text-sm font-sans uppercase tracking-[0.2em]">Total Reviews</span>
          </div>
          <div className="text-2xl font-serif text-ivory">
            {submissions.reduce((sum, s) => sum + (s.technicalProvenance?.length || 0), 0)}
          </div>
        </div>
      </div>

      {/* Submissions */}
      <div className="space-y-4">
        {submissions.map((submission) => (
          <div key={submission._id} className="border border-border bg-card p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-serif text-xl text-ivory mb-2">{submission.title}</h3>
                <p className="text-muted-foreground mb-2">{submission.description}</p>
                <div className="flex items-center gap-4 text-sm mb-4">
                  <span className="text-gold">{submission.category}</span>
                  <span className="text-muted-foreground">
                    Est. ${submission.estimatedValue.toLocaleString()}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-sans uppercase tracking-[0.1em] ${
                    submission.status === 'approved' 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : submission.status === 'rejected'
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                      : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                  }`}>
                    {submission.status.replace('_', ' ')}
                  </span>
                </div>

                {/* Technical Provenance Reviews */}
                {submission.technicalProvenance && submission.technicalProvenance.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-sans uppercase tracking-[0.2em] text-gold mb-2">
                      Expert Reviews
                    </h4>
                    <div className="space-y-2">
                      {submission.technicalProvenance.map((review, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-background/50 rounded-lg">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(review.verification)}
                            <span className={`px-2 py-1 rounded text-xs ${getStatusColor(review.verification)}`}>
                              {review.verification}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <ReputationBadge 
                                reputationScore={review.expert.reputationScore} 
                                size="sm" 
                                showScore={false}
                              />
                              <span className="text-sm text-muted-foreground">
                                {review.expert.username || review.expert.walletAddress.slice(0, 8)}...
                              </span>
                            </div>
                            {review.notes && (
                              <p className="text-sm text-muted-foreground">{review.notes}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Submission Stats */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{submission.upvotes} upvotes</span>
                  <span>${submission.totalStaked.toLocaleString()} staked</span>
                  <span>{submission.stakers.length} stakers</span>
                </div>
              </div>
              
              <div className="text-right ml-4">
                <ReputationBadge 
                  reputationScore={submission.submitter.reputationScore} 
                  size="sm" 
                />
                <div className="text-xs text-muted-foreground mt-1">
                  {submission.submitter.username || submission.submitter.walletAddress.slice(0, 8)}...
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="text-xs text-muted-foreground">
                Submitted {new Date(submission.submittedAt).toLocaleDateString()}
              </div>

              <Button
                onClick={() => openReviewDialog(submission)}
                className="bg-gold hover:bg-gold/90 text-black"
              >
                <FileText className="w-4 h-4 mr-2" />
                Add Review
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Review Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-background border-border">
          <DialogHeader>
            <DialogTitle className="text-ivory">
              Technical Provenance Review
            </DialogTitle>
          </DialogHeader>
          {selectedSubmission && (
            <div className="space-y-4">
              <div>
                <h4 className="font-serif text-lg text-ivory mb-2">{selectedSubmission.title}</h4>
                <p className="text-sm text-muted-foreground">{selectedSubmission.description}</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-sans uppercase tracking-[0.2em] text-gold">
                  Verification Status
                </label>
                <Select value={review.verification} onValueChange={(value: string) => setReview({ ...review, verification: value })}>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="verified">Verified</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-sans uppercase tracking-[0.2em] text-gold">
                  Expert Notes
                </label>
                <Textarea
                  placeholder="Provide detailed analysis of the asset's provenance, authenticity, and technical specifications..."
                  value={review.notes}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setReview({ ...review, notes: e.target.value })}
                  className="bg-background border-border min-h-[100px]"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleSubmitReview}
                  disabled={isReviewing}
                  className="flex-1 bg-gold hover:bg-gold/90 text-black"
                >
                  {isReviewing ? "Submitting..." : "Submit Review"}
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
