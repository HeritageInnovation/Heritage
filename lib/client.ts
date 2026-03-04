import { createThirdwebClient } from "thirdweb";
import { defineChain } from "thirdweb";

export const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || 'BUILD_TIME_ID_HOLDER',
});

if (!process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID) {
  console.warn('⚠️ Heritage Warning: NEXT_PUBLIC_THIRDWEB_CLIENT_ID is missing.');
}

// Example: Ethereum Mainnet
export const ethereum = defineChain(1);

// Example: Polygon
export const polygon = defineChain(137);
