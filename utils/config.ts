import { createConfig, http } from "wagmi";
import { celo, optimism } from "wagmi/chains";
import { farcasterMiniApp as miniAppConnector } from '@farcaster/miniapp-wagmi-connector'


export const config = createConfig({
    connectors: [miniAppConnector()],
    chains: [celo, optimism],
    transports: {
      [celo.id]: http(process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL),
      [optimism.id]: http(),
    },
});

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}