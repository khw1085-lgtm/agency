"use client";

import { motion } from "framer-motion";

export default function MockBrowser() {
  return (
    <div className="w-full max-w-[1000px] bg-white/70 backdrop-blur-xl rounded-[24px] shadow-[0_30px_100px_rgba(0,0,0,0.1)] border border-white/40 overflow-hidden flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-[50px] md:w-[68px] bg-black/5 border-r border-black/5 flex flex-col items-center py-8 gap-8 shrink-0">
        <div className="w-5 h-5 bg-black/60 rounded-[4px]" />
        <div className="w-5 h-5 bg-black/10 rounded-[4px]" />
        <div className="relative w-5 h-5 bg-black/10 rounded-[4px]">
          <div className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center text-[7px] text-white font-bold">153</div>
        </div>
        <div className="w-5 h-5 bg-black/10 rounded-[4px]" />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Navigation Tabs Bar */}
        <div className="h-14 border-b border-black/5 flex items-center px-6 md:px-8 gap-8 md:gap-12 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2.5 shrink-0 opacity-25">
            <div className="w-4 h-4 bg-black/10 rounded-sm" />
            <span className="text-[12px] font-bold uppercase tracking-widest text-black">Implementation plan</span>
          </div>
          <div className="flex items-center gap-2.5 border-b-2 border-orange-400 pb-0 shrink-0 h-full">
            <div className="w-4 h-4 bg-blue-400 rounded-full" />
            <span className="text-[12px] font-bold text-black">LoginButton.tsx</span>
            <span className="text-[10px] bg-black/5 px-1.5 py-0.5 rounded ml-1 opacity-40 font-mono">1</span>
          </div>
        </div>

        {/* Breadcrumb Navigation */}
        <div className="py-4 px-8 text-[11px] font-bold tracking-widest opacity-25 flex items-center gap-3 uppercase">
          <span>app</span>
          <span className="text-[8px] opacity-40">{">"}</span>
          <span>components</span>
          <span className="text-[8px] opacity-40">{">"}</span>
          <span className="text-black opacity-100">LoginButton.tsx</span>
        </div>

        {/* Main Code Editor View */}
        <div className="p-8 md:p-12 pb-20 font-mono text-[13px] md:text-[14px] leading-[1.9] select-none text-black/80">
          <div className="flex gap-8">
            <span className="opacity-10 text-right w-5">1</span>
            <p><span className="text-purple-500 font-bold italic">import</span> <span className="text-blue-600">Link</span> <span className="text-purple-500 font-bold italic">from</span> <span className="text-green-600">'next/link'</span>;</p>
          </div>
          <div className="flex gap-8 opacity-40"><span className="opacity-10 text-right w-5">2</span></div>
          <div className="flex gap-8">
            <span className="opacity-10 text-right w-5">3</span>
            <p><span className="text-purple-500 font-bold italic">export default function</span> <span className="text-blue-600">LoginButton</span>(): <span className="text-orange-500">React.ReactElement</span> &#123;</p>
          </div>
          <div className="flex gap-8">
            <span className="opacity-10 text-right w-5">4</span>
            <p className="ml-8"><span className="text-purple-500 font-bold italic">return</span> (</p>
          </div>
          <div className="flex gap-8 opacity-40"><span className="opacity-10 text-right w-5">5</span></div>
          <div className="flex gap-8 items-center bg-blue-500/5 -mx-10 px-10 border-l-[3px] border-blue-500/60">
            <span className="opacity-10 text-right w-5 ml-[3px]">6</span>
            <p className="ml-12">{'<'}<span className="text-blue-600">Link</span></p>
          </div>
          <div className="flex gap-8">
            <span className="opacity-10 text-right w-5">7</span>
            <p className="ml-20"><span className="text-orange-600 italic">href</span>=<span className="text-green-600">"/api/auth/strava/login"</span></p>
          </div>
          <div className="flex gap-8">
            <span className="opacity-10 text-right w-5">8</span>
            <p className="ml-20"><span className="text-orange-600 italic">className</span>=<span className="text-green-600">"rounded-md bg-orange-500 px-4 py-2"</span></p>
          </div>
          <div className="flex gap-8">
            <span className="opacity-10 text-right w-5">9</span>
            <p className="ml-20">Login with Strava</p>
          </div>
          <div className="flex gap-8">
            <span className="opacity-10 text-right w-5">10</span>
            <p className="ml-12">{'</'}<span className="text-blue-600">Link</span>{'>'}</p>
          </div>
          <div className="flex gap-8">
            <span className="opacity-10 text-right w-5">11</span>
            <p className="ml-8">);</p>
          </div>
          <div className="flex gap-8">
            <span className="opacity-10 text-right w-5">12</span>
            <p>&#125;</p>
          </div>
        </div>
      </div>
    </div>
  );
}
