import React, { useState } from "react";
import { Menu, X, Sparkles, PhoneCall } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      // Offset for sticky navbar
      const yOffset = -80; 
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#c5a059]/20 shadow-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo Crest */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-3.5 text-left focus:outline-hidden group"
              id="logo-button"
            >
              <div className="w-11 h-11 bg-[#333333] rounded-none flex items-center justify-center shadow-xs border border-[#c5a059]/40 group-hover:bg-[#c5a059] transition-all duration-300">
                <span className="font-serif text-[#FAF7F2] text-sm font-semibold tracking-widest">NCA</span>
              </div>
              <div>
                <span className="block font-serif text-2xl italic font-normal text-[#333333] tracking-tight leading-none">Nina Consulting</span>
                <span className="block text-[8px] text-[#c5a059] tracking-[0.2em] font-semibold uppercase mt-1 leading-none">Bespoke Business Advisory</span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-7">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-[#555555] hover:text-[#333333] transition-colors"
              id="nav-home"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection("planner")}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-[#555555] hover:text-[#333333] transition-colors flex items-center gap-1.5"
              id="nav-planner"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
              Smart Venture Planner
            </button>
            <button 
              onClick={() => scrollToSection("ai-consultant")}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-[#555555] hover:text-[#333333] transition-colors"
              id="nav-ai-consultant"
            >
              AI Strategy Advisor
            </button>
            <button 
              onClick={() => scrollToSection("founder")}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-[#555555] hover:text-[#333333] transition-colors"
              id="nav-founder"
            >
              The Founder
            </button>
            <button 
              onClick={() => scrollToSection("booking")}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-[#555555] hover:text-[#333333] transition-colors"
              id="nav-booking"
            >
              Inquire
            </button>
            
            <button 
              onClick={() => scrollToSection("booking")}
              className="cursor-pointer bg-[#333333] hover:bg-[#c5a059] text-white px-6 py-3 rounded-none text-xs font-semibold tracking-widest uppercase shadow-none transition-all duration-300 border border-[#333333] hover:border-[#c5a059] flex items-center gap-2"
              id="nav-cta"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              Request Consultation
            </button>
          </div>

          {/* Mobile hamburger menu */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-[#5a484c] hover:text-[#4a1521] focus:outline-hidden"
              aria-label="Toggle Menu"
              id="mobile-menu-btn"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#FAF7F2]/98 border-b border-[#c5a059]/20 transition-all duration-300">
          <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3 text-center">
            <button
              onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); setIsOpen(false); }}
              className="block w-full text-center px-3 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-[#555555] hover:text-[#333333] hover:bg-[#FAF7F2] transition-colors"
              id="mobile-home"
            >
              Home
            </button>
            <button
              onClick={() => { scrollToSection("planner"); setIsOpen(false); }}
              className="block w-full text-center px-3 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-[#555555] hover:text-[#333333] hover:bg-[#FAF7F2] transition-colors"
              id="mobile-planner"
            >
              Smart Venture Planner
            </button>
            <button
              onClick={() => { scrollToSection("ai-consultant"); setIsOpen(false); }}
              className="block w-full text-center px-3 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-[#555555] hover:text-[#333333] hover:bg-[#FAF7F2] transition-colors"
              id="mobile-ai-consultant"
            >
              AI Strategy Advisor
            </button>
            <button
              onClick={() => { scrollToSection("founder"); setIsOpen(false); }}
              className="block w-full text-center px-3 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-[#555555] hover:text-[#333333] hover:bg-[#FAF7F2] transition-colors"
              id="mobile-founder"
            >
              The Founder
            </button>
            <button
              onClick={() => { scrollToSection("booking"); setIsOpen(false); }}
              className="block w-full text-center px-3 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-[#555555] hover:text-[#333333] hover:bg-[#FAF7F2] transition-colors"
              id="mobile-booking"
            >
              Inquire
            </button>
            <div className="pt-4 px-4">
              <button
                onClick={() => scrollToSection("booking")}
                className="w-full bg-[#333333] text-white py-3 rounded-none text-xs font-semibold tracking-widest uppercase shadow-none border border-[#333333] hover:bg-[#c5a059] hover:border-[#c5a059] flex items-center justify-center gap-2"
                id="mobile-cta"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                Request Consultation
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
