import {
  type UserContext,
  type CheckInInput,
  EMOTION_LABELS,
  TRIGGER_LABELS,
} from "@sem-recaida/shared";
import { SYSTEM_PROMPT, buildUserContextPrompt } from "./base-context";

export function buildCheckInPrompt(input: CheckInInput, userContext: UserContext): string {
  const triggerLabel = input.triggerType ? TRIGGER_LABELS[input.triggerType] : input.trigger || "não informado";

  return `${SYSTEM_PROMPT}

${buildUserContextPrompt(userContext)}

A pessoa acabou de fazer um check-in emocional:
- Sentimento: ${EMOTION_LABELS[input.feeling]}
- Intensidade: ${input.intensity}/5
- Gatilho: ${triggerLabel}
${input.journalText ? `- O que escreveu: "${input.journalText}"` : ""}

Analise esse momento e responda em JSON com esta estrutura exata:
{
  "emotionSource": "SAUDADE" | "CARENCIA" | "CULPA" | "REJEICAO" | "APEGO" | "SOLIDAO" | "EGO_FERIDO" | "MEDO" | "DESESPERO" | "RAIVA" | "AMOR",
  "relapseRisk": "LOW" | "MEDIUM" | "HIGH",
  "actionStep": "um passo simples e prático para fazer agora (máximo 2 frases)",
  "holdingPhrase": "uma frase firme e acolhedora para segurar o impulso (máximo 1 frase)"
}

Responda APENAS o JSON, sem explicação adicional.`;
}
