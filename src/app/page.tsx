"use client";

import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";
import BrillancePreview from "@/components/BrillancePreview";
import Work02Preview from "@/components/Work02Preview";
import HeroTyping from "@/components/HeroTyping";

export default function Home() {
  const theme = "light";

  const [isIframe, setIsIframe] = useState(false);
  const [fullSiteId, setFullSiteId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('iframe') === 'true') {
      setIsIframe(true);
    }
    const fullSite = params.get('full_site');
    if (fullSite) {
      setFullSiteId(fullSite);
    }
  }, []);

  if (fullSiteId) {
    return (
      <div className="min-h-screen bg-white text-black transition-colors duration-[800ms]">
        {fullSiteId === "01" ? (
          <BrillancePreview theme={theme} />
        ) : fullSiteId === "02" ? (
          <div className="w-full bg-white text-black text-left flex flex-col items-center">
            <Work02Preview />
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-screen">Project not found</div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen min-w-[375px] flex flex-col items-center overflow-x-hidden pt-[56px] md:pt-[64px] bg-white text-black">
      {!isIframe && <Header />}

      <motion.main
        layout
        className="transition-colors duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] relative flex flex-col flex-1 origin-top bg-white w-full min-h-screen"
      >
        {isIframe ? null : <HeroTyping theme={theme} />}
      </motion.main>

    </div>
  );
}


function Header() {
  return (
    <nav className="fixed top-0 left-0 w-full z-[9999] px-5 md:px-8 py-4 md:py-5 flex justify-between items-center bg-white/90 backdrop-blur-md border-b border-black/5">
       <div className="flex items-center gap-2">
          <div className="w-7 h-7 md:w-8 md:h-8 rounded bg-black flex items-center justify-center font-black text-white text-lg">A</div>
          <span className="font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-[11px] md:text-sm">Antigravity</span>
       </div>
       <div className="md:hidden"><Menu className="w-5 h-5" /></div>
    </nav>
  );
}
