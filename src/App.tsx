import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SmartPlanner from "./components/SmartPlanner";
import FounderSection from "./components/FounderSection";
import RsvpForm from "./components/RsvpForm";
import BookingForm from "./components/BookingForm";
import Footer from "./components/Footer";

export default function App() {
  const [selectedEvent, setSelectedEvent] = useState("Wedding");
  const [userEmail, setUserEmail] = useState("");

  const handleStartPlanning = (eventType: string, email: string) => {
    setSelectedEvent(eventType);
    setUserEmail(email);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col font-sans selection:bg-[#c5a059]/20 selection:text-[#333333]">
      {/* Header Navigation */}
      <Navbar />
      
      {/* Visual content structures */}
      <main className="flex-1">
        {/* Hero entry section */}
        <Hero onStartPlanning={handleStartPlanning} />
        
        {/* Core Smart Design & AI Chat Consultant tools */}
        <div className="py-20 bg-[#FAF7F2] border-b border-[#c5a059]/15">
          <SmartPlanner defaultEvent={selectedEvent} />
        </div>
        
        {/* Expert Story and value indicators section */}
        <FounderSection />
        
        {/* Royal Guest RSVP Hub Form */}
        <RsvpForm />
        
        {/* Detailed Consultation request form */}
        <BookingForm />
      </main>

      {/* Structured Footer */}
      <Footer />
    </div>
  );
}
