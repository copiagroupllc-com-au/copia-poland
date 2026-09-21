import { Link } from "react-router-dom";

const categories = [
  { label: "All", id: "all" }, { label: "Investment", id: "investment" },
  { label: "Fintech & Payments", id: "fintech" }, { label: "Web3 & Blockchain", id: "web3" },
  { label: "AI & Data", id: "ai" }, { label: "Real Estate", id: "real-estate" }, { label: "Gaming", id: "gaming" },
];

const insights = [
  { category: "Investment", accent: "#6366F1", type: "Market Report", title: "Asia-Pacific Digital Asset Markets: Q3 2026 Outlook", summary: "A comprehensive review of tokenised asset performance across APAC, covering regulatory shifts in Australia, Singapore, and Japan — and what they mean for institutional capital allocation.", readTime: "12 min read", date: "July 2026", author: "Alexander Reid", authorInitials: "AR", authorColor: "#6366F1", tags: ["Tokenised Assets","APAC","Institutional","Regulatory"], icon: "💹" },
  { category: "Fintech & Payments", accent: "#3B82F6", type: "Technical Deep-Dive", title: "Stablecoin Settlement Rails: Engineering a Stripe Alternative for Web3", summary: "An engineering-level breakdown of how USDC/USDT settlement rails, on-chain KYC attestations, and webhook infrastructure can replicate Stripe's developer experience for DeFi-native applications.", readTime: "15 min read", date: "June 2026", author: "Priya Sharma", authorInitials: "PS", authorColor: "#8B5CF6", tags: ["Stablecoins","Payments API","DeFi","Engineering"], icon: "💳" },
  { category: "Web3 & Blockchain", accent: "#8B5CF6", type: "Research Note", title: "Layer 2 Adoption Curves: What Ethereum Scaling Means for DApp Builders", summary: "With Optimism, Arbitrum, and Base commanding over $20B in TVL, we analyse how L2 cost structures are reshaping smart contract deployment strategies for production applications.", readTime: "10 min read", date: "June 2026", author: "Mei Lin Chen", authorInitials: "MC", authorColor: "#3B82F6", tags: ["Layer 2","Ethereum","TVL","Smart Contracts"], icon: "⛓️" },
  { category: "AI & Data", accent: "#10B981", type: "Analysis", title: "LLMs as Financial Co-Pilots: Accuracy, Hallucination Risk, and Compliance Guardrails", summary: "Financial institutions are deploying LLMs at scale, but hallucination rates in high-stakes contexts demand purpose-built guardrails. We evaluate RAG pipelines, fine-tuning approaches, and compliance frameworks.", readTime: "18 min read", date: "May 2026", author: "David Nguyen", authorInitials: "DN", authorColor: "#06B6D4", tags: ["LLMs","RAG","Compliance","FinanceAI"], icon: "🤖" },
  { category: "Real Estate", accent: "#F59E0B", type: "Property Intelligence", title: "Fractional Ownership Regulation in Australia: ASIC's Evolving Framework", summary: "ASIC has signalled a managed investment scheme pathway for tokenised real estate. We map out the compliance requirements, minimum capital thresholds, and disclosure obligations for platform operators.", readTime: "9 min read", date: "May 2026", author: "Emma Fischer", authorInitials: "EF", authorColor: "#EC4899", tags: ["ASIC","Regulation","Tokenisation","MIS"], icon: "🏢" },
  { category: "Gaming", accent: "#EF4444", type: "Industry Report", title: "Web3 Gaming in 2026: The Play-to-Own Inflection Point", summary: "After the play-to-earn crash of 2022, a new cohort of Web3 games with genuine gameplay loops is reaching mainstream audiences. We examine retention mechanics, guild economics, and NFT market liquidity.", readTime: "14 min read", date: "April 2026", author: "Lucas Andrade", authorInitials: "LA", authorColor: "#EF4444", tags: ["GameFi","NFT","Retention","Guild Economics"], icon: "🎮" },
  { category: "Investment", accent: "#6366F1", type: "Macro View", title: "Interest Rates, Digital Assets, and the Correlation Debate", summary: "With the RBA cutting rates for the third time in 2026, we revisit the risk-on / risk-off correlation between digital assets and traditional macro indicators — and what it means for portfolio construction.", readTime: "11 min read", date: "April 2026", author: "Alexander Reid", authorInitials: "AR", authorColor: "#6366F1", tags: ["Macro","RBA","Portfolio","Correlation"], icon: "💹" },
  { category: "Web3 & Blockchain", accent: "#8B5CF6", type: "Protocol Analysis", title: "DAO Treasury Management: Lessons from 50 Governance Experiments", summary: "We surveyed 50 DAOs managing treasuries above $10M to identify best practices in diversification, spending governance, and off-chain / on-chain co-ordination.", readTime: "16 min read", date: "March 2026", author: "Mei Lin Chen", authorInitials: "MC", authorColor: "#3B82F6", tags: ["DAO","Governance","Treasury","DeFi"], icon: "⛓️" },
];

const stats = [
  { value: "50+", label: "Research Reports" }, { value: "8", label: "Expert Authors" },
  { value: "6", label: "Verticals Covered" }, { value: "Monthly", label: "Publication Cadence" },
];

