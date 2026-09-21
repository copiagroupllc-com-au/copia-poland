import { Link } from "react-router-dom";

const team = [
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

export default function Team() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative pt-40 pb-24 bg-gradient-to-b from-[#111118] to-[#0A0A0F] overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#6366F1]/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/3" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#6366F1] text-xs font-semibold tracking-widest uppercase mb-4">The People</p>
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 font-display">Meet Our Team</h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            A diverse group of builders, thinkers, and doers united by a single purpose — creating a more open and equitable financial future.
          </p>
        </div>
      </section>

      {/* ── Team grid ─────────────────────────────────── */}
      <section className="py-24 bg-[#0A0A0F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12 font-display">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map(({ name, role, photo, accent }) => (
              <div key={name} className="group flex flex-col rounded-2xl border border-white/8 bg-[#111118] overflow-hidden hover:border-white/15 transition-all duration-300">
                {/* Photo */}
                <div className="relative w-full aspect-square overflow-hidden bg-[#16161F]">
                  <img src={photo} alt={name} loading="lazy"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#111118] to-transparent" />
                </div>
                {/* Info */}
                <div className="p-5">
                  <h3 className="text-white font-bold text-base font-display">{name}</h3>
                  <p className="text-sm mt-1" style={{ color: accent }}>{role}</p>
                </div>
                {/* Accent bottom line */}
                <div className="h-0.5 w-0 group-hover:w-full transition-all duration-500" style={{ background: accent }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────── */}
      <section className="py-20 bg-[#111118] text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-4 font-display">Want to Join This Team?</h2>
          <p className="text-gray-500 mb-8">We're always looking for exceptional people who want to build the future of finance and Web3.</p>
          <Link to="/career" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#6366F1] text-white font-bold hover:bg-indigo-400 transition-colors shadow-lg shadow-indigo-500/20">
            View Open Roles
          </Link>
        </div>
      </section>
    </>
  );
}
