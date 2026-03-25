"use client";

import { WhoEnded, WHO_ENDED_LABELS } from "@sem-recaida/shared";
import { useOnboardingStore } from "@/stores/onboarding-store";
import { OptionCard } from "./OptionCard";

export function StepWhoEnded() {
  const { data, setWhoEnded, nextStep } = useOnboardingStore();

  function handleSelect(who: WhoEnded) {
    setWhoEnded(who);
    nextStep();
  }

  const options = Object.values(WhoEnded);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Quem terminou?</h2>
      <p className="text-slate-400 text-sm mb-6">
        Isso muda o tipo de dor e como ajudar
      </p>
      <div className="space-y-3">
        {options.map((who) => (
          <OptionCard
            key={who}
            label={WHO_ENDED_LABELS[who]}
            selected={data.whoEnded === who}
            onClick={() => handleSelect(who)}
          />
        ))}
      </div>
    </div>
  );
}
