import { useNavigate } from "react-router-dom";
import { DEPT_COLORS } from "../../data/careerConstants";
import { useLanguage } from "../../context/LanguageContext";

const HIRING_PROCESS = [
  "Application review (within 5 days)",
  "Technical interview with the PM (includes a 5-minute live coding test and a discussion on the status of company projects)",
  "Technical interview with the engineering team",
  "Final interview and job offer",
];
const HIRING_PROCESS_PL = [
  "Przegląd aplikacji (w ciągu 5 dni)",
  "Rozmowa techniczna z PM (zawiera 5-minutowy test kodowania na żywo i dyskusję o statusie projektów firmy)",
  "Rozmowa techniczna z zespołem inżynierów",
  "Rozmowa finalna i oferta pracy",
];

export default function JobDetailPage({ jobTitle, onApply, onBack }) {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const handleBack = onBack ?? (() => navigate("/career"));
  const color = jobTitle ? (DEPT_COLORS[jobTitle.dept] || { bg:"#374151", text:"#9CA3AF" }) : {};
  const hiringSteps = lang === "pl" ? HIRING_PROCESS_PL : HIRING_PROCESS;

  return (
    <div className="bg-[#0A0A0F] text-white min-h-screen">

      {/* Hero */}
      <section className="relative pt-40 pb-16 bg-gradient-to-b from-[#111118] to-[#0A0A0F] overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#DC2626]/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/3" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <button onClick={handleBack} className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors mb-10 group">
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            {t("career_back")}
          </button>
          {jobTitle && (
            <div>
              <span className="inline-block text-xs font-bold px-3 py-1.5 rounded-full mb-5"
                style={{ background:color.bg+"33", color:color.text, border:`1px solid ${color.bg}55` }}>
                {jobTitle.dept}
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-5 font-display">{jobTitle.title}</h1>
              <div className="flex flex-wrap gap-5 mb-8">
                <span className="text-sm text-gray-400">📍 {jobTitle.location}</span>
                <span className="text-sm text-gray-400">🕐 {jobTitle.type}</span>
                <span className="text-sm text-gray-400">💰 {t("career_competitive")}</span>
              </div>
              <button onClick={onApply}
                className="px-8 py-4 rounded-full bg-[#DC2626] text-white font-bold hover:bg-[#EF4444] transition-colors shadow-lg shadow-red-700/25">
                {t("career_apply_btn")}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Body */}
      {jobTitle && (
        <section className="py-16 bg-[#0A0A0F]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            {jobTitle.summary && (
              <p className="text-gray-400 text-base leading-relaxed mb-12 text-lg">{jobTitle.summary}</p>
            )}

            {jobTitle.responsibilities?.length > 0 && (
              <div className="mb-10">
                <h2 className="text-xl font-bold text-white mb-5 font-display">{t("career_what_you_do")}</h2>
                <ul className="space-y-3">
                  {jobTitle.responsibilities.map((r, i) => (
                    <li key={i} className="flex gap-3 text-gray-400 text-sm leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] mt-2 flex-shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {jobTitle.requirements?.length > 0 && (
              <div className="mb-10">
                <h2 className="text-xl font-bold text-white mb-5 font-display">{t("career_looking_for")}</h2>
                <ul className="space-y-3">
                  {jobTitle.requirements.map((r, i) => (
                    <li key={i} className="flex gap-3 text-gray-400 text-sm leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] mt-2 flex-shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {jobTitle.nice_to_have?.length > 0 && (
              <div className="mb-10">
                <h2 className="text-xl font-bold text-white mb-5 font-display">{t("career_nice_to_have")}</h2>
                <ul className="space-y-3">
                  {jobTitle.nice_to_have.map((r, i) => (
                    <li key={i} className="flex gap-3 text-gray-400 text-sm leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] mt-2 flex-shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="p-6 rounded-2xl border border-white/8 bg-[#111118] mb-12">
              <h3 className="text-base font-bold text-white mb-5 font-display">{t("career_hiring_process")}</h3>
              <div className="flex flex-col gap-4">
                {hiringSteps.map((s, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-7 h-7 rounded-full bg-[#DC2626]/15 border border-[#DC2626]/30 text-[#DC2626] text-xs font-bold flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </div>
                    <span className="text-sm text-gray-400">{s}</span>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={onApply}
              className="px-8 py-4 rounded-full bg-[#DC2626] text-white font-bold hover:bg-[#EF4444] transition-colors shadow-lg shadow-red-700/25">
              {t("career_apply_btn")}
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
