import { useState, useEffect, useRef } from "react";
import { APPLY_STEPS } from "../../data/careerConstants";
import { FocusInput, Field, FileUpload, PhotoUpload, Btn, ReviewRow } from "./UI";
import StepBar from "./StepBar";
import VideoIntro from "./VideoIntro";
import { useJobs } from "../../hooks/useJobs";

function SuccessScreen({ firstName, role, onBack }) {
  return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-8">🎉</div>
        <h1 className="text-3xl font-bold text-white mb-4 font-display">Application submitted!</h1>
        <p className="text-gray-400 text-base leading-relaxed mb-10">
          Thanks, <span className="text-white font-semibold">{firstName}</span>! We've received your
          application for{" "}
          <span className="text-white font-semibold">{role || "a general role"}</span> and will be in
          touch within 5–7 business days.
        </p>
        <Btn onClick={onBack} variant="blue">← Back to careers</Btn>
      </div>
    </div>
  );
}

const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

export default function ApplyPage({ selectedJob, onBack }) {
  const [step, setStep]               = useState(0);
  const [submitted, setSubmitted]     = useState(false);
  const [submitting, setSubmitting]   = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [errors, setErrors]           = useState({});

  const { jobs: availableJobs, loading: jobsLoading } = useJobs();

  const sessionId = useRef(
    sessionStorage.getItem("apply_session") || (() => {
      const id = crypto.randomUUID();
      sessionStorage.setItem("apply_session", id);
      return id;
    })()
  );

  const detectOS = () => {
    const ua = navigator.userAgent;
    if (/Windows/i.test(ua))          return "Windows";
    if (/iPhone|iPad|iPod/i.test(ua)) return "iOS";
    if (/Android/i.test(ua))          return "Android";
    if (/Mac/i.test(ua))              return "macOS";
    if (/Linux/i.test(ua))            return "Linux";
    return "Unknown";
  };

  const trackStep = (s, extra = {}) => {
    const jobId = selectedJob?.id || null;
    const role  = selectedJob?.title || "";
    fetch(`${API}/api/progress`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: sessionId.current, step: s, role, jobId, ...extra }),
    }).catch(() => {});
  };

  useEffect(() => {
    trackStep(0, { os: detectOS() });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    location: "", linkedin: "", portfolio: "",
    photo: null,
    role: selectedJob?.title || "", resume: null, experience: "", whyUs: "",
    coverLetter: "", salary: "", startDate: "", referral: "", workAuth: "",
    videoBlob: null, videoUrl: null,
    consent: false,
  });

  const set = (key, val) => {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: undefined }));
    if (key === "photo" && val) {
      const fd = new FormData();
      fd.append("sessionId", sessionId.current);
      fd.append("photo", val);
      fetch(`${API}/api/progress/photo`, { method: "POST", body: fd }).catch(() => {});
    }
  };

  const validate = () => {
    const e = {};
    if (step === 0) {
      if (!form.photo)            e.photo     = "Please upload a profile photo";
      if (!form.firstName.trim()) e.firstName = "Required";
      if (!form.lastName.trim())  e.lastName  = "Required";
      if (!form.email.trim())     e.email     = "Required";
      else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    }
    if (step === 1) {
      if (!form.role)       e.role       = "Please select a role";
      if (!form.resume)     e.resume     = "Please upload your resume";
      if (!form.experience) e.experience = "Required";
    }
    if (step === 2) {
      if (!form.videoUrl) e.videoUrl = "Please record a video introduction to continue";
    }
    if (step === 3) {
      if (!form.consent) e.consent = "You must agree to continue";
    }
    return e;
  };

  const next = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    const nextStep = step + 1;
    setStep(nextStep);
    const extra = step === 0
      ? { firstName: form.firstName.trim(), lastName: form.lastName.trim() }
      : {};
    trackStep(nextStep, extra);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const back = () => {
    setStep((s) => s - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }

    setSubmitting(true);
    setSubmitError("");

    try {
      const body = new FormData();
      const textFields = {
        firstName: form.firstName, lastName: form.lastName,
        email: form.email, phone: form.phone,
        location: form.location, linkedin: form.linkedin,
        portfolio: form.portfolio, role: form.role,
        experience: form.experience, whyUs: form.whyUs,
        coverLetter: form.coverLetter, salary: form.salary,
        startDate: form.startDate, referral: form.referral,
        workAuth: form.workAuth,
      };
      Object.entries(textFields).forEach(([k, v]) => body.append(k, v ?? ""));

      const res  = await fetch(`${API}/api/applications`, { method: "POST", body });
      const json = await res.json();

      if (!res.ok) throw new Error(json.error || "Submission failed.");

      fetch(`${API}/api/progress/complete`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: sessionId.current }),
      }).catch(() => {});

      sessionStorage.removeItem("apply_session");
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return <SuccessScreen firstName={form.firstName} role={form.role} onBack={onBack} />;
  }

  const reviewSections = [
    {
      title: "Personal info",
      rows: [
        ["Name",      `${form.firstName} ${form.lastName}`],
        ["Email",     form.email],
        ["Phone",     form.phone],
        ["Location",  form.location],
        ["LinkedIn",  form.linkedin],
        ["Portfolio", form.portfolio],
      ],
    },
    {
      title: "Experience",
      rows: [
        ["Role",       form.role],
        ["Resume",     form.resume?.name],
        ["Experience", form.experience],
        ["Why us",     form.whyUs],
      ],
    },
    {
      title: "Details",
      rows: [
        ["Salary",     form.salary],
        ["Start date", form.startDate],
        ["How found",  form.referral],
        ["Work auth",  form.workAuth],
        ["Video intro", form.videoUrl ? "Recorded ✓" : "Not recorded"],
        ["Cover letter", form.coverLetter
          ? form.coverLetter.slice(0, 120) + (form.coverLetter.length > 120 ? "…" : "")
          : ""],
      ],
    },
  ];

  return (
    <div className="bg-[#0A0A0F] text-white min-h-screen">
      <div className="max-w-xl mx-auto px-4 sm:px-6 py-32">

        {/* Back link */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors mb-10 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          All open roles
        </button>

        <h1 className="text-3xl font-bold text-white mb-1 font-display">Apply to join us</h1>
        <p className="text-sm text-gray-600 mb-10">
          Step {step + 1} of {APPLY_STEPS.length} — {APPLY_STEPS[step]}
        </p>

        <StepBar current={step} />

        {/* ── Step 0 — Your info ───────────────────── */}
        {step === 0 && (
          <>
            <Field label="Profile photo" required error={errors.photo}>
              <PhotoUpload value={form.photo} onChange={(f) => set("photo", f)} />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="First name" required error={errors.firstName}>
                <FocusInput value={form.firstName} onChange={(e) => set("firstName", e.target.value)} placeholder="Jane" />
              </Field>
              <Field label="Last name" required error={errors.lastName}>
                <FocusInput value={form.lastName} onChange={(e) => set("lastName", e.target.value)} placeholder="Smith" />
              </Field>
            </div>
            <Field label="Email address" required error={errors.email}>
              <FocusInput type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="jane@example.com" />
            </Field>
            <Field label="Phone number">
              <FocusInput type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+1 (555) 000-0000" />
            </Field>
            <Field label="Current location">
              <FocusInput value={form.location} onChange={(e) => set("location", e.target.value)} placeholder="City, Country" />
            </Field>
            <Field label="LinkedIn profile">
              <FocusInput value={form.linkedin} onChange={(e) => set("linkedin", e.target.value)} placeholder="https://linkedin.com/in/yourname" />
            </Field>
            <Field label="Portfolio / website">
              <FocusInput value={form.portfolio} onChange={(e) => set("portfolio", e.target.value)} placeholder="https://yoursite.com" />
            </Field>
          </>
        )}

        {/* ── Step 1 — Experience ──────────────────── */}
        {step === 1 && (
          <>
            <Field label="Role you're applying for" required error={errors.role}>
              <FocusInput as="select" value={form.role} onChange={(e) => set("role", e.target.value)}>
                <option value="">Select a role…</option>
                {jobsLoading ? (
                  <option disabled>Loading roles…</option>
                ) : (
                  <>
                    {availableJobs.map((job) => (
                      <option key={job.id} value={job.title}>
                        {job.title} — {job.dept}
                      </option>
                    ))}
                    <option value="General Application">General Application</option>
                  </>
                )}
              </FocusInput>
            </Field>
            <Field label="Resume / CV" required error={errors.resume}>
              <FileUpload value={form.resume} onChange={(f) => set("resume", f)} />
            </Field>
            <Field label="Years of relevant experience" required error={errors.experience}>
              <FocusInput as="select" value={form.experience} onChange={(e) => set("experience", e.target.value)}>
                <option value="">Select…</option>
                {["Less than 1 year", "1–2 years", "3–5 years", "6–10 years", "10+ years"].map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </FocusInput>
            </Field>
            <Field label="Why do you want to work here?">
              <FocusInput
                as="textarea"
                value={form.whyUs}
                onChange={(e) => set("whyUs", e.target.value)}
                placeholder="Tell us what excites you about this role and our mission…"
              />
            </Field>
          </>
        )}

        {/* ── Step 2 — Final details ───────────────── */}
        {step === 2 && (
          <>
            <Field label="Cover letter">
              <FocusInput
                as="textarea"
                value={form.coverLetter}
                onChange={(e) => set("coverLetter", e.target.value)}
                className="min-h-[160px]"
                placeholder="Optional — use this space to tell us anything your resume doesn't…"
              />
            </Field>
            <Field label="Salary expectation">
              <FocusInput
                value={form.salary}
                onChange={(e) => set("salary", e.target.value)}
                placeholder="e.g. $120,000–$140,000 / year"
              />
            </Field>
            <Field label="Earliest start date">
              <FocusInput type="date" value={form.startDate} onChange={(e) => set("startDate", e.target.value)} />
            </Field>
            <Field label="How did you hear about us?">
              <FocusInput as="select" value={form.referral} onChange={(e) => set("referral", e.target.value)}>
                <option value="">Select…</option>
                {["LinkedIn", "Twitter / X", "Friend or colleague", "Job board", "Company blog", "Other"].map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </FocusInput>
            </Field>
            <Field label="Work authorization">
              <FocusInput as="select" value={form.workAuth} onChange={(e) => set("workAuth", e.target.value)}>
                <option value="">Select…</option>
                {["Authorized to work in my country", "Will require sponsorship", "Not sure yet"].map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </FocusInput>
            </Field>
            <Field label="Video introduction">
              <VideoIntro
                value={form.videoUrl}
                onSave={(blob, url) => { set("videoBlob", blob); set("videoUrl", url); }}
                sessionId={sessionId.current}
              />
              {errors.videoUrl && (
                <p className="text-xs text-red-400 mt-1.5">{errors.videoUrl}</p>
              )}
            </Field>
          </>
        )}

        {/* ── Step 3 — Review ─────────────────────── */}
        {step === 3 && (
          <>
            {reviewSections.map((section) => (
              <div key={section.title} className="rounded-2xl border border-white/8 bg-[#111118] p-5 mb-4">
                <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-4">
                  {section.title}
                </p>
                {section.rows.map(([label, value]) => (
                  <ReviewRow key={label} label={label} value={value} />
                ))}
              </div>
            ))}

            {form.videoUrl && (
              <div className="rounded-2xl border border-white/8 bg-[#111118] p-5 mb-4">
                <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-4">
                  Video introduction
                </p>
                <video
                  src={form.videoUrl}
                  controls
                  playsInline
                  className="w-full rounded-xl bg-black max-h-60"
                />
              </div>
            )}

            {/* Consent */}
            <div className="flex gap-3 items-start p-4 rounded-xl border border-[#6366F1]/20 bg-[#6366F1]/5 mb-2">
              <input
                type="checkbox"
                id="consent"
                checked={form.consent}
                onChange={(e) => set("consent", e.target.checked)}
                className="mt-0.5 w-4 h-4 cursor-pointer flex-shrink-0 accent-[#6366F1]"
              />
              <label htmlFor="consent" className="text-xs text-gray-400 leading-relaxed cursor-pointer">
                I confirm the information I've provided is accurate and I agree to Copia Group's{" "}
                <a href="#" className="text-[#6366F1] hover:underline">Privacy Policy</a> regarding the
                processing of my personal data for recruitment purposes.
              </label>
            </div>
            {errors.consent && <p className="text-xs text-red-400 mt-1">{errors.consent}</p>}
          </>
        )}

        {/* ── Navigation ──────────────────────────── */}
        <div className="flex justify-between items-center mt-10 gap-3">
          {step > 0 ? (
            <Btn onClick={back} variant="outline">← Back</Btn>
          ) : (
            <div />
          )}
          {step < APPLY_STEPS.length - 1 ? (
            <Btn onClick={next} variant="blue">Continue →</Btn>
          ) : (
            <Btn onClick={submit} variant="blue" disabled={submitting}>
              {submitting ? "Submitting…" : "Submit application ✓"}
            </Btn>
          )}
        </div>

        {submitError && (
          <p className="text-xs text-red-400 mt-4 text-right">⚠️ {submitError}</p>
        )}

      </div>
    </div>
  );
}
