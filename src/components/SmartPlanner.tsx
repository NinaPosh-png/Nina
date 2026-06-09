import React, { useState, useEffect, useRef } from "react";
import { Sparkles, MessageSquare, Send, CheckCircle2, ChevronRight, Eye, Calendar, User, Sliders, Palette, Heart, RefreshCw } from "lucide-react";
import { EventConcept, ChatMessage } from "../types";

// Predefined gorgeous concepts that load immediately
const PRESET_CONCEPTS: Record<string, EventConcept> = {
  Wedding: {
    id: "preset-wedding",
    title: "The Ethereal Blossom Wedding",
    vibe: "A breathtaking romantic oasis centered around soft blush roses, delicate fairy lights, and shimmering champagne gold accents.",
    palette: {
      name: "Blush Royale & Champagne Mist",
      colors: ["#FFF0F2", "#F9D6DC", "#F1B5C0", "#E09DAA", "#C5A059"],
      description: "Creamy blush, warm rose pink, dusty velvet magenta, and radiant gold luster."
    },
    decorDetails: [
      "Sweeping champagne silk drape arches at the ceremony entrance",
      "Glimmering warm-white fairy lights cascading beneath a translucent glass pavilion",
      "Mirror-topped imperial tables reflecting flickering crystal candelabras",
      "Soft peach-tinted uplighting illuminating historical pillars and arches"
    ],
    flowerSelections: [
      "Plump Juliet Peach English Roses",
      "Fluffy Ivory Peonies and White Hydrangeas",
      "Cascading Silver Dollar Eucalyptus and Jasmine vines"
    ],
    ambientNotes: "Atmosphere of soft, exquisite intimacy. Sweet aromas of fresh citrus and gardenia fill the air. Table settings include gold-rimmed organic glass plates and blush velvet napkins.",
    playlistVibe: "Acoustic cello and harp covers of contemporary love themes during arrival, transitioning to smooth bossa nova and classic jazz for dinner.",
    checklist: [
      "Finalize floral density diagram with our principal designer",
      "Select vintage gold cutlery and customized blush chargers",
      "Review the illuminated staircase setup for the Grand Entrance",
      "Conduct linen styling and napkin-fold testing (recommending the rosette folder)"
    ]
  },
  Birthday: {
    id: "preset-birthday",
    title: "Chic Velvet Midnight Soirée",
    vibe: "A glamorous, mood-lit celebratory evening. Rich jewel notes blended with feminine rose hues and deep champagne.",
    palette: {
      name: "Cabernet Plum & Bronze Gold",
      colors: ["#4a1521", "#5f1d2b", "#d4af37", "#f9d6dc", "#FFF0F2"],
      description: "Deep plum, warm velvet burgundy, majestic antique gold, and soft pink contrasts."
    },
    decorDetails: [
      "Plush deep plum velvet lounge pods with bronze metal coffee tables",
      "Slick black gloss runway reflecting golden ceiling rings of light",
      "Custom champagne tower with real-time raspberry cocktail foggers",
      "A stunning floor-to-ceiling customized organic floral step-and-repeat wall"
    ],
    flowerSelections: [
      "Deep Crimson Black Baccara Roses",
      "Exquisite Mauve Orchids and Fuchsia Calla Lilies",
      "Rich burgundy Amaranthus spillways"
    ],
    ambientNotes: "Modern, high-fashion mystery. Warm amber ambient wash. Minimalist matte black plates offset by customized bronze gold cutlery and menus printed on translucent acrylic tiles.",
    playlistVibe: "Upbeat neo-soul, luxurious lofi-house undercurrents, and live percussion acoustics creating a continuous sophisticated rhythm.",
    checklist: [
      "Arrange the dry-ice champagne tower cascade coordination",
      "Map out the dimming curves of the spot-lights for the cake ceremony",
      "Confirm velvet sofa configurations for VIP corner seating",
      "Draft custom gold-foil cocktail napkin printing files"
    ]
  },
  Corporate: {
    id: "preset-corporate",
    title: "The Innovation & Rose Gala",
    vibe: "An elegant, highly-stylized environment fostering creativity and prestige. A brilliant clean setup with warm feminine pastel geometry.",
    palette: {
      name: "Sage Sage & Parisian Coral",
      colors: ["#E8F1F0", "#C8D9D6", "#F9CBB9", "#E5989B", "#4A1521"],
      description: "Pale sage mist, earthy organic clay, soft coral rose, and dark burgundy structures."
    },
    decorDetails: [
      "Geometric copper framework archways holding lush asymmetric flower clouds",
      "Sleek light-oak community bar tables with minimalist metallic rose gold barstools",
      "Interactive scent station allowing guests to curate custom botanical mists",
      "Clean canvas projection backdrops with real-time generative art of delicate blooming petals"
    ],
    flowerSelections: [
      "Coral Charm Peonies and Salmon Ranunculus",
      "Clean White Anthuriums for bold architectural lines",
      "Preserved blush palms and white pampas grass clusters"
    ],
    ambientNotes: "Inspiring, fresh, and polished. Inviting citrus-peel essential oils diffused throughout. Crisp linens, handmade ceramic serve-ware, and gold-metallic menu accents.",
    playlistVibe: "Refined downtempo indie-electronic rhythms and acoustic-soul guitar duets providing general inspiration without overwhelming conversation.",
    checklist: [
      "Schedule custom lighting queue for presentation and networking transitions",
      "Coordinate interactive scent bar glassware setup",
      "Verify acoustic levels on the secondary lounge courtyard stage",
      "Review copper geometric frame stability with safety lead"
    ]
  },
  Gala: {
    id: "preset-gala",
    title: "Le Petit Paris Rose Gala",
    vibe: "A magnificent classical layout reflecting late 19th-century Parisian salons, updated with fresh, smart floral scale.",
    palette: {
      name: "Lavender Lavender & Gilded Brass",
      colors: ["#FAFAF9", "#EFEFF0", "#D3C2D1", "#A68EA9", "#C5A059"],
      description: "Alabaster plaster white, French lavender mist, deep regal orchid, and brass gold dust."
    },
    decorDetails: [
      "Gilded baroque decorative frames hosting modern neon accent typography",
      "Tall wrought-iron candelabras supporting trailing lavender vines and wisteria",
      "Lush floor hedges of hydrangeas creating custom borders and aisle ways",
      "Polished brass bars featuring signature botanical violet lavender gin fizzes"
    ],
    flowerSelections: [
      "Lavender Mist Garden Roses",
      "Cascading Amethyst Wisteria panels",
      "White Delphinium spires for majestic vertical heights"
    ],
    ambientNotes: "Majestic, high-prestige, classical elegance. Scent of delicate lavender and old-world paper. French linen napkins paired with vintage tarnished brass charger plates.",
    playlistVibe: "A classical chamber trio playing romantic French waltzes during reception, transitioning into luxury lounge jazz remixes by late evening.",
    checklist: [
      "Confirm hanging wisteria overhead rigging points with venue coordinators",
      "Conduct signature Lavender Gin Fizz syrup tasting and glass selection",
      "Map guest placement curves across our brass gold tables",
      "Conduct candle smoke clearance test under historical glass ceiling"
    ]
  }
};

