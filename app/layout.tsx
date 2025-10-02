import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { MiniAppProvider } from "@/context/miniAppProvider";
import { WagmiContext } from "@/context/wagmiContext";
import { ConnectContext } from "@/context/connectContext";
import { Toaster } from "@/components/ui/sonner";
import { Footer } from "@/components/bottom/footer";

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
  const miniApp = {
    version: "next",
    imageUrl: "https://warp.3wb.club/opengraph-image.png",
    button: {
      title: "Finance a 3-Wheeler 🛺💨",
      action: {
        type: "launch_miniapp",
        url: "https://warp.3wb.club",
        name:"3 Wheeler Bike Club",
        splashImageUrl: "https://warp.3wb.club/icons/rounded_logo.png",
        splashBackgroundColor:"#ffffff"
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
          name="fc:miniapp"
          content={JSON.stringify(miniApp)} 
        />
      </head>
      <body
        className={`${geistMono.className}`}
      >
        <WagmiContext>
          <MiniAppProvider>
            <ConnectContext>
              {children}
            </ConnectContext>
            <Toaster expand={true} richColors />
            <Footer />
          </MiniAppProvider>
        </WagmiContext>
      </body>
    </html>
  );
}
