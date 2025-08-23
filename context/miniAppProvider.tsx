"use client";

import { useEffect, useState, useCallback } from "react";
import { sdk, Context, type MiniAppNotificationDetails, AddMiniApp } from "@farcaster/miniapp-sdk";
import { createStore } from "mipd";
import React from "react";

interface MiniAppContextType {
  isSDKLoaded: boolean;
  context: Context.MiniAppContext | undefined;
  openUrl: (url: string) => Promise<void>;
  close: () => Promise<void>;
  added: boolean;
  notificationDetails: MiniAppNotificationDetails | null;
  lastEvent: string;
  addMiniApp: () => Promise<void>;
  addMiniAppResult: string;
}

const MiniAppContext = React.createContext<MiniAppContextType | undefined>(undefined);

export function useMiniApp() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [context, setContext] = useState<Context.MiniAppContext>();
  const [added, setAdded] = useState(false);
  const [notificationDetails, setNotificationDetails] = useState<MiniAppNotificationDetails | null>(null);
  const [lastEvent, setLastEvent] = useState("");
  const [addMiniAppResult, setAddMiniAppResult] = useState("");

  // SDK actions only work in mini app clients, so this pattern supports browser actions as well
  const openUrl = useCallback(async (url: string) => {
    if (context) {
      await sdk.actions.openUrl(url);
    } else {
      window.open(url, '_blank');
    }
  }, [context]);

  const close = useCallback(async () => {
    if (context) {
      await sdk.actions.close();
    } else {
      window.close();
    }
  }, [context]);

  const addMiniApp = useCallback(async () => {
    try {
      setNotificationDetails(null);
      const result = await sdk.actions.addMiniApp();
      

      if (result.notificationDetails) {
        setNotificationDetails(result.notificationDetails);
      }
      setAddMiniAppResult(
        result.notificationDetails
          ? `Added, got notificaton token ${result.notificationDetails.token} and url ${result.notificationDetails.url}`
          : "Added, got no notification details"
      );
    } catch (error) {
      setAddMiniAppResult(`Error: ${error}`);
      
      if (error instanceof AddMiniApp.RejectedByUser || error instanceof AddMiniApp.InvalidDomainManifest) {
        setAddMiniAppResult(`Not added: ${error.message}`);
      }else {
        setAddMiniAppResult(`Error: ${error}`);
      }
      
    }
  }, []);

  useEffect(() => {
    const load = async () => {
      const context = await sdk.context;
      setContext(context);
      setIsSDKLoaded(true);

      // Set up event listeners
      sdk.on("miniAppAdded", ({ notificationDetails }) => {
        console.log("MiniApp added", notificationDetails);
        setAdded(true);
        setNotificationDetails(notificationDetails ?? null);
        setLastEvent("MiniApp added");
      });

      sdk.on("miniAppAddRejected", ({ reason }) => {
        console.log("MiniApp add rejected", reason);
        setAdded(false);
        setLastEvent(`MiniApp add rejected: ${reason}`);
      });

      sdk.on("miniAppRemoved", () => {
        console.log("MiniApp removed");
        setAdded(false);
        setLastEvent("MiniApp removed");
      });

      sdk.on("notificationsEnabled", ({ notificationDetails }) => {
        console.log("Notifications enabled", notificationDetails);
        setNotificationDetails(notificationDetails ?? null);
        setLastEvent("Notifications enabled");
      });

      sdk.on("notificationsDisabled", () => {
        console.log("Notifications disabled");
        setNotificationDetails(null);
        setLastEvent("Notifications disabled");
      });

      sdk.on("primaryButtonClicked", () => {
        console.log("Primary button clicked");
        setLastEvent("Primary button clicked");
      });

      // Call ready action
      console.log("Calling ready");
      sdk.actions.ready({});

      // Set up MIPD Store
      const store = createStore();
      store.subscribe((providerDetails) => {
        console.log("PROVIDER DETAILS", providerDetails);
      });
    };

    if (sdk && !isSDKLoaded) {
      console.log("Calling load");
      setIsSDKLoaded(true);
      load();
      return () => {
        sdk.removeAllListeners();
      };
    }
  }, [isSDKLoaded]);

  return {
    isSDKLoaded,
    context,
    added,
    notificationDetails,
    lastEvent,
    addMiniApp,
    addMiniAppResult,
    openUrl,
    close,
  };
}

export function MiniAppProvider({ children }: { children: React.ReactNode }) {
  const miniAppContext = useMiniApp();

  if (!miniAppContext.isSDKLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <MiniAppContext.Provider value={miniAppContext}>
      {children}
    </MiniAppContext.Provider>
  );
} 