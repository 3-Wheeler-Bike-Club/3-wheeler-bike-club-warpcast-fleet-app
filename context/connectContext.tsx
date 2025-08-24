"use client"

import { useEffect } from "react";
import { useConnect } from "wagmi";
import { farcasterMiniApp as miniAppConnector } from "@farcaster/miniapp-wagmi-connector";
import { sdk } from "@farcaster/miniapp-sdk"


export const ConnectContext = ({ children }: { children: React.ReactNode }) => {

    const { connect } = useConnect();

    const checkMiniAppPlusReady = async () => {
        const isMiniApp = await sdk.isInMiniApp()
        const isReady = await sdk.actions.ready()
        if (isMiniApp && isReady) {
            connect({ connector: miniAppConnector() });
        }
    }
    
    useEffect( () => {
        checkMiniAppPlusReady()
    }, []);

    return (
        <>
            {children}
        </>
    )
};