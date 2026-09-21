import { useState, useRef } from "react";

// ── Base classes ────────────────────────────────────────────────────────────

const INPUT_BASE =
  "w-full px-4 py-3 rounded-xl text-sm text-white bg-[#16161F] border border-white/10 outline-none transition-colors placeholder:text-gray-600 focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1]/30";

// ── FocusInput ──────────────────────────────────────────────────────────────

export function FocusInput({ as: Tag = "input", className = "", ...props }) {
  return (
    <Tag
      {...props}
      className={`${INPUT_BASE} ${Tag === "textarea" ? "resize-y min-h-[120px] leading-relaxed" : ""} ${Tag === "select" ? "cursor-pointer" : ""} ${className}`}
    />
  );
}

// ── Field ───────────────────────────────────────────────────────────────────

export function Field({ label, required, error, children }) {
  return (
    <div className="mb-5">
      <label className="block text-sm font-semibold text-gray-300 mb-2">
        {label}{" "}
        {required && <span className="text-red-400">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-red-400 mt-1.5">{error}</p>}
    </div>
  );
}

// ── FileUpload ──────────────────────────────────────────────────────────────

export function FileUpload({ value, onChange }) {
  const ref = useRef();
  return (
    <div
      onClick={() => ref.current.click()}
      className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
        value
          ? "border-[#6366F1]/40 bg-[#6366F1]/8"
          : "border-white/10 bg-[#16161F] hover:border-white/20"
      }`}
    >
      <input
        ref={ref}
        type="file"
        accept=".pdf,.doc,.docx"
        className="hidden"
        onChange={(e) => onChange(e.target.files[0])}
      />
      {value ? (
        <>
          <div className="text-2xl mb-2">✅</div>
          <div className="text-sm font-semibold text-[#6366F1]">{value.name}</div>
          <div className="text-xs text-gray-600 mt-1">Click to replace</div>
        </>
      ) : (
        <>
          <div className="text-2xl mb-2">📎</div>
          <div className="text-sm font-semibold text-gray-400">Upload your resume</div>
          <div className="text-xs text-gray-600 mt-1">PDF, DOC, DOCX — max 5 MB</div>
        </>
      )}
    </div>
  );
}

// ── PhotoUpload ─────────────────────────────────────────────────────────────

export function PhotoUpload({ value, onChange }) {
  const ref = useRef();
  const previewUrl = value ? URL.createObjectURL(value) : null;
  return (
    <div className="flex items-center gap-5">
      {/* Avatar preview */}
      <div
        onClick={() => ref.current.click()}
        className="w-20 h-20 rounded-full flex-shrink-0 border-2 border-dashed border-white/15 bg-[#16161F] flex items-center justify-center cursor-pointer overflow-hidden hover:border-[#6366F1]/40 transition-colors"
      >
        {previewUrl ? (
          <img src={previewUrl} alt="Photo preview" className="w-full h-full object-cover" />
        ) : (
          <span className="text-3xl">🧑</span>
        )}
      </div>
      {/* Label + button */}
      <div>
        <p className="text-sm font-semibold text-gray-300 mb-0.5">
          {value ? value.name : "Profile photo"}
        </p>
        <p className="text-xs text-gray-600 mb-3">JPG, PNG, WEBP — max 500 KB</p>
        <button
          type="button"
          onClick={() => ref.current.click()}
          className="px-4 py-2 bg-[#6366F1] text-white text-xs font-bold rounded-lg hover:bg-indigo-400 transition-colors"
        >
          {value ? "Change photo" : "Upload photo"}
        </button>
      </div>
      <input
        ref={ref}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files[0];
          if (!file) return;
          const allowed = ["image/jpeg", "image/png", "image/webp"];
          if (!allowed.includes(file.type)) {
            alert("Only JPG, PNG, or WEBP files are allowed.");
            e.target.value = "";
            return;
          }
          if (file.size > 500 * 1024) {
            alert("Photo must be under 500 KB. Please choose a smaller image.");
            e.target.value = "";
            return;
          }
          onChange(file);
        }}
      />
    </div>
  );
}

// ── Btn ─────────────────────────────────────────────────────────────────────

const BTN_VARIANTS = {
  primary: "bg-white text-[#0A0A0F] hover:bg-gray-200",
  blue:    "bg-[#6366F1] text-white hover:bg-indigo-400 shadow-lg shadow-indigo-500/25",
  outline: "bg-transparent text-gray-400 border border-white/15 hover:bg-white/5 hover:text-white hover:border-white/25",
};

export function Btn({ children, onClick, variant = "primary", style, disabled }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={style}
      className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-200 ${BTN_VARIANTS[variant]} ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      {children}
    </button>
  );
}

// ── ReviewRow ───────────────────────────────────────────────────────────────

export function ReviewRow({ label, value }) {
  if (!value) return null;
  return (
    <div className="flex gap-4 py-3 border-b border-white/8 last:border-0">
      <div className="text-xs text-gray-500 w-36 flex-shrink-0">{label}</div>
      <div className="text-sm text-gray-300 break-words">{value}</div>
    </div>
  );
}
