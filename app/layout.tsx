import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { FrameProvider } from "@/context/FrameProvider";
import { WagmiContext } from "@/context/wagmiContext";
import { MiniAppContext } from "@/context/miniAppContext";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "3 Wheeler Bike Club | Ownership, Community & Governance",
  description: "P2P Financing Platform for the 3 Wheeler Bike Club",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const frame = {
    version: "next",
    imageUrl: "https://warp.3wb.club/opengraph-image.png",
    button: {
      title: "Finance a 3-Wheeler 🛺💨",
      action: {
        type: "launch_frame",
        url: "https://warp.3wb.club",
        name:"3WB P2P Fleet Financing",
        splashImageUrl: "https://warp.3wb.club/3wbClubLogo.png",
        splashBackgroundColor:"#f5f0ec"
      }
    }
  }
  return (
    <html lang="en">
      <head>
        <meta 
        property="og:image" 
          content="https://warp.3wb.club/opengraph-image.png" 
        />
        <meta 
          name="fc:frame"
          content={JSON.stringify(frame)} 
        />
      </head>
      <body
        className={`${geistMono.className}`}
      >
        <div className="bg-yellow-500 text-black py-1 text-center font-bold z-50">
          ⚠️ Test Mode: Do not use real funds. Contact us at <a href="https://t.me/threeWB" className="text-blue-500">https://t.me/threeWB</a> for test tokens.
        </div>
        <WagmiContext>
          <MiniAppContext>
            <FrameProvider>
              {children}
            </FrameProvider>
          </MiniAppContext>
        </WagmiContext>
      </body>
    </html>
  );
}
