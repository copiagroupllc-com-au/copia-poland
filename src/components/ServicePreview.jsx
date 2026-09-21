import { useState, useEffect } from "react";

/**
 * Fetches a live full-page screenshot via the Microlink API and renders it
 * as a styled card image. Shows an animated skeleton while loading and
 * renders nothing if the fetch fails.
 *
 * Props:
 *  siteUrl  – the URL to screenshot (e.g. "https://midas.app")
 *  accent   – hex accent colour used for the border, gradient, and label
 *  title    – alt-text label for the image (used for accessibility)
 *  className – optional extra classes on the outer wrapper
 */
export default function ServicePreview({ siteUrl, accent, title, className = "" }) {
  const [imgUrl, setImgUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!siteUrl) return;
    const api = `https://api.microlink.io/?url=${encodeURIComponent(siteUrl)}&screenshot=true&meta=false`;
    fetch(api)
      .then((r) => r.json())
      .then((data) => {
        if (data?.data?.screenshot?.url) setImgUrl(data.data.screenshot.url);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [siteUrl]);

  if (loading) {
    return (
      <div
        className={`w-full h-48 rounded-2xl animate-pulse ${className}`}
        style={{ background: `${accent}18` }}
        role="img"
        aria-label={`Loading preview for ${title}`}
      />
    );
  }

  if (!imgUrl) return null;

  let hostname = "";
  try {
    hostname = new URL(siteUrl).hostname.replace("www.", "");
  } catch (_) {}

  return (
    <a
      href={siteUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`block group ${className}`}
      aria-label={`Visit ${hostname}`}
    >
      <div
        className="relative w-full overflow-hidden rounded-2xl border"
        style={{ borderColor: `${accent}25` }}
      >
        <img
          src={imgUrl}
          alt={`${title} ecosystem preview — ${hostname}`}
          className="w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          style={{ maxHeight: "220px" }}
        />
        {/* bottom gradient overlay */}
        <div
          className="absolute inset-0 rounded-2xl"
          style={{ background: `linear-gradient(to top, ${accent}50 0%, transparent 55%)` }}
        />
        {/* domain label */}
        <span className="absolute bottom-3 left-4 text-xs font-semibold text-white/80 tracking-wide drop-shadow">
          {hostname} ↗
        </span>
      </div>
    </a>
  );
}
