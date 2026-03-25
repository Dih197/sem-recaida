import { EmotionSource, RiskLevel } from "../constants/emotions";

export interface EmergencyInput {
  draftMessage: string;
}

export interface EmergencyAnalysis {
  impulseSource: EmotionSource;
  whyNotSend: string;
  regretRisk: RiskLevel;
  ventVersion: string;
  exercise: string;
  guidance: string;
}

export interface EmergencyRecord {
  id: string;
  userId: string;
  createdAt: Date;
  draftMessage: string;
  impulseSource: EmotionSource | null;
  whyNotSend: string | null;
  regretRisk: RiskLevel | null;
  ventVersion: string | null;
  exercise: string | null;
  guidance: string | null;
  relapsed: boolean;
}
