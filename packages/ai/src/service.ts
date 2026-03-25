import type { AIProvider, AIService, WeekSummaryData } from "./interface";
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
import { buildCheckInPrompt } from "./prompts/checkin-analysis";
import { buildEmergencyPrompt } from "./prompts/emergency-analysis";
import { buildTarotPrompt } from "./prompts/tarot-reading";
import { buildDailyGuidancePrompt } from "./prompts/daily-guidance";
import { buildWeeklySummaryPrompt } from "./prompts/weekly-summary";

export class AIServiceImpl implements AIService {
  constructor(private provider: AIProvider) {}

  async analyzeCheckIn(input: CheckInInput, userContext: UserContext): Promise<CheckInAnalysis> {
    const prompt = buildCheckInPrompt(input, userContext);
    const response = await this.provider.generateText(prompt, { temperature: 0.7, maxTokens: 500 });
    return JSON.parse(response) as CheckInAnalysis;
  }

  async analyzeEmergency(draftMessage: string, userContext: UserContext): Promise<EmergencyAnalysis> {
    const prompt = buildEmergencyPrompt(draftMessage, userContext);
    const response = await this.provider.generateText(prompt, { temperature: 0.7, maxTokens: 800 });
    return JSON.parse(response) as EmergencyAnalysis;
  }

  async generateTarotReading(
    theme: TarotTheme,
    card: TarotCard,
    type: TarotReadingType,
    userContext: UserContext,
  ): Promise<TarotInterpretation> {
    const prompt = buildTarotPrompt(theme, card, type, userContext);
    const response = await this.provider.generateText(prompt, { temperature: 0.8, maxTokens: 1000 });
    return JSON.parse(response) as TarotInterpretation;
  }

  async generateDailyGuidance(userContext: UserContext, recentEmotions: string[]): Promise<string> {
    const prompt = buildDailyGuidancePrompt(userContext, recentEmotions);
    return this.provider.generateText(prompt, { temperature: 0.8, maxTokens: 200 });
  }

  async generateWeeklySummary(userContext: UserContext, weekData: WeekSummaryData): Promise<string> {
    const prompt = buildWeeklySummaryPrompt(userContext, weekData);
    return this.provider.generateText(prompt, { temperature: 0.7, maxTokens: 400 });
  }

  async generateJournalPrompt(category: JournalCategory, userContext: UserContext): Promise<string> {
    // Simple prompt generation - can be enhanced later
    const prompt = `Você é um especialista em apoio emocional pós-término.
Gere uma pergunta curta e profunda para um diário guiado na categoria "${category}".
A pessoa é ${userContext.gender === "MALE" ? "homem" : "mulher"} e precisa de ${userContext.currentNeed}.
Responda APENAS a pergunta, sem explicação.`;
    return this.provider.generateText(prompt, { temperature: 0.9, maxTokens: 100 });
  }
}
