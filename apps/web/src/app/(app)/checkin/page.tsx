"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Emotion,
  EMOTION_LABELS,
  EMOTION_ICONS,
  TriggerType,
  TRIGGER_LABELS,
} from "@sem-recaida/shared";
import type { CheckInAnalysis } from "@sem-recaida/shared";
import { EMOTION_SOURCE_LABELS, RISK_LABELS, RISK_COLORS } from "@sem-recaida/shared";

export default function CheckInPage() {
  const router = useRouter();
  const [step, setStep] = useState<"feeling" | "intensity" | "trigger" | "journal" | "result">("feeling");
  const [feeling, setFeeling] = useState<Emotion | null>(null);
  const [intensity, setIntensity] = useState(3);
  const [triggerType, setTriggerType] = useState<TriggerType | null>(null);
  const [journalText, setJournalText] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<CheckInAnalysis | null>(null);

  async function handleSubmit() {
    if (!feeling) return;
    setLoading(true);

    try {
      const res = await fetch("/api/checkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          feeling,
          intensity,
          triggerType,
          journalText: journalText || undefined,
        }),
      });

      const data = await res.json();
      if (data.analysis) {
        setAnalysis(data.analysis);
      }
      setStep("result");
    } catch {
      // Handle error
    } finally {
      setLoading(false);
    }
  }

  const emotions = Object.values(Emotion);
  const triggers = Object.values(TriggerType);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Check-in emocional</h1>

      {/* Step: Feeling */}
      {step === "feeling" && (
        <div>
          <p className="text-slate-400 mb-4">O que você está sentindo agora?</p>
          <div className="grid grid-cols-3 gap-3">
            {emotions.map((emotion) => (
              <button
                key={emotion}
                onClick={() => { setFeeling(emotion); setStep("intensity"); }}
                className={`card text-center p-4 hover:border-brand-primary/30 transition-colors ${
                  feeling === emotion ? "border-brand-primary ring-1 ring-brand-primary/30" : ""
                }`}
              >
                <span className="text-2xl">{EMOTION_ICONS[emotion]}</span>
                <p className="text-xs mt-1">{EMOTION_LABELS[emotion]}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step: Intensity */}
      {step === "intensity" && (
        <div>
          <p className="text-slate-400 mb-4">
            Qual a intensidade de {feeling ? EMOTION_LABELS[feeling].toLowerCase() : ""}?
          </p>
          <div className="space-y-4">
            <input
              type="range"
              min={1}
              max={5}
              value={intensity}
              onChange={(e) => setIntensity(Number(e.target.value))}
              className="w-full accent-brand-primary"
            />
            <div className="flex justify-between text-sm text-slate-400">
              <span>Leve</span>
              <span className="text-2xl font-bold text-white">{intensity}</span>
              <span>Muito forte</span>
            </div>
            <button onClick={() => setStep("trigger")} className="btn-primary w-full">
              Continuar
            </button>
          </div>
        </div>
      )}

      {/* Step: Trigger */}
      {step === "trigger" && (
        <div>
          <p className="text-slate-400 mb-4">O que ativou esse sentimento?</p>
          <div className="space-y-2">
            {triggers.map((trigger) => (
              <button
                key={trigger}
                onClick={() => { setTriggerType(trigger); setStep("journal"); }}
                className={`w-full text-left p-3 rounded-xl border transition-all text-sm ${
                  triggerType === trigger
                    ? "border-brand-primary bg-brand-primary/10"
                    : "border-white/10 bg-brand-surface-light hover:border-white/20"
                }`}
              >
                {TRIGGER_LABELS[trigger]}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step: Journal */}
      {step === "journal" && (
        <div>
          <p className="text-slate-400 mb-4">
            Quer escrever o que está passando na sua cabeça? (opcional)
          </p>
          <textarea
            value={journalText}
            onChange={(e) => setJournalText(e.target.value)}
            className="textarea-field"
            placeholder="Escreva livremente aqui..."
            rows={5}
          />
          <div className="flex gap-3 mt-4">
            <button onClick={handleSubmit} disabled={loading} className="btn-primary flex-1 disabled:opacity-50">
              {loading ? "Analisando..." : "Registrar check-in"}
            </button>
          </div>
        </div>
      )}

      {/* Step: Result */}
      {step === "result" && analysis && (
        <div className="space-y-4">
          <div className="card text-center">
            <p className="text-sm text-slate-400 mb-1">O que está por trás</p>
            <p className="text-xl font-semibold">
              {EMOTION_SOURCE_LABELS[analysis.emotionSource as keyof typeof EMOTION_SOURCE_LABELS]}
            </p>
          </div>

          <div className="card text-center">
            <p className="text-sm text-slate-400 mb-1">Risco de recaída</p>
            <span
              className="text-lg font-bold px-4 py-1 rounded-full inline-block"
              style={{
                backgroundColor: `${RISK_COLORS[analysis.relapseRisk as keyof typeof RISK_COLORS]}20`,
                color: RISK_COLORS[analysis.relapseRisk as keyof typeof RISK_COLORS],
              }}
            >
              {RISK_LABELS[analysis.relapseRisk as keyof typeof RISK_LABELS]}
            </span>
          </div>

          <div className="card">
            <p className="text-sm text-slate-400 mb-2">Faça isso agora</p>
            <p className="text-white">{analysis.actionStep}</p>
          </div>

          <div className="card bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 border-brand-primary/20">
            <p className="text-sm text-slate-400 mb-2">Segure firme</p>
            <p className="text-white font-medium italic">
              &ldquo;{analysis.holdingPhrase}&rdquo;
            </p>
          </div>

          <button onClick={() => router.push("/")} className="btn-secondary w-full">
            Voltar ao início
          </button>
        </div>
      )}
    </div>
  );
}
