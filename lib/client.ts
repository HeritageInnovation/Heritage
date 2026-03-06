import { createThirdwebClient } from "thirdweb";
import { defineChain } from "thirdweb";

// Example: Ethereum Mainnet
export const ethereum = defineChain(1);

export const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || 'BUILD_TIME_ID_HOLDER',
});
