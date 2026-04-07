"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Monitor, Smartphone, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import BrillancePreview from "@/components/BrillancePreview";
import Work02Preview from "@/components/Work02Preview";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const projects = [
  {
    id: "01",
    title: "PROJECT 01",
    category: "Design System",
    description: "CREATIVE DIRECTION AND DESIGN SYSTEM FOR AGENTIC AI.",
    color: "#000000",
    image: "/projects/logo_01.svg",
  },
  {
    id: "02",
    title: "ZIGBANG",
    category: "Fintech",
    description: "NEXT-GEN FINTECH INTERFACE AND DATA VISUALIZATION.",
    color: "#FF681B",
    image: "/projects/logo_02.svg",
  },
  {
    id: "03",
    title: "HGNN",
    category: "Analytics",
    description: "ADVANCED ANALYTICS PLATFORM DESIGN.",
    color: "#FFDE00",
    image: null,
  }
];

export default function ProjectDetail() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const project = projects.find((p) => p.id === id);
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");

  if (!project) {
    return <div className="flex items-center justify-center min-h-screen text-2xl">Project not found</div>;
  }

  const getTitle = (id: string) => {
    switch (id) {
      case "01": return "MUSINSA";
      case "02": return "ZIGBANG";
      case "03": return "HGNN";
      default: return project.title;
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      {/* Integrated Header Section */}
      <header className="fixed top-0 left-0 w-full z-[100] h-16 md:h-20 flex items-center justify-between px-4 md:px-8 border-b border-black/5 bg-white/90 backdrop-blur-md shrink-0">
        <div className="flex items-center gap-2 md:gap-4 flex-1">
          <button 
            onClick={() => router.push("/#work-section")} 
            className="p-2 hover:bg-black/5 rounded-full transition-all group"
          >
            <ArrowLeft className="w-6 h-6 md:w-8 md:h-8 text-black group-hover:scale-110 transition-transform" />
          </button>
          <div className="text-[18px] md:text-[28px] font-bold tracking-tighter uppercase whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px] md:max-w-none">
            {getTitle(id)}
          </div>
        </div>
        
        <div className="flex-1 flex justify-center">
          <div className="flex items-center gap-1 bg-black/5 p-1 rounded-full scale-90 md:scale-100">
            <button 
              onClick={() => setViewMode("desktop")}
              className={cn(
                "p-2 rounded-full transition-all",
                viewMode === "desktop" ? "bg-white shadow-sm text-black" : "text-black/30 hover:text-black/60"
              )}
            >
              <Monitor className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button 
              onClick={() => setViewMode("mobile")}
              className={cn(
                "p-2 rounded-full transition-all",
                viewMode === "mobile" ? "bg-white shadow-sm text-black" : "text-black/30 hover:text-black/60"
              )}
            >
              <Smartphone className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-end">
          <button onClick={() => router.push("/#work-section")} className="p-2 hover:bg-black/5 rounded-full transition-all">
            <X className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Content Section */}
      <main className={cn(
        "flex-1 w-full mx-auto transition-all duration-700 pt-20 md:pt-28 flex flex-col items-center",
        viewMode === "mobile" ? "max-w-[450px] ring-1 ring-black/5 shadow-2xl my-8 rounded-[40px] overflow-hidden bg-white" : "max-w-full"
      )}>
        <div className="w-full h-full flex flex-col min-h-screen bg-white">
          <div className="py-20 px-8 flex flex-col items-center justify-center space-y-12 animate-in fade-in duration-1000">
            <div className="w-full max-w-6xl aspect-video bg-gray-50 rounded-[40px] flex items-center justify-center text-gray-300 font-bold text-2xl md:text-4xl uppercase border border-black/5 p-4 text-center">
              {getTitle(id)} Digital Experience Preview
            </div>
            <div className="max-w-3xl text-center space-y-8">
              <h3 className="text-4xl md:text-7xl font-bold tracking-tighter uppercase leading-tight">
                {id === "01" ? "Innovating Digital Fashion" : id === "02" ? "Next Generation Living" : "Modern Digital Solutions"}
              </h3>
              <p className="text-lg md:text-xl opacity-50 font-medium leading-relaxed max-w-2xl mx-auto uppercase">
                {id === "01" ? "Creative direction and design system development for Korea's leading fashion platform." : 
                 id === "02" ? "Building the future of urban living through advanced digital real estate services." :
                 "Engineering sophisticated analytics and technical solutions for modern business challenges."}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
              <div className="h-[300px] md:h-[500px] bg-gray-50 rounded-[40px] border border-black/5" />
              <div className="h-[300px] md:h-[500px] bg-gray-50 rounded-[40px] border border-black/5" />
            </div>
            <div className="w-full max-w-6xl h-[400px] md:h-[700px] bg-gray-50 rounded-[40px] border border-black/5" />
          </div>

          {/* Next Projects Section (Simplified) */}
          <section className="w-full py-32 px-6 md:px-12 border-t border-black/5 bg-[#fcfcfc]">
            <div className="max-w-[1400px] mx-auto">
              <h4 className="text-[20px] font-semibold uppercase tracking-tighter mb-12 opacity-40">Keep Exploring</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                {projects
                  .filter((p) => p.id !== id)
                  .map((p) => (
                    <motion.div
                      key={p.id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => {
                        router.push(`/project/${p.id}`);
                        window.scrollTo(0, 0);
                      }}
                      className="group cursor-pointer"
                    >
                      <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-black/5 mb-4 relative shadow-sm group-hover:shadow-lg transition-all duration-500">
                         <div className="absolute inset-0" style={{ backgroundColor: p.color }} />
                         {p.image && (
                           <div className="absolute inset-0 flex items-center justify-center p-8">
                             <img 
                               src={p.image} 
                               className={cn(
                                 "w-full h-auto object-contain",
                                 p.id === "02" ? "scale-[0.5]" : "scale-100"
                               )} 
                               alt="" 
                             />
                           </div>
                         )}
                      </div>
                      <div className="flex justify-between items-center px-1">
                        <span className="text-[14px] font-bold uppercase tracking-tight">{p.title}</span>
                        <span className="text-[10px] opacity-40 uppercase font-medium">{p.category}</span>
                      </div>
                    </motion.div>
                  ))
                }
              </div>
              
              <div className="mt-24 pt-12 border-t border-black/5 flex justify-center">
                 <button 
                  onClick={() => router.push("/#work-section")}
                  className="flex items-center gap-3 px-8 py-4 bg-black text-white rounded-full font-bold uppercase text-sm tracking-widest hover:bg-[#ffde00] hover:text-black transition-all"
                 >
                    <ArrowLeft className="w-5 h-5" /> Back to Work
                 </button>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Global CSS for scroll preservation if needed */}
      <style jsx global>{`
        body {
          overflow-y: auto !important;
        }
      `}</style>
    </div>
  );
}
