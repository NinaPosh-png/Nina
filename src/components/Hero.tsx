import React, { useState } from "react";
import { Sparkles, ArrowRight, Star, Heart } from "lucide-react";

interface HeroProps {
  onStartPlanning: (eventType: string, email: string) => void;
}

export default function Hero({ onStartPlanning }: HeroProps) {
  const [email, setEmail] = useState("");
  const [eventType, setEventType] = useState("Wedding");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    onStartPlanning(eventType, email);
    
    // Smooth scroll to the concept planner tool
    const element = document.getElementById("planner");
    if (element) {
      setTimeout(() => {
        const yOffset = -80; 
        const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }, 300);
    }
  };

  return (
    <div className="relative overflow-hidden bg-[#FAF7F2] pt-16 pb-24 md:py-32 border-b border-[#c5a059]/15">
      {/* Subtle Editorial Blur Spheres */}
      <div className="absolute top-[-10%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-[#FDF2F2]/60 blur-3xl -z-10" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[30vw] h-[30vw] rounded-full bg-[#E8EBE4]/35 blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          
          {/* Hero Left Content with Embedded Form */}
          <div className="lg:col-span-7 space-y-8 text-left flex flex-col justify-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-[#FDF2F2] border border-[#c5a059]/20 px-4 py-2">
                <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
                <span className="text-[10px] font-bold text-[#c5a059] tracking-[0.2em] uppercase">
                  Est. Nina Events — Fine Planning & Production
                </span>
              </div>

              <div className="space-y-4">
                <span className="text-xs uppercase tracking-[0.3em] text-[#c5a059] font-medium block">
                  Timeless Curation
                </span>
                <h1 className="font-serif text-5xl sm:text-6xl xl:text-8xl font-normal leading-[0.95] text-[#333333]">
                  Refined<br /><span className="italic pl-12 sm:pl-16 text-[#c5a059]">Celebrations</span>
                </h1>
                
                <p className="font-serif italic text-xl text-[#8e7379] tracking-normal font-normal pt-1">
                  Smart Event Planning Made Easy
                </p>
              </div>

              <p className="text-sm leading-relaxed text-[#555555] max-w-xl">
                At Nina Events, we weave high-end digital intelligence with timeless classical design. Inspired by an editorial, warm ivory canvas with sage green accents and gold lusters, we craft bespoke celebrations customized completely to your unique narrative.
              </p>

              {/* Glowing features badges */}
              <div className="flex flex-wrap gap-4 pt-1">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-[#333333] bg-[#FDF2F2] px-4 py-1.5 border border-[#c5a059]/20 shadow-none">
                  <Heart className="w-3 h-3 text-[#c5a059]" />
                  Blush & Sage Accents
                </div>
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-[#333333] bg-[#E8EBE4] px-4 py-1.5 border border-[#c5a059]/20 shadow-none">
                  <Star className="w-3 h-3 text-[#c5a059]" />
                  Interactive Design Intelligence
                </div>
              </div>
            </div>

            {/* Seamless Concept Sign-Up Form nested beautifully */}
            <form onSubmit={handleSubmit} className="p-6 bg-white border border-[#333333]/15 space-y-4 max-w-xl relative mt-4">
              <div className="absolute inset-1 border border-[#333333]/5 -z-10" />
              
              <div className="border-b border-[#c5a059]/15 pb-2 mb-3">
                <h3 className="font-serif text-lg italic font-normal text-[#333333]">
                  Begin Your Celebration Concept
                </h3>
                <p className="text-[10px] uppercase tracking-wider text-[#7c6368]">
                  Fill details to instantly populate your live design workspace below.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-[#333333] uppercase tracking-[0.15em]">
                    Event Type Template
                  </label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#333333]/15 focus:border-[#c5a059] focus:outline-hidden rounded-none px-3 py-2.5 text-xs uppercase tracking-wider text-[#333333] font-medium transition-colors cursor-pointer"
                    id="hero-event-select"
                  >
                    <option value="Wedding">Luxury Wedding</option>
                    <option value="Birthday">Milestone Birthday</option>
                    <option value="Corporate">Chic Corporate Planner</option>
                    <option value="Shower">Elegant Bridal Shower</option>
                    <option value="Gala">Charity Gala & Soiree</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-[#333333] uppercase tracking-[0.15em]">
                    Your Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. nina@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#333333]/15 focus:border-[#c5a059] focus:outline-hidden rounded-none px-3 py-2.5 text-xs text-[#333333]"
                    id="hero-email-input"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="cursor-pointer w-full bg-[#333333] hover:bg-[#c5a059] text-white py-3 px-6 rounded-none font-bold text-xs uppercase tracking-[0.15em] transition-all duration-300 flex items-center justify-center gap-2 border border-[#333333] hover:border-[#c5a059]"
                id="hero-submit-btn"
              >
                {submitted ? "Designing Concept..." : "Access Smart Planner"}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="text-center">
                <span className="text-[9px] uppercase tracking-wider text-[#8e7379] italic block">
                  ✧ Zero obligations. Your dynamic event moodboard will synchronize instantly below.
                </span>
              </div>
            </form>
          </div>

          {/* Hero Right Content: EXACT PICTURE FEATURES FROM DESIGN SPEC */}
          <div className="lg:col-span-5 grid grid-rows-3 gap-0 border border-[#333333]/15 overflow-hidden bg-white shadow-none">
            
            {/* Rows 1 & 2: Main Image with thick off-white picture frame & elegant overlay */}
            <div className="row-span-2 bg-[#F5E6E0] relative overflow-hidden flex items-center justify-center min-h-[300px]">
              <img 
                src="https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?auto=format&fit=crop&q=80&w=800" 
                className="w-full h-full object-cover mix-blend-multiply opacity-80"
                alt="Bespoke Silk Draping Atelier"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800";
                }}
              />
              {/* Massive 24px off-white frame characteristic of editorial layout */}
              <div className="absolute inset-0 border-[24px] border-[#FAF7F2] pointer-events-none" />
              
              {/* Editorial bottom-right badge */}
              <div className="absolute bottom-10 right-10 text-right select-none">
                <span className="font-serif text-5xl text-white drop-shadow-sm font-normal italic">
                  01
                </span>
              </div>
            </div>

            {/* Row 3: Double horizontal luxury curation tags */}
            <div className="grid grid-cols-2">
              
              {/* Card 1: Silk & Radiance */}
              <div className="bg-[#FAF7F2] p-5 border-t border-r border-[#333333]/15 text-left flex flex-col justify-between">
                <div>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#c5a059] font-bold block mb-1">
                    Curation I
                  </span>
                  <h4 className="font-serif text-xs uppercase tracking-wider font-semibold text-[#333333]">
                    Silk & Radiance
                  </h4>
                </div>
                <p className="text-[10px] text-[#7c6368] leading-normal mt-2">
                  Custom lustrous satin, linen drapes & sand-beige lusters.
                </p>
              </div>

              {/* Card 2: Bridal Veil */}
              <div className="bg-[#FAF7F2] p-5 border-t border-[#333333]/15 text-left flex flex-col justify-between">
                <div>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#c5a059] font-bold block mb-1">
                    Curation II
                  </span>
                  <h4 className="font-serif text-xs uppercase tracking-wider font-semibold text-[#333333]">
                    Bridal Veil
                  </h4>
                </div>
                <p className="text-[10px] text-[#7c6368] leading-normal mt-2">
                  Delicate custom layers, soft ivory lace & sage floristry.
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
