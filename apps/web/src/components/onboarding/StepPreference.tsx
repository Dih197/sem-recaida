"use client";

import { Gender } from "@sem-recaida/shared";
import { useOnboardingStore } from "@/stores/onboarding-store";
import { OptionCard } from "./OptionCard";

export function StepPreference() {
  const { data, setPreference, nextStep } = useOnboardingStore();

  function handleSelect(preference: Gender) {
    setPreference(preference);
    nextStep();
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Com quem você se relaciona?</h2>
      <p className="text-slate-400 text-sm mb-6">
        Para adaptar a linguagem e os exemplos
      </p>
      <div className="space-y-3">
        <OptionCard
          label="Me relaciono com homens"
          selected={data.preference === Gender.MALE}
          onClick={() => handleSelect(Gender.MALE)}
        />
        <OptionCard
          label="Me relaciono com mulheres"
          selected={data.preference === Gender.FEMALE}
          onClick={() => handleSelect(Gender.FEMALE)}
        />
      </div>
    </div>
  );
}
