import React from "react";
import { Mail, Clock, ShieldCheck, Heart } from "lucide-react";

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#333333] text-[#FAF7F2] pt-16 pb-8 border-t border-[#c5a059]/30 text-left relative">
      <div className="absolute inset-1 border border-white/[0.03] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main upper footer blocks */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Block 1: Identity */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FAF7F2] rounded-none flex items-center justify-center border border-[#c5a059]">
                <span className="font-serif text-[#333333] text-sm font-bold tracking-tight">N E</span>
              </div>
              <span className="font-serif text-lg font-normal text-white tracking-widest">NINA EVENTS</span>
            </div>
            
            <p className="text-xs text-[#FAF7F2]/70 leading-relaxed max-w-sm font-sans tracking-wide">
              Crafting majestic celebrations that weave high-society floral curation with the forefront of digital event intelligence. Celebrating you in stunning gold, slate, and warm ivory.
            </p>

            <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-[#c5a059] font-semibold">
              <Heart className="w-3 h-3 text-[#c5a059] animate-pulse" />
              <span>Created with timeless editorial design</span>
            </div>
          </div>

          {/* Block 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-normal text-[#c5a059] uppercase tracking-[0.15em] border-b border-white/[0.08] pb-1">The Experience</h4>
            <ul className="space-y-2 text-xs uppercase tracking-wider font-medium">
              <li>
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="text-white/70 hover:text-[#c5a059] transition-colors cursor-pointer"
                >
                  Return Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("planner")}
                  className="text-white/70 hover:text-[#c5a059] transition-colors cursor-pointer"
                >
                  Concept Creator
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("ai-consultant")}
                  className="text-white/70 hover:text-[#c5a059] transition-colors cursor-pointer"
                >
                  AI Coordinator
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("founder")}
                  className="text-white/70 hover:text-[#c5a059] transition-colors cursor-pointer"
                >
                  Philosophy & Founder
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("rsvp")}
                  className="text-white/70 hover:text-[#c5a059] transition-colors cursor-pointer"
                >
                  Guest RSVP Hub
                </button>
              </li>
            </ul>
          </div>

          {/* Block 3: Contact Metadata */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-normal text-[#c5a059] uppercase tracking-[0.15em] border-b border-white/[0.08] pb-1">Studio Office</h4>
            <ul className="space-y-2 text-xs text-white/70 uppercase tracking-widest font-medium">
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                <span className="normal-case">concierge@ninaevents.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                <span>Mon – Sat: 09:00 – 18:00</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                <span>GDPR protection certified</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Lower footer copyright */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row justify-between items-center text-[10px] uppercase tracking-wider text-white/50 space-y-4 sm:space-y-0">
          <span>
            © 2026 Nina Events. Fine Curation & Production.
          </span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-[#c5a059] transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-[#c5a059] transition-colors">Terms of Curation</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
