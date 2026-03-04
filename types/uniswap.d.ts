declare module '@uniswap/default-token-list' {
  const tokenList: {
    name: string
    timestamp: string
    version: {
      major: number
      minor: number
      patch: number
    }
    tags: any
    logoURI: string
    keywords: string[]
    tokens: Array<{
      chainId: number
      address: string
      name: string
      symbol: string
      decimals: number
      logoURI?: string
      extensions?: any
    }>
  }
  export default tokenList
}

declare module '@uniswap/default-token-list/build/uniswap-default.tokenlist.json' {
  const tokenList: {
    name: string
    timestamp: string
    version: {
      major: number
      minor: number
      patch: number
    }
    tags: any
    logoURI: string
    keywords: string[]
    tokens: Array<{
      chainId: number
      address: string
      name: string
      symbol: string
      decimals: number
      logoURI?: string
      extensions?: any
    }>
  }
  export default tokenList
}
