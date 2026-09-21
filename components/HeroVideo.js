"use client";

import { useEffect, useRef, useState } from "react";

export default function HeroVideo() {
  const videoRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Defer video loading until after first paint so it doesn't block LCP
    const timer = setTimeout(() => setReady(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => {});
  }, [ready]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Static gradient shown immediately — no layout shift */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0F] via-[#111118] to-[#0A0A0F]" />

      {/* Video lazy-loads after first paint */}
      {ready && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-30 transition-opacity duration-1000"
        >
          {/* WebM first — 50–70% smaller than MP4 */}
          <source src="/hero-bg.webm" type="video/webm" />
          {/* MP4 fallback for Safari */}
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0F]/90 via-[#111118]/80 to-[#0A0A0F]/90" />

      {/* Animated grid lines */}
      <div
        className="absolute inset-0 opacity-8"
        style={{
          backgroundImage:
            "linear-gradient(rgba(99,102,241,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.2) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Scanning line */}
      <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#6366F1]/50 to-transparent animate-scan" />

      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-[#6366F1]/25 rounded-tl-3xl" />
      <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-[#6366F1]/25 rounded-tr-3xl" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-[#6366F1]/25 rounded-bl-3xl" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-[#6366F1]/25 rounded-br-3xl" />

      {/* Floating particles */}
      <div className="absolute top-1/4 left-[20%] w-1 h-1 rounded-full bg-[#6366F1] animate-ping opacity-60" />
      <div className="absolute top-2/3 right-1/4 w-1 h-1 rounded-full bg-indigo-400 animate-ping opacity-40" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-3/4 w-1 h-1 rounded-full bg-[#6366F1] animate-ping opacity-50" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 rounded-full bg-violet-400 animate-ping opacity-30" style={{ animationDelay: "0.5s" }} />
    </div>
  );
}
