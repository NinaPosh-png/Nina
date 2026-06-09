import React, { useState } from "react";
import { Check, MailOpen, Lock, ShieldAlert } from "lucide-react";
import { LeadSubmission } from "../types";

export default function BookingForm() {
  const [formData, setFormData] = useState<LeadSubmission>({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    consentMarketing: false,
    consentPrivacy: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error for that field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required.";
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please specify a valid email address.";
    }
    
    if (!formData.message.trim()) newErrors.message = "Please share a brief note about your celebration goals.";
    if (!formData.consentPrivacy) newErrors.consentPrivacy = "You must agree to the data processing terms to submit your inquiry.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    try {
      await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "booking",
          data: formData,
        }),
      });
    } catch (err) {
      console.error("Failed to forward lead consultation request:", err);
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <section id="booking" className="scroll-mt-24 py-20 bg-[#FAF7F2] relative">
      <div className="absolute top-12 left-10 w-48 h-48 rounded-none bg-[#c5a059]/5 blur-2xl -z-10" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Card Frame */}
        <div className="bg-white border border-[#333333]/15 rounded-none p-8 sm:p-12 shadow-none relative overflow-hidden text-left">
          
          {/* Accent decoration ribbon */}
          <div className="absolute top-0 inset-x-0 h-1 bg-[#c5a059]" />
          
          {/* Success state display */}
          {isSubmitted ? (
            <div className="text-center py-12 space-y-6 animate-fade-in" id="booking-success-state">
              <div className="w-16 h-16 bg-[#FAF7F2] rounded-none flex items-center justify-center mx-auto border border-[#c5a059]/30">
                <Check className="w-8 h-8 text-[#333333]" />
              </div>
              <div className="space-y-3">
                <h3 className="font-serif text-3xl font-normal text-[#333333] tracking-tight">
                  Inquiry Submitted Beautifully
                </h3>
                <p className="text-xs uppercase tracking-[0.2em] text-[#c5a059] font-semibold">
                  We are delighted to collaborate with you.
                </p>
                <div className="w-12 h-[1px] bg-[#c5a059]/30 mx-auto my-4" />
                <p className="text-sm text-[#555555] max-w-lg mx-auto leading-relaxed">
                  Thank you, <strong className="text-[#333333]">{formData.firstName}</strong>! 
                  Our lead curator, Nina, and the AI Smart Planner have captured your parameters. 
                  A bespoke physical rendering blueprint plan will be emailed to <strong className="text-[#333333]">{formData.email}</strong> shortly.
                </p>
              </div>
              <div className="pt-4">
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      firstName: "",
                      lastName: "",
                      email: "",
                      message: "",
                      consentMarketing: false,
                      consentPrivacy: false
                    });
                  }}
                  className="cursor-pointer bg-[#333333] hover:bg-[#c5a059] text-white px-6 py-3 rounded-none text-[10px] font-bold tracking-widest uppercase transition-colors"
                  id="reset-form-btn"
                >
                  Send another inquiry
                </button>
              </div>
            </div>
          ) : (
            /* Forms body */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="space-y-2 text-center pb-4">
                <h3 className="font-serif text-3xl font-normal text-[#333333] tracking-tight">
                  Initiate Your Consultation
                </h3>
                <p className="text-[10px] sm:text-xs text-[#c5a059] tracking-[0.25em] uppercase font-bold">
                  Nina Events &bull; Bespoke Celebration Design Office
                </p>
              </div>

              {/* Names row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5 text-left">
                  <label htmlFor="firstName" className="block text-[10px] font-bold text-[#333333] uppercase tracking-[0.15em]">
                    First Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full bg-[#FAF7F2] border ${errors.firstName ? 'border-rose-400' : 'border-[#333333]/15'} focus:border-[#c5a059] focus:outline-hidden rounded-none px-4 py-3 text-xs text-[#333333] transition-all uppercase tracking-wider`}
                    placeholder="Your first name"
                  />
                  {errors.firstName && <p className="text-[10px] font-medium text-rose-500 mt-0.5">{errors.firstName}</p>}
                </div>

                <div className="space-y-1.5 text-left">
                  <label htmlFor="lastName" className="block text-[10px] font-bold text-[#333333] uppercase tracking-[0.15em]">
                    Last Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full bg-[#FAF7F2] border ${errors.lastName ? 'border-rose-400' : 'border-[#333333]/15'} focus:border-[#c5a059] focus:outline-hidden rounded-none px-4 py-3 text-xs text-[#333333] transition-all uppercase tracking-wider`}
                    placeholder="Your last name"
                  />
                  {errors.lastName && <p className="text-[10px] font-medium text-rose-500 mt-0.5">{errors.lastName}</p>}
                </div>
              </div>

              {/* Email Row */}
              <div className="space-y-1.5 text-left">
                <label htmlFor="email" className="block text-[10px] font-bold text-[#333333] uppercase tracking-[0.15em]">
                  Email Address <span className="text-rose-400">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-[#FAF7F2] border ${errors.email ? 'border-rose-400' : 'border-[#333333]/15'} focus:border-[#c5a059] focus:outline-hidden rounded-none px-4 py-3 text-xs text-[#333333] transition-all`}
                  placeholder="e.g. nina@example.com"
                />
                {errors.email && <p className="text-[10px] font-medium text-rose-500 mt-0.5">{errors.email}</p>}
              </div>

              {/* Message Row */}
              <div className="space-y-1.5 text-left">
                <label htmlFor="message" className="block text-[10px] font-bold text-[#333333] uppercase tracking-[0.15em]">
                  Message Details <span className="text-rose-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full bg-[#FAF7F2] border ${errors.message ? 'border-rose-400' : 'border-[#333333]/15'} focus:border-[#c5a059] focus:outline-hidden rounded-none px-4 py-3 text-xs text-[#333333] transition-all resize-none`}
                  placeholder="Share details you are looking for (guest count, ideal venue type, decor colors, specific floral visions)..."
                />
                {errors.message && <p className="text-[10px] font-medium text-rose-500 mt-0.5">{errors.message}</p>}
              </div>

              {/* Consent checks */}
              <div className="pt-4 border-t border-[#333333]/10 space-y-4">
                
                {/* Check 1 */}
                <div className="flex items-start gap-3">
                  <div className="flex items-center h-5 mt-0.5">
                    <input
                      type="checkbox"
                      id="consentMarketing"
                      name="consentMarketing"
                      checked={formData.consentMarketing}
                      onChange={handleChange}
                      className="cursor-pointer w-4 h-4 text-[#333333] bg-white border-[#333333]/15 rounded-none focus:ring-0 accent-[#333333]"
                    />
                  </div>
                  <label htmlFor="consentMarketing" className="text-xs text-[#555555] leading-relaxed cursor-pointer select-none">
                    I agree to receive other communications from <strong className="text-[#333333]">Nina Events</strong>. You can opt out at any time.
                  </label>
                </div>

                {/* Check 2 (GDPR force privacy consent) */}
                <div className="flex items-start gap-3">
                  <div className="flex items-center h-5 mt-0.5">
                    <input
                      type="checkbox"
                      id="consentPrivacy"
                      name="consentPrivacy"
                      checked={formData.consentPrivacy}
                      onChange={handleChange}
                      className="cursor-pointer w-4 h-4 text-[#333333] bg-white border-[#333333]/15 rounded-none focus:ring-0 accent-[#333333]"
                    />
                  </div>
                  <label htmlFor="consentPrivacy" className="text-xs text-[#555555] leading-relaxed cursor-pointer select-none">
                    I agree to allow <strong className="text-[#333333]">Nina Events</strong> to process and store my personal data to deliver the requested smart curation service. <span className="text-rose-400 font-bold">*</span>
                  </label>
                </div>
                {errors.consentPrivacy && <p className="text-[10px] font-medium text-rose-500 mt-0.5">{errors.consentPrivacy}</p>}
              </div>

              {/* Privacy Footer and Submit */}
              <div className="pt-4 space-y-4">
                <p className="text-[10px] text-[#8e7379] italic leading-relaxed uppercase tracking-wider">
                  We care deeply about your personal event details privacy. By checking the consent boxes above and submitting, you acknowledge that your parameters will be delivered directly to the founder.
                </p>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="cursor-pointer w-full bg-[#333333] hover:bg-[#c5a059] disabled:bg-[#FAF7F2] disabled:text-[#8e7379] text-white py-4 rounded-none text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 shadow-none border border-[#333333]/20 flex items-center justify-center gap-2"
                  id="booking-submit-btn"
                >
                  {isSubmitting ? "Processing Your Vision..." : "Reserve Design Consultation"}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}
