import { useState } from "react";

const inputCls = "w-full px-4 py-3 rounded-xl bg-[#0A0A0F] border border-white/8 text-white text-sm placeholder-gray-700 focus:outline-none focus:border-[#6366F1]/50 focus:ring-1 focus:ring-[#6366F1]/30 transition-colors";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", company: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("success");
  };

  if (status === "success") {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-5">✅</div>
        <h3 className="text-2xl font-bold text-white mb-3 font-display">Message Received!</h3>
        <p className="text-gray-400">
          Thanks for reaching out. We'll get back to you at{" "}
          <span className="text-[#6366F1]">{form.email}</span> within one business day.
        </p>
        <button onClick={() => { setStatus("idle"); setForm({ name: "", email: "", company: "", subject: "", message: "" }); }}
          className="mt-8 px-6 py-2.5 rounded-full border border-white/15 text-gray-400 text-sm hover:text-white hover:border-white/30 transition-colors">
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Full Name <span className="text-[#6366F1]">*</span></label>
          <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} placeholder="Jane Smith" className={inputCls} />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email Address <span className="text-[#6366F1]">*</span></label>
          <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="jane@company.com" className={inputCls} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-400 mb-2">Company / Organisation</label>
          <input id="company" name="company" type="text" value={form.company} onChange={handleChange} placeholder="Acme Corp" className={inputCls} />
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-2">Subject <span className="text-[#6366F1]">*</span></label>
          <select id="subject" name="subject" required value={form.subject} onChange={handleChange} className={inputCls}>
            <option value="" disabled className="bg-[#0A0A0F]">Select a topic</option>
            {["Investment Enquiry","Fintech & Payments","Web3 / Blockchain","AI Solutions","Real Estate Platform","Web3 Gaming","Partnership","Career / Recruitment","Other"].map((o) => (
              <option key={o} value={o.toLowerCase().replace(/\s+/g,"-")} className="bg-[#0A0A0F]">{o}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message <span className="text-[#6366F1]">*</span></label>
        <textarea id="message" name="message" rows={5} required value={form.message} onChange={handleChange}
          placeholder="Tell us about your project or enquiry..." className={`${inputCls} resize-none`} />
      </div>
      <button type="submit" disabled={status === "sending"}
        className="mt-2 w-full sm:w-auto sm:self-start px-8 py-4 rounded-full bg-[#6366F1] text-white font-bold text-sm hover:bg-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-indigo-500/25">
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
