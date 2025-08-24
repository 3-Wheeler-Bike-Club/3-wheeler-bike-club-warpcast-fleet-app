"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Wallet, TrendingUp, ShieldCheck, ChartNoAxesCombined, Loader2 } from "lucide-react";
import Image from "next/image";
import { useAccount, useBlockNumber, useReadContract } from "wagmi";
import { fleetOrderBook } from "@/utils/constants/addresses";
import { fleetOrderBookAbi } from "@/utils/abis/fleetOrderBook";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export function Wrapper() {
    const router = useRouter()
    console.log(router)

    const { address } = useAccount()

    const compliantQueryClient = useQueryClient()
    
    const { data: blockNumber } = useBlockNumber({ watch: true })  

    const [loading, setLoading] = useState(false)


    const { data: compliant, isLoading: compliantLoading, queryKey: compliantQueryKey } = useReadContract({
        address: fleetOrderBook,
        abi: fleetOrderBookAbi,
        functionName: "isCompliant",
        args: [address!],
    })
    useEffect(() => { 
        compliantQueryClient.invalidateQueries({ queryKey: compliantQueryKey }) 
    }, [blockNumber, compliantQueryClient, compliantQueryKey]) 

    async function Login() {
        setLoading(true)
        await new Promise(resolve => setTimeout(resolve, 2000))
        if (compliant) {
            router.push("/fleet")
        } else {
            router.push("/kyc")
        }
    }

    const { isConnected } = useAccount();

   
    

    return (
        <div className="flex flex-col items-center justify-between min-h-screen p-8 space-y-12">
            <div className="flex-1 flex flex-col items-center justify-center w-full max-w-7xl mx-auto">
                <div className="relative w-48 h-48 mb-12">
                    <Image
                        src="/icons/logo.png"
                        alt="3WB Logo"
                        fill
                        className="rounded-3xl"
                        priority
                    />
                </div>
                
                <h1 className="text-6xl max-sm:text-3xl font-bold mb-6 text-center">Welcome to 3WB Fleet Finance</h1>
                <p className="text-2xl max-sm:text-lg mb-16 text-center max-w-3xl">
                    {"Invest in Africa's three-wheeler future"}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full mb-16">
                    <div className="flex flex-col items-center p-8 rounded-2xl border">
                        <TrendingUp className="w-16 h-16 mb-6" />
                        <h3 className="text-lg text-center font-semibold mb-4">High Returns</h3>
                        <p className="text-center text-sm">Targets up to 45% returns on fleet investments</p>
                    </div>
                    
                    <div className="flex flex-col items-center p-8 rounded-2xl border">
                        <ShieldCheck className="w-16 h-16 mb-6" />
                        <h3 className="text-lg text-center font-semibold mb-4">Secure Investment</h3>
                        <p className="text-center text-sm">Asset-backed by real three-wheeler fleets</p>
                    </div>

                    <div className="flex flex-col items-center p-8 rounded-2xl border">
                        <Wallet className="w-16 h-16 mb-6" />
                        <h3 className="text-lg text-center font-semibold mb-4">Passive Income</h3>
                        <p className="text-center text-sm">On-time weekly returns from fleet operations</p>
                    </div>
                </div>

                <Button 
                    onClick={Login} 
                    disabled={!isConnected || compliantLoading || loading}
                    className="rounded-full px-12 py-7 max-sm:px-8 max-sm:py-6"
                >
                    <div className="flex">
                        {
                            loading
                            ? <Loader2 className="w-4 h-4 animate-spin" />
                            : <ChartNoAxesCombined/>
                        }
                    </div>
                    Start Earning
                </Button>
            </div>
        </div>
    );
}