"use client"

import { useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThirdwebProvider } from "thirdweb/react"

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <ThirdwebProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ThirdwebProvider>
  )
}
