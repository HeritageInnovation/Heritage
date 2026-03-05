import React, { createContext, useContext, useState } from 'react'
import { cn } from '@/lib/utils'

interface SelectContextType {
  value: string
  setValue: (value: string) => void
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const SelectContext = createContext<SelectContextType | undefined>(undefined)

interface SelectProps {
  children: React.ReactNode
  value?: string
  onValueChange?: (value: string) => void
}

export const Select: React.FC<SelectProps> = ({ children, value, onValueChange }) => {
  const [internalValue, setInternalValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  
  const currentValue = value !== undefined ? value : internalValue
  const setValue = onValueChange || setInternalValue

  return (
    <SelectContext.Provider value={{ value: currentValue, setValue, isOpen, setIsOpen }}>
      {children}
    </SelectContext.Provider>
  )
}

export const SelectTrigger: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className 
}) => {
  const { value, setIsOpen } = useContext(SelectContext)!
  
  return (
    <button
      type="button"
      className={cn(
        'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      onClick={() => setIsOpen(true)}
    >
      {children}
    </button>
  )
}

export const SelectValue: React.FC<{ placeholder?: string }> = ({ placeholder }) => {
  const { value } = useContext(SelectContext)!
  
  return (
    <span className="block truncate">
      {value || placeholder}
    </span>
  )
}

export const SelectContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className 
}) => {
  const { isOpen, setIsOpen } = useContext(SelectContext)!
  
  if (!isOpen) return null

  return (
    <div className="fixed z-50 top-full mt-1 w-full rounded-md border bg-popover text-popover-foreground shadow-md">
      <div className={cn('p-1', className)}>
        {children}
      </div>
    </div>
  )
}

export const SelectItem: React.FC<{ 
  children: React.ReactNode
  value: string
  className?: string 
}> = ({ children, value, className }) => {
  const { setValue, setIsOpen } = useContext(SelectContext)!
  
  return (
    <div
      className={cn(
        'relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 px-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
        className
      )}
      onClick={() => {
        setValue(value)
        setIsOpen(false)
      }}
    >
      {children}
    </div>
  )
}
