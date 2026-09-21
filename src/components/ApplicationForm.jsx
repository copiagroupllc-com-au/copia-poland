import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const inputCls = "w-full px-4 py-3 rounded-xl bg-[#16161F] border border-white/8 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#6366F1]/50 focus:ring-1 focus:ring-[#6366F1]/25 transition-colors";
const labelCls = "block text-xs font-medium text-gray-400 mb-1.5";
const Req = () => <span className="text-[#6366F1]"> *</span>;

function StepBar({ step, accent }) {
  const steps = ["Your Info", "Experience", "Final Details", "Review"];
  return (
    <div className="flex items-center mb-10">
      {steps.map((label, i) => {
        const n = i + 1;
        const done = step > n; const active = step === n;
        const color = done || active ? accent : "#374151";
        return (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1.5 min-w-[32px]">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300"
                style={{ borderColor: color, background: done || active ? color : "transparent", color: done || active ? "#fff" : "#6B7280" }}>
                {done ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg> : n}
              </div>
              <span className={`text-xs whitespace-nowrap ${active ? "text-white font-semibold" : "text-gray-600"}`}>{label}</span>
            </div>
            {i < steps.length - 1 && <div className="flex-1 h-px mx-2 mb-5 transition-all duration-300" style={{ background: step > n ? accent : "#1F2937" }} />}
          </div>
        );
      })}
    </div>
  );
}

