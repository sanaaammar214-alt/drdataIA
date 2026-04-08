"use client";

import Script from "next/script";
import { useEffect } from "react";

export default function BotpressChat() {
  useEffect(() => {
    // Send a proactive welcome message once the webchat connects
    const handleBotpressEvent = (event: MessageEvent) => {
      // We listen for the webchat to fully load
      if (event.data?.type === 'LIFECYCLE.LOADED') {
         // Optionally automatically show the widget
         // (window as any).botpressWebChat.sendEvent({ type: 'show' });
         
         // Trigger the proactive welcome message prompt
         if ((window as any).botpressWebChat) {
             (window as any).botpressWebChat.sendPayload({
                 type: 'text',
                 text: "💬 Posez votre question sur la santé au Maroc"
             });
         }
      }
    };
    
    window.addEventListener("message", handleBotpressEvent);
    return () => window.removeEventListener("message", handleBotpressEvent);
  }, []);

  return (
    <>
      <Script 
        src="https://cdn.botpress.cloud/webchat/v2.2/inject.js" 
        strategy="lazyOnload" 
      />
      <Script 
        src="https://files.bpcontent.cloud/2026/04/07/20/20260407203338-GT1XW8IT.json" 
        strategy="lazyOnload" 
      />
    </>
  );
}
