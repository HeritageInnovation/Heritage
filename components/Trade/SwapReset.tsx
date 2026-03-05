"use client"

import { useState, useEffect } from "react"
import { useActiveAccount } from "thirdweb/react"

interface SwapResetProps {
  toTokenAddress?: string;
}

export function SwapReset({ toTokenAddress }: SwapResetProps) {
  const account = useActiveAccount();

  return (
    <div className="mx-auto w-full max-w-[480px]">
      <div className="bg-card/30 backdrop-blur-md border border-white/10 p-6 lg:p-8 rounded-3xl text-center">
        <div className="text-gold text-sm mb-2">Trading Interface</div>
        <div className="text-ivory/60 text-xs mb-4">
          Advanced cross-chain trading powered by LiFi
        </div>
        
        {account ? (
          <div className="space-y-4">
            <div className="text-ivory/40 text-xs">
              Connected: {account.address.slice(0, 8)}...{account.address.slice(-6)}
            </div>
            {toTokenAddress && (
              <div className="text-ivory/40 text-xs">
                Target Token: {toTokenAddress.slice(0, 8)}...{toTokenAddress.slice(-6)}
              </div>
            )}
            <button className="w-full bg-gold/10 border border-gold/30 text-gold rounded-full px-6 py-3 text-[10px] uppercase tracking-widest hover:bg-gold/20 transition-all">
              Launch Trading Interface
            </button>
          </div>
        ) : (
          <div className="text-ivory/40 text-xs">
            Please connect your wallet to continue.
          </div>
        )}
      </div>
    </div>
  );
}