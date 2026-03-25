"use client";

import { useOnboardingStore } from "@/stores/onboarding-store";
import { OptionCard } from "./OptionCard";

export function StepRelapses() {
  const { data, setRelapseCount, nextStep } = useOnboardingStore();

  function handleSelect(count: number) {
    setRelapseCount(count);
    nextStep();
  }

  const options = [
    { value: 0, label: "Nenhuma" },
    { value: 1, label: "1 vez" },
    { value: 3, label: "2 a 3 vezes" },
    { value: 5, label: "Mais de 3 vezes" },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Quantas recaídas já aconteceram?</h2>
      <p className="text-slate-400 text-sm mb-6">
        Recaída é quando você mandou mensagem ou procurou a pessoa
      </p>
      <div className="space-y-3">
        {options.map((opt) => (
          <OptionCard
            key={opt.value}
            label={opt.label}
            selected={data.relapseCount === opt.value}
            onClick={() => handleSelect(opt.value)}
          />
        ))}
      </div>
    </div>
  );
}
