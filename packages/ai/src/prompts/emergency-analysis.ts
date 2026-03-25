import type { UserContext } from "@sem-recaida/shared";
import { SYSTEM_PROMPT, buildUserContextPrompt } from "./base-context";

export function buildEmergencyPrompt(draftMessage: string, userContext: UserContext): string {
  return `${SYSTEM_PROMPT}

${buildUserContextPrompt(userContext)}

A pessoa está prestes a mandar esta mensagem para ${userContext.preference === "MALE" ? "o ex" : "a ex"}:
"${draftMessage}"

Analise esse impulso e responda em JSON com esta estrutura exata:
{
  "impulseSource": "SAUDADE" | "CARENCIA" | "CULPA" | "REJEICAO" | "APEGO" | "SOLIDAO" | "EGO_FERIDO" | "MEDO" | "DESESPERO" | "RAIVA" | "AMOR",
  "whyNotSend": "explicação curta e empática de por que mandar isso agora pode piorar a dor (2-3 frases)",
  "regretRisk": "LOW" | "MEDIUM" | "HIGH",
  "ventVersion": "transforme a mensagem em um desabafo privado — a pessoa pode soltar a emoção sem se expor (2-3 frases)",
  "exercise": "um exercício rápido para segurar o impulso agora (1-2 frases)",
  "guidance": "orientação curta para proteger a dignidade emocional (1 frase)"
}

Responda APENAS o JSON, sem explicação adicional.`;
}
