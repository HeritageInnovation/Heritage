import { createThirdwebClient } from "thirdweb";
import { defineChain } from "thirdweb";

const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;

if (!clientId) {
  throw new Error("NEXT_PUBLIC_THIRDWEB_CLIENT_ID is not set in environment variables");
}

export const client = createThirdwebClient({
  clientId,
  ...(process.env.THIRDWEB_SECRET_KEY ? { secretKey: process.env.THIRDWEB_SECRET_KEY } : {}),
});

// Example: Ethereum Mainnet
export const ethereum = defineChain(1);

// Example: Polygon
export const polygon = defineChain(137);
