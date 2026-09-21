import { Link } from "react-router-dom";
import HeroVideo from "../components/HeroVideo";

const services = [
  { icon: "💹", title: "Investment",        desc: "Strategic capital allocation across global markets with AI-driven insight and risk management.",                 to: "/services#investment" },
  { icon: "💳", title: "Fintech & Payments",desc: "Next-generation payment infrastructure — fast, secure, and borderless like Stripe for the Web3 era.",            to: "/services#fintech" },
  { icon: "⛓️", title: "Web3 & Blockchain", desc: "Decentralised applications, smart contracts, and token ecosystems built for real-world adoption.",               to: "/services#web3" },
  { icon: "🤖", title: "AI Solutions",      desc: "Intelligent automation and predictive analytics that give your business a competitive edge.",                    to: "/services#ai" },
  { icon: "🏢", title: "Real Estate",       desc: "Tokenised real estate development and digital property investment for the Australian market.",                   to: "/services#real-estate" },
  { icon: "🎮", title: "Web3 Gaming",       desc: "Play-to-earn and own-to-earn gaming platforms with integrated DeFi mechanics and NFT economies.",                to: "/services#gaming" },
];

const stats = [
  { value: "6+",    label: "Industry Verticals" },
  { value: "AU",    label: "Headquarters" },
  { value: "Web3",  label: "Native Platform" },
  { value: "2024",  label: "Founded" },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <HeroVideo />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#6366F1]/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl animate-float-delayed" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32 pt-40">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#6366F1]/30 bg-[#6366F1]/8 text-[#6366F1] text-sm font-medium mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-[#6366F1] animate-pulse" />
            Now operating in Australia
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 font-display animate-slide-up">
            Building the Future of{" "}
            <span className="text-[#6366F1]">Digital Finance</span>{" "}&amp; Web3
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed animate-slide-up-delayed">
            Copia Group Australia is your gateway to next-generation investment, fintech payments, blockchain technology, AI, real estate, and Web3 gaming — all from one innovation hub.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delayed">
            <Link to="/services" className="px-8 py-4 rounded-full bg-[#6366F1] text-white font-bold text-base hover:bg-indigo-400 transition-all shadow-lg shadow-indigo-500/25 animate-glow">Explore Our Services</Link>
            <Link to="/contact"  className="px-8 py-4 rounded-full border border-white/15 text-white font-medium text-base hover:bg-white/5 hover:border-white/25 transition-all">Get in Touch</Link>
          </div>
          <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-2xl mx-auto animate-fade-in-delayed stagger-children">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-3xl font-bold text-[#6366F1] mb-1 font-display">{value}</div>
                <div className="text-xs text-gray-600 uppercase tracking-widest">{label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-gray-700">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-[#0A0A0F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[#6366F1] text-xs font-semibold tracking-widest uppercase mb-3">What We Do</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 font-display">Six Pillars of Innovation</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">From traditional investment to cutting-edge Web3 gaming, Copia Group operates across six interconnected verticals that shape tomorrow's economy.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map(({ icon, title, desc, to }) => (
              <Link key={title} to={to} className="group p-8 rounded-2xl border border-white/8 bg-[#111118] hover:border-[#6366F1]/40 hover:bg-[#16161F] transition-all duration-300">
                <div className="text-4xl mb-5">{icon}</div>
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#6366F1] transition-colors font-display">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/services" className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-[#6366F1]/40 text-[#6366F1] font-medium hover:bg-[#6366F1]/8 transition-colors">View All Services</Link>
          </div>
        </div>
      </section>

      {/* About strip */}
      <section className="py-24 bg-[#111118]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#6366F1] text-xs font-semibold tracking-widest uppercase mb-3">About Us</p>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 font-display">Global Vision,<br />Australian Roots</h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">Copia Group is a subsidiary of the globally recognised <a href="https://copiagroupllc.com" target="_blank" rel="noopener noreferrer" className="text-[#6366F1] hover:underline">Copia Group LLC</a>. Our Australian office sits at the intersection of finance, technology, and digital real estate.</p>
              <Link to="/about" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#6366F1] text-white font-bold hover:bg-indigo-400 transition-colors">Our Story</Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Real Estate Platform", sub: "Tokenised Property Investment" },
                { label: "Web3 Gaming",           sub: "Play & Own Economies" },
                { label: "Fintech Payments",      sub: "Stripe-grade Infrastructure" },
                { label: "AI-Powered",            sub: "Data-Driven Decisions" },
              ].map(({ label, sub }) => (
                <div key={label} className="p-6 rounded-2xl border border-white/8 bg-[#16161F] hover:border-[#6366F1]/30 transition-colors">
                  <div className="w-8 h-1 bg-[#6366F1] rounded mb-4" />
                  <p className="text-white font-semibold text-sm mb-1">{label}</p>
                  <p className="text-gray-600 text-xs">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#0A0A0F] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#6366F1]/5 via-transparent to-violet-600/5" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 font-display">Ready to Build the Future Together?</h2>
          <p className="text-gray-500 text-lg mb-10 max-w-2xl mx-auto">Whether you're an investor, developer, or visionary — there's a place for you at Copia Group Australia.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="px-8 py-4 rounded-full bg-[#6366F1] text-white font-bold text-base hover:bg-indigo-400 transition-colors shadow-lg shadow-indigo-500/25">Contact Us</Link>
            <Link to="/career"  className="px-8 py-4 rounded-full border border-white/15 text-white font-medium text-base hover:bg-white/5 hover:border-white/25 transition-colors">View Open Roles</Link>
          </div>
        </div>
      </section>
    </>
  );
}
