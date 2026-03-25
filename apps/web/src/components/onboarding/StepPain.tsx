"use client";

import { PainType, PAIN_TYPE_LABELS } from "@sem-recaida/shared";
import { useOnboardingStore } from "@/stores/onboarding-store";
import { OptionCard } from "./OptionCard";

export function StepPain() {
  const { data, setStrongestPain, nextStep } = useOnboardingStore();

  function handleSelect(pain: PainType) {
    setStrongestPain(pain);
    nextStep();
  }

  const options = Object.values(PainType);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Qual dor está mais forte hoje?</h2>
      <p className="text-slate-400 text-sm mb-6">
        Saber onde dói mais ajuda a direcionar o apoio
      </p>
      <div className="space-y-3">
        {options.map((pain) => (
          <OptionCard
            key={pain}
            label={PAIN_TYPE_LABELS[pain]}
            selected={data.strongestPain === pain}
            onClick={() => handleSelect(pain)}
          />
        ))}
      </div>
    </div>
  );
}
