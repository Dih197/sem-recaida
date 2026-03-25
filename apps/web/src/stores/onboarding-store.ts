"use client";

import { create } from "zustand";
import type {
  Gender,
  CurrentNeed,
  TimeSince,
  WhoEnded,
  PainType,
  TimeOfDay,
  OnboardingData,
} from "@sem-recaida/shared";

interface OnboardingState {
  step: number;
  data: Partial<OnboardingData>;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setGender: (gender: Gender) => void;
  setPreference: (preference: Gender) => void;
  setCurrentNeed: (need: CurrentNeed) => void;
  setTimeSince: (time: TimeSince) => void;
  setWhoEnded: (who: WhoEnded) => void;
  setStillInContact: (contact: boolean) => void;
  setRelapseCount: (count: number) => void;
  setStrongestPain: (pain: PainType) => void;
  setHardestTime: (time: TimeOfDay) => void;
  isComplete: () => boolean;
}

export const TOTAL_STEPS = 9;

export const useOnboardingStore = create<OnboardingState>((set, get) => ({
  step: 1,
  data: {},
  setStep: (step) => set({ step }),
  nextStep: () => set((s) => ({ step: Math.min(s.step + 1, TOTAL_STEPS) })),
  prevStep: () => set((s) => ({ step: Math.max(s.step - 1, 1) })),
  setGender: (gender) => set((s) => ({ data: { ...s.data, gender } })),
  setPreference: (preference) => set((s) => ({ data: { ...s.data, preference } })),
  setCurrentNeed: (currentNeed) => set((s) => ({ data: { ...s.data, currentNeed } })),
  setTimeSince: (timeSinceBreakup) => set((s) => ({ data: { ...s.data, timeSinceBreakup } })),
  setWhoEnded: (whoEnded) => set((s) => ({ data: { ...s.data, whoEnded } })),
  setStillInContact: (stillInContact) => set((s) => ({ data: { ...s.data, stillInContact } })),
  setRelapseCount: (relapseCount) => set((s) => ({ data: { ...s.data, relapseCount } })),
  setStrongestPain: (strongestPain) => set((s) => ({ data: { ...s.data, strongestPain } })),
  setHardestTime: (hardestTime) => set((s) => ({ data: { ...s.data, hardestTime } })),
  isComplete: () => {
    const d = get().data;
    return !!(
      d.gender &&
      d.preference &&
      d.currentNeed &&
      d.timeSinceBreakup &&
      d.whoEnded &&
      d.stillInContact !== undefined &&
      d.relapseCount !== undefined &&
      d.strongestPain &&
      d.hardestTime
    );
  },
}));
