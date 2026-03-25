"use client";

import { TimeSince, TIME_SINCE_LABELS } from "@sem-recaida/shared";
import { useOnboardingStore } from "@/stores/onboarding-store";
import { OptionCard } from "./OptionCard";

export function StepTimeSince() {
  const { data, setTimeSince, nextStep } = useOnboardingStore();

  function handleSelect(time: TimeSince) {
    setTimeSince(time);
    nextStep();
  }

  const options = Object.values(TimeSince);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Há quanto tempo o relacionamento acabou?</h2>
      <p className="text-slate-400 text-sm mb-6">
        Cada fase do término tem suas particularidades
      </p>
      <div className="space-y-3">
        {options.map((time) => (
          <OptionCard
            key={time}
            label={TIME_SINCE_LABELS[time]}
            selected={data.timeSinceBreakup === time}
            onClick={() => handleSelect(time)}
          />
        ))}
      </div>
    </div>
  );
}
