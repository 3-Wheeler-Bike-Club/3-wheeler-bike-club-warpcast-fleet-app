import { cookieStorage, createConfig, createStorage, http } from "wagmi";
import { celo, optimism } from "wagmi/chains";
import { farcasterFrame as miniAppConnector } from '@farcaster/frame-wagmi-connector'


export const config = createConfig({
    connectors: [miniAppConnector()],
    chains: [celo, optimism],
    ssr: true,
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