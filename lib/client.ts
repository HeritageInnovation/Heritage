import { createThirdwebClient } from "thirdweb";
import { defineChain } from "thirdweb";

const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "TEMP_ID";

if (!process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID) {
  console.warn("NEXT_PUBLIC_THIRDWEB_CLIENT_ID is missing - using TEMP_ID for build safety");
}

export const client = createThirdwebClient({
  clientId,
  ...(process.env.THIRDWEB_SECRET_KEY ? { secretKey: process.env.THIRDWEB_SECRET_KEY } : {}),
});

// Example: Ethereum Mainnet
export const ethereum = defineChain(1);

// Example: Polygon
export const polygon = defineChain(137);
