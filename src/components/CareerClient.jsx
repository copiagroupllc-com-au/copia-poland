import { useState, useMemo } from "react";
import { Link } from "react-router-dom";

const DEPARTMENTS = ["All","Blockchain","Engineering","AI & Data","Mobile","Design","Product","Security","DevOps","QA","Management","Support"];
const CALENDLY_URL = "https://calendly.com/24-7-hire";

export default function CareerClient({ openings }) {
  const [activeDept, setActiveDept] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => openings.filter((r) => {
    const matchDept   = activeDept === "All" || r.department === activeDept;
    const matchSearch = search.trim() === "" || r.title.toLowerCase().includes(search.toLowerCase()) || r.department.toLowerCase().includes(search.toLowerCase());
    return matchDept && matchSearch;
  }), [openings, activeDept, search]);

  const openPdf = (e, pdfPath) => {
    if (e.target.closest("[data-apply-btn]")) return;
    window.open(pdfPath, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      {/* Search + filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search roles..."
            className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-[#16161F] border border-white/8 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#6366F1]/50 focus:ring-1 focus:ring-[#6366F1]/25 transition-colors" />
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {DEPARTMENTS.map((dept) => (
            <button key={dept} onClick={() => setActiveDept(dept)}
              className={`flex-shrink-0 px-3.5 py-2 rounded-full text-xs font-medium transition-all duration-150 ${activeDept === dept ? "bg-[#6366F1] text-white shadow-md shadow-indigo-500/20" : "border border-white/8 text-gray-500 hover:border-[#6366F1]/40 hover:text-[#6366F1]"}`}>
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <p className="text-gray-600 text-xs mb-4">
        Showing <span className="text-white font-medium">{filtered.length}</span> of {openings.length} roles
      </p>

      {/* Calendly banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl border border-[#6366F1]/20 bg-[#6366F1]/5 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#6366F1]/15 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-[#6366F1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <p className="text-white text-sm font-semibold">Want to talk to us first?</p>
            <p className="text-gray-500 text-xs mt-0.5">Book a 1-hour intro call with our hiring team — no commitment needed.</p>
          </div>
        </div>
        <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer"
          className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#6366F1] text-white text-sm font-bold hover:bg-indigo-400 transition-colors shadow-md shadow-indigo-500/20 whitespace-nowrap">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Book an Interview
        </a>
      </div>

      {/* Role rows */}
      {filtered.length === 0 ? (
        <div className="py-20 text-center text-gray-600 text-sm">No roles match your search.</div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((role) => (
            <div key={role.slug} onClick={(e) => openPdf(e, role.pdf)} role="button" tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") openPdf(e, role.pdf); }}
              title="Click to view job description"
              className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-white/8 bg-[#16161F] hover:border-[#6366F1]/30 hover:bg-[#1C1C2A] transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#6366F1]/40">
              <div className="flex items-start gap-4 min-w-0">
                <div className="w-1 h-12 rounded-full flex-shrink-0 mt-0.5" style={{ background: role.accent }} />
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-white font-semibold text-sm group-hover:text-[#6366F1] transition-colors">{role.title}</h3>
                    <span className="inline-flex items-center gap-1 text-xs text-gray-600 group-hover:text-gray-400 transition-colors">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                      JD
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: `${role.accent}18`, color: role.accent }}>{role.department}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-white/5 text-gray-500">{role.type}</span>
                    <span className="text-xs text-gray-600 flex items-center gap-1">
                      <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      {role.location}
                    </span>
                  </div>
                </div>
              </div>
              <Link to={`/apply/${role.slug}`} data-apply-btn="true" target="_blank" rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex-shrink-0 px-5 py-2.5 rounded-full border border-[#6366F1]/40 text-[#6366F1] text-sm font-medium hover:bg-[#6366F1] hover:text-white transition-all duration-200">
                Apply Now
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
