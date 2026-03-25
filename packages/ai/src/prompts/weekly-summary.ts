import type { UserContext } from "@sem-recaida/shared";
import type { WeekSummaryData } from "../interface";
import { SYSTEM_PROMPT, buildUserContextPrompt } from "./base-context";

export function buildWeeklySummaryPrompt(userContext: UserContext, data: WeekSummaryData): string {
  return `${SYSTEM_PROMPT}

${buildUserContextPrompt(userContext)}

Resumo da semana dessa pessoa:
- Check-ins feitos: ${data.totalCheckIns}
- Vezes que usou o botão de emergência: ${data.totalEmergencyUses}
- Recaídas na semana: ${data.relapses}
- Emoções mais frequentes: ${data.topEmotions.join(", ") || "nenhuma registrada"}
- Gatilhos mais frequentes: ${data.topTriggers.join(", ") || "nenhum registrado"}
- Streak atual: ${data.currentStreak} dias

Escreva um pequeno resumo semanal (3-4 frases) mostrando:
1. O que está melhorando
2. O que ainda merece atenção
3. Uma palavra de encorajamento

Seja honesto mas acolhedor. Não use clichês.
Responda APENAS o texto do resumo.`;
}
