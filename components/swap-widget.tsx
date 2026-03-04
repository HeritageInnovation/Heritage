import { SwapWidget } from '@uniswap/widgets'
import TOKEN_LIST from '@uniswap/default-token-list'

export default function SwapPage() {
  return (
    <SwapWidget 
      tokenList={TOKEN_LIST.tokens} // Use the bundled list directly
      /* ... other props */
    />
  )
}