export default function SmartPlanner({ defaultEvent = "Wedding" }: { defaultEvent?: string }) {
  // Configurator States
  const [selectedPreset, setSelectedPreset] = useState<string>("Wedding");
  const [customTitle, setCustomTitle] = useState("");
  const [customVibe, setCustomVibe] = useState("");
  const [chosenPalette, setChosenPalette] = useState("Blush Royale");
  const [guestCount, setGuestCount] = useState<number>(120);
  const [currentConcept, setCurrentConcept] = useState<EventConcept>(PRESET_CONCEPTS.Wedding);

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
      text: "Bonjour! ✨ Welcome to Nina Events. I am your Senior AI Design Coordinator.\n\nI specialize in curating luxury celebrations with cohesive styling—weaving soft blush pinks, gold, champagne, and majestic plum tones throughout your design canvas. Tell me about the event you have in mind, and let's craft something exquisite together!",
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
      
      {/* SECTION 1: SMART CONCEPT PLANNER */}
      <section id="planner" className="scroll-mt-24 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#c5a059] font-medium block">
            Atelier Concept Studio
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#333333] tracking-tight">
            Curate Your Celebration Canvas
          </h2>
          <div className="w-16 h-[1.5px] bg-[#c5a059] mx-auto" />
          <p className="text-xs sm:text-sm uppercase tracking-wider text-[#7c6368] leading-relaxed">
            Customize your baseline aesthetic parameters below. Watch your event moodboard dynamic state update instantly in our sophisticated visual design engine.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Configurator Controls - Left 5 cols */}
          <div className="lg:col-span-12 xl:col-span-5 bg-white border border-[#333333]/15 rounded-none p-6 sm:p-8 shadow-none space-y-6 text-left relative">
            <div className="absolute inset-1 border border-[#333333]/5 -z-10" />
            
            <div className="flex items-center gap-2 pb-4 border-b border-[#c5a059]/15">
              <Sliders className="w-4 h-4 text-[#c5a059]" />
              <h3 className="font-serif text-lg italic text-[#333333] font-normal">Design Parameters</h3>
            </div>

            <form onSubmit={handleGenerateConcept} className="space-y-5">
              {/* Preset Selector */}
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-[#333333] uppercase tracking-[0.15em]">
                  Celebration Vibe Template
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
                      {preset === "Wedding" && "💍 Wedding"}
                      {preset === "Birthday" && "🍰 Birthday Soiree"}
                      {preset === "Corporate" && "🌿 Corporate"}
                      {preset === "Gala" && "✨ Parisian Gala"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Title Modification */}
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-[#333333] uppercase tracking-[0.15em]">
                  Custom Event Title
                </label>
                <input
                  type="text"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#333333]/15 focus:border-[#c5a059] focus:outline-hidden rounded-none px-3 py-2.5 text-xs text-[#333333]"
                  id="smart-title-input"
                />
              </div>

              {/* Guest Count */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="block text-[10px] font-bold text-[#333333] uppercase tracking-[0.15em]">
                    Guest Count
                  </label>
                  <span className="text-[10px] font-bold text-[#333333] bg-[#E8EBE4] border border-[#c5a059]/20 px-2 py-0.5 rounded-none uppercase tracking-widest">
                    {guestCount} Guests
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
                  Narrative / Vision Description
                </label>
                <textarea
                  rows={3}
                  value={customVibe}
                  onChange={(e) => setCustomVibe(e.target.value)}
                  placeholder="Share any special decoration wishes, notes, or styling goals..."
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
                <span className="text-[9px] uppercase tracking-[0.25em] font-bold text-[#c5a059]">Active Design Board</span>
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
                <p className="text-[10px] text-[#8e7379] font-bold uppercase tracking-widest">The Creative Vibe</p>
                <p className="text-xs sm:text-sm font-medium text-[#333333] mt-1.5 leading-relaxed italic">
                  &ldquo;{currentConcept.vibe}&rdquo;
                </p>
              </div>

              {/* Interactive Color Swatch Blocks */}
              <div className="space-y-2.5">
                <p className="text-[10px] font-bold text-[#333333] uppercase tracking-[0.15em] flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-[#c5a059]" />
                  Aesthetic Color Palette: <span className="text-[#8e7379] font-medium italic">{currentConcept.palette.name}</span>
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
                    ✦ Curated Decor Accents
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
                      ⚘ Delicate Florals
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {currentConcept.flowerSelections.map((flower, idx) => (
                        <span key={idx} className="text-[10px] uppercase tracking-wider font-semibold text-[#333333] bg-[#FDF2F2] border border-[#c5a059]/25 px-2.5 py-1 rounded-none">
                          {flower}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1 bg-[#FAF7F2] p-3 border border-[#333333]/10 rounded-none">
                    <p className="text-[9px] font-bold text-[#c5a059] uppercase tracking-[0.15em]">
                      ♫ Musical/Auditory Vibe
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
                    Design Checklist Blueprint
                  </p>
                  <span className="text-[10px] uppercase tracking-wider text-[#8e7379] italic">
                    ✧ Handcrafted by our studio
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
            Aura Consultation Office
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#333333] tracking-tight">
            Consult with Nina’s AI Concierge
          </h2>
          <div className="w-16 h-[1.5px] bg-[#c5a059] mx-auto" />
          <p className="text-xs sm:text-sm uppercase tracking-wider text-[#7c6368] leading-relaxed">
            Collaborate in real-time with our Senior Design Coordinator. Ask for specialized floral layout themes, budget checkpoints, timeline setups, or menu pairings in beautiful rose and champagne colors.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
          
          {/* Instruction Prompts Panel - Left 4 cols */}
          <div className="lg:col-span-4 bg-[#FAF7F2] border border-[#333333]/15 rounded-none p-6 sm:p-8 space-y-6 text-left flex flex-col justify-between relative">
            <div className="absolute inset-1 border border-[#333333]/5 -z-10" />
            
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-[#333333]/10">
                <MessageSquare className="w-4 h-4 text-[#c5a059]" />
                <h4 className="font-serif text-sm font-normal text-[#333333] uppercase tracking-wider">Inspiration Prompts</h4>
              </div>
              <p className="text-[11px] uppercase tracking-wider text-[#7c6368] leading-relaxed">
                Click any prompt below to instantly deploy our AI specialist to map recommendations for your exact event scale.
              </p>

              <div className="space-y-2 pt-2">
                <button
                  onClick={() => loadSuggestionPrompt("Describe a perfect floral setup incorporating gold metal work and soft blush dahlias.")}
                  className="w-full text-left p-3 text-[11px] font-bold uppercase tracking-wider text-[#333333] bg-white hover:bg-[#FAF7F2] border border-[#333333]/15 rounded-none transition-all duration-300 cursor-pointer block"
                >
                  ⚜️ Gold work & blush floral setups
                </button>
                <button
                  onClick={() => loadSuggestionPrompt("I am hosting an exclusive soirée for 150 guests. Recommend a sample timeline of ceremonies.")}
                  className="w-full text-left p-3 text-[11px] font-bold uppercase tracking-wider text-[#333333] bg-white hover:bg-[#FAF7F2] border border-[#333333]/15 rounded-none transition-all duration-300 cursor-pointer block"
                >
                  ⏰ Timeline structure for 150 guests
                </button>
                <button
                  onClick={() => loadSuggestionPrompt("What champagne brands and raspberry-infused cocktail menu would fit our Blush Royale vibe?")}
                  className="w-full text-left p-3 text-[11px] font-bold uppercase tracking-wider text-[#333333] bg-white hover:bg-[#FAF7F2] border border-[#333333]/15 rounded-none transition-all duration-300 cursor-pointer block"
                >
                  🥂 Raspberry & champagne lounge pairings
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-[#333333]/10 text-[10px] uppercase tracking-widest text-[#8e7379] italic leading-relaxed">
              &ldquo;Design, palette refinement, table settings, and timelines are computed instantly according to high-society curation parameters.&rdquo;
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
                <h4 className="font-serif text-sm font-normal text-white">Nina Events AI</h4>
                <div className="flex items-center gap-1">
                  <span className="text-[9px] text-[#c5a059] tracking-[0.2em] uppercase font-bold">Senior coordinator</span>
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
                placeholder="Ask me anything: color concepts, design elements, timeline guidance..."
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
