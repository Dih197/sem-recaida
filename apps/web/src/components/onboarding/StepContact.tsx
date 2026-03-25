"use client";

import { useOnboardingStore } from "@/stores/onboarding-store";
import { OptionCard } from "./OptionCard";

export function StepContact() {
  const { data, setStillInContact, nextStep } = useOnboardingStore();

  function handleSelect(contact: boolean) {
    setStillInContact(contact);
    nextStep();
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Vocês ainda têm contato?</h2>
      <p className="text-slate-400 text-sm mb-6">
        Manter contato pode dificultar a recuperação
      </p>
      <div className="space-y-3">
        <OptionCard
          label="Sim, ainda temos contato"
          selected={data.stillInContact === true}
          onClick={() => handleSelect(true)}
        />
        <OptionCard
          label="Não, cortamos contato"
          selected={data.stillInContact === false}
          onClick={() => handleSelect(false)}
        />
      </div>
    </div>
  );
}
