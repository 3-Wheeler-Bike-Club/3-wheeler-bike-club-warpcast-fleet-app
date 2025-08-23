"use client"

import { useEffect } from "react";
import { useConnect } from "wagmi";
import { farcasterMiniApp as miniAppConnector } from "@farcaster/miniapp-wagmi-connector";


export const ConnectContext = ({ children }: { children: React.ReactNode }) => {

    const { connect } = useConnect();
      
    useEffect(() => {
        connect({ connector: miniAppConnector() });
    }, []);

    return (
        <>
            {children}
        </>
    )
};