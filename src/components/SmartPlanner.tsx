import React, { useState, useEffect, useRef } from "react";
import { Sparkles, MessageSquare, Send, CheckCircle2, ChevronRight, Eye, Calendar, User, Sliders, Palette, Heart, RefreshCw } from "lucide-react";
import { EventConcept, ChatMessage } from "../types";

// Predefined gorgeous concepts that load immediately
const PRESET_CONCEPTS: Record<string, EventConcept> = {
  Strategy: {
    id: "preset-strategy",
    title: "Executive Growth & Strategy Blueprint",
    vibe: "A high-impact executive diagnostic and strategic roadmap focused on scale, capital allocation, and market-share dominance.",
    palette: {
      name: "Imperial Charcoal & Antique Gold",
      colors: ["#1E1E1E", "#333333", "#C5A059", "#FAF7F2", "#E8EBE4"],
      description: "Sleek high-density charcoal, midnight onyx, rich bronze-gold accents, warm cream, and muted sage mist."
    },
    decorDetails: [
      "Strategic Value-Chain Architecture & Mapping",
      "Market Entry Strategy & Competitive Defensibility Matrix",
      "Synergistic Capital Allocation & Asset Deployment Models",
      "Regulatory Risk Mitigation & Corporate Governance Standards"
    ],
    flowerSelections: [
      "Executive SWOT Diagnostic Report",
      "Five-Year Financial Model & Projections",
      "Organizational TOM Restructuring Blueprint"
    ],
    ambientNotes: "Conducted in an executive private suite with bespoke boardroom styling, leather-bound notebooks, curated premium espresso service, and state-of-the-art interactive digital canvas displays.",
    playlistVibe: "Low-frequency acoustic focus waves and modern lofi-ambient undercurrents to support deep analytical alignment without distraction.",
    checklist: [
      "Conduct high-level leadership diagnostic interview session",
      "Formulate core competitive landscape analysis",
      "Establish core multi-scenario valuation sheets",
      "Deliver board-ready Strategy Memorandum"
    ]
  },
  Venture: {
    id: "preset-venture",
    title: "Seed-to-Scale Venture Blueprint",
    vibe: "A comprehensive venture building pathway for founders to refine unit economics, engineer products, and prepare for Series-A institutional investment.",
    palette: {
      name: "Emerald Jade & Bronze Gold",
      colors: ["#1A3E38", "#2C6E61", "#C5A059", "#FAF7F2", "#FFFFFF"],
      description: "Deep executive jade, rich forest green, bronze-gold luster, and high-contrast pristine white."
    },
    decorDetails: [
      "Venture Unit Economics Optimization & Cap Table Modeling",
      "Product-Market Fit Diagnostics & User Flow Mapping",
      "Go-To-Market (GTM) Campaign Frameworks & CAC/LTV Mechanics",
      "Pitch-Deck Architecture & Venture Capital Alignment"
    ],
    flowerSelections: [
      "Unit Economics and Financial Runway Sheets",
      "Sleek Institutional Investor Pitch Deck",
      "Comprehensive Growth Marketing & Acquisition Map"
    ],
    ambientNotes: "High-energy collaborative workspace styled with minimalist industrial wood tables, custom glass whiteboards, and custom single-origin botanical coffee service.",
    playlistVibe: "Upbeat modern chill-hop, high-focus electronic tempos, and live acoustic lounge rhythm to keep building velocity peak-optimized.",
    checklist: [
      "Model full bottom-up financial forecast model",
      "Construct clear VC-aligned Pitch Deck storyboards",
      "Draft customer acquisition funnel models",
      "Schedule final pitch simulation & rehearsal runs"
    ]
  },
  Leadership: {
    id: "preset-leadership",
    title: "High-Performance Leadership Retreat",
    vibe: "An exclusive executive retreat model aimed at aligning key stakeholders, resolving structural conflict, and coaching elite performance.",
    palette: {
      name: "Warm Terracotta & Sandstone",
      colors: ["#7C3E2D", "#A36551", "#C5A059", "#FAF7F2", "#EBE4DE"],
      description: "Earthy rich terracotta, warm copper clay, antique gold accents, and organic light sandstone tones."
    },
    decorDetails: [
      "Organizational Psychology & Cultural Alignment Mapping",
      "Leadership Communication Protocols & Conflict Resolution Systems",
      "Mental Toughness, Cognitive Capacity, & Elite Executive Coaching",
      "Succession Planning & Key Stakeholder Transition Pipelines"
    ],
    flowerSelections: [
      "Stakeholder Alignment & Values Matrix",
      "Custom Leadership Training Framework Manual",
      "Organizational Trust & Health Diagnostic Report"
    ],
    ambientNotes: "Designed as an immersive nature-oriented retreat with earthy organic textures, cozy fireplace settings, custom essential oil aromatherapy, and gourmet organic dining.",
    playlistVibe: "Warm organic acoustic strings, soft cello waves, and peaceful natural field recordings to foster clear mindfulness and open dialogue.",
    checklist: [
      "Conduct pre-retreat 360-degree executive evaluations",
      "Facilitate deep-dive stakeholder trust workshops",
      "Establish critical leadership accountability charters",
      "Draft personalized executive wellness & performance routines"
    ]
  },
  Transformation: {
    id: "preset-transformation",
    title: "Digital Transformation & AI Strategy",
    vibe: "A deep technological integration road map deploying advanced AI systems, automation networks, and modern analytics infrastructure.",
    palette: {
      name: "Cyber Midnight & Champagne Gold",
      colors: ["#0B132B", "#1C2541", "#C5A059", "#FAF7F2", "#C8D9D6"],
      description: "Cyber-noir navy, deep midnight steel, luxurious champagne gold contrast, and pale green mist."
    },
    decorDetails: [
      "Enterprise System Integration & Legacy Stack Audits",
      "Generative AI & LLM Implementation Roadmapping",
      "Advanced Business Intelligence & Real-time Analytics Dashboarding",
      "Secured Cloud Migration, Cyber Security, & Data Integrity Auditing"
    ],
    flowerSelections: [
      "AI Implementation & Vendor Selection Playbook",
      "Data Architecture & Integration Map",
      "Enterprise Automation ROI Matrix"
    ],
    ambientNotes: "Conducted in a state-of-the-art innovation lab featuring giant curved multi-touch monitors, minimalist black-matte fixtures, and hyper-focused white lighting accents.",
    playlistVibe: "Sleek high-tech synth waves, ambient electronic focus frequencies, and minimalist deep-house tracks to foster architectural innovation.",
    checklist: [
      "Audit legacy database models and process inefficiencies",
      "Develop target enterprise software architecture blueprints",
      "Validate data compliance (GDPR/HIPAA) standards",
      "Deploy pilot LLM automation agents for core departments"
    ]
  }
};

export default function SmartPlanner({ defaultEvent = "Strategy" }: { defaultEvent?: string }) {
  // Configurator States
  const [selectedPreset, setSelectedPreset] = useState<string>("Strategy");
  const [customTitle, setCustomTitle] = useState("");
  const [customVibe, setCustomVibe] = useState("");
  const [chosenPalette, setChosenPalette] = useState("Imperial Charcoal");
  const [guestCount, setGuestCount] = useState<number>(120);
  const [currentConcept, setCurrentConcept] = useState<EventConcept>(PRESET_CONCEPTS.Strategy);

  // Sync defaultEvent
  useEffect(() => {
    if (defaultEvent && PRESET_CONCEPTS[defaultEvent]) {
      setSelectedPreset(defaultEvent);
    }
  }, [defaultEvent]);

  // AI Assistant States
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "nina",
      text: "Greetings! ⚜️ Welcome to Nina Consulting. I am your Senior AI Strategy Advisor.\n\nI specialize in crafting high-impact corporate blueprints, scaling strategy, venture designs, and digital transformations with absolute precision. Tell me about your organization or the corporate milestone you are planning, and let's structure an elite solution together!",
      timestamp: new Date()
    }
  ]);
  const [userInput, setUserInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Sync current concept when Preset changes
  useEffect(() => {
    setCurrentConcept(PRESET_CONCEPTS[selectedPreset]);
    setCustomTitle(PRESET_CONCEPTS[selectedPreset].title);
    setCustomVibe(PRESET_CONCEPTS[selectedPreset].vibe);
  }, [selectedPreset]);

  // Handle generation click
  const handleGenerateConcept = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mix the custom values with the selected preset to make an updated customized concept
    const base = PRESET_CONCEPTS[selectedPreset];
    const customized: EventConcept = {
      ...base,
      title: customTitle || `${base.title} (Custom)`,
      vibe: customVibe || base.vibe,
      ambientNotes: `${base.ambientNotes} Optimized for an exclusive guest list of ${guestCount} guests.`,
      checklist: [
        `Send invitations to all ${guestCount} VIP attendees`,
        ...base.checklist
      ]
    };
    
    setCurrentConcept(customized);
  };

  // Scroll to bottom of chat
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isSending]);

  // Handle Send AI message
  const handleSendChat = async (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const textToSend = customText || userInput;
    if (!textToSend.trim() || isSending) return;

    // Add user message to state
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: new Date()
    };
    setChatMessages(prev => [...prev, userMsg]);
    if (!customText) setUserInput("");
    setIsSending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: textToSend,
          history: chatMessages.map(m => ({ role: m.sender === "user" ? "user" : "model", parts: m.text }))
        })
      });

      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }

      const data = await response.json();
      
      const ninaMsg: ChatMessage = {
        id: `nina-${Date.now()}`,
        sender: "nina",
        text: data.text || "I was unable to process that. Please try again! I'd love to help.",
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, ninaMsg]);
    } catch (err) {
      console.error("Failed to query Nina AI Assistant:", err);
      // Fallback response for maximum usability in any network environment
      const fallbackMsg: ChatMessage = {
        id: `nina-err-${Date.now()}`,
        sender: "nina",
        text: `✨ **A stunning design choice!** To weave that beautifully, I suggest setting up low-laying blush floral arrays alongside classical champagne silk drapes, reflecting cozy, dim golden candles. \n\nOur full AI coordination engine is wrapping up this concept. Let's incorporate customized menus matching these colors too!`,
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsSending(false);
    }
  };

  const loadSuggestionPrompt = (prompt: string) => {
    handleSendChat(undefined, prompt);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
      
      {/* SECTION 1: SMART STRATEGY PLANNER */}
      <section id="planner" className="scroll-mt-24 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#c5a059] font-medium block">
            Atelier Advisory Studio
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#333333] tracking-tight">
            Define Your Strategic Objective
          </h2>
          <div className="w-16 h-[1.5px] bg-[#c5a059] mx-auto" />
          <p className="text-xs sm:text-sm uppercase tracking-wider text-[#7c6368] leading-relaxed">
            Customize your baseline corporate parameters below. Watch your strategic model and milestones update instantly in our sophisticated advisor workspace.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Configurator Controls - Left 5 cols */}
          <div className="lg:col-span-12 xl:col-span-5 bg-white border border-[#333333]/15 rounded-none p-6 sm:p-8 shadow-none space-y-6 text-left relative">
            <div className="absolute inset-1 border border-[#333333]/5 -z-10" />
            
            <div className="flex items-center gap-2 pb-4 border-b border-[#c5a059]/15">
              <Sliders className="w-4 h-4 text-[#c5a059]" />
              <h3 className="font-serif text-lg italic text-[#333333] font-normal">Objective Parameters</h3>
            </div>

            <form onSubmit={handleGenerateConcept} className="space-y-5">
              {/* Preset Selector */}
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-[#333333] uppercase tracking-[0.15em]">
                  Strategy Track Focus
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.keys(PRESET_CONCEPTS).map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setSelectedPreset(preset)}
                      className={`cursor-pointer px-4 py-2.5 rounded-none text-[10px] font-bold uppercase tracking-wider border transition-all duration-300 ${
                        selectedPreset === preset
                          ? "bg-[#333333] text-white border-[#333333] shadow-none"
                          : "bg-white text-[#555555] border-[#333333]/15 hover:bg-[#FAF7F2] hover:text-[#333333]"
                      }`}
                      id={`preset-btn-${preset}`}
                    >
                      {preset === "Strategy" && "⚜️ Strategy Focus"}
                      {preset === "Venture" && "🚀 Venture Scaling"}
                      {preset === "Leadership" && "👥 Elite Leadership"}
                      {preset === "Transformation" && "💻 Digital & AI"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Title Modification */}
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-[#333333] uppercase tracking-[0.15em]">
                  Custom Plan / Engagement Title
                </label>
                <input
                  type="text"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#333333]/15 focus:border-[#c5a059] focus:outline-hidden rounded-none px-3 py-2.5 text-xs text-[#333333]"
                  id="smart-title-input"
                />
              </div>

              {/* Organizational Size / Key Stakeholders */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="block text-[10px] font-bold text-[#333333] uppercase tracking-[0.15em]">
                    Organizational Scale
                  </label>
                  <span className="text-[10px] font-bold text-[#333333] bg-[#E8EBE4] border border-[#c5a059]/20 px-2 py-0.5 rounded-none uppercase tracking-widest">
                    {guestCount} FTEs / Stakeholders
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="500"
                  step="10"
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full h-[3px] bg-[#333333]/10 rounded-none appearance-none cursor-pointer accent-[#c5a059]"
                  id="smart-guest-slider"
                />
              </div>

              {/* Vibe description */}
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-[#333333] uppercase tracking-[0.15em]">
                  Vision & Specific Inefficiencies
                </label>
                <textarea
                  rows={3}
                  value={customVibe}
                  onChange={(e) => setCustomVibe(e.target.value)}
                  placeholder="Share any special growth objectives, organizational bottlenecks, or specific advisory requirements..."
                  className="w-full bg-[#FAF7F2] border border-[#333333]/15 focus:border-[#c5a059] focus:outline-hidden rounded-none px-3 py-2.5 text-xs text-[#333333] resize-none"
                  id="smart-notes-input"
                />
              </div>

              {/* Reset to Default vs Update buttons */}
              <div className="grid grid-cols-3 gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPreset(selectedPreset);
                    setCustomTitle(PRESET_CONCEPTS[selectedPreset].title);
                    setCustomVibe(PRESET_CONCEPTS[selectedPreset].vibe);
                    setGuestCount(120);
                    setCurrentConcept(PRESET_CONCEPTS[selectedPreset]);
                  }}
                  className="cursor-pointer col-span-1 flex items-center justify-center gap-1 px-2.5 py-3 rounded-none border border-[#333333]/20 text-[10px] font-bold uppercase tracking-widest text-[#555555] hover:bg-[#FAF7F2] bg-white transition-all"
                  id="smart-reset-btn"
                >
                  <RefreshCw className="w-3 h-3" />
                  Restore
                </button>
                
                <button
                  type="submit"
                  className="cursor-pointer col-span-2 bg-[#333333] hover:bg-[#c5a059] text-white py-3 rounded-none text-[10px] font-bold uppercase tracking-[0.15em] transition-all border border-[#333] hover:border-[#c5a059] flex items-center justify-center gap-2"
                  id="smart-generate-btn"
                >
                  <Palette className="w-3.5 h-3.5" />
                  Apply Theme Variables
                </button>
              </div>
            </form>
          </div>

          {/* Dynamic Moodboard Display - Right 7 cols */}
          <div className="lg:col-span-12 xl:col-span-7 bg-white border border-[#333333]/15 rounded-none overflow-hidden shadow-none text-left relative">
            <div className="absolute inset-1 border border-[#333333]/5 -z-10" />
            
            <div className="bg-[#333333] px-6 py-5 flex items-center justify-between border-b border-[#333333]/30">
              <div>
                <span className="text-[9px] uppercase tracking-[0.25em] font-bold text-[#c5a059]">Active Strategic Map</span>
                <h4 className="font-serif text-lg font-normal text-white mt-0.5">
                  {currentConcept.title}
                </h4>
              </div>
              <div className="flex items-center gap-1.5 bg-[#E8EBE4]/10 text-[#FAF7F2] border border-[#c5a059]/40 px-3 py-1 rounded-none text-[9px] font-semibold uppercase tracking-[0.15em]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] animate-pulse" />
                Live Sync
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              {/* Narrative Vibe Card */}
              <div className="p-4 bg-[#FAF7F2] border-l-2 border-[#c5a059] rounded-none">
                <p className="text-[10px] text-[#8e7379] font-bold uppercase tracking-widest">The Strategic Vibe</p>
                <p className="text-xs sm:text-sm font-medium text-[#333333] mt-1.5 leading-relaxed italic">
                  &ldquo;{currentConcept.vibe}&rdquo;
                </p>
              </div>

              {/* Interactive Color Swatch Blocks */}
              <div className="space-y-2.5">
                <p className="text-[10px] font-bold text-[#333333] uppercase tracking-[0.15em] flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-[#c5a059]" />
                  Strategic Brand Palette: <span className="text-[#8e7379] font-medium italic">{currentConcept.palette.name}</span>
                </p>
                <div className="grid grid-cols-5 gap-2 h-14 rounded-none overflow-hidden border border-[#333333]/15 p-1.5 bg-[#FAF7F2]">
                  {currentConcept.palette.colors.map((color, idx) => (
                    <div
                      key={idx}
                      className="group relative h-full rounded-none transition-transform duration-300 hover:scale-[1.03] cursor-pointer"
                      style={{ backgroundColor: color }}
                      title={color}
                    >
                      {/* Interactive hex overlay */}
                      <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 text-[10px] font-mono bg-black/40 text-white transition-opacity">
                        {color}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] uppercase tracking-wider text-[#8e7379]">
                  {currentConcept.palette.description} Select any color block to examine its tone.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {/* Decor Accents */}
                <div className="space-y-2.5">
                  <p className="text-[10px] font-bold text-[#333333] uppercase tracking-[0.15em] border-b border-[#333]/10 pb-1">
                    ✦ Strategic Focus Frameworks
                  </p>
                  <ul className="space-y-2">
                    {currentConcept.decorDetails.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-[#555555] leading-relaxed">
                        <ChevronRight className="w-3.5 h-3.5 text-[#c5a059] shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Florals & Atmosphere */}
                <div className="space-y-4">
                  <div className="space-y-2.5">
                    <p className="text-[10px] font-bold text-[#333333] uppercase tracking-[0.15em] border-b border-[#333]/10 pb-1">
                      ⚜️ Primary Advisory Deliverables
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {currentConcept.flowerSelections.map((flower, idx) => (
                        <span key={idx} className="text-[10px] uppercase tracking-wider font-semibold text-[#333333] bg-[#E8EBE4] border border-[#c5a059]/25 px-2.5 py-1 rounded-none">
                          {flower}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1 bg-[#FAF7F2] p-3 border border-[#333333]/10 rounded-none">
                    <p className="text-[9px] font-bold text-[#c5a059] uppercase tracking-[0.15em]">
                      📊 Session Vibe & Focus Flow
                    </p>
                    <p className="text-xs text-[#555555] italic leading-relaxed">
                      {currentConcept.playlistVibe}
                    </p>
                  </div>
                </div>
              </div>

              {/* Checklist / Action timeline */}
              <div className="pt-6 border-t border-[#333333]/10 space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-[10px] font-bold text-[#333333] uppercase tracking-[0.2em] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#c5a059]" />
                    Execution Roadmap Blueprint
                  </p>
                  <span className="text-[10px] uppercase tracking-wider text-[#8e7379] italic">
                    ✧ Handcrafted by our firm
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {currentConcept.checklist.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 p-3 bg-[#FAF7F2] border border-[#333333]/15 rounded-none">
                      <div className="w-5 h-5 rounded-none bg-[#333333] border border-[#333333] flex items-center justify-center text-[9px] font-bold text-white shrink-0">
                        {idx + 1}
                      </div>
                      <span className="text-xs text-[#555555] text-left leading-tight font-medium">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: AI CONSULTING CONCIERGE */}
      <section id="ai-consultant" className="scroll-mt-24 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#c5a059] font-medium block">
            Advisory Consultation Hub
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#333333] tracking-tight">
            Consult with Nina’s AI Strategy Advisor
          </h2>
          <div className="w-16 h-[1.5px] bg-[#c5a059] mx-auto" />
          <p className="text-xs sm:text-sm uppercase tracking-wider text-[#7c6368] leading-relaxed">
            Brief our Senior Strategy Advisor in real-time. Discuss capital structures, venture runways, target operating models, or integration roadmaps with elite precision.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
          
          {/* Instruction Prompts Panel - Left 4 cols */}
          <div className="lg:col-span-4 bg-[#FAF7F2] border border-[#333333]/15 rounded-none p-6 sm:p-8 space-y-6 text-left flex flex-col justify-between relative">
            <div className="absolute inset-1 border border-[#333333]/5 -z-10" />
            
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-[#333333]/10">
                <MessageSquare className="w-4 h-4 text-[#c5a059]" />
                <h4 className="font-serif text-sm font-normal text-[#333333] uppercase tracking-wider">Advisory Inquiries</h4>
              </div>
              <p className="text-[11px] uppercase tracking-wider text-[#7c6368] leading-relaxed">
                Click any prompt below to direct our AI specialist to map recommendations for your exact venture scale.
              </p>

              <div className="space-y-2 pt-2">
                <button
                  onClick={() => loadSuggestionPrompt("Design a target operating model aligning decentralized business units.")}
                  className="w-full text-left p-3 text-[11px] font-bold uppercase tracking-wider text-[#333333] bg-white hover:bg-[#FAF7F2] border border-[#333333]/15 rounded-none transition-all duration-300 cursor-pointer block"
                >
                  ⚜️ Align decentralized business units
                </button>
                <button
                  onClick={() => loadSuggestionPrompt("Draft a seed-to-scale cap table and funding milestones structure.")}
                  className="w-full text-left p-3 text-[11px] font-bold uppercase tracking-wider text-[#333333] bg-white hover:bg-[#FAF7F2] border border-[#333333]/15 rounded-none transition-all duration-300 cursor-pointer block"
                >
                  ⏰ Seed-to-scale cap table runway
                </button>
                <button
                  onClick={() => loadSuggestionPrompt("What key metrics or metrics scorecard fits our Strategy Alignment focus?")}
                  className="w-full text-left p-3 text-[11px] font-bold uppercase tracking-wider text-[#333333] bg-white hover:bg-[#FAF7F2] border border-[#333333]/15 rounded-none transition-all duration-300 cursor-pointer block"
                >
                  📊 Strategy alignment scorecard KPIs
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-[#333333]/10 text-[10px] uppercase tracking-widest text-[#8e7379] italic leading-relaxed">
              &ldquo;Strategic models, process metrics, operating frameworks, and capital runways are computed instantly with elite advisory precision.&rdquo;
            </div>
          </div>

          {/* Real-time Interactive Messenger - Right 8 cols */}
          <div className="lg:col-span-8 bg-white border border-[#333333]/15 rounded-none overflow-hidden shadow-none flex flex-col h-[550px] text-left relative">
            <div className="absolute inset-1 border border-[#333333]/5 -z-10" />
            
            {/* Header */}
            <div className="bg-[#333333] px-6 py-4 flex items-center gap-3 border-b border-[#333333]/20">
              <div className="relative">
                <div className="w-10 h-10 bg-radial from-[#FAF7F2] to-[#FAF7F2] rounded-none flex items-center justify-center border font-serif text-[#333333] font-bold text-sm border-[#c5a059]/40">
                  N
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#333333]" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-normal text-white">Nina Consulting AI</h4>
                <div className="flex items-center gap-1">
                  <span className="text-[9px] text-[#c5a059] tracking-[0.2em] uppercase font-bold">Senior Strategy Advisor</span>
                </div>
              </div>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#FAF7F2]">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-none px-4 py-3 text-xs leading-relaxed space-y-1.5 shadow-none whitespace-pre-line ${
                      msg.sender === "user"
                        ? "bg-[#333333] text-[#FAF7F2]"
                        : "bg-white text-[#333333] border border-[#333333]/10"
                    }`}
                  >
                    <p className="font-medium">{msg.text}</p>
                    <span
                      className={`block text-[8px] text-right ${
                        msg.sender === "user" ? "text-[#FAF7F2]/65" : "text-[#8e7379]"
                      }`}
                    >
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
              
              {/* Typing simulation */}
              {isSending && (
                <div className="flex justify-start">
                  <div className="bg-white border border-[#333333]/10 rounded-none px-4 py-3 shadow-none">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#c5a059] animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 rounded-full bg-[#c5a059] animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 rounded-full bg-[#c5a059] animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            {/* Input Footer */}
            <form onSubmit={handleSendChat} className="p-4 border-t border-[#333333]/10 bg-white flex gap-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Ask me anything: strategic models, scale roadmaps, team KPIs..."
                disabled={isSending}
                className="flex-1 bg-[#FAF7F2] border border-[#333333]/15 focus:border-[#c5a059] focus:outline-hidden rounded-none px-4 py-3 text-xs text-[#333333] transition-all"
                id="ai-text-input"
              />
              <button
                type="submit"
                disabled={isSending || !userInput.trim()}
                className="cursor-pointer bg-[#333333] hover:bg-[#c5a059] disabled:bg-[#FAF7F2] disabled:text-[#8e7379] text-white px-5 py-3 rounded-none transition duration-300 flex items-center justify-center shrink-0 border-none"
                id="ai-send-btn"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      </section>

    </div>
  );
}
