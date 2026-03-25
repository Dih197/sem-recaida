import type { UserContext } from "@sem-recaida/shared";
import { SYSTEM_PROMPT, buildUserContextPrompt } from "./base-context";

export function buildDailyGuidancePrompt(userContext: UserContext, recentEmotions: string[]): string {
  return `${SYSTEM_PROMPT}

${buildUserContextPrompt(userContext)}

Emoções recentes da pessoa: ${recentEmotions.length > 0 ? recentEmotions.join(", ") : "nenhum check-in recente"}

Escreva uma orientação curta e acolhedora para o dia dessa pessoa.
Máximo 2 frases. Deve ser firme mas carinhosa.
Não use clichês. Fale como alguém que entende a dor real do término.
Responda APENAS o texto da orientação, sem aspas e sem explicação.`;
}
