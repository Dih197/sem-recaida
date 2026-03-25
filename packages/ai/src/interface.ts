import {
  type UserContext,
  type CheckInInput,
  type CheckInAnalysis,
  type EmergencyAnalysis,
  type TarotInterpretation,
  type TarotCard,
  TarotTheme,
  TarotReadingType,
  JournalCategory,
} from "@sem-recaida/shared";

export interface AIOptions {
  temperature?: number;
  maxTokens?: number;
  model?: string;
}

export interface AIProvider {
  generateText(prompt: string, options?: AIOptions): Promise<string>;
}

export interface AIService {
  analyzeCheckIn(input: CheckInInput, userContext: UserContext): Promise<CheckInAnalysis>;
  analyzeEmergency(draftMessage: string, userContext: UserContext): Promise<EmergencyAnalysis>;
  generateTarotReading(
    theme: TarotTheme,
    card: TarotCard,
    type: TarotReadingType,
    userContext: UserContext,
  ): Promise<TarotInterpretation>;
  generateDailyGuidance(userContext: UserContext, recentEmotions: string[]): Promise<string>;
  generateWeeklySummary(userContext: UserContext, weekData: WeekSummaryData): Promise<string>;
  generateJournalPrompt(category: JournalCategory, userContext: UserContext): Promise<string>;
}

export interface WeekSummaryData {
  totalCheckIns: number;
  totalEmergencyUses: number;
  relapses: number;
  topEmotions: string[];
  topTriggers: string[];
  currentStreak: number;
}
