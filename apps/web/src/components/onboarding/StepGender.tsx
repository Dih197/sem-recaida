"use client";

import { Gender } from "@sem-recaida/shared";
import { useOnboardingStore } from "@/stores/onboarding-store";
import { OptionCard } from "./OptionCard";

export function StepGender() {
  const { data, setGender, nextStep } = useOnboardingStore();

  function handleSelect(gender: Gender) {
    setGender(gender);
    nextStep();
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Quem é você?</h2>
      <p className="text-slate-400 text-sm mb-6">
        Isso ajuda a personalizar sua experiência
      </p>
      <div className="space-y-3">
        <OptionCard
          label="Sou homem"
          selected={data.gender === Gender.MALE}
          onClick={() => handleSelect(Gender.MALE)}
        />
        <OptionCard
          label="Sou mulher"
          selected={data.gender === Gender.FEMALE}
          onClick={() => handleSelect(Gender.FEMALE)}
        />
      </div>
    </div>
  );
}
