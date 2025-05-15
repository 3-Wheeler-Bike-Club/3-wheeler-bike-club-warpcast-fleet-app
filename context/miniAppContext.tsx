"use client"

import { useEffect } from "react";
import { useConnect } from "wagmi";
import { farcasterFrame as miniAppConnector } from '@farcaster/frame-wagmi-connector'


export const MiniAppContext = ({ children }: { children: React.ReactNode }) => {

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