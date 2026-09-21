import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

export default function NotFound() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0F] px-4 text-center">
      <div>
        <p className="text-[#DC2626] text-xs font-semibold tracking-widest uppercase mb-4">{t("notfound_lbl")}</p>
        <h1 className="text-5xl font-bold text-white mb-4 font-display">{t("notfound_h1")}</h1>
        <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">{t("notfound_sub")}</p>
        <Link to="/" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#DC2626] text-white font-bold hover:bg-[#EF4444] transition-colors">
          {t("notfound_btn")}
        </Link>
      </div>
    </div>
  );
}
