import React from "react";
import { Gem, Sparkles, Heart } from "lucide-react";
// @ts-expect-error - png assets are dynamically processed by Vite
import ninaPhoto from "../assets/images/image-efe79b0c-3762-4fee-ae0f-67960a9659b1.png";

export default function FounderSection() {
  return (
    <section id="founder" className="scroll-mt-24 py-24 bg-[#FAF7F2] border-b border-[#c5a059]/15 relative overflow-hidden">
      {/* Delicate floating silk-drape shapes in the background */}
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-[#c5a059]/3 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-[#FAF7F2] border border-[#c5a059]/10 pointer-events-none opacity-40 rotate-12" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-3">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#c5a059] block">
            The Creative Force
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#333333] tracking-tight">
            Meet Our Founder
          </h2>
          <div className="w-12 h-[1px] bg-[#c5a059]/40 mx-auto" />
        </div>

        {/* Main Grid: Portrait and Narrative with a premium Editorial Silk theme */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Portrait under a luxurious "Double Frame" Silk motif */}
          <div className="lg:col-span-5 relative group">
            {/* The Outer Silk Golden border line */}
            <div className="absolute -inset-4 border border-[#c5a059]/20 transition-all duration-500 pointer-events-none z-0" />
            
            {/* The main picture block */}
            <div className="relative z-10 bg-[#FAF7F2] overflow-hidden border border-[#333333]/15 shadow-2xl">
              <div className="aspect-[4/5] overflow-hidden relative">
                <img
                  src={ninaPhoto || "/src/assets/images/image-efe79b0c-3762-4fee-ae0f-67960a9659b1.png"}
                  alt="Nina — Founder & Principal Curator of Nina Events"
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out hover:scale-105"
                  onError={(e) => {
                    // Try to load direct local path first if imported asset fails
                    const el = e.target as HTMLImageElement;
                    if (el.src !== "/src/assets/images/image-efe79b0c-3762-4fee-ae0f-67960a9659b1.png") {
                      el.src = "/src/assets/images/image-efe79b0c-3762-4fee-ae0f-67960a9659b1.png";
                    }
                  }}
                />
                
                {/* A shimmering satin silk sheen overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/25 via-white/5 to-transparent mix-blend-overlay pointer-events-none" />
                
                {/* Subtle linear sheen that travels across on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none" />
              </div>

              {/* Lower Silk Label */}
              <div className="bg-[#333333] text-[#FAF7F2] py-4 px-6 border-t border-[#c5a059]/20 flex justify-between items-center">
                <div>
                  <h4 className="font-serif text-sm font-normal tracking-wide text-white">Nina</h4>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#c5a059] font-medium">Principal Curator</p>
                </div>
                <div className="flex items-center gap-1.5 bg-[#FAF7F2]/5 px-2.5 py-1 border border-white/10">
                  <Heart className="w-3 h-3 text-[#c5a059] fill-[#c5a059]/20 animate-pulse" />
                  <span className="text-[8px] uppercase tracking-widest text-[#FAF7F2]/80">Parisienne Aesthetic</span>
                </div>
              </div>
            </div>

            {/* Accent gold corner brackets for a museum/atelier finish */}
            <div className="absolute -top-4 -left-4 w-6 h-6 border-t border-l border-[#c5a059] pointer-events-none" />
            <div className="absolute -bottom-4 -right-4 w-6 h-6 border-b border-r border-[#c5a059] pointer-events-none" />
          </div>

          {/* Right Column: Editorial narrative about silk, draping, and space */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#c5a059] font-bold block">
                Vision & Philosophy
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#333333] font-normal leading-[1.15] tracking-tight">
                Crafting celebrations with <br />
                <span className="italic text-[#c5a059]">satin-smooth precision</span>
              </h3>
              <p className="text-sm font-light leading-relaxed text-[#555555]">
                Led by principal event planner and visual artist, Nina, our design office transforms spaces into sensory memories. Inspired by the soft luster of premium dupioni silks, clean alabaster lines, and natural local flora, she establishes celebrations that feel uniquely authentic, warm, and majestic.
              </p>
            </div>

            {/* Silk Design Philosophy Card */}
            <div className="bg-white border border-[#333333]/10 p-6 sm:p-8 space-y-6 relative overflow-hidden">
              {/* Subtle visual representation of silk threads */}
              <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#c5a059]/5 to-transparent pointer-events-none" />
              <div className="absolute left-0 top-0 w-1.5 h-full bg-[#c5a059]" />

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Gem className="w-4 h-4 text-[#c5a059]" />
                  <h4 className="font-serif italic text-lg text-[#333333] font-medium">The Pure Silk Signature</h4>
                </div>
                <p className="text-xs text-[#666666] leading-relaxed">
                  "I construct each space as if it were a high-fashion, flowing textile. Every tablecloth's tuck, every candle's amber reflection, and every climbing blossom must move in a natural rhythm. Our proprietary AI event curation engine allows us to preserve this absolute tactile perfection, matching digital blueprints effortlessly with realistic, real-life installation timelines."
                </p>
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-[#c5a059] font-bold pt-1">
                  <span>— NINA, FOUNDER OF NINA EVENTS &bull; DESIGN SUITE</span>
                </div>
              </div>
            </div>

            {/* Core Values / Signature Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-none bg-[#FAF7F2] border border-[#c5a059]/35 flex items-center justify-center shrink-0">
                  <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
                </div>
                <div className="space-y-1">
                  <h5 className="font-serif text-xs uppercase tracking-wider font-semibold text-[#333333]">Tactile Textures</h5>
                  <p className="text-[11px] text-[#666666] leading-normal">
                    Lustrous organic silks, custom linen napkins, and sand-ivory cardstock.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-none bg-[#FAF7F2] border border-[#c5a059]/35 flex items-center justify-center shrink-0">
                  <Gem className="w-3.5 h-3.5 text-[#c5a059]" />
                </div>
                <div className="space-y-1">
                  <h5 className="font-serif text-xs uppercase tracking-wider font-semibold text-[#333333]">Sovereign Detailing</h5>
                  <p className="text-[11px] text-[#666666] leading-normal">
                    Hand-crafted calligraphy place cards paired with soft-illuminating brass fixtures.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
