import { useParams, Link, Navigate } from "react-router-dom";
import { getPostBySlug, getAllPosts } from "../lib/blogData";
import ServicePreview from "../components/ServicePreview";

const categoryColors = {
  "Real Estate":        "#F59E0B",
  "Web3 Gaming":        "#EF4444",
  "Fintech & Payments": "#8B5CF6",
  "Investment & AI":    "#06B6D4",
  "Company News":       "#6366F1",
  "Web3 & Finance":     "#3B82F6",
};

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

function InlineContent({ text }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        if (/^\*\*[^*]+\*\*$/.test(part)) return <strong key={i} className="text-white font-semibold">{part.slice(2,-2)}</strong>;
        const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (m) {
          const [, label, href] = m;
          const ext = href.startsWith("http");
          if (ext) return <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="text-[#6366F1] hover:underline">{label}</a>;
          return <Link key={i} to={href} className="text-[#6366F1] hover:underline">{label}</Link>;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

function renderMarkdown(content) {
  return content.trim().split("\n\n").map((block, i) => {
    if (block.startsWith("## ")) return <h2 key={i} className="text-2xl font-bold text-white mt-10 mb-4 font-display">{block.replace("## ","")}</h2>;
    if (block.startsWith("### ")) return <h3 key={i} className="text-xl font-semibold text-white mt-8 mb-3">{block.replace("### ","")}</h3>;
    if (block.split("\n").every(l => l.trim().startsWith("- "))) {
      return <ul key={i} className="list-disc list-inside flex flex-col gap-2 mb-4">{block.split("\n").filter(l=>l.trim().startsWith("- ")).map((item,j)=><li key={j} className="text-gray-400 text-base leading-relaxed"><InlineContent text={item.replace(/^- /,"")} /></li>)}</ul>;
    }
    if (block.split("\n").every(l=>/^\d+\. /.test(l.trim()))) {
      return <ol key={i} className="list-decimal list-inside flex flex-col gap-2 mb-4">{block.split("\n").filter(l=>/^\d+\. /.test(l.trim())).map((item,j)=><li key={j} className="text-gray-400 text-base leading-relaxed"><InlineContent text={item.replace(/^\d+\. /,"")} /></li>)}</ol>;
    }
    return <p key={i} className="text-gray-400 text-base leading-relaxed mb-0"><InlineContent text={block} /></p>;
  });
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);
  if (!post) return <Navigate to="/blog" replace />;

  const accent = categoryColors[post.category] || "#6366F1";
  const related = getAllPosts().filter(p => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <section className="relative pt-40 pb-20 overflow-hidden bg-gradient-to-b from-[#111118] to-[#0A0A0F]">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-10" style={{ background: accent }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/blog" className="inline-flex items-center gap-2 text-gray-500 text-sm hover:text-white mb-8 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back to Blog
          </Link>
          <span className="inline-block text-xs px-3 py-1 rounded-full font-semibold mb-5" style={{ background: `${accent}20`, color: accent }}>{post.category}</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight font-display">{post.title}</h1>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl">{post.excerpt}</p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white" style={{ background: post.authorColor }}>{post.authorInitials}</div>
            <div>
              <p className="text-white font-semibold text-sm">{post.author}</p>
              <p className="text-gray-600 text-xs">{post.authorRole} · {formatDate(post.date)} · {post.readTime}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#0A0A0F]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-16">
            <article className="flex flex-col gap-6">{renderMarkdown(post.content)}</article>
            <aside className="lg:sticky lg:top-28 h-fit flex flex-col gap-6">
              <div className="p-6 rounded-2xl border border-white/8 bg-[#111118]">
                <p className="text-xs text-gray-600 uppercase tracking-widest mb-4">About the Author</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0" style={{ background: post.authorColor }}>{post.authorInitials}</div>
                  <div>
                    <p className="text-white font-semibold text-sm">{post.author}</p>
                    <p className="text-gray-600 text-xs">{post.authorRole}</p>
                  </div>
                </div>
              </div>
              <div className="p-6 rounded-2xl border border-[#6366F1]/20 bg-[#6366F1]/5">
                <p className="text-[#6366F1] font-semibold text-sm mb-2">Interested in this topic?</p>
                <p className="text-gray-500 text-xs mb-4">Talk to our team about how Copia Group's services can help you.</p>
                <Link to="/contact" className="block text-center px-5 py-2.5 rounded-full bg-[#6366F1] text-white text-sm font-bold hover:bg-indigo-400 transition-colors">Get in Touch</Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-16 bg-[#111118]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-white mb-8 font-display">More from the Journal</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map((p) => (
                <Link key={p.slug} to={`/blog/${p.slug}`} className="group flex flex-col rounded-2xl border border-white/8 bg-[#16161F] overflow-hidden hover:border-[#6366F1]/30 transition-colors">
                  <div className="overflow-hidden">
                    <ServicePreview
                      siteUrl={categoryPreviewUrls[p.category] || "https://midas.app"}
                      accent={categoryColors[p.category] || "#6366F1"}
                      title={p.title}
                      className="rounded-none"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: `${categoryColors[p.category] || "#6366F1"}20`, color: categoryColors[p.category] || "#6366F1" }}>{p.category}</span>
                    <h3 className="text-white font-bold text-sm mt-3 mb-1 group-hover:text-[#6366F1] transition-colors leading-snug font-display">{p.title}</h3>
                    <p className="text-gray-600 text-xs">{formatDate(p.date)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
