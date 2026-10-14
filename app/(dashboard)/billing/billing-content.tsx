"use client"

import { Component, useEffect, useState, type ReactNode } from "react"
import { PricingTable } from "@clerk/nextjs"
import { CreditCard, ExternalLink, Sparkles } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

class PricingTableBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <Card className="border-dashed">
          <CardHeader>
            <div className="flex items-center gap-2.5">
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <CreditCard className="size-5" />
              </div>
              <div>
                <CardTitle>Clerk Billing Setup Required</CardTitle>
                <CardDescription>
                  The Pricing Table requires Clerk Billing to be activated in your Clerk Dashboard.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <div className="rounded-lg border bg-muted/50 p-4 text-sm text-muted-foreground space-y-2.5">
              <p className="font-semibold text-foreground flex items-center gap-1.5">
                <Sparkles className="size-4 text-amber-500" />
                How to enable Billing in Clerk:
              </p>
              <ol className="list-decimal pl-5 space-y-1.5 leading-relaxed">
                <li>
                  Go to{" "}
                  <a
                    href="https://dashboard.clerk.com/~/billing/settings"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-foreground underline underline-offset-4"
                  >
                    Clerk Dashboard &rarr; Billing Settings
                  </a>.
                </li>
                <li>Enable Billing (Test Mode is free and requires no live payment setup).</li>
                <li>
                  Create an <strong>Organization Plan</strong> with the slug{" "}
                  <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs font-semibold text-foreground">
                    pro
                  </code>.
                </li>
              </ol>
            </div>
            <div>
              <Button asChild>
                <a
                  href="https://dashboard.clerk.com/~/billing/settings"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  Open Clerk Billing Settings
                  <ExternalLink className="size-4" />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      )
    }

    return this.props.children
  }
}

export function BillingContent() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <Skeleton className="h-96 w-full rounded-xl" />
  }

  return (
    <PricingTableBoundary>
      <PricingTable
        for="organization"
        newSubscriptionRedirectUrl="/billing"
      />
    </PricingTableBoundary>
  )
}
