import { useEffect, useRef } from "react";

export default function HeroVideo() {
  const videoRef = useRef(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => {});
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <video ref={videoRef} autoPlay muted loop playsInline aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-30">
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0F]/90 via-[#111118]/80 to-[#0A0A0F]/90" />
      <div className="absolute inset-0 opacity-8" style={{ backgroundImage: "linear-gradient(rgba(99,102,241,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.2) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
      <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#6366F1]/50 to-transparent animate-scan" />
      <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-[#6366F1]/25 rounded-tl-3xl" />
      <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-[#6366F1]/25 rounded-tr-3xl" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-[#6366F1]/25 rounded-bl-3xl" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-[#6366F1]/25 rounded-br-3xl" />
      <div className="absolute top-1/4 left-[20%] w-1 h-1 rounded-full bg-[#6366F1] animate-ping opacity-60" />
      <div className="absolute top-2/3 right-1/4 w-1 h-1 rounded-full bg-indigo-400 animate-ping opacity-40" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-3/4 w-1 h-1 rounded-full bg-[#6366F1] animate-ping opacity-50" style={{ animationDelay: "2s" }} />
    </div>
  );
}
