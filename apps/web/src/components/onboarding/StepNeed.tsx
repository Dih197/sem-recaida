"use client";

import { CurrentNeed, CURRENT_NEED_LABELS, CURRENT_NEED_DESCRIPTIONS } from "@sem-recaida/shared";
import { useOnboardingStore } from "@/stores/onboarding-store";
import { OptionCard } from "./OptionCard";

export function StepNeed() {
  const { data, setCurrentNeed, nextStep } = useOnboardingStore();

  function handleSelect(need: CurrentNeed) {
    setCurrentNeed(need);
    nextStep();
  }

  const needs = Object.values(CurrentNeed);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">O que você mais precisa agora?</h2>
      <p className="text-slate-400 text-sm mb-6">
        Sua trilha será adaptada a isso
      </p>
      <div className="space-y-3">
        {needs.map((need) => (
          <OptionCard
            key={need}
            label={CURRENT_NEED_LABELS[need]}
            description={CURRENT_NEED_DESCRIPTIONS[need]}
            selected={data.currentNeed === need}
            onClick={() => handleSelect(need)}
          />
        ))}
      </div>
    </div>
  );
}
