"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { EmergencyAnalysis } from "@sem-recaida/shared";
import { EMOTION_SOURCE_LABELS, RISK_LABELS, RISK_COLORS } from "@sem-recaida/shared";

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
      if (data.analysis) {
        setAnalysis(data.analysis);
      }
      setStep("result");
    } catch {
      setStep("input");
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-5xl mb-3">🚨</div>
        <h1 className="text-2xl font-bold text-red-400">Botão de Emergência</h1>
        <p className="text-slate-400 text-sm mt-1">
          Antes de mandar aquela mensagem, cola ela aqui
        </p>
      </div>

      {/* Input Step */}
      {step === "input" && (
        <div className="space-y-4">
          <textarea
            value={draftMessage}
            onChange={(e) => setDraftMessage(e.target.value)}
            className="textarea-field min-h-[160px] border-red-900/30"
            placeholder="Cole aqui a mensagem que você queria mandar..."
            rows={6}
          />
          <button
            onClick={handleAnalyze}
            disabled={!draftMessage.trim()}
            className="btn-emergency w-full disabled:opacity-50"
          >
            Analisar meu impulso
          </button>
          <p className="text-center text-xs text-slate-500">
            Ninguém vai ver isso. É só entre você e o app.
          </p>
        </div>
      )}

      {/* Analyzing */}
      {step === "analyzing" && (
        <div className="card text-center py-12">
          <div className="animate-pulse text-4xl mb-4">🔍</div>
          <p className="text-slate-300">Analisando seu impulso...</p>
          <p className="text-slate-500 text-sm mt-1">Respira fundo enquanto isso</p>
        </div>
      )}

      {/* Result */}
      {step === "result" && analysis && (
        <div className="space-y-4">
          {/* Impulse Source */}
          <div className="card text-center border-red-900/20">
            <p className="text-sm text-slate-400 mb-1">Essa mensagem veio de</p>
            <p className="text-xl font-semibold text-red-400">
              {EMOTION_SOURCE_LABELS[analysis.impulseSource as keyof typeof EMOTION_SOURCE_LABELS]}
            </p>
          </div>

          {/* Why Not Send */}
          <div className="card">
            <p className="text-sm text-red-400 font-medium mb-2">Por que não mandar agora</p>
            <p className="text-slate-300">{analysis.whyNotSend}</p>
          </div>

          {/* Regret Risk */}
          <div className="card text-center">
            <p className="text-sm text-slate-400 mb-1">Risco de arrependimento</p>
            <span
              className="text-lg font-bold px-4 py-1 rounded-full inline-block"
              style={{
                backgroundColor: `${RISK_COLORS[analysis.regretRisk as keyof typeof RISK_COLORS]}20`,
                color: RISK_COLORS[analysis.regretRisk as keyof typeof RISK_COLORS],
              }}
            >
              {RISK_LABELS[analysis.regretRisk as keyof typeof RISK_LABELS]}
            </span>
          </div>

          {/* Vent Version */}
          <div className="card bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 border-brand-primary/20">
            <p className="text-sm text-brand-primary font-medium mb-2">Desabafo privado</p>
            <p className="text-slate-300 italic">&ldquo;{analysis.ventVersion}&rdquo;</p>
            <p className="text-xs text-slate-500 mt-2">Solte aqui. Sem se expor.</p>
          </div>

          {/* Exercise */}
          <div className="card">
            <p className="text-sm text-slate-400 mb-2">Exercício para agora</p>
            <p className="text-white">{analysis.exercise}</p>
          </div>

          {/* Guidance */}
          <div className="card border-brand-primary/20">
            <p className="text-sm text-slate-400 mb-2">Proteja sua dignidade</p>
            <p className="text-white font-medium">{analysis.guidance}</p>
          </div>

          <div className="flex gap-3">
            <button onClick={() => router.push("/")} className="btn-primary flex-1">
              Consegui segurar
            </button>
            <button
              onClick={() => {
                fetch(`/api/emergencia/relapse`, { method: "POST" });
                router.push("/");
              }}
              className="btn-secondary flex-1 text-red-400"
            >
              Recaí mesmo assim
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
