import { createPublicClient, http } from 'viem'
import { celo } from 'viem/chains'
 
export const publicClient = createPublicClient({
  chain: celo,
  transport: http(process.env.ALCHEMY_RPC_URL)
})