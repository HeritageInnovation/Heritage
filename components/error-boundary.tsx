"use client"

import React from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error?: Error; errorInfo?: React.ErrorInfo; reset: () => void }>
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ error, errorInfo })
    
    // Log error to monitoring service in production
    if (process.env.NODE_ENV === 'production') {
      console.error('Error caught by boundary:', error, errorInfo)
    }
    
    this.props.onError?.(error, errorInfo)
  }

  reset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback
      return <FallbackComponent 
        error={this.state.error} 
        errorInfo={this.state.errorInfo} 
        reset={this.reset}
      />
    }

    return this.props.children
  }
}

function DefaultErrorFallback({ error, reset }: { error?: Error; reset: () => void }) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-card border border-border rounded-2xl p-8 text-center">
        <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-destructive" />
        </div>
        
        <h1 className="text-2xl font-serif text-ivory mb-4">Something went wrong</h1>
        
        <p className="text-muted-foreground mb-6 leading-relaxed">
          We encountered an unexpected error. This has been logged and our team will investigate.
        </p>

        {process.env.NODE_ENV === 'development' && error && (
          <details className="mb-6 text-left">
            <summary className="text-sm text-gold cursor-pointer mb-2">Error Details</summary>
            <pre className="text-xs text-muted-foreground bg-black/30 p-3 rounded overflow-auto">
              {error.stack}
            </pre>
          </details>
        )}

        <button
          onClick={reset}
          className="w-full bg-gold hover:bg-gold/90 text-background font-sans py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>
      </div>
    </div>
  )
}

// Hook for functional components to handle errors
export function useErrorHandler() {
  return (error: Error) => {
    // Log error and potentially send to monitoring service
    console.error('Error handled by useErrorHandler:', error)
    
    // In production, you might want to send this to a monitoring service
    if (process.env.NODE_ENV === 'production') {
      // Example: sendToErrorReporting(error)
    }
  }
}
