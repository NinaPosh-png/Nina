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
    
    if (!formData.message.trim()) newErrors.message = "Please share a brief note about your strategic goals or enterprise challenges.";
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
            <div className="py-8 space-y-8 animate-fade-in" id="booking-success-state">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-[#E8EBE4] rounded-none flex items-center justify-center mx-auto border border-[#c5a059]/30">
                  <Check className="w-8 h-8 text-[#333333]" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif text-3xl font-normal text-[#333333] tracking-tight">
                    Inquiry Submitted Securely
                  </h3>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#c5a059] font-semibold">
                    We look forward to partnering with your leadership team.
                  </p>
                  <div className="w-12 h-[1px] bg-[#c5a059]/30 mx-auto my-3" />
                  <p className="text-xs sm:text-sm text-[#555555] max-w-lg mx-auto leading-relaxed">
                    Thank you, <strong className="text-[#333333]">{formData.firstName}</strong>! 
                    Our principal advisor, Nina, and the AI Strategy Advisor have captured your parameters. 
                    A confirmation has been compiled and is shown below in your simulated inbox.
                  </p>
                </div>
              </div>

              {/* HIGH-FIDELITY SIMULATED INBOX PREVIEW */}
              <div className="max-w-2xl mx-auto border border-[#333333]/15 shadow-md bg-white rounded-none overflow-hidden">
                {/* Email Client Header bar */}
                <div className="bg-[#FAF7F2] px-4 py-3 border-b border-[#333333]/10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400 block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 block" />
                  </div>
                  <span className="text-[10px] font-mono text-[#8e7379] uppercase tracking-wider font-semibold">
                    Simulated Client Inbox Preview &bull; Confirmed Receipt
                  </span>
                  <div className="w-10" />
                </div>

                {/* Email Metadata */}
                <div className="px-5 py-4 border-b border-[#333333]/10 text-xs text-left space-y-1 bg-[#FAF7F2]/40">
                  <div>
                    <span className="text-gray-400 font-medium">From:</span>{" "}
                    <strong className="text-[#333333]">Nina Consulting Advisory</strong>{" "}
                    <span className="text-gray-400 font-mono text-[10px]">&lt;advisor@ninaconsulting.com&gt;</span>
                  </div>
                  <div>
                    <span className="text-gray-400 font-medium">To:</span>{" "}
                    <strong className="text-[#333333]">{formData.firstName} {formData.lastName}</strong>{" "}
                    <span className="text-gray-400 font-mono text-[10px]">&lt;{formData.email}&gt;</span>
                  </div>
                  <div>
                    <span className="text-gray-400 font-medium">Subject:</span>{" "}
                    <span className="text-[#333333] font-semibold">⚜️ Strategy Booking Confirmation — Nina Consulting Advisory</span>
                  </div>
                  <div>
                    <span className="text-gray-400 font-medium">Date:</span>{" "}
                    <span className="text-[#8e7379] italic font-medium">Just Now (Automated Delivery)</span>
                  </div>
                </div>

                {/* Simulated Email Body Content */}
                <div className="p-6 sm:p-8 bg-white text-left text-xs leading-relaxed text-[#333333] space-y-6">
                  {/* Email Crest */}
                  <div className="flex items-center justify-between border-b border-[#c5a059]/20 pb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-[#333333] flex items-center justify-center">
                        <span className="text-[#FAF7F2] text-[10px] font-serif font-bold">NC</span>
                      </div>
                      <span className="font-serif text-sm font-semibold tracking-widest text-[#333333]">NINA CONSULTING</span>
                    </div>
                    <span className="text-[9px] uppercase tracking-widest font-bold text-[#c5a059] bg-[#FAF7F2] px-2.5 py-1 border border-[#c5a059]/20">
                      Receipt #{(Math.floor(Math.random() * 90000) + 10000)}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <p className="font-serif text-sm">Dear {formData.firstName},</p>
                    <p>
                      Thank you for initiating a consultation request with <strong>Nina Consulting Advisory Suite</strong>. 
                      Our principal advisor, Nina, and our AI Strategy model have securely synchronized and cataloged 
                      your organization’s baseline parameters.
                    </p>
                    <p>
                      We have established an active analysis profile for your firm to evaluate your strategic direction. 
                      Here is a summary of the diagnostic parameters captured in our secure ledger:
                    </p>
                  </div>

                  {/* Booking parameters block */}
                  <div className="bg-[#FAF7F2] border border-[#333333]/10 p-4 space-y-3 rounded-none">
                    <h5 className="font-serif text-[10px] uppercase tracking-[0.15em] font-bold text-[#c5a059] border-b border-[#333333]/10 pb-1">
                      Engagement Registration Parameters
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-[11px]">
                      <div>
                        <span className="text-gray-400 block uppercase text-[9px] tracking-wider font-semibold">Client Partner</span>
                        <span className="font-semibold">{formData.firstName} {formData.lastName}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block uppercase text-[9px] tracking-wider font-semibold">Authorized Email</span>
                        <span className="font-mono">{formData.email}</span>
                      </div>
                      <div className="sm:col-span-2">
                        <span className="text-gray-400 block uppercase text-[9px] tracking-wider font-semibold">Inquiry Focus / Context</span>
                        <p className="italic text-[#555555] bg-white border border-[#333333]/5 px-2.5 py-2 mt-1 rounded-none leading-relaxed">
                          &ldquo;{formData.message}&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Immediate Action Items */}
                  <div className="space-y-2">
                    <h5 className="font-serif text-[10px] uppercase tracking-[0.15em] font-bold text-[#333333]">
                      ✦ Immediate Action Checklist
                    </h5>
                    <ul className="space-y-1.5 text-[11px] text-[#555555]">
                      <li className="flex items-start gap-2">
                        <span className="text-[#c5a059] font-bold">✓</span>
                        <span><strong>Phase 1:</strong> Preliminary industry SWOT diagnostic profiling is being generated instantly (Est. 1 hour).</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#c5a059] font-bold">✓</span>
                        <span><strong>Phase 2:</strong> Bespoke Strategic Blueprint & Capital Runway Assessment report is queued for compile (Est. 12 hours).</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#c5a059] font-bold">✓</span>
                        <span><strong>Phase 3:</strong> Senior stakeholder introduction call booking link will follow directly in our next correspondence.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Professional disclaimer / security footer */}
                  <div className="pt-4 border-t border-[#333333]/10 text-[9px] text-[#8e7379] italic leading-relaxed">
                    This email is a digital transmission generated securely by our automated onboarding system. 
                    Your organization data remains subject to strict corporate confidentiality and encryption protocols.
                  </div>

                  <div className="text-[10px] uppercase tracking-wider font-semibold text-[#333333] pt-2">
                    With elite precision,<br />
                    <span className="text-[#c5a059] text-xs font-serif font-bold block mt-1">The Nina Consulting Advisory Suite</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 text-center">
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
                  className="cursor-pointer bg-[#333333] hover:bg-[#c5a059] text-white px-8 py-3.5 rounded-none text-[10px] font-bold tracking-widest uppercase transition-colors border border-[#333333]"
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
                  Nina Consulting &bull; Elite Business Advisory & Strategy Practice
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
                  Executive Email Address <span className="text-rose-400">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-[#FAF7F2] border ${errors.email ? 'border-rose-400' : 'border-[#333333]/15'} focus:border-[#c5a059] focus:outline-hidden rounded-none px-4 py-3 text-xs text-[#333333] transition-all`}
                  placeholder="e.g. executive@firm.com"
                />
                {errors.email && <p className="text-[10px] font-medium text-rose-500 mt-0.5">{errors.email}</p>}
              </div>

              {/* Message Row */}
              <div className="space-y-1.5 text-left">
                <label htmlFor="message" className="block text-[10px] font-bold text-[#333333] uppercase tracking-[0.15em]">
                  Engagement Context & Challenges <span className="text-rose-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full bg-[#FAF7F2] border ${errors.message ? 'border-rose-400' : 'border-[#333333]/15'} focus:border-[#c5a059] focus:outline-hidden rounded-none px-4 py-3 text-xs text-[#333333] transition-all resize-none`}
                  placeholder="Share details on what you are looking to address (e.g., scale targets, capital constraints, operational bottlenecks, technology initiatives)..."
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
                    I agree to receive other strategic communications from <strong className="text-[#333333]">Nina Consulting</strong>. You can opt out at any time.
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
                    I agree to allow <strong className="text-[#333333]">Nina Consulting</strong> to process and store my personal data to deliver the requested strategic consultation service. <span className="text-rose-400 font-bold">*</span>
                  </label>
                </div>
                {errors.consentPrivacy && <p className="text-[10px] font-medium text-rose-500 mt-0.5">{errors.consentPrivacy}</p>}
              </div>

              {/* Privacy Footer and Submit */}
              <div className="pt-4 space-y-4">
                <p className="text-[10px] text-[#8e7379] italic leading-relaxed uppercase tracking-wider">
                  We care deeply about your corporate data privacy. By checking the consent boxes above and submitting, you acknowledge that your strategic parameters will be delivered securely to our principal advisor.
                </p>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="cursor-pointer w-full bg-[#333333] hover:bg-[#c5a059] disabled:bg-[#FAF7F2] disabled:text-[#8e7379] text-white py-4 rounded-none text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 shadow-none border border-[#333333]/20 flex items-center justify-center gap-2"
                  id="booking-submit-btn"
                >
                  {isSubmitting ? "Processing Your Inquiry..." : "Reserve Strategic Consultation"}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}
