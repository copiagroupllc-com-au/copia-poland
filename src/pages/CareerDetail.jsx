import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useJobs } from "../hooks/useJobs";
import { toSlug } from "../data/careerConstants";
import JobDetailPage from "../components/career/JobDetailPage";
import ApplyPage from "../components/career/ApplyPage";
import { useLanguage } from "../context/LanguageContext";

export default function CareerDetail() {
  const { slug } = useParams();
  const navigate  = useNavigate();
  const { t }     = useLanguage();
  const { jobs, loading, error } = useJobs();
  const [applying, setApplying] = useState(false);

  const job = jobs.find(j => toSlug(j.title) === slug);

  if (loading) {
    return (
      <div className="bg-[#0A0A0F] min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-sm">{t("career_loading_role")}</p>
      </div>
    );
  }

  if (error || (!loading && !job)) {
    return (
      <div className="bg-[#0A0A0F] min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-400 text-sm">{error || t("career_role_not_found")}</p>
        <button onClick={() => navigate("/career")}
          className="px-6 py-2.5 rounded-full bg-[#DC2626] text-white text-sm font-bold hover:bg-[#EF4444] transition-colors">
          {t("career_back_all")}
        </button>
      </div>
    );
  }

  if (applying) {
    return <ApplyPage selectedJob={job} onBack={() => setApplying(false)} />;
  }

  return (
    <JobDetailPage
      jobTitle={job}
      onApply={() => setApplying(true)}
      onBack={() => navigate("/career")}
    />
  );
}
