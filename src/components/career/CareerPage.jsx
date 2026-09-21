import { useState, useMemo } from "react";
import { useJobs } from "../../hooks/useJobs";
import { PERKS, DEPARTMENTS, DEPT_COLORS } from "../../data/careerConstants";

const JOBS_PER_PAGE = 6;

const TEAM = [
  { name: "Nick Field",           role: "Managing Director",            photo: "/team/nick-field.png",           accent: "#6366F1" },
  { name: "Andy Fordyce",         role: "Project Manager",              photo: "/team/andy-fordyce.png",         accent: "#3B82F6" },
  { name: "Cezar Torescu",        role: "Product Engineering Manager",  photo: "/team/cezar-torescu.png",        accent: "#8B5CF6" },
  { name: "Jake Malliaros",       role: "Senior Product Manager",       photo: "/team/jake-malliaros.png",       accent: "#10B981" },
  { name: "Fabian Stierle",       role: "Senior Business Consultant",   photo: "/team/fabian-stierle.png",       accent: "#06B6D4" },
  { name: "Jori Lope",            role: "Senior Business Consultant",   photo: "/team/jori-lope.png",            accent: "#F59E0B" },
  { name: "Mykhailo Plametiu",    role: "Senior Business Manager",      photo: "/team/mykhailo-plametiu.png",    accent: "#EF4444" },
  { name: "Oleh Kopeichenko",     role: "Senior Business Manager",      photo: "/team/oleh-kopeichenko.png",     accent: "#EC4899" },
  { name: "Yaroslav Kreshchenko", role: "Business Manager",             photo: "/team/yaroslav-kreshchenko.png", accent: "#6366F1" },
  { name: "Volodymyr Volchyk",    role: "Business Development Manager", photo: "/team/volodymyr-volchyk.png",    accent: "#3B82F6" },
  { name: "Viktoriia Rieznik",    role: "IT Business Partner",          photo: "/team/viktoriia-rieznik.png",    accent: "#10B981" },
  { name: "Erik Green",           role: "Business Consultant",          photo: "/team/erik-green.png",           accent: "#8B5CF6" },
  { name: "Ron Cussons",          role: "Financial Advisor",            photo: "/team/ron-cussons.png",          accent: "#F59E0B" },
  { name: "Peter AL Schrader",    role: "Private Investor",             photo: "/team/peter-schrader.png",       accent: "#06B6D4" },
];

const VALUES = [
  { icon: "🔭", title: "Vision First",      desc: "We look beyond the horizon, anticipating market shifts before they happen." },
  { icon: "🤝", title: "Trust & Integrity", desc: "Every relationship we build is grounded in honesty and accountability." },
  { icon: "⚡", title: "Speed & Execution", desc: "Ideas are only as good as their execution. We move fast and deliver with precision." },
  { icon: "🌏", title: "Global Mindset",    desc: "Based in Australia, thinking globally. We bridge Asia-Pacific opportunity with world-class technology." },
  { icon: "🔗", title: "Decentralisation",  desc: "Empowering individuals through open protocols and transparent systems." },
  { icon: "♻️", title: "Sustainability",    desc: "We build businesses that create lasting value for people and the planet." },
];

// ── Pill button used by all filter rows ──────────────────────────────────────
function FilterPill({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border whitespace-nowrap ${
        active
          ? "bg-[#6366F1] border-[#6366F1] text-white font-bold shadow-lg shadow-indigo-500/20"
          : "border-white/10 text-gray-400 hover:border-white/25 hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}

export default function CareerPage({ onApply }) {
  const { jobs, loading, error } = useJobs();

  // ── Filter state ────────────────────────────────────────────────────────────
  const [search,   setSearch]   = useState("");
  const [dept,     setDept]     = useState("All");
  const [location, setLocation] = useState("All");
  const [type,     setType]     = useState("All");
  const [page,     setPage]     = useState(1);

  // Reset page whenever any filter changes
  const resetPage = () => setPage(1);

  // ── Derived filter options (only values that exist in the API data) ─────────
  const locations = useMemo(
    () => ["All", ...Array.from(new Set(jobs.map((j) => j.location).filter(Boolean)))],
    [jobs]
  );
  const types = useMemo(
    () => ["All", ...Array.from(new Set(jobs.map((j) => j.type).filter(Boolean)))],
    [jobs]
  );
  const activeDepts = useMemo(
    () => DEPARTMENTS.filter((d) => d === "All" || jobs.some((j) => j.dept === d)),
    [jobs]
  );

  // ── Filtered list ───────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return jobs.filter((j) => {
      if (dept     !== "All" && j.dept     !== dept)     return false;
      if (location !== "All" && j.location !== location) return false;
      if (type     !== "All" && j.type     !== type)     return false;
      if (q && !j.title.toLowerCase().includes(q))      return false;
      return true;
    });
  }, [jobs, search, dept, location, type]);

  // ── Pagination ──────────────────────────────────────────────────────────────
  const totalPages  = Math.max(1, Math.ceil(filtered.length / JOBS_PER_PAGE));
  const safePage    = Math.min(page, totalPages);
  const paginated   = filtered.slice((safePage - 1) * JOBS_PER_PAGE, safePage * JOBS_PER_PAGE);
  const startIndex  = (safePage - 1) * JOBS_PER_PAGE + 1;
  const endIndex    = Math.min(safePage * JOBS_PER_PAGE, filtered.length);

  const hasActiveFilter = dept !== "All" || location !== "All" || type !== "All" || search !== "";

  const clearAll = () => {
    setSearch(""); setDept("All"); setLocation("All"); setType("All"); resetPage();
  };

  return (
    <div className="bg-[#0A0A0F] text-white min-h-screen">

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative pt-40 pb-24 bg-gradient-to-b from-[#111118] to-[#0A0A0F] overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#6366F1]/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/3" />
        <div className="absolute top-1/4 -left-32 w-80 h-80 bg-violet-600/5 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#6366F1]/30 bg-[#6366F1]/8 text-[#6366F1] text-xs font-semibold tracking-widest uppercase mb-8">
            <span className="w-2 h-2 rounded-full bg-[#6366F1] animate-pulse" />
            Now hiring — Australia
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-white leading-tight mb-6 font-display">
            Shape the Future of{" "}
            <span className="text-[#6366F1]">Digital Finance</span> &amp; Web3
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Copia Group Australia sits at the intersection of investment, fintech, blockchain, AI,
            real estate, and Web3 gaming. Join us in building ecosystems that connect people to
            opportunity in ways that weren't possible before.
          </p>
          <button
            onClick={() => document.getElementById("open-roles")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-4 rounded-full bg-[#6366F1] text-white font-bold hover:bg-indigo-400 transition-colors shadow-lg shadow-indigo-500/25"
          >
            See open roles →
          </button>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────── */}
      <div className="border-y border-white/8 bg-[#111118]">
        <div className="max-w-4xl mx-auto grid grid-cols-3 divide-x divide-white/8">
          {[
            { num: "14",                        label: "Team members" },
            { num: loading ? "…" : jobs.length, label: "Open roles" },
            { num: "6+",                        label: "Industry verticals" },
          ].map((s) => (
            <div key={s.label} className="py-10 text-center">
              <div className="text-4xl font-bold text-[#6366F1] mb-1 font-display">{s.num}</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Perks ────────────────────────────────────── */}
      <section className="py-24 bg-[#0A0A0F]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#6366F1] text-xs font-semibold tracking-widest uppercase mb-4">What we offer</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 font-display">Why work with us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PERKS.map((p) => (
              <div key={p.title} className="p-6 rounded-2xl border border-white/8 bg-[#111118] hover:border-[#6366F1]/30 transition-all duration-300">
                <div className="text-3xl mb-4">{p.icon}</div>
                <div className="text-white font-bold text-sm mb-2 font-display">{p.title}</div>
                <div className="text-gray-500 text-sm leading-relaxed">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Open Roles ───────────────────────────────── */}
      <section id="open-roles" className="py-24 bg-[#111118]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#6366F1] text-xs font-semibold tracking-widest uppercase mb-4">Open roles</p>
          <div className="flex items-end justify-between gap-4 mb-8 flex-wrap">
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-display">Join the team</h2>
            {!loading && (
              <span className="text-sm text-gray-500">
                {filtered.length} role{filtered.length !== 1 ? "s" : ""} found
              </span>
            )}
          </div>

          {/* ── Search ── */}
          <div className="relative mb-6">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); resetPage(); }}
              placeholder="Search roles…"
              className="w-full bg-[#16161F] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#6366F1]/50 focus:ring-1 focus:ring-[#6366F1]/30 transition-colors"
            />
            {search && (
              <button
                onClick={() => { setSearch(""); resetPage(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors text-lg leading-none"
              >
                ×
              </button>
            )}
          </div>

          {/* ── Filter rows ── */}
          <div className="flex flex-col gap-3 mb-8">
            {/* Department */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-gray-600 uppercase tracking-widest w-20 flex-shrink-0">Dept</span>
              <div className="flex gap-2 flex-wrap">
                {activeDepts.map((d) => (
                  <FilterPill key={d} label={d} active={dept === d} onClick={() => { setDept(d); resetPage(); }} />
                ))}
              </div>
            </div>

            {/* Location */}
            {locations.length > 1 && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-gray-600 uppercase tracking-widest w-20 flex-shrink-0">Location</span>
                <div className="flex gap-2 flex-wrap">
                  {locations.map((l) => (
                    <FilterPill key={l} label={l} active={location === l} onClick={() => { setLocation(l); resetPage(); }} />
                  ))}
                </div>
              </div>
            )}

            {/* Type */}
            {types.length > 1 && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-gray-600 uppercase tracking-widest w-20 flex-shrink-0">Type</span>
                <div className="flex gap-2 flex-wrap">
                  {types.map((t) => (
                    <FilterPill key={t} label={t} active={type === t} onClick={() => { setType(t); resetPage(); }} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Active filter summary + clear ── */}
          {hasActiveFilter && !loading && (
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <span className="text-xs text-gray-500">Active filters:</span>
              {dept     !== "All" && <span className="px-2.5 py-1 rounded-full bg-[#6366F1]/15 text-[#6366F1] text-xs font-medium">{dept}</span>}
              {location !== "All" && <span className="px-2.5 py-1 rounded-full bg-[#6366F1]/15 text-[#6366F1] text-xs font-medium">{location}</span>}
              {type     !== "All" && <span className="px-2.5 py-1 rounded-full bg-[#6366F1]/15 text-[#6366F1] text-xs font-medium">{type}</span>}
              {search             && <span className="px-2.5 py-1 rounded-full bg-[#6366F1]/15 text-[#6366F1] text-xs font-medium">"{search}"</span>}
              <button onClick={clearAll} className="text-xs text-gray-500 hover:text-white underline underline-offset-2 transition-colors ml-1">
                Clear all
              </button>
            </div>
          )}

          {/* ── Loading / error ── */}
          {loading && <div className="py-16 text-center text-gray-600 text-sm">Loading roles…</div>}
          {!loading && error && <div className="py-16 text-center text-red-400 text-sm">{error}</div>}

          {/* ── Job rows ── */}
          {!loading && !error && (
            <>
              {paginated.length === 0 ? (
                <div className="py-16 text-center">
                  <p className="text-gray-500 text-sm mb-4">No roles match your current filters.</p>
                  <button onClick={clearAll} className="px-5 py-2.5 rounded-full border border-white/10 text-white text-sm hover:bg-white/5 transition-colors">
                    Clear filters
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {paginated.map((job) => {
                    const color = DEPT_COLORS[job.dept] || { bg: "#1F2937", text: "#9CA3AF" };
                    return (
                      <div
                        key={job.id}
                        onClick={() => onApply(job)}
                        className="group flex items-center justify-between gap-4 p-5 rounded-2xl border border-white/8 bg-[#16161F] hover:border-[#6366F1]/40 hover:bg-[#1a1a2e] transition-all duration-300 cursor-pointer"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="text-white font-bold text-base mb-2 group-hover:text-[#6366F1] transition-colors font-display truncate">
                            {job.title}
                          </div>
                          <div className="flex gap-4 flex-wrap">
                            <span className="text-xs text-gray-500">📍 {job.location}</span>
                            <span className="text-xs text-gray-500">🕐 {job.type}</span>
                          </div>
                        </div>
                        <span
                          className="text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap flex-shrink-0"
                          style={{ background: color.bg + "33", color: color.text, border: `1px solid ${color.bg}55` }}
                        >
                          {job.dept}
                        </span>
                        <span className="text-gray-600 group-hover:text-[#6366F1] transition-colors text-lg flex-shrink-0">→</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* ── Pagination ── */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-8 flex-wrap gap-4">
                  {/* Result range */}
                  <span className="text-xs text-gray-500">
                    Showing {startIndex}–{endIndex} of {filtered.length} roles
                  </span>

                  {/* Page controls */}
                  <div className="flex items-center gap-2">
                    {/* Prev */}
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={safePage === 1}
                      className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:border-[#6366F1]/50 hover:text-[#6366F1] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                      aria-label="Previous page"
                    >
                      ←
                    </button>

                    {/* Page numbers */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => {
                      // Always show first, last, current ±1; replace gaps with …
                      const show = n === 1 || n === totalPages || Math.abs(n - safePage) <= 1;
                      const isDot = !show;
                      // Suppress duplicate dots
                      if (isDot) {
                        const prev = n - 1;
                        const prevShow = prev === 1 || prev === totalPages || Math.abs(prev - safePage) <= 1;
                        if (!prevShow) return null; // already rendered a dot
                        return <span key={n} className="text-gray-600 text-sm px-1">…</span>;
                      }
                      return (
                        <button
                          key={n}
                          onClick={() => setPage(n)}
                          className={`w-9 h-9 rounded-full text-sm font-semibold transition-all ${
                            n === safePage
                              ? "bg-[#6366F1] text-white shadow-lg shadow-indigo-500/20"
                              : "border border-white/10 text-gray-400 hover:border-[#6366F1]/50 hover:text-[#6366F1]"
                          }`}
                        >
                          {n}
                        </button>
                      );
                    })}

                    {/* Next */}
                    <button
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={safePage === totalPages}
                      className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:border-[#6366F1]/50 hover:text-[#6366F1] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                      aria-label="Next page"
                    >
                      →
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── Values ───────────────────────────────────── */}
      <section className="py-24 bg-[#0A0A0F]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#6366F1] text-xs font-semibold tracking-widest uppercase mb-4">What we believe</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 font-display">Our core values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {VALUES.map((v) => (
              <div key={v.title} className="p-6 rounded-2xl border border-white/8 bg-[#111118] hover:border-[#6366F1]/30 transition-all duration-300 group">
                <div className="text-3xl mb-4">{v.icon}</div>
                <div className="text-white font-bold text-sm mb-2 group-hover:text-[#6366F1] transition-colors font-display">{v.title}</div>
                <div className="text-gray-500 text-sm leading-relaxed">{v.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ─────────────────────────────────────── */}
      <section className="py-24 bg-[#111118]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#6366F1] text-xs font-semibold tracking-widest uppercase mb-4">The team</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 font-display">Who you'll work with</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {TEAM.map(({ name, role, photo, accent }) => (
              <div key={name} className="group flex flex-col rounded-2xl border border-white/8 bg-[#16161F] overflow-hidden hover:border-white/15 transition-all duration-300">
                <div className="relative w-full aspect-square overflow-hidden bg-[#1a1a2e]">
                  <img src={photo} alt={name} loading="lazy" className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#16161F] to-transparent" />
                </div>
                <div className="p-4">
                  <h3 className="text-white font-bold text-sm">{name}</h3>
                  <p className="text-xs mt-1" style={{ color: accent }}>{role}</p>
                </div>
                <div className="h-0.5 w-0 group-hover:w-full transition-all duration-500" style={{ background: accent }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer CTA ───────────────────────────────── */}
      <section className="py-24 bg-[#0A0A0F] relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-[#6366F1]/5 via-transparent to-violet-600/5" />
        <div className="relative max-w-2xl mx-auto px-4">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 font-display">Don't see a perfect fit?</h2>
          <p className="text-gray-500 text-lg mb-10">
            We're always looking for exceptional people who want to build the future of finance and Web3.
            Tell us what you'd bring to Copia Group.
          </p>
          <button
            onClick={() => onApply(null)}
            className="px-8 py-4 rounded-full border border-white/15 text-white font-medium hover:bg-white/5 hover:border-white/25 transition-all"
          >
            ✉️ Send a general application
          </button>
        </div>
      </section>

    </div>
  );
}