export default function Insight() {
  const featured = insights[0];

  return (
    <>
      <section className="relative pt-40 pb-24 bg-gradient-to-b from-[#111118] to-[#0A0A0F] overflow-hidden">
        <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] bg-[#6366F1]/6 rounded-full blur-3xl animate-float" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-violet-600/6 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 animate-float-delayed" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#6366F1]/30 bg-[#6366F1]/8 text-[#6366F1] text-sm font-medium mb-6 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-[#6366F1] animate-pulse" />
            Research &amp; Intelligence
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 max-w-3xl font-display animate-slide-up">
            Copia Group <span className="text-[#6366F1]">Insights</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl leading-relaxed animate-slide-up-delayed">
            Market intelligence, technical deep-dives, and expert perspectives across investment, fintech, Web3, AI, real estate, and gaming.
          </p>
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl animate-fade-in-delayed">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-3xl font-bold text-[#6366F1] mb-1 font-display">{value}</div>
                <div className="text-xs text-gray-600 uppercase tracking-widest">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sticky top-20 z-30 bg-[#0A0A0F]/95 backdrop-blur-md border-b border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-4 overflow-x-auto no-scrollbar">
            {categories.map(({ label, id }) => (
              <a key={id} href={id === "all" ? "#insights" : `#${id}`}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${id === "all" ? "bg-[#6366F1] text-white shadow-lg shadow-indigo-500/25" : "border border-white/8 text-gray-500 hover:border-[#6366F1]/40 hover:text-[#6366F1]"}`}>
                {label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#0A0A0F]" id="insights">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-8 font-display">Featured Insight</h2>
          <div className="group relative rounded-3xl border border-white/8 bg-[#111118] overflow-hidden hover:border-[#6366F1]/30 transition-all duration-300 mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
              <div className="lg:col-span-2 relative min-h-[260px] flex items-center justify-center" style={{ background: "linear-gradient(135deg, #6366F115 0%, #111118 100%)" }}>
                <div className="text-center">
                  <div className="text-7xl mb-4 animate-float">💹</div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#6366F1]/20 text-[#6366F1]">Market Report</span>
                </div>
              </div>
              <div className="lg:col-span-3 p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#6366F1]/15 text-[#6366F1]">Investment</span>
                  <span className="text-gray-600 text-xs">July 2026 · 12 min read</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-[#6366F1] transition-colors font-display">{featured.title}</h3>
                <p className="text-gray-500 leading-relaxed mb-6">{featured.summary}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {featured.tags.map(tag => <span key={tag} className="px-2.5 py-1 rounded-full text-xs bg-white/5 text-gray-500 border border-white/8">{tag}</span>)}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-xs bg-[#6366F1]">AR</div>
                    <div>
                      <p className="text-white text-xs font-medium">Alexander Reid</p>
                      <p className="text-gray-600 text-xs">Chief Executive Officer</p>
                    </div>
                  </div>
                  <Link to="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#6366F1] text-white text-sm font-bold hover:bg-indigo-400 transition-colors">Request Full Report</Link>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mb-8 font-display">Latest Research</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {insights.slice(1).map(({ category, accent, type, title, summary, readTime, date, author, authorInitials, authorColor, tags, icon }) => (
              <div key={title} className="group flex flex-col rounded-2xl border border-white/8 bg-[#111118] overflow-hidden hover:border-white/15 transition-all duration-300 hover:-translate-y-1">
                <div className="h-36 flex items-center justify-center relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${accent}12 0%, #111118 100%)` }}>
                  <div className="text-5xl group-hover:scale-110 transition-transform duration-300">{icon}</div>
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: `${accent}20`, color: accent }}>{type}</span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold" style={{ color: accent }}>{category}</span>
                    <span className="text-gray-700 text-xs">·</span>
                    <span className="text-gray-600 text-xs">{date}</span>
                  </div>
                  <h3 className="text-white font-bold text-base mb-3 group-hover:text-[#6366F1] transition-colors leading-snug font-display flex-1">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">{summary}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {tags.slice(0,3).map(tag => <span key={tag} className="px-2 py-0.5 rounded-full text-xs bg-white/5 text-gray-600 border border-white/8">{tag}</span>)}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-white/8">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-white text-xs" style={{ background: authorColor }}>{authorInitials}</div>
                      <div>
                        <p className="text-white text-xs font-medium">{author}</p>
                        <p className="text-gray-600 text-xs">{readTime}</p>
                      </div>
                    </div>
                    <Link to="/contact" className="text-xs text-[#6366F1] font-medium hover:underline flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      Request <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 p-10 rounded-3xl border border-[#6366F1]/20 bg-gradient-to-br from-[#6366F1]/5 to-[#111118] text-center">
            <div className="text-4xl mb-4 animate-float">📊</div>
            <h2 className="text-3xl font-bold text-white mb-4 font-display">Get Insights Delivered</h2>
            <p className="text-gray-500 max-w-xl mx-auto mb-8">Our research team publishes new reports monthly. Receive institutional-grade intelligence on the trends shaping digital finance, directly to your inbox.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <a href="mailto:contact@copiagroupllc.com.au?subject=Insights Subscription" className="flex-1 px-6 py-3 rounded-full bg-[#6366F1] text-white font-bold text-sm hover:bg-indigo-400 transition-colors shadow-lg shadow-indigo-500/25">Subscribe to Insights</a>
              <Link to="/contact" className="flex-1 px-6 py-3 rounded-full border border-white/15 text-white font-medium text-sm hover:bg-white/5 transition-colors">Talk to Our Analysts</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
