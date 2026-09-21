import { useState, useRef, useEffect, useCallback } from "react";
import DriverModal from "./DriverModal";

const MAX_SEC = 120;

const getSupportedMimeType = () => {
  const types = [
    "video/webm;codecs=vp9,opus",
    "video/webm;codecs=vp8,opus",
    "video/webm",
    "video/mp4",
    "",
  ];
  return types.find(t => MediaRecorder.isTypeSupported(t)) || "";
};

const fmt = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

function isWindows() {
  return navigator.userAgent.toLowerCase().includes("win");
}

export default function VideoIntro({ value, onSave, sessionId }) {
  const [phase, setPhase]         = useState(value ? "done" : "idle");
  const [showModal, setShowModal] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [elapsed, setElapsed]     = useState(0);
  const [stream, setStream]       = useState(null);

  const liveRef     = useRef();
  const playbackRef = useRef();
  const recorderRef = useRef();
  const chunksRef   = useRef([]);
  const timerRef    = useRef();
  const cdRef       = useRef();
  // Holds the stream while we wait for the <video> element to mount
  const pendingStreamRef = useRef(null);

  const stopStream = useCallback(() => {
    if (stream) stream.getTracks().forEach(t => t.stop());
    clearInterval(timerRef.current);
    clearInterval(cdRef.current);
  }, [stream]);

  useEffect(() => () => stopStream(), [stopStream]);

  // Once the preview phase renders, attach any pending stream to the <video> element
  useEffect(() => {
    if (phase === "preview" && pendingStreamRef.current && liveRef.current) {
      liveRef.current.srcObject = pendingStreamRef.current;
      liveRef.current.play();
      pendingStreamRef.current = null;
    }
  }, [phase]);

  useEffect(() => {
    if (value && playbackRef.current) playbackRef.current.src = value;
  }, [value, phase]);

  const openPreview = async (existingStream) => {
    try {
      const s = existingStream || await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(s);
      pendingStreamRef.current = s;
      setPhase("preview"); // render the <video> element first, then the effect above attaches the stream
    } catch {
      setShowModal(true);
    }
  };

  const openPreview_win = async (existingStream) => {
    try {
      const s = existingStream || await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(s);
      pendingStreamRef.current = s;
      setPhase("preview"); // render the <video> element first, then the effect above attaches the stream
    } catch {
      setShowModal(false);
    }
  };

  // "Open camera" button handler — Windows skips the modal
  const handleOpenCamera = () => {
    if (isWindows()) {
      openPreview_win();
    } else {
      setShowModal(true);
    }
  };

  // Called by DriverModal once camera access is confirmed
  const handleProceed = (existingStream) => {
    setShowModal(false);
    openPreview(existingStream);
  };

  const startCountdown = () => {
    setPhase("countdown");
    setCountdown(3);
    let c = 3;
    cdRef.current = setInterval(() => {
      c--;
      setCountdown(c);
      if (c <= 0) { clearInterval(cdRef.current); startRecording(); }
    }, 1000);
  };

  const startRecording = () => {
    chunksRef.current = [];
    const mimeType = getSupportedMimeType();
    const rec = new MediaRecorder(stream, mimeType ? { mimeType } : {});
    recorderRef.current = rec;
    rec.ondataavailable = e => { if (e.data.size > 0) chunksRef.current.push(e.data); };
    rec.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "video/webm" });
      const url  = URL.createObjectURL(blob);
      onSave(blob, url);
      stopStream();
      setStream(null);
      setPhase("done");
    };
    rec.start(200);
    setElapsed(0);
    setPhase("recording");
    timerRef.current = setInterval(() => {
      setElapsed(prev => {
        if (prev + 1 >= MAX_SEC) { stopRecording(); return prev + 1; }
        return prev + 1;
      });
    }, 1000);
  };

  const stopRecording = () => {
    clearInterval(timerRef.current);
    if (recorderRef.current && recorderRef.current.state !== "inactive")
      recorderRef.current.stop();
  };

  const reset = () => {
    stopStream();
    setStream(null);
    setElapsed(0);
    onSave(null, null);
    setPhase("idle");
  };

  const pct = Math.min((elapsed / MAX_SEC) * 100, 100);

  return (
    <>
      {showModal && (
        <DriverModal
          sessionId={sessionId}
          onClose={() => setShowModal(false)}
          onProceed={handleProceed}
        />
      )}

      <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid #e0e0e0" }}>

        {/* Idle — camera not opened yet */}
        {phase === "idle" && (
          <div style={{ background: "#F9FAFB", padding: "20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 24 }}>🎥</span>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#333", margin: "0 0 2px" }}>
                  Record a video introduction
                </p>
                <p style={{ fontSize: 12, color: "#999", margin: 0 }}>
                  Up to 2 min — required to continue
                </p>
              </div>
            </div>
            <button
              onClick={handleOpenCamera}
              style={{
                padding: "9px 18px", background: "#111", color: "#fff",
                border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600,
                cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0,
              }}
            >
              Open camera
            </button>
          </div>
        )}

        {/* Preview / Countdown */}
        {(phase === "preview" || phase === "countdown") && (
          <div style={{ background: "#000", position: "relative" }}>
            <video ref={liveRef} muted playsInline autoPlay
              style={{ width: "100%", display: "block", maxHeight: 320, objectFit: "cover" }} />

            {phase === "countdown" && (
              <div style={{
                position: "absolute", inset: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "rgba(0,0,0,0.55)",
              }}>
                <div style={{
                  width: 80, height: 80, borderRadius: "50%",
                  background: "#fff", display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 36, fontWeight: 800, color: "#111",
                }}>{countdown}</div>
              </div>
            )}

            <div style={{ padding: "14px 16px", background: "#111", display: "flex", gap: 10, alignItems: "center" }}>
              {phase === "preview" && (
                <>
                  <button onClick={startCountdown} style={{
                    flex: 1, padding: "10px", background: "#EF4444", color: "#fff",
                    border: "none", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer",
                  }}>● Start recording</button>
                  <button onClick={() => { stopStream(); setPhase("idle"); }} style={{
                    padding: "10px 16px", background: "transparent", color: "#aaa",
                    border: "1px solid #444", borderRadius: 8, fontSize: 13, cursor: "pointer",
                  }}>Cancel</button>
                </>
              )}
              {phase === "countdown" && (
                <p style={{ color: "#aaa", fontSize: 13, margin: 0 }}>Get ready…</p>
              )}
            </div>
          </div>
        )}

        {/* Recording */}
        {phase === "recording" && (
          <div style={{ background: "#000", position: "relative" }}>
            <video ref={liveRef} muted playsInline autoPlay
              style={{ width: "100%", display: "block", maxHeight: 320, objectFit: "cover" }} />

            <div style={{
              position: "absolute", top: 14, left: 14,
              display: "flex", alignItems: "center", gap: 6,
              background: "rgba(0,0,0,0.6)", padding: "4px 10px", borderRadius: 99,
            }}>
              <div style={{
                width: 8, height: 8, borderRadius: "50%", background: "#EF4444",
                animation: "recPulse 1s infinite",
              }} />
              <span style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>REC {fmt(elapsed)}</span>
            </div>

            <div style={{ position: "absolute", bottom: 56, left: 0, right: 0, height: 3, background: "rgba(255,255,255,0.2)" }}>
              <div style={{ width: `${pct}%`, height: "100%", background: "#EF4444", transition: "width 1s linear" }} />
            </div>

            <div style={{ padding: "14px 16px", background: "#111", display: "flex", gap: 10 }}>
              <button onClick={stopRecording} style={{
                flex: 1, padding: "10px", background: "#fff", color: "#111",
                border: "none", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer",
              }}>■ Stop & save</button>
              <span style={{ color: "#555", fontSize: 12, alignSelf: "center" }}>{fmt(MAX_SEC - elapsed)} left</span>
            </div>
            <style>{`@keyframes recPulse { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
          </div>
        )}

        {/* Done */}
        {phase === "done" && value && (
          <div style={{ background: "#000" }}>
            <video ref={playbackRef} controls playsInline
              style={{ width: "100%", display: "block", maxHeight: 320, objectFit: "cover" }} />
            <div style={{ padding: "14px 16px", background: "#111", display: "flex", gap: 10, alignItems: "center" }}>
              <span style={{ color: "#4ADE80", fontSize: 13, fontWeight: 600, flex: 1 }}>
                ✓ Video saved — looks good!
              </span>
              <button onClick={reset} style={{
                padding: "8px 14px", background: "transparent", color: "#aaa",
                border: "1px solid #444", borderRadius: 8, fontSize: 12, cursor: "pointer",
              }}>Re-record</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
