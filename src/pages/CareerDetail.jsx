import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useJobs } from "../hooks/useJobs";
import { toSlug } from "../data/careerConstants";
import JobDetailPage from "../components/career/JobDetailPage";
import ApplyPage from "../components/career/ApplyPage";

export default function CareerDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { jobs, loading, error } = useJobs();
  const [applying, setApplying] = useState(false);

  const job = jobs.find((j) => toSlug(j.title) === slug);

  if (loading) {
    return (
      <div className="bg-[#0A0A0F] min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-sm">Loading role…</p>
      </div>
    );
  }

  if (error || (!loading && !job)) {
    return (
      <div className="bg-[#0A0A0F] min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-400 text-sm">{error || "Role not found."}</p>
        <button
          onClick={() => navigate("/career")}
          className="px-6 py-2.5 rounded-full bg-[#6366F1] text-white text-sm font-bold hover:bg-indigo-400 transition-colors"
        >
          ← Back to all roles
        </button>
      </div>
    );
  }

  if (applying) {
    return (
      <ApplyPage
        selectedJob={job}
        onBack={() => setApplying(false)}
      />
    );
  }

  return (
    <JobDetailPage
      jobTitle={job}
      onApply={() => setApplying(true)}
      onBack={() => navigate("/career")}
    />
  );
}
