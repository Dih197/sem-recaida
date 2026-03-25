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

      if (!res.ok) {
        const d = await res.json();
        setError(d.error || "Erro ao salvar");
        setSaving(false);
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("Erro de conexão");
      setSaving(false);
    }
  }

  const progress = (step / TOTAL_STEPS) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-slate-400 mb-2">
            <span>Passo {step} de {TOTAL_STEPS}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-brand-surface-light rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Steps */}
        <div className="card min-h-[300px] flex flex-col justify-between">
          <div className="flex-1">
            {step === 1 && <StepGender />}
            {step === 2 && <StepPreference />}
            {step === 3 && <StepNeed />}
            {step === 4 && <StepTimeSince />}
            {step === 5 && <StepWhoEnded />}
            {step === 6 && <StepContact />}
            {step === 7 && <StepRelapses />}
            {step === 8 && <StepPain />}
            {step === 9 && <StepHardestTime />}
          </div>

          {error && (
            <p className="text-red-400 text-sm mt-4">{error}</p>
          )}

          {/* Navigation */}
          <div className="flex gap-3 mt-8">
            {step > 1 && (
              <button onClick={prevStep} className="btn-secondary flex-1">
                Voltar
              </button>
            )}
            {step === TOTAL_STEPS && (
              <button
                onClick={handleFinish}
                disabled={saving || !isComplete()}
                className="btn-primary flex-1 disabled:opacity-50"
              >
                {saving ? "Salvando..." : "Começar minha jornada"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
