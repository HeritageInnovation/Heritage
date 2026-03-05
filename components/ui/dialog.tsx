import React, { createContext, useContext, useState } from 'react'
import { cn } from '@/lib/utils'

interface DialogContextType {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const DialogContext = createContext<DialogContextType | undefined>(undefined)

interface DialogProps {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export const Dialog: React.FC<DialogProps> = ({ children, open, onOpenChange }) => {
  const [internalOpen, setInternalOpen] = useState(false)
  const isOpen = open !== undefined ? open : internalOpen
  const setIsOpen = onOpenChange || setInternalOpen

  return (
    <DialogContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </DialogContext.Provider>
  )
}

export const DialogTrigger: React.FC<{ children: React.ReactNode; asChild?: boolean }> = ({ 
  children, 
  asChild = false 
}) => {
  const { setIsOpen } = useContext(DialogContext)!
  
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick: () => setIsOpen(true)
    } as any)
  }

  return (
    <button onClick={() => setIsOpen(true)}>
      {children}
    </button>
  )
}

export const DialogContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className 
}) => {
  const { isOpen, setIsOpen } = useContext(DialogContext)!
  
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black/50" 
        onClick={() => setIsOpen(false)}
      />
      <div className={cn(
        'relative bg-background rounded-lg shadow-lg p-6 w-full max-w-md mx-4',
        className
      )}>
        {children}
      </div>
    </div>
  )
}

export const DialogHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="mb-4">
      {children}
    </div>
  )
}

export const DialogTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className 
}) => {
  return (
    <h2 className={cn('text-lg font-semibold', className)}>
      {children}
    </h2>
  )
}
