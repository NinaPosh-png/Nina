import React, { useState, useEffect } from "react";
import { Check, Music, Users, Heart, Sparkles, Send, Trash2, Calendar } from "lucide-react";

interface GuestRsvp {
  id: string;
  eventName: string;
  guestName: string;
  email: string;
  attendance: "accept" | "decline";
  dietary: string;
  hasPlusOne: boolean;
  plusOneName?: string;
  songRequest?: string;
  wishes?: string;
  submittedAt: string;
}

export default function RsvpForm() {
  const [guestName, setGuestName] = useState("");
  const [email, setEmail] = useState("");
  const [eventName, setEventName] = useState("The Ethereal Blossom Wedding");
  const [attendance, setAttendance] = useState<"accept" | "decline">("accept");
  const [dietary, setDietary] = useState("None / Regular Menu");
  const [hasPlusOne, setHasPlusOne] = useState(false);
  const [plusOneName, setPlusOneName] = useState("");
  const [songRequest, setSongRequest] = useState("");
  const [wishes, setWishes] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Storage of local RSVPs
  const [rsvpList, setRsvpList] = useState<GuestRsvp[]>([]);

  // Load existing RSVPs on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("nina_events_rsvps");
      if (stored) {
        setRsvpList(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load local RSVPs", e);
    }
  }, []);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!guestName.trim()) {
      newErrors.guestName = "Please specify your full name.";
    }
    
    if (!email.trim()) {
      newErrors.email = "Please specify your email address.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please include a valid email address.";
    }

    if (hasPlusOne && !plusOneName.trim()) {
      newErrors.plusOneName = "Please share your companion's name.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const newRsvp: GuestRsvp = {
      id: `rsvp-${Date.now()}`,
      eventName,
      guestName: guestName.trim(),
      email: email.trim(),
      attendance,
      dietary,
      hasPlusOne: attendance === "accept" ? hasPlusOne : false,
      plusOneName: attendance === "accept" && hasPlusOne ? plusOneName.trim() : "",
      songRequest: songRequest.trim(),
      wishes: wishes.trim(),
      submittedAt: new Date().toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    try {
      await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "rsvp",
          data: newRsvp,
        }),
      });
    } catch (err) {
      console.error("Failed to deliver RSVP through server proxy:", err);
    }

    const updatedList = [newRsvp, ...rsvpList];
    setRsvpList(updatedList);
    localStorage.setItem("nina_events_rsvps", JSON.stringify(updatedList));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleDeleteRsvp = (id: string) => {
    const updated = rsvpList.filter((item) => item.id !== id);
    setRsvpList(updated);
    localStorage.setItem("nina_events_rsvps", JSON.stringify(updated));
  };

  const resetForm = () => {
    setGuestName("");
    setEmail("");
    setEventName("The Ethereal Blossom Wedding");
    setAttendance("accept");
    setDietary("None / Regular Menu");
    setHasPlusOne(false);
    setPlusOneName("");
    setSongRequest("");
    setWishes("");
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <section id="rsvp" className="scroll-mt-24 py-20 bg-[#FAF7F2] border-b border-[#c5a059]/15 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-[#c5a059] font-medium block">
            Guest Attendance Studio
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#333333] tracking-tight">
            The Royal Guest RSVP Hub
          </h2>
          <div className="w-16 h-[1.5px] bg-[#c5a059] mx-auto" />
          <p className="text-xs sm:text-sm uppercase tracking-wider text-[#7c6368] leading-relaxed">
            Are you attending one of our curated celebrations? Secure your place at the table, submit your culinary preferences, and share special wishes for the design hosts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main RSVP Form - Left / Center Grid (7 Cols) */}
          <div className="lg:col-span-7 bg-white border border-[#333333]/15 rounded-none p-8 sm:p-10 shadow-none relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-[#c5a059]" />
            <div className="absolute inset-1 border border-[#333333]/5 -z-10" />

            {isSubmitted ? (
              <div className="text-center py-10 space-y-6">
                <div className="w-16 h-16 bg-[#FAF7F2] rounded-none flex items-center justify-center mx-auto border border-[#c5a059]/30">
                  <Check className="w-8 h-8 text-[#333333]" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif text-2xl font-normal text-[#333333] tracking-tight">
                    RSVP Registered Elegantly
                  </h3>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#c5a059] font-semibold">
                    Thank you for responding.
                  </p>
                  <div className="w-12 h-[1px] bg-[#c5a059]/30 mx-auto my-4" />
                  <p className="text-xs sm:text-sm text-[#555555] max-w-md mx-auto leading-relaxed">
                    Hello <strong className="text-[#333333]">{guestName}</strong>! Your attendance response for <strong className="text-[#333333]">{eventName}</strong> has been secured. Your culinary parameters and song request are shared with our curation office.
                  </p>
                </div>
                <div className="pt-4 flex justify-center gap-3">
                  <button
                    onClick={resetForm}
                    className="cursor-pointer bg-[#333333] hover:bg-[#c5a059] text-white px-6 py-3 rounded-none text-[10px] font-bold tracking-widest uppercase transition-colors border border-[#333333]"
                    id="rsvp-another-btn"
                  >
                    RSVP another guest
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="border-b border-[#c5a059]/15 pb-4">
                  <h3 className="font-serif text-xl italic font-normal text-[#333333]">
                    Submit Attendance Parameters
                  </h3>
                  <p className="text-[10px] uppercase tracking-wider text-[#7c6368] mt-1">
                    Bespoke response portal &bull; Please submit one form per guest.
                  </p>
                </div>

                {/* Event Select Dropdown */}
                <div className="space-y-1.5">
                  <label htmlFor="rsvpEvent" className="block text-[10px] font-bold text-[#333333] uppercase tracking-[0.15em]">
                    Curated Celebration Event
                  </label>
                  <select
                    id="rsvpEvent"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#333333]/15 focus:border-[#c5a059] focus:outline-hidden rounded-none px-4 py-3 text-xs uppercase tracking-wider text-[#333333] font-medium transition-colors cursor-pointer"
                  >
                    <option value="The Ethereal Blossom Wedding">💍 The Ethereal Blossom Wedding</option>
                    <option value="Chic Velvet Midnight Soirée">🍰 Chic Velvet Midnight Soirée</option>
                    <option value="The Innovation & Rose Gala">🌿 The Innovation & Rose Gala</option>
                    <option value="Le Petit Paris Rose Gala">✨ Le Petit Paris Rose Gala</option>
                    <option value="Other / Private Celebration">🍾 Other / Private Celebration</option>
                  </select>
                </div>

                {/* Personal Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label htmlFor="rsvpName" className="block text-[10px] font-bold text-[#333333] uppercase tracking-[0.15em]">
                      Your Full Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="rsvpName"
                      value={guestName}
                      onChange={(e) => {
                        setGuestName(e.target.value);
                        if (errors.guestName) setErrors(prev => ({ ...prev, guestName: "" }));
                      }}
                      className={`w-full bg-[#FAF7F2] border ${errors.guestName ? 'border-rose-400' : 'border-[#333333]/15'} focus:border-[#c5a059] focus:outline-hidden rounded-none px-4 py-3 text-xs text-[#333333]`}
                      placeholder="e.g. Jeanette Sterling"
                    />
                    {errors.guestName && <p className="text-[10px] font-medium text-rose-500 mt-0.5">{errors.guestName}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="rsvpEmail" className="block text-[10px] font-bold text-[#333333] uppercase tracking-[0.15em]">
                      Email Address <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="email"
                      id="rsvpEmail"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors(prev => ({ ...prev, email: "" }));
                      }}
                      className={`w-full bg-[#FAF7F2] border ${errors.email ? 'border-rose-400' : 'border-[#333333]/15'} focus:border-[#c5a059] focus:outline-hidden rounded-none px-4 py-3 text-xs text-[#333333]`}
                      placeholder="e.g. jeanette@example.com"
                    />
                    {errors.email && <p className="text-[10px] font-medium text-rose-500 mt-0.5">{errors.email}</p>}
                  </div>
                </div>

                {/* Attendance Radio Selections */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-[#333333] uppercase tracking-[0.15em]">
                    Honored RSVP Declaration
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setAttendance("accept")}
                      className={`cursor-pointer px-4 py-3.5 rounded-none text-xs font-bold uppercase tracking-widest border transition-all duration-300 flex items-center justify-center gap-2.5 ${
                        attendance === "accept"
                          ? "bg-[#333333] text-white border-[#333333]"
                          : "bg-[#FAF7F2] text-[#555555] border-[#333333]/15 hover:bg-white"
                      }`}
                    >
                      <Sparkles className="w-4 h-4 text-[#c5a059]" />
                      Deeply Honored to Attend
                    </button>

                    <button
                      type="button"
                      onClick={() => setAttendance("decline")}
                      className={`cursor-pointer px-4 py-3.5 rounded-none text-xs font-bold uppercase tracking-widest border transition-all duration-300 flex items-center justify-center gap-2.5 ${
                        attendance === "decline"
                          ? "bg-[#333333] text-white border-[#333333]"
                          : "bg-[#FAF7F2] text-[#555555] border-[#333333]/15 hover:bg-white"
                      }`}
                    >
                      <Heart className="w-4 h-4 text-[#8e7379]" />
                      Regretfully Declining
                    </button>
                  </div>
                </div>

                {attendance === "accept" && (
                  <div className="space-y-6 pt-4 border-t border-[#333333]/10 animate-fade-in" id="rsvp-attendance-accept-options">
                    
                    {/* Plus One Request Toggle */}
                    <div className="space-y-3 p-4 bg-[#FAF7F2] border border-[#333333]/10">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-[#c5a059]" />
                          <span className="text-[10px] font-bold text-[#333333] uppercase tracking-[0.15em]">
                            Plus-One Companion Request
                          </span>
                        </div>
                        <input
                          type="checkbox"
                          id="plusOneToggle"
                          checked={hasPlusOne}
                          onChange={(e) => setHasPlusOne(e.target.checked)}
                          className="cursor-pointer w-4 h-4 text-[#333333] bg-white border-[#333333]/15 focus:ring-0 accent-[#333333]"
                        />
                      </div>
                      
                      {hasPlusOne && (
                        <div className="space-y-1.5 pt-2 animate-fade-in">
                          <label htmlFor="plusOneName" className="block text-[9px] font-bold text-[#555555] uppercase tracking-[0.12em]">
                            Companion Full Name <span className="text-rose-400">*</span>
                          </label>
                          <input
                            type="text"
                            id="plusOneName"
                            value={plusOneName}
                            onChange={(e) => {
                              setPlusOneName(e.target.value);
                              if (errors.plusOneName) setErrors(prev => ({ ...prev, plusOneName: "" }));
                            }}
                            className={`w-full bg-white border ${errors.plusOneName ? 'border-rose-400' : 'border-[#333333]/15'} focus:border-[#c5a059] focus:outline-hidden rounded-none px-3 py-2 text-xs text-[#333333]`}
                            placeholder="Companion's first and last name"
                          />
                          {errors.plusOneName && <p className="text-[10px] font-medium text-rose-500 mt-0.5">{errors.plusOneName}</p>}
                        </div>
                      )}
                    </div>

                    {/* Culinary Preference Selections */}
                    <div className="space-y-1.5">
                      <label htmlFor="rsvpDiet" className="block text-[10px] font-bold text-[#333333] uppercase tracking-[0.15em]">
                        Culinary / Dietary Curation
                      </label>
                      <select
                        id="rsvpDiet"
                        value={dietary}
                        onChange={(e) => setDietary(e.target.value)}
                        className="w-full bg-[#FAF7F2] border border-[#333333]/15 focus:border-[#c5a059] focus:outline-hidden rounded-none px-4 py-3 text-xs text-[#333333] transition-colors cursor-pointer"
                      >
                        <option value="None / Regular Menu">None / Regular Fine Dining Menu</option>
                        <option value="Vegetarian Menu">Vegetarian Gastronomy Menu</option>
                        <option value="Vegan Gastronomy">Vegan Botanical Menu</option>
                        <option value="Gluten-Free Choice">Gluten-Free Fine Cuisine</option>
                        <option value="Nut-Allergy Protected">Nut Allergy Protected Preparation</option>
                      </select>
                    </div>

                    {/* DJ Song Request */}
                    <div className="space-y-1.5">
                      <label htmlFor="rsvpSong" className="block text-[10px] font-bold text-[#333333] uppercase tracking-[0.15em] flex items-center gap-1.5">
                        <Music className="w-3.5 h-3.5 text-[#c5a059]" />
                        Bespoke Auditory Suggestion (DJ Request)
                      </label>
                      <input
                        type="text"
                        id="rsvpSong"
                        value={songRequest}
                        onChange={(e) => setSongRequest(e.target.value)}
                        className="w-full bg-[#FAF7F2] border border-[#333333]/15 focus:border-[#c5a059] focus:outline-hidden rounded-none px-4 py-3 text-xs text-[#333333]"
                        placeholder="Song and Artist to prompt energy on the ballroom floor"
                      />
                    </div>
                  </div>
                )}

                {/* Wishes to Hosts */}
                <div className="space-y-1.5 pt-2">
                  <label htmlFor="rsvpWishes" className="block text-[10px] font-bold text-[#333333] uppercase tracking-[0.15em]">
                    Letter of Warm Congratulations to the Hosts
                  </label>
                  <textarea
                    id="rsvpWishes"
                    rows={3}
                    value={wishes}
                    onChange={(e) => setWishes(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#333333]/15 focus:border-[#c5a059] focus:outline-hidden rounded-none px-4 py-3 text-xs text-[#333333] resize-none"
                    placeholder="We cannot wait to celebrate with you..."
                  />
                </div>

                {/* Privacy Consent note & Submit */}
                <div className="pt-4 border-t border-[#333333]/10 space-y-4">
                  <p className="text-[10px] text-[#8e7379] leading-relaxed italic uppercase tracking-wider">
                    ✧ Handled with absolute discretion. RSVP responses directly update the host planning panel metrics locally.
                  </p>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="cursor-pointer w-full bg-[#333333] hover:bg-[#c5a059] disabled:bg-[#FAF7F2] disabled:text-[#8e7379] text-white py-4 rounded-none text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 border border-[#333333]/20 flex items-center justify-center gap-2 shadow-xs"
                    id="rsvp-submit-btn"
                  >
                    {isSubmitting ? "Securing Placement..." : "Register Guest Seat Reservation"}
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>

              </form>
            )}

          </div>

          {/* Local RSVPs Registry Showcase Pane - Right Grid (5 Cols) */}
          <div className="lg:col-span-12 xl:col-span-5 bg-[#FAF7F2] border border-[#333333]/15 rounded-none p-6 sm:p-8 space-y-6 flex flex-col justify-between relative">
            <div className="absolute inset-1 border border-[#333333]/5 -z-10" />

            <div className="space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-[#333333]/10">
                <Calendar className="w-4 h-4 text-[#c5a059]" />
                <h4 className="font-serif text-sm font-normal text-[#333333] uppercase tracking-wider">Your Guest Registries</h4>
              </div>
              
              <p className="text-[11px] uppercase tracking-wider text-[#7c6368] leading-relaxed">
                Review any RSVP seat reservations submitted from your browser below. You may verify details or revoke attendance if schedules shift.
              </p>

              {rsvpList.length === 0 ? (
                <div className="border border-dashed border-[#333333]/15 p-8 text-center text-xs text-[#7c6368]/75 space-y-2 select-none">
                  <p className="italic">No pending seat reservations registered in this session.</p>
                  <span className="text-[9px] uppercase tracking-wider font-semibold">Ready for your guest declaration.</span>
                </div>
              ) : (
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1" id="rsvp-registry-scroll">
                  {rsvpList.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white border border-[#333333]/15 rounded-none p-4 text-left transition-all relative group hover:border-[#c5a059]"
                    >
                      <button
                        onClick={() => handleDeleteRsvp(item.id)}
                        className="cursor-pointer absolute top-3 right-3 text-gray-400 hover:text-rose-500 transition-colors p-1"
                        title="Remove Registered Seat"
                        id={`delete-rsvp-${item.id}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="space-y-2 pr-6">
                        <div>
                          <span className="text-[9px] font-bold text-[#c5a059] uppercase tracking-widest block">
                            {item.eventName}
                          </span>
                          <h5 className="font-serif text-sm text-[#333333] font-normal mt-0.5">
                            {item.guestName}
                          </h5>
                        </div>

                        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#333333]/5 text-[10px] uppercase tracking-wider text-left">
                          <div>
                            <span className="text-[#8e7379] font-medium">Status:</span>
                            <span className={`block font-semibold mt-0.5 ${
                              item.attendance === "accept" ? "text-emerald-600" : "text-rose-600"
                            }`}>
                              {item.attendance === "accept" ? "✦ Attending" : "✧ Refused"}
                            </span>
                          </div>
                          <div>
                            <span className="text-[#8e7379] font-medium">Culinary Option:</span>
                            <span className="block font-semibold text-[#333333] mt-0.5 truncate">
                              {item.attendance === "accept" ? item.dietary : "N/A"}
                            </span>
                          </div>
                        </div>

                        {item.attendance === "accept" && item.hasPlusOne && (
                          <div className="pt-1.5 text-[9px] uppercase tracking-wide bg-[#FAF7F2] p-2 border border-[#333333]/5">
                            <span className="font-bold text-[#333333]">With Plus One: </span>
                            <span className="text-[#7c6368] italic font-semibold">{item.plusOneName}</span>
                          </div>
                        )}

                        {item.songRequest && (
                          <p className="text-[10px] italic text-[#555555] leading-snug flex items-center gap-1 mt-1 bg-[#FAF7F2] p-1.5 border-l-2 border-[#c5a059] pl-2">
                            <Music className="w-3 h-3 text-[#c5a059] shrink-0" />
                            <span className="truncate">DJ cue: &ldquo;{item.songRequest}&rdquo;</span>
                          </p>
                        )}
                        
                        <div className="text-[8px] text-gray-400 text-right uppercase tracking-widest pt-1 block">
                          Registered: {item.submittedAt}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-[#333333]/10 text-[10px] uppercase tracking-widest text-[#8e7379] italic leading-relaxed text-center font-medium">
              &ldquo;Welcome to Nina Events. The memories we build together are crafted with absolute aesthetic design precision.&rdquo;
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
