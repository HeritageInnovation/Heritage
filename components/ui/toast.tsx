"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ToastProps {
  title?: string
  description?: string
  variant?: "default" | "destructive"
  duration?: number
}

interface ToastActionElement {
  altText: string
  onClick: () => void
  children: React.ReactNode
}

export type { ToastProps, ToastActionElement }

export function Toast({ title, description, variant = "default" }: ToastProps) {
  const [open, setOpen] = React.useState(true)

  React.useEffect(() => {
    if (!open) return
    
    const timer = setTimeout(() => {
      setOpen(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [open])

  if (!open) return null

  return (
    <div
      className={cn(
        "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all",
        variant === "destructive" 
          ? "border-destructive bg-destructive text-destructive-foreground"
          : "border bg-background text-foreground"
      )}
    >
      <div className="grid gap-1">
        {title && <div className="text-sm font-semibold">{title}</div>}
        {description && <div className="text-sm opacity-90">{description}</div>}
      </div>
      <button
        onClick={() => setOpen(false)}
        className="absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none group-hover:opacity-100"
      >
        ×
      </button>
    </div>
  )
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export function ToastViewport({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]">
      {children}
    </div>
  )
}
