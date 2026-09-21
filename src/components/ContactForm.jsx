import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

const inputCls = "w-full px-4 py-3 rounded-xl bg-[#0A0A0F] border border-white/8 text-white text-sm placeholder-gray-700 focus:outline-none focus:border-[#DC2626]/50 focus:ring-1 focus:ring-[#DC2626]/30 transition-colors";

const subjectsEN = ["Investment Enquiry","Fintech & Payments","Web3 / Blockchain","AI Solutions","Real Estate Platform","Web3 Gaming","Partnership","Career / Recruitment","Other"];
const subjectsPL = ["Zapytanie inwestycyjne","Fintech i płatności","Web3 / Blockchain","Rozwiązania AI","Platforma nieruchomości","Gaming Web3","Partnerstwo","Kariera / Rekrutacja","Inne"];

export default function ContactForm() {
  const { t, lang } = useLanguage();
  const [form, setForm] = useState({ name:"", email:"", company:"", subject:"", message:"" });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise(r => setTimeout(r, 1200));
    setStatus("success");
  };

  const subjects = lang === "pl" ? subjectsPL : subjectsEN;

  if (status === "success") {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-5">✅</div>
        <h3 className="text-2xl font-bold text-white mb-3 font-display">{t("form_success_h3")}</h3>
        <p className="text-gray-400">
          {t("form_success_p1")}{" "}<span className="text-[#DC2626]">{form.email}</span>{" "}{t("form_success_p2")}
        </p>
        <button onClick={() => { setStatus("idle"); setForm({ name:"", email:"", company:"", subject:"", message:"" }); }}
          className="mt-8 px-6 py-2.5 rounded-full border border-white/15 text-gray-400 text-sm hover:text-white hover:border-white/30 transition-colors">
          {t("form_another")}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">{t("form_name")} <span className="text-[#DC2626]">*</span></label>
          <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} placeholder="Jane Smith" className={inputCls} />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">{t("form_email")} <span className="text-[#DC2626]">*</span></label>
          <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="jane@company.com" className={inputCls} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-400 mb-2">{t("form_company")}</label>
          <input id="company" name="company" type="text" value={form.company} onChange={handleChange} placeholder="Acme Corp" className={inputCls} />
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-2">{t("form_subject")} <span className="text-[#DC2626]">*</span></label>
          <select id="subject" name="subject" required value={form.subject} onChange={handleChange} className={inputCls}>
            <option value="" disabled className="bg-[#0A0A0F]">{t("form_placeholder_topic")}</option>
            {subjects.map(o => <option key={o} value={o.toLowerCase().replace(/\s+/g,"-")} className="bg-[#0A0A0F]">{o}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">{t("form_message")} <span className="text-[#DC2626]">*</span></label>
        <textarea id="message" name="message" rows={5} required value={form.message} onChange={handleChange}
          placeholder={t("form_placeholder_msg")} className={`${inputCls} resize-none`} />
      </div>
      <button type="submit" disabled={status === "sending"}
        className="mt-2 w-full sm:w-auto sm:self-start px-8 py-4 rounded-full bg-[#DC2626] text-white font-bold text-sm hover:bg-[#EF4444] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-red-700/25">
        {status === "sending" ? t("form_btn_sending") : t("form_btn")}
      </button>
    </form>
  );
}
