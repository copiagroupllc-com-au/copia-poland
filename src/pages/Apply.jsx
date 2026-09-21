import { useParams, Link, Navigate } from "react-router-dom";
import { openings } from "../data/openings";
import ApplicationForm from "../components/ApplicationForm";

export default function Apply() {
  const { role: slug } = useParams();
  const opening = openings.find((r) => r.slug === slug);
  if (!opening) return <Navigate to="/career" replace />;

  return (
    <main className="min-h-screen bg-[#0A0A0F] pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <Link to="/career" className="inline-flex items-center gap-2 text-gray-500 text-sm hover:text-white transition-colors mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Careers
          </Link>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xs px-3 py-1 rounded-full font-semibold" style={{ background: `${opening.accent}18`, color: opening.accent }}>{opening.department}</span>
            <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-500">{opening.type}</span>
            <span className="text-xs text-gray-600 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {opening.location}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white font-display">
            Apply — <span style={{ color: opening.accent }}>{opening.title}</span>
          </h1>
          <p className="text-gray-500 text-sm mt-3">Complete all four steps below. Your application will be sent directly to our hiring team.</p>
        </div>

        <ApplicationForm role={opening.title} accent={opening.accent} />
      </div>
    </main>
  );
}
