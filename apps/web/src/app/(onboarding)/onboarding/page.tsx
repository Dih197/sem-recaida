"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useOnboardingStore, TOTAL_STEPS } from "@/stores/onboarding-store";
import { StepGender } from "@/components/onboarding/StepGender";
import { StepPreference } from "@/components/onboarding/StepPreference";
import { StepNeed } from "@/components/onboarding/StepNeed";
import { StepTimeSince } from "@/components/onboarding/StepTimeSince";
import { StepWhoEnded } from "@/components/onboarding/StepWhoEnded";
import { StepContact } from "@/components/onboarding/StepContact";
import { StepRelapses } from "@/components/onboarding/StepRelapses";
import { StepPain } from "@/components/onboarding/StepPain";
import { StepHardestTime } from "@/components/onboarding/StepHardestTime";

export default function OnboardingPage() {
  const router = useRouter();
  const { step, data, prevStep, isComplete } = useOnboardingStore();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleFinish() {
    if (!isComplete()) return;
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) { const d = await res.json(); setError(d.error || "Erro ao salvar"); setSaving(false); return; }
      router.push("/");
      router.refresh();
    } catch { setError("Erro de conexão"); setSaving(false); }
  }

  const progress = (step / TOTAL_STEPS) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg">
        {/* Progress */}
        <div className="mb-8 animate-in">
          <div className="flex justify-between text-xs text-[var(--color-text-dim)] mb-3 tracking-wider">
            <span style={{ fontFamily: "'Cinzel', serif" }}>Passo {step} de {TOTAL_STEPS}</span>
            <span className="text-[var(--color-mystic-light)]">{Math.round(progress)}%</span>
          </div>
          <div className="xp-bar">
            <div className="xp-bar-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Content */}
        <div className="card-mystic min-h-[340px] flex flex-col justify-between animate-in animate-in-delay-1">
          <div className="flex-1">{step === 1 && <StepGender />}{step === 2 && <StepPreference />}{step === 3 && <StepNeed />}{step === 4 && <StepTimeSince />}{step === 5 && <StepWhoEnded />}{step === 6 && <StepContact />}{step === 7 && <StepRelapses />}{step === 8 && <StepPain />}{step === 9 && <StepHardestTime />}</div>

          {error && <p className="text-red-400 text-sm mt-4 text-center">{error}</p>}

          <div className="flex gap-3 mt-8">
            {step > 1 && (
              <button onClick={prevStep} className="btn-secondary flex-1 text-center text-sm">Voltar</button>
            )}
            {step === TOTAL_STEPS && (
              <button onClick={handleFinish} disabled={saving || !isComplete()} className="btn-mystic flex-1 disabled:opacity-50 text-center text-sm">
                {saving ? "Salvando..." : "Iniciar Jornada"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
