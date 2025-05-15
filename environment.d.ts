import { string } from "zod"

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_WC_PROJECT_ID: string
            NEXT_PUBLIC_ALCHEMY_RPC_URL: string
            MONGO: string
            WHEELER_API_KEY: string
            BASE_URL: string
            PRIVATE_KEY: `0x${string}`
        }
    }
}
  
// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}