import { Emotion, EmotionSource, RiskLevel, TriggerType } from "../constants/emotions";

export interface CheckInInput {
  feeling: Emotion;
  intensity: number; // 1-5
  trigger?: string;
  triggerType?: TriggerType;
  journalText?: string;
}

export interface CheckInAnalysis {
  emotionSource: EmotionSource;
  relapseRisk: RiskLevel;
  actionStep: string;
  holdingPhrase: string;
}

export interface CheckInRecord {
  id: string;
  userId: string;
  createdAt: Date;
  feeling: Emotion;
  intensity: number;
  trigger: string | null;
  triggerType: TriggerType | null;
  journalText: string | null;
  emotionSource: EmotionSource | null;
  relapseRisk: RiskLevel | null;
  actionStep: string | null;
  holdingPhrase: string | null;
}
