import { Link } from "react-router-dom";
import { getAllPosts } from "../lib/blogData";
import ServicePreview from "../components/ServicePreview";

const categoryColors = {
  "Real Estate":        "#F59E0B",
  "Web3 Gaming":        "#EF4444",
  "Fintech & Payments": "#8B5CF6",
  "Investment & AI":    "#06B6D4",
  "Company News":       "#6366F1",
  "Web3 & Finance":     "#3B82F6",
};

// One representative preview URL per category — 2026 ecosystem partners
const categoryPreviewUrls = {
  "Real Estate":        "https://mey.network",
  "Web3 Gaming":        "https://playable.com",
  "Fintech & Payments": "https://www.revolut.com",
  "Investment & AI":    "https://spacemarkets.com",
  "Company News":       "https://saharaai.com",
  "Web3 & Finance":     "https://monad.xyz",
};

function formatDate(d) {
  return new Date(d).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" });
}

export default function Blog() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  const featuredAccent  = categoryColors[featured.category]      || "#6366F1";
  const featuredPreview = categoryPreviewUrls[featured.category] || "https://midas.app";

  return (
    <>
      <section className="relative pt-40 pb-24 bg-gradient-to-b from-[#111118] to-[#0A0A0F] overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#6366F1]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#6366F1] text-xs font-semibold tracking-widest uppercase mb-4">Insights &amp; Updates</p>
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 font-display">The Copia Journal</h1>
          <p className="text-gray-400 text-xl max-w-xl">Perspectives on investment, fintech, Web3, AI, real estate, and gaming — from the people building the future.</p>
        </div>
      </section>

      <section className="py-16 bg-[#0A0A0F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Featured */}
          <Link to={`/blog/${featured.slug}`} className="group block mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl border border-white/8 overflow-hidden hover:border-[#6366F1]/30 transition-colors">
              <div className="min-h-[260px] overflow-hidden">
                <ServicePreview
                  siteUrl={featuredPreview}
                  accent={featuredAccent}
                  title={featured.title}
                  className="h-full rounded-none"
                />
              </div>
              <div className="p-10 flex flex-col justify-center bg-[#111118]">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs px-3 py-1 rounded-full font-semibold" style={{ background: `${featuredAccent}20`, color: featuredAccent }}>{featured.category}</span>
                  <span className="text-gray-600 text-xs">Featured</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-[#6366F1] transition-colors font-display">{featured.title}</h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{featured.excerpt}</p>
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: featured.authorColor }}>{featured.authorInitials}</div>
                  <div>
                    <p className="text-white text-xs font-medium">{featured.author}</p>
                    <p className="text-gray-600 text-xs">{formatDate(featured.date)} · {featured.readTime}</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Article grid */}
          <h2 className="text-2xl font-bold text-white mb-8 font-display">Latest Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((post) => {
              const accent      = categoryColors[post.category]      || "#6366F1";
              const previewUrl  = categoryPreviewUrls[post.category] || "https://midas.app";
              return (
                <Link key={post.slug} to={`/blog/${post.slug}`} className="group flex flex-col rounded-2xl border border-white/8 bg-[#111118] overflow-hidden hover:border-[#6366F1]/30 transition-all duration-300">
                  <div className="overflow-hidden">
                    <ServicePreview
                      siteUrl={previewUrl}
                      accent={accent}
                      title={post.title}
                      className="rounded-none"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <span className="text-xs px-2.5 py-1 rounded-full font-semibold self-start mb-3" style={{ background: `${accent}20`, color: accent }}>{post.category}</span>
                    <h3 className="text-white font-bold text-base mb-3 group-hover:text-[#6366F1] transition-colors leading-snug font-display flex-1">{post.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">{post.excerpt}</p>
                    <div className="flex items-center gap-3 pt-4 border-t border-white/8">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background: post.authorColor }}>{post.authorInitials}</div>
                      <div className="min-w-0">
                        <p className="text-white text-xs font-medium truncate">{post.author}</p>
                        <p className="text-gray-600 text-xs">{formatDate(post.date)} · {post.readTime}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#111118] text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-3 font-display">Stay in the Loop</h2>
          <p className="text-gray-500 mb-8">Get the latest Copia Group insights delivered directly to your inbox.</p>
          <a href="mailto:contact@copiagroupllc.com.au?subject=Newsletter Subscription" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#6366F1] text-white font-bold hover:bg-indigo-400 transition-colors">Subscribe via Email</a>
        </div>
      </section>
    </>
  );
}