function PhotoField({ value, onChange, accent }) {
  const ref = useRef(null);
  const [preview, setPreview] = useState(null);
  const handleFile = (file) => {
    if (!file) { onChange(null); setPreview(null); return; }
    onChange(file);
    setPreview(URL.createObjectURL(file));
  };
  useEffect(() => { return () => { if (preview) URL.revokeObjectURL(preview); }; }, [preview]);

  return (
    <div>
      <p className={labelCls}>Profile Photo</p>
      <div className="flex items-center gap-5">
        <div onClick={() => ref.current?.click()}
          className="relative w-20 h-20 rounded-2xl border-2 border-dashed border-white/15 flex items-center justify-center cursor-pointer overflow-hidden hover:border-[#6366F1]/50 transition-colors flex-shrink-0 group"
          style={preview ? { borderStyle: "solid", borderColor: `${accent}60` } : {}}>
          {preview ? (
            <>
              <img src={preview} alt="Profile preview" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
            </>
          ) : (
            <svg className="w-8 h-8 text-gray-600 group-hover:text-gray-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          )}
        </div>
        <div className="flex-1">
          <button type="button" onClick={() => ref.current?.click()} className="px-4 py-2 rounded-xl border border-white/8 bg-[#16161F] text-sm text-gray-300 hover:border-[#6366F1]/40 hover:text-white transition-colors">
            {preview ? "Change Photo" : "Upload Photo"}
          </button>
          {preview && <button type="button" onClick={() => handleFile(null)} className="ml-2 px-4 py-2 rounded-xl border border-white/8 text-sm text-gray-500 hover:text-red-400 hover:border-red-400/30 transition-colors">Remove</button>}
          <p className="text-gray-600 text-xs mt-2">JPG or PNG · max 5 MB · optional</p>
          {value && <p className="text-gray-500 text-xs mt-1 truncate">{value.name}</p>}
        </div>
      </div>
      <input ref={ref} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(e) => handleFile(e.target.files?.[0] || null)} />
    </div>
  );
}

function VideoRecordModal({ onClose, onSave, accent }) {
  const videoRef = useRef(null);
  const mediaRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);
  const [phase, setPhase] = useState("guide");
  const [elapsed, setElapsed] = useState(0);
  const [recorded, setRecorded] = useState(null);
  const [camError, setCamError] = useState(null);
  const MAX = 120;

  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
      if (mediaRef.current) mediaRef.current.getTracks().forEach((t) => t.stop());
      if (recorded?.url) URL.revokeObjectURL(recorded.url);
    };
  }, [recorded]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const h = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", h);
    return () => { document.body.style.overflow = ""; document.removeEventListener("keydown", h); };
  }, [onClose]);

  const startPreview = async () => {
    setCamError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      mediaRef.current = stream;
      if (videoRef.current) { videoRef.current.srcObject = stream; videoRef.current.muted = true; }
      setPhase("preview");
    } catch { setCamError("Camera/microphone access was denied. Please allow access in your browser settings and try again."); }
  };

  const startRecording = () => {
    chunksRef.current = [];
    const recorder = new MediaRecorder(mediaRef.current, { mimeType: "video/webm" });
    mediaRef.current._recorder = recorder;
    recorder.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      setRecorded({ blob, url });
      if (videoRef.current) { videoRef.current.srcObject = null; videoRef.current.src = url; videoRef.current.muted = false; }
      setPhase("review");
    };
    recorder.start();
    setElapsed(0);
    setPhase("recording");
    timerRef.current = setInterval(() => {
      setElapsed((s) => { if (s + 1 >= MAX) { stopRecording(); return MAX; } return s + 1; });
    }, 1000);
  };

  const stopRecording = () => {
    clearInterval(timerRef.current);
    if (mediaRef.current?._recorder?.state === "recording") mediaRef.current._recorder.stop();
    mediaRef.current?.getTracks().forEach((t) => t.stop());
  };

  const retake = async () => {
    if (recorded?.url) URL.revokeObjectURL(recorded.url);
    setRecorded(null); setElapsed(0);
    await startPreview();
  };

  const save = () => {
    if (!recorded) return;
    onSave(new File([recorded.blob], "video-introduction.webm", { type: "video/webm" }));
    onClose();
  };

  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="relative w-full max-w-xl bg-[#111118] border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-7 py-5 border-b border-white/8">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase mb-0.5" style={{ color: accent }}>Video Introduction</p>
            <h2 className="text-lg font-bold text-white font-display">
              {phase === "guide" && "How to Record Your Intro"}
              {phase === "preview" && "Camera Preview"}
              {phase === "recording" && "Recording…"}
              {phase === "review" && "Review Your Recording"}
            </h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/8 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="p-7">
          {phase === "guide" && (
            <>
              <p className="text-gray-400 text-sm mb-6">A short video introduction helps our hiring team get to know you beyond your CV. Here's how to make a great one:</p>
              <div className="flex flex-col gap-4 mb-6">
                {[
                  { n: "01", title: "Keep it 60–90 seconds", desc: "Introduce yourself, your background, and what excites you about this role. Don't go over 2 minutes." },
                  { n: "02", title: "Find good lighting", desc: "Face a window or a lamp. Avoid sitting with a bright background — it will make you look dark on camera." },
                  { n: "03", title: "Speak clearly and naturally", desc: "Look at the camera, not the screen. Speak at a natural pace — you don't need to rush." },
                  { n: "04", title: "What to say", desc: "Your name → current role → 1–2 career highlights → why Copia Group → what you'd bring to the team." },
                  { n: "05", title: "Quiet environment", desc: "Record somewhere without background noise. Headphones with a mic work well if available." },
                ].map(({ n, title, desc }) => (
                  <div key={n} className="flex gap-4">
                    <span className="text-xs font-bold mt-0.5 flex-shrink-0" style={{ color: accent }}>{n}</span>
                    <div><p className="text-white text-sm font-semibold">{title}</p><p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{desc}</p></div>
                  </div>
                ))}
              </div>
              {camError && <div className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">{camError}</div>}
              <button onClick={startPreview} className="w-full py-3 rounded-full font-bold text-sm text-white transition-colors" style={{ background: accent }}>I'm Ready — Start Camera</button>
            </>
          )}
          {(phase === "preview" || phase === "recording" || phase === "review") && (
            <>
              <div className="relative rounded-2xl overflow-hidden bg-black mb-5" style={{ aspectRatio: "16/9" }}>
                <video ref={videoRef} autoPlay playsInline controls={phase === "review"} className="w-full h-full object-cover" />
                {phase === "recording" && (
                  <>
                    <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-white text-xs font-bold">{fmt(elapsed)}</span>
                      <span className="text-gray-400 text-xs">/ {fmt(MAX)}</span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                      <div className="h-full bg-red-500 transition-all duration-1000" style={{ width: `${(elapsed / MAX) * 100}%` }} />
                    </div>
                  </>
                )}
              </div>
              {phase === "preview" && (
                <div className="flex flex-col gap-3">
                  <p className="text-gray-500 text-xs text-center">Check your camera and microphone are working, then hit Record.</p>
                  <button onClick={startRecording} className="w-full py-3 rounded-full font-bold text-sm text-white flex items-center justify-center gap-2 transition-colors" style={{ background: accent }}>
                    <span className="w-3 h-3 rounded-full bg-white/80" /> Start Recording
                  </button>
                </div>
              )}
              {phase === "recording" && (
                <div className="flex flex-col gap-3">
                  <p className="text-gray-500 text-xs text-center">Recording in progress — click Stop when you're done.</p>
                  <button onClick={stopRecording} className="w-full py-3 rounded-full font-bold text-sm text-white flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 transition-colors">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="1" /></svg>
                    Stop Recording
                  </button>
                </div>
              )}
              {phase === "review" && (
                <div className="flex flex-col gap-3">
                  <p className="text-gray-500 text-xs text-center">Watch your recording above. Happy with it? Save it to your application.</p>
                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={retake} className="py-3 rounded-full font-semibold text-sm border border-white/15 text-gray-400 hover:text-white hover:border-white/30 transition-colors">Re-record</button>
                    <button onClick={save} className="py-3 rounded-full font-bold text-sm text-white transition-colors" style={{ background: accent }}>Save &amp; Use This</button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function FileField({ id, label, accept, hint, value, onChange }) {
  const ref = useRef(null);
  return (
    <div>
      <p className={labelCls}>{label}</p>
      <div onClick={() => ref.current?.click()} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#16161F] border border-white/8 cursor-pointer hover:border-[#6366F1]/40 transition-colors">
        <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
        <span className={`text-sm truncate ${value ? "text-white" : "text-gray-600"}`}>{value ? value.name : hint}</span>
        {value && <button type="button" onClick={(e) => { e.stopPropagation(); onChange(null); }} className="ml-auto text-gray-600 hover:text-white text-xs">✕</button>}
      </div>
      <input ref={ref} id={id} type="file" accept={accept} className="hidden" onChange={(e) => onChange(e.target.files?.[0] || null)} />
    </div>
  );
}

function ReviewRow({ label, value }) {
  if (!value) return null;
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-1 py-3 border-b border-white/5 last:border-0">
      <span className="text-xs text-gray-500 sm:w-44 flex-shrink-0 uppercase tracking-wider">{label}</span>
      <span className="text-sm text-white break-words">{value}</span>
    </div>
  );
}

export default function ApplicationForm({ role, accent }) {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [showVideo, setShowVideo] = useState(false);
  const [info, setInfo]   = useState({ photo: null, name: "", email: "", phone: "", location: "", linkedin: "", portfolio: "" });
  const [exp, setExp]     = useState({ position: "", cv: null, experience: "", motivation: "" });
  const [final, setFinal] = useState({ coverLetter: "", salary: "", startDate: "", referral: "", workAuth: "", video: null });

  const validate = (s) => {
    const e = {};
    if (s === 1) {
      if (!info.name.trim()) e.name = "Full name is required";
      if (!info.email.trim()) e.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(info.email)) e.email = "Enter a valid email";
      if (!info.phone.trim()) e.phone = "Phone number is required";
      if (!info.location.trim()) e.location = "Location is required";
    }
    if (s === 2) {
      if (!exp.position.trim()) e.position = "Current/last position is required";
      if (!exp.cv) e.cv = "Please upload your CV";
      if (!exp.experience) e.experience = "Years of experience is required";
      if (!exp.motivation.trim()) e.motivation = "Please tell us your motivation";
    }
    if (s === 3) {
      if (!final.coverLetter.trim()) e.coverLetter = "Cover letter is required";
      if (!final.workAuth) e.workAuth = "Work authorisation is required";
      if (!final.video) e.video = "A video introduction is required";
    }
    return e;
  };

  const next = () => {
    const e = validate(step);
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({}); setStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const back = () => { setErrors({}); setStep((s) => s - 1); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const err = (f) => errors[f] ? <p className="text-red-400 text-xs mt-1">{errors[f]}</p> : null;

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const subject = encodeURIComponent(`Job Application — ${role}`);
      const body = encodeURIComponent([
        `Role: ${role}`, "",
        `── Personal Info ──`,
        `Name: ${info.name}`, `Email: ${info.email}`, `Phone: ${info.phone}`, `Location: ${info.location}`,
        `LinkedIn: ${info.linkedin}`, `Portfolio: ${info.portfolio}`, "",
        `── Experience ──`,
        `Current / Last Position: ${exp.position}`, `Years of Experience: ${exp.experience}`,
        `Motivation: ${exp.motivation}`, `CV File: ${exp.cv?.name || "not attached"}`, "",
        `── Final Details ──`,
        `Cover Letter: ${final.coverLetter}`, `Salary Expectation: ${final.salary}`,
        `Available From: ${final.startDate}`, `Referral Source: ${final.referral}`,
        `Work Authorization: ${final.workAuth}`, `Video Intro: ${final.video?.name || "not attached"}`,
      ].join("\n"));
      window.location.href = `mailto:contact@copiagroupllc.com.au?subject=${subject}&body=${body}`;
      setSubmitted(true);
    } catch { setSubmitted(true); }
    finally { setSubmitting(false); }
  };

  if (submitted) {
    return (
      <div className="p-10 rounded-3xl border border-white/8 bg-[#111118] text-center">
        <div className="text-6xl mb-5">🎉</div>
        <h2 className="text-2xl font-bold text-white mb-3 font-display">Application Submitted!</h2>
        <p className="text-gray-400 text-sm leading-relaxed max-w-md mx-auto mb-8">
          Your application for <span className="text-white font-semibold">{role}</span> has been sent. We'll be in touch within 3–5 business days.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="https://calendly.com/24-7-hire" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white" style={{ background: accent }}>
            Book an Interview
          </a>
          <Link to="/career" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/15 text-gray-400 text-sm hover:text-white transition-colors">View All Roles</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {showVideo && (
        <VideoRecordModal accent={accent} onClose={() => setShowVideo(false)}
          onSave={(file) => {
            setFinal((p) => ({ ...p, video: file }));
            if (errors.video) setErrors((e) => { const n = { ...e }; delete n.video; return n; });
          }} />
      )}
      <div className="rounded-3xl border border-white/8 bg-[#111118] p-8 sm:p-10">
        <StepBar step={step} accent={accent} />

        {/* Step 1 */}
        {step === 1 && (
          <div className="flex flex-col gap-5">
            <h2 className="text-xl font-bold text-white font-display">Your Information</h2>
            <PhotoField value={info.photo} accent={accent} onChange={(f) => setInfo((p) => ({ ...p, photo: f }))} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div><label className={labelCls}>Full Name<Req /></label><input className={inputCls} placeholder="Jane Smith" value={info.name} onChange={(e) => setInfo((p) => ({ ...p, name: e.target.value }))} />{err("name")}</div>
              <div><label className={labelCls}>Email Address<Req /></label><input className={inputCls} type="email" placeholder="jane@company.com" value={info.email} onChange={(e) => setInfo((p) => ({ ...p, email: e.target.value }))} />{err("email")}</div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div><label className={labelCls}>Phone Number<Req /></label><input className={inputCls} type="tel" placeholder="+61 400 000 000" value={info.phone} onChange={(e) => setInfo((p) => ({ ...p, phone: e.target.value }))} />{err("phone")}</div>
              <div><label className={labelCls}>Location<Req /></label><input className={inputCls} placeholder="Sydney, NSW, Australia" value={info.location} onChange={(e) => setInfo((p) => ({ ...p, location: e.target.value }))} />{err("location")}</div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div><label className={labelCls}>LinkedIn URL</label><input className={inputCls} type="url" placeholder="https://linkedin.com/in/your-profile" value={info.linkedin} onChange={(e) => setInfo((p) => ({ ...p, linkedin: e.target.value }))} /></div>
              <div><label className={labelCls}>Portfolio / Website</label><input className={inputCls} type="url" placeholder="https://yourportfolio.com" value={info.portfolio} onChange={(e) => setInfo((p) => ({ ...p, portfolio: e.target.value }))} /></div>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="flex flex-col gap-5">
            <h2 className="text-xl font-bold text-white font-display">Your Experience</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div><label className={labelCls}>Current / Last Position<Req /></label><input className={inputCls} placeholder="Senior Software Engineer" value={exp.position} onChange={(e) => setExp((p) => ({ ...p, position: e.target.value }))} />{err("position")}</div>
              <div>
                <label className={labelCls}>Years of Experience<Req /></label>
                <select className={inputCls} value={exp.experience} onChange={(e) => setExp((p) => ({ ...p, experience: e.target.value }))}>
                  <option value="" disabled className="bg-[#16161F]">Select range</option>
                  {["0–1 years","1–2 years","2–4 years","4–6 years","6–10 years","10+ years"].map((o) => <option key={o} value={o} className="bg-[#16161F]">{o}</option>)}
                </select>
                {err("experience")}
              </div>
            </div>
            <div><FileField id="cv" label={<>CV / Resume<Req /></>} accept=".pdf,.doc,.docx" hint="Upload your CV (PDF or Word)" value={exp.cv} onChange={(f) => setExp((p) => ({ ...p, cv: f }))} />{err("cv")}</div>
            <div>
              <label className={labelCls}>Why do you want to join Copia Group?<Req /></label>
              <textarea className={`${inputCls} resize-none`} rows={5} placeholder="Tell us what excites you about this role and why you'd be a great fit..." value={exp.motivation} onChange={(e) => setExp((p) => ({ ...p, motivation: e.target.value }))} />
              {err("motivation")}
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="flex flex-col gap-5">
            <h2 className="text-xl font-bold text-white font-display">Final Details</h2>
            <div>
              <label className={labelCls}>Cover Letter<Req /></label>
              <textarea className={`${inputCls} resize-none`} rows={6} placeholder="Introduce yourself and highlight what makes you the right candidate..." value={final.coverLetter} onChange={(e) => setFinal((p) => ({ ...p, coverLetter: e.target.value }))} />
              {err("coverLetter")}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div><label className={labelCls}>Salary Expectation (AUD / year)</label><input className={inputCls} placeholder="e.g. $120,000 – $140,000" value={final.salary} onChange={(e) => setFinal((p) => ({ ...p, salary: e.target.value }))} /></div>
              <div><label className={labelCls}>Earliest Start Date</label><input className={inputCls} type="date" value={final.startDate} style={{ colorScheme: "dark" }} onChange={(e) => setFinal((p) => ({ ...p, startDate: e.target.value }))} /></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelCls}>How did you hear about us?</label>
                <select className={inputCls} value={final.referral} onChange={(e) => setFinal((p) => ({ ...p, referral: e.target.value }))}>
                  <option value="" disabled className="bg-[#16161F]">Select source</option>
                  {["LinkedIn","Indeed","Seek","Company Website","Referral","GitHub","Twitter / X","Other"].map((o) => <option key={o} value={o} className="bg-[#16161F]">{o}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls}>Work Authorisation<Req /></label>
                <select className={inputCls} value={final.workAuth} onChange={(e) => setFinal((p) => ({ ...p, workAuth: e.target.value }))}>
                  <option value="" disabled className="bg-[#16161F]">Select status</option>
                  {["Australian Citizen","Australian Permanent Resident","New Zealand Citizen","Valid Work Visa (sponsored)","Require Visa Sponsorship"].map((o) => <option key={o} value={o} className="bg-[#16161F]">{o}</option>)}
                </select>
                {err("workAuth")}
              </div>
            </div>
            <div>
              <label className={labelCls}>Video Introduction<Req /></label>
              {final.video ? (
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#16161F] border border-white/8" style={{ borderColor: `${accent}40` }}>
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke={accent} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.362a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" /></svg>
                  <span className="text-sm text-white truncate flex-1">{final.video.name}</span>
                  <span className="text-xs text-gray-500">{(final.video.size / (1024 * 1024)).toFixed(1)} MB</span>
                  <button type="button" onClick={() => setShowVideo(true)} className="text-xs px-3 py-1 rounded-full border border-white/15 text-gray-400 hover:text-white hover:border-white/30 transition-colors flex-shrink-0">Re-record</button>
                </div>
              ) : (
                <button type="button" onClick={() => setShowVideo(true)} className="w-full flex items-center justify-center gap-3 px-4 py-4 rounded-xl border border-dashed border-white/15 hover:border-[#6366F1]/50 transition-colors group">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: `${accent}18` }}>
                    <svg className="w-5 h-5" fill="none" stroke={accent} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.362a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" /></svg>
                  </div>
                  <div className="text-left">
                    <p className="text-white text-sm font-semibold group-hover:text-[#6366F1] transition-colors">Start Recording</p>
                    <p className="text-gray-600 text-xs">60–90 second intro · uses your camera &amp; microphone</p>
                  </div>
                </button>
              )}
              {err("video")}
            </div>
          </div>
        )}

        {/* Step 4 Review */}
        {step === 4 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-bold text-white font-display">Review Your Application</h2>
            <p className="text-gray-500 text-sm -mt-3">Check everything looks right. Use Edit to go back to any section.</p>
            {[
              { title: "Your Information", goTo: 1, rows: [["Photo", info.photo?.name],["Full Name",info.name],["Email",info.email],["Phone",info.phone],["Location",info.location],["LinkedIn",info.linkedin],["Portfolio",info.portfolio]] },
              { title: "Experience",        goTo: 2, rows: [["Position",exp.position],["CV / Resume",exp.cv?.name],["Experience",exp.experience],["Motivation",exp.motivation]] },
              { title: "Final Details",     goTo: 3, rows: [["Cover Letter",final.coverLetter],["Salary",final.salary],["Start Date",final.startDate],["Referral",final.referral],["Work Auth",final.workAuth],["Video Intro",final.video?.name]] },
            ].map(({ title, goTo, rows }) => (
              <div key={title} className="rounded-2xl border border-white/8 bg-[#16161F] overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                  <h3 className="text-sm font-semibold text-white">{title}</h3>
                  <button onClick={() => setStep(goTo)} className="text-xs hover:underline" style={{ color: accent }}>Edit</button>
                </div>
                <div className="px-6 py-2">{rows.map(([l, v]) => <ReviewRow key={l} label={l} value={v} />)}</div>
              </div>
            ))}
            <div className="p-5 rounded-2xl border border-[#6366F1]/20 bg-[#6366F1]/5">
              <p className="text-gray-400 text-sm">By submitting you agree that Copia Group may store and process your data for recruitment purposes. Your information will not be shared with third parties.</p>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/8">
          {step > 1 ? (
            <button onClick={back} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 text-gray-400 text-sm hover:text-white hover:border-white/30 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>Back
            </button>
          ) : (
            <Link to="/career" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 text-gray-400 text-sm hover:text-white hover:border-white/30 transition-colors">Cancel</Link>
          )}
          {step < 4 ? (
            <button onClick={next} className="inline-flex items-center gap-2 px-7 py-2.5 rounded-full font-bold text-sm text-white transition-colors" style={{ background: accent }}>
              Continue <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={submitting}
              className="inline-flex items-center gap-2 px-7 py-2.5 rounded-full font-bold text-sm text-white disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-lg"
              style={{ background: accent, boxShadow: `0 4px 20px ${accent}40` }}>
              {submitting ? (
                <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>Submitting...</>
              ) : (
                <>Submit Application <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg></>
              )}
            </button>
          )}
        </div>
      </div>
    </>
  );
}
