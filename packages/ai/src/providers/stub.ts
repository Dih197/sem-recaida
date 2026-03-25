import type { AIProvider, AIOptions } from "../interface";
import { EmotionSource, RiskLevel } from "@sem-recaida/shared";

export class StubProvider implements AIProvider {
  async generateText(_prompt: string, _options?: AIOptions): Promise<string> {
    return JSON.stringify({
      emotionSource: EmotionSource.SAUDADE,
      relapseRisk: RiskLevel.MEDIUM,
      actionStep: "Respire fundo 3 vezes e coloque os pés no chão. Sinta o presente.",
      holdingPhrase: "Sentir saudade não significa que você precisa voltar. Significa que você amou — e tudo bem.",
    });
  }
}
