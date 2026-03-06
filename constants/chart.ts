// Financial calculation constants for TradingView chart
export const FINANCIAL_MULTIPLIERS = {
  VOLUME: 1_000_000,        // Base volume multiplier for display
  MARKET_CAP: 10_000_000,   // Base market cap multiplier for display  
  LIQUIDITY: 5_000_000,     // Base liquidity multiplier for display
} as const;

export const CHART_CONFIG = {
  RESIZE_DELAY: 100,        // Debounce delay for chart resize (ms)
  LOADING_TIMEOUT: 5000,     // Timeout for chart loading (ms)
} as const;

export const ASSET_PRICING = {
  SMALL_ASSET_THRESHOLD: 1, // Price threshold for decimal precision
  MIN_DECIMALS: 2,          // Minimum decimal places for formatting
  MAX_DECIMALS: 4,          // Maximum decimal places for formatting
} as const;
