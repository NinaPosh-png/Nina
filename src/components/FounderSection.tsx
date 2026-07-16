import React from "react";
import { Gem, Sparkles, Award } from "lucide-react";
// @ts-expect-error - png assets are dynamically processed by Vite
import ninaPhoto from "../assets/images/image-efe79b0c-3762-4fee-ae0f-67960a9659b1.png";

export default function FounderSection() {
  return (
    <section id="founder" className="scroll-mt-24 py-24 bg-[#FAF7F2] border-b border-[#c5a059]/15 relative overflow-hidden">
      {/* Subtle floating decorative shapes in the background */}
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-[#c5a059]/3 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-[#FAF7F2] border border-[#c5a059]/10 pointer-events-none opacity-40 rotate-12" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-3">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#c5a059] block">
            The Strategic Mind
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#333333] tracking-tight">
            Meet Our Founder
          </h2>
          <div className="w-12 h-[1px] bg-[#c5a059]/40 mx-auto" />
        </div>

        {/* Main Grid: Portrait and Narrative with an elegant corporate advisor theme */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Portrait with professional frame */}
          <div className="lg:col-span-5 relative group">
            {/* The Outer Golden border line */}
            <div className="absolute -inset-4 border border-[#c5a059]/20 transition-all duration-500 pointer-events-none z-0" />
            
            {/* The main picture block */}
            <div className="relative z-10 bg-[#FAF7F2] overflow-hidden border border-[#333333]/15 shadow-2xl">
              <div className="aspect-[4/5] overflow-hidden relative">
                <img
                  src={ninaPhoto || "/src/assets/images/image-efe79b0c-3762-4fee-ae0f-67960a9659b1.png"}
                  alt="Nina — Founder & Principal Advisor of Nina Consulting"
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out hover:scale-105"
                  onError={(e) => {
                    // Try to load direct local path first if imported asset fails
                    const el = e.target as HTMLImageElement;
                    if (el.src !== "/src/assets/images/image-efe79b0c-3762-4fee-ae0f-67960a9659b1.png") {
                      el.src = "/src/assets/images/image-efe79b0c-3762-4fee-ae0f-67960a9659b1.png";
                    }
                  }}
                />
                
                {/* A professional elegant sheen overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/25 via-white/5 to-transparent mix-blend-overlay pointer-events-none" />
                
                {/* Subtle linear sheen that travels across on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none" />
              </div>

              {/* Lower Label */}
              <div className="bg-[#333333] text-[#FAF7F2] py-4 px-6 border-t border-[#c5a059]/20 flex justify-between items-center">
                <div>
                  <h4 className="font-serif text-sm font-normal tracking-wide text-white">Nina</h4>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#c5a059] font-medium">Principal Advisor</p>
                </div>
                <div className="flex items-center gap-1.5 bg-[#FAF7F2]/5 px-2.5 py-1 border border-white/10">
                  <Award className="w-3 h-3 text-[#c5a059]" />
                  <span className="text-[8px] uppercase tracking-widest text-[#FAF7F2]/80">Executive Excellence</span>
                </div>
              </div>
            </div>

            {/* Accent gold corner brackets */}
            <div className="absolute -top-4 -left-4 w-6 h-6 border-t border-l border-[#c5a059] pointer-events-none" />
            <div className="absolute -bottom-4 -right-4 w-6 h-6 border-b border-r border-[#c5a059] pointer-events-none" />
          </div>

          {/* Right Column: Editorial narrative about consulting, advisory, and scaling */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#c5a059] font-bold block">
                Vision & Strategy
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#333333] font-normal leading-[1.15] tracking-tight">
                Architecting businesses with <br />
                <span className="italic text-[#c5a059]">elite strategic precision</span>
              </h3>
              <p className="text-sm font-light leading-relaxed text-[#555555]">
                Led by principal advisor and strategic growth architect, Nina, our consulting practice transforms businesses into market-leading, resilient organizations. Guided by rigorous financial frameworks, deep ecosystem intelligence, and clear capital-efficient roadmaps, she designs customized strategies that unlock organizational capacity and optimize enterprise value.
              </p>
            </div>

            {/* Strategy Philosophy Card */}
            <div className="bg-white border border-[#333333]/10 p-6 sm:p-8 space-y-6 relative overflow-hidden">
              {/* Subtle visual representation of data threads */}
              <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#c5a059]/5 to-transparent pointer-events-none" />
              <div className="absolute left-0 top-0 w-1.5 h-full bg-[#c5a059]" />

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Gem className="w-4 h-4 text-[#c5a059]" />
                  <h4 className="font-serif italic text-lg text-[#333333] font-medium">The Strategic Signature</h4>
                </div>
                <p className="text-xs text-[#666666] leading-relaxed">
                  "I structure each enterprise as if it were a high-fidelity, high-performance system. Every capital allocation model, every organizational incentive, and every operations roadmap must align seamlessly under a clear corporate mission. Our proprietary AI strategy advisory framework enables us to maintain absolute structural integrity, matching digital transformations with high-impact, real-world execution metrics."
                </p>
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-[#c5a059] font-bold pt-1">
                  <span>— NINA, FOUNDER OF NINA CONSULTING &bull; ADVISORY SUITE</span>
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
                  <h5 className="font-serif text-xs uppercase tracking-wider font-semibold text-[#333333]">Rigorous Frameworks</h5>
                  <p className="text-[11px] text-[#666666] leading-normal">
                    Bespoke financial modeling, data-driven diagnostics, and target operating frameworks.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-none bg-[#FAF7F2] border border-[#c5a059]/35 flex items-center justify-center shrink-0">
                  <Gem className="w-3.5 h-3.5 text-[#c5a059]" />
                </div>
                <div className="space-y-1">
                  <h5 className="font-serif text-xs uppercase tracking-wider font-semibold text-[#333333]">Defensible Scaling</h5>
                  <p className="text-[11px] text-[#666666] leading-normal">
                    Comprehensive competitor analysis, market-entry positioning, and high-growth capital allocation.
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
