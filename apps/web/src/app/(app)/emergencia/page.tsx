"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { EmergencyAnalysis } from "@sem-recaida/shared";
import { EMOTION_SOURCE_LABELS, RISK_LABELS } from "@sem-recaida/shared";

export default function EmergenciaPage() {
  const router = useRouter();
  const [step, setStep] = useState<"input" | "analyzing" | "result">("input");
  const [draftMessage, setDraftMessage] = useState("");
  const [analysis, setAnalysis] = useState<EmergencyAnalysis | null>(null);

  async function handleAnalyze() {
    if (!draftMessage.trim()) return;
    setStep("analyzing");
    try {
      const res = await fetch("/api/emergencia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ draftMessage }),
      });
      const data = await res.json();
      if (data.analysis) setAnalysis(data.analysis);
      setStep("result");
    } catch { setStep("input"); }
  }

  return (
    <div className="space-y-6 pb-4">
      {/* Header */}
      <div className="text-center animate-in">
        <div className="relative inline-block mb-3">
          <span
            className="text-6xl block"
            style={{
              filter: "drop-shadow(0 0 30px rgba(239, 68, 68, 0.5))",
              animation: "pulse-emergency 2s ease-in-out infinite",
            }}
          >
            ⚡
          </span>
          <div
            className="absolute inset-0 -m-8 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(239, 68, 68, 0.08) 0%, transparent 70%)",
              animation: "pulse-emergency 2s ease-in-out infinite",
            }}
          />
        </div>
        <h1 className="text-3xl font-bold text-red-400 tracking-wider">
          Emergência
        </h1>
        <p className="text-[var(--color-text-muted)] text-sm mt-2" style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}>
          Antes de mandar aquela mensagem, cole ela aqui
        </p>
      </div>

      {/* Input */}
      {step === "input" && (
        <div className="space-y-4 animate-in animate-in-delay-2">
          <textarea
            value={draftMessage}
            onChange={(e) => setDraftMessage(e.target.value)}
            className="textarea-mystic"
            style={{ borderColor: "rgba(239, 68, 68, 0.15)", minHeight: "180px" }}
            placeholder="Cole aqui a mensagem que você queria mandar..."
            rows={7}
          />
          <button
            onClick={handleAnalyze}
            disabled={!draftMessage.trim()}
            className="btn-emergency w-full disabled:opacity-40 text-center"
          >
            Analisar Meu Impulso
          </button>
          <p className="text-center text-xs text-[var(--color-text-dim)]" style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}>
            Ninguém vai ver isso. É só entre você e o app.
          </p>
        </div>
      )}

      {/* Analyzing */}
      {step === "analyzing" && (
        <div className="card-flame text-center py-16 animate-in">
          <div className="spinner-mystic mx-auto mb-4" style={{ borderTopColor: "#ef4444", borderColor: "rgba(239, 68, 68, 0.15)" }} />
          <p className="text-red-300 tracking-wider" style={{ fontFamily: "'Cinzel', serif" }}>
            Analisando seu impulso...
          </p>
          <p className="text-[var(--color-text-dim)] text-xs mt-2" style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}>
            Respire fundo enquanto isso
          </p>
        </div>
      )}

      {/* Result */}
      {step === "result" && analysis && (
        <div className="space-y-4">
          <div className="card-flame text-center py-5 animate-in">
            <p className="text-xs text-red-400/70 tracking-wider uppercase mb-1" style={{ fontFamily: "'Cinzel', serif" }}>
              Essa mensagem veio de
            </p>
            <p className="text-2xl font-bold text-red-300" style={{ fontFamily: "'Cinzel', serif" }}>
              {EMOTION_SOURCE_LABELS[analysis.impulseSource as keyof typeof EMOTION_SOURCE_LABELS]}
            </p>
          </div>

          <div className="card-mystic animate-in animate-in-delay-1">
            <p className="text-xs text-red-400 tracking-wider uppercase mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
              Por que não mandar agora
            </p>
            <p className="text-[var(--color-text)] text-sm leading-relaxed">{analysis.whyNotSend}</p>
          </div>

          <div className="card-mystic text-center animate-in animate-in-delay-2">
            <p className="text-xs text-[var(--color-text-dim)] tracking-wider uppercase mb-2">Risco de arrependimento</p>
            <span className={`inline-block text-sm px-4 py-1.5 rounded-full font-semibold tracking-wide risk-${analysis.regretRisk.toLowerCase()}`}>
              {RISK_LABELS[analysis.regretRisk as keyof typeof RISK_LABELS]}
            </span>
          </div>

          <div className="card-mystic animate-in animate-in-delay-3" style={{ borderColor: "rgba(139, 92, 246, 0.2)" }}>
            <p className="text-xs text-[var(--color-mystic-light)] tracking-wider uppercase mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
              ✦ Desabafo Privado
            </p>
            <p className="text-[var(--color-text)] text-sm leading-relaxed" style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}>
              &ldquo;{analysis.ventVersion}&rdquo;
            </p>
            <p className="text-[10px] text-[var(--color-text-dim)] mt-3">Solte aqui. Sem se expor.</p>
          </div>

          <div className="card-mystic animate-in animate-in-delay-4">
            <p className="text-xs text-[var(--color-emerald)] tracking-wider uppercase mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
              Exercício para agora
            </p>
            <p className="text-[var(--color-text)] text-sm leading-relaxed">{analysis.exercise}</p>
          </div>

          <div className="card-gold text-center py-5 animate-in animate-in-delay-5">
            <p className="text-xs text-[var(--color-gold)]/60 tracking-wider uppercase mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
              Proteja sua dignidade
            </p>
            <p className="text-[var(--color-gold-light)] font-medium" style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}>
              {analysis.guidance}
            </p>
          </div>

          <div className="flex gap-3 animate-in animate-in-delay-6">
            <button onClick={() => router.push("/")} className="btn-mystic flex-1 text-center text-sm">
              Consegui Segurar
            </button>
            <button
              onClick={() => { router.push("/"); }}
              className="btn-secondary flex-1 text-center text-sm text-red-400"
            >
              Recaí mesmo assim
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
