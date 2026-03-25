"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Emotion, EMOTION_LABELS, EMOTION_ICONS, TriggerType, TRIGGER_LABELS } from "@sem-recaida/shared";
import type { CheckInAnalysis } from "@sem-recaida/shared";
import { EMOTION_SOURCE_LABELS, RISK_LABELS } from "@sem-recaida/shared";

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
        body: JSON.stringify({ feeling, intensity, triggerType, journalText: journalText || undefined }),
      });
      const data = await res.json();
      if (data.analysis) setAnalysis(data.analysis);
      setStep("result");
    } catch {} finally { setLoading(false); }
  }

  const emotions = Object.values(Emotion);
  const triggers = Object.values(TriggerType);

  return (
    <div className="space-y-6 pb-4">
      <div className="text-center animate-in">
        <h1 className="text-2xl font-bold text-gradient-mystic tracking-wider">Check-in Emocional</h1>
        <p className="text-[var(--color-text-muted)] text-xs mt-2 tracking-wider uppercase">
          {step === "feeling" && "O que você está sentindo?"}
          {step === "intensity" && "Qual a intensidade?"}
          {step === "trigger" && "O que ativou isso?"}
          {step === "journal" && "Quer escrever algo?"}
          {step === "result" && "Sua análise"}
        </p>
      </div>

      {/* Feeling */}
      {step === "feeling" && (
        <div className="grid grid-cols-3 gap-3">
          {emotions.map((emotion, i) => (
            <button
              key={emotion}
              onClick={() => { setFeeling(emotion); setStep("intensity"); }}
              className={`emotion-orb animate-in ${feeling === emotion ? "selected" : ""}`}
              style={{ animationDelay: `${0.05 * i}s` }}
            >
              <span className="emoji">{EMOTION_ICONS[emotion]}</span>
              <span className="text-[10px] text-[var(--color-text-muted)] tracking-wide">{EMOTION_LABELS[emotion]}</span>
            </button>
          ))}
        </div>
      )}

      {/* Intensity */}
      {step === "intensity" && (
        <div className="card-mystic space-y-6 animate-in">
          <p className="text-center text-[var(--color-text-muted)] text-sm" style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}>
            Intensidade de {feeling ? EMOTION_LABELS[feeling].toLowerCase() : ""}
          </p>
          <div className="px-2">
            <input type="range" min={1} max={5} value={intensity} onChange={(e) => setIntensity(Number(e.target.value))} />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-[var(--color-text-dim)]">Leve</span>
            <span className="text-4xl font-bold text-gradient-mystic" style={{ fontFamily: "'Cinzel', serif" }}>{intensity}</span>
            <span className="text-xs text-[var(--color-text-dim)]">Muito forte</span>
          </div>
          <button onClick={() => setStep("trigger")} className="btn-mystic w-full text-center">Continuar</button>
        </div>
      )}

      {/* Trigger */}
      {step === "trigger" && (
        <div className="space-y-2 animate-in">
          {triggers.map((trigger, i) => (
            <button
              key={trigger}
              onClick={() => { setTriggerType(trigger); setStep("journal"); }}
              className={`option-mystic animate-in ${triggerType === trigger ? "selected" : ""}`}
              style={{ animationDelay: `${0.04 * i}s` }}
            >
              <span className="text-sm">{TRIGGER_LABELS[trigger]}</span>
            </button>
          ))}
        </div>
      )}

      {/* Journal */}
      {step === "journal" && (
        <div className="space-y-4 animate-in">
          <textarea
            value={journalText}
            onChange={(e) => setJournalText(e.target.value)}
            className="textarea-mystic"
            placeholder="Escreva livremente o que está passando na sua cabeça... (opcional)"
            rows={6}
          />
          <button onClick={handleSubmit} disabled={loading} className="btn-mystic w-full disabled:opacity-50 text-center">
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="spinner-mystic !w-5 !h-5 !border-2" /> Analisando...
              </span>
            ) : "Registrar Check-in"}
          </button>
        </div>
      )}

      {/* Result */}
      {step === "result" && analysis && (
        <div className="space-y-4">
          <div className="card-mystic text-center py-5 animate-in">
            <p className="text-xs text-[var(--color-text-dim)] tracking-wider uppercase mb-1">O que está por trás</p>
            <p className="text-2xl font-bold text-gradient-mystic" style={{ fontFamily: "'Cinzel', serif" }}>
              {EMOTION_SOURCE_LABELS[analysis.emotionSource as keyof typeof EMOTION_SOURCE_LABELS]}
            </p>
          </div>

          <div className="card-mystic text-center animate-in animate-in-delay-1">
            <p className="text-xs text-[var(--color-text-dim)] tracking-wider uppercase mb-2">Risco de recaída</p>
            <span className={`inline-block text-sm px-4 py-1.5 rounded-full font-semibold tracking-wide risk-${analysis.relapseRisk.toLowerCase()}`}>
              {RISK_LABELS[analysis.relapseRisk as keyof typeof RISK_LABELS]}
            </span>
          </div>

          <div className="card-mystic animate-in animate-in-delay-2">
            <p className="text-xs text-[var(--color-emerald)] tracking-wider uppercase mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
              Faça isso agora
            </p>
            <p className="text-[var(--color-text)] text-sm leading-relaxed">{analysis.actionStep}</p>
          </div>

          <div className="card-gold text-center py-5 animate-in animate-in-delay-3">
            <p className="text-xs text-[var(--color-gold)]/60 tracking-wider uppercase mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
              Segure firme
            </p>
            <p className="text-[var(--color-gold-light)] font-medium" style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}>
              &ldquo;{analysis.holdingPhrase}&rdquo;
            </p>
          </div>

          <button onClick={() => router.push("/")} className="btn-secondary w-full text-center animate-in animate-in-delay-4">
            Voltar ao início
          </button>
        </div>
      )}
    </div>
  );
}
