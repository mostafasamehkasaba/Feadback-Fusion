"use client"

import { CATEGORIES_TYPES } from '@/app/data/categoryData'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Router from 'next/router'
import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'

type FeedbackState = {
  success: boolean
  error: string
}

async function submitFeedback(
  prevState: FeedbackState,
  formData: FormData
): Promise<FeedbackState> {
  const loadingToast = toast.loading("Submitting your feedback...")

  try {
    const response = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: formData.get("title"),
        description: formData.get("description"),
        category: formData.get("category"),
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to create post")
    }

    toast.dismiss(loadingToast)
    toast.success("Your feedback has been submitted successfully")

    return { success: true, error: "" }
  } catch (err) {
    console.error("Something went wrong, please try again", err)
    toast.dismiss(loadingToast)
    return { success: false, error: "Failed to submit feedback" }
  }
}

export default function NewFeedback() {
  const router = useRouter()
  const [state, action, isPending] = useActionState(submitFeedback, {
    success: false,
    error: "",
  })

  useEffect(() =>{
    if(state.success){
      const timer = setTimeout(() => {
        router.push("/feedback")
        router.refresh()
      },1500)

      return () => clearTimeout(timer)
    }
  },[state.success, router])

  return (
    <div className="max-w-2xl mx-auto space-y-6 py-10 px-4">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" >
          <Link href="/feedback">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Share your feedback</h1>
      </div>

      <Card className="border-muted shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">New Feedback</CardTitle>
          <CardDescription>
            Share your idea with the community. Be specific about what you&;d like to see.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form action={action} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="What would you like to see?"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                name="category"
                className="w-full px-3 py-2 border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                defaultValue={CATEGORIES_TYPES[0]}
              >
                {CATEGORIES_TYPES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                placeholder="Describe your idea in detail..."
                required
              />
            </div>

            {state.error && (
              <p className="text-sm text-destructive">{state.error}</p>
            )}

            <div className="flex gap-3">
              <Button type="submit" disabled={isPending}>
                {isPending ? "Submitting..." : "Submit Feedback"}
              </Button>
              <Button type="button" variant="outline" >
                <Link href="/feedback">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}