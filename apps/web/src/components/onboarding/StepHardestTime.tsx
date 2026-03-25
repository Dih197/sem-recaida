"use client";

import { TimeOfDay, TIME_OF_DAY_LABELS } from "@sem-recaida/shared";
import { useOnboardingStore } from "@/stores/onboarding-store";
import { OptionCard } from "./OptionCard";

export function StepHardestTime() {
  const { data, setHardestTime } = useOnboardingStore();

  function handleSelect(time: TimeOfDay) {
    setHardestTime(time);
    // Last step - don't auto-advance, user clicks "Começar"
  }

  const options = Object.values(TimeOfDay);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Qual horário do dia costuma ser mais difícil?</h2>
      <p className="text-slate-400 text-sm mb-6">
        Vamos te preparar melhor para esses momentos
      </p>
      <div className="space-y-3">
        {options.map((time) => (
          <OptionCard
            key={time}
            label={TIME_OF_DAY_LABELS[time]}
            selected={data.hardestTime === time}
            onClick={() => handleSelect(time)}
          />
        ))}
      </div>
    </div>
  );
}
