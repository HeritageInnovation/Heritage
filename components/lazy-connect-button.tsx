"use client"

import dynamic from "next/dynamic"
import { client } from "@/lib/client"

const DynamicConnectButton = dynamic(
  () => import("thirdweb/react").then((mod) => mod.ConnectButton),
  {
    ssr: false,
    loading: () => (
      <button className="border border-gold/40 text-gold text-[10px] tracking-[0.35em] uppercase px-8 py-3 bg-transparent font-sans">
        Loading...
      </button>
    ),
  }
)

interface LazyConnectButtonProps {
  className?: string
}

export function LazyConnectButton({ className }: LazyConnectButtonProps) {
  return (
    <DynamicConnectButton
      client={client}
      theme="dark"
      connectButton={{
        label: "CONNECT WALLET",
        className: className || "!border !border-gold/40 !border-l-0 !text-gold !text-[10px] !tracking-[0.35em] !uppercase !px-8 !py-3 !bg-transparent hover:!bg-gold hover:!text-background !transition-all !duration-500 !font-sans !rounded-none",
      }}
      connectModal={{
        title: "Connect to Heritage",
        showThirdwebBranding: false,
      }}
    />
  )
}
