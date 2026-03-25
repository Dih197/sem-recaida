import {
  type UserContext,
  type TarotCard,
  TarotTheme,
  TarotReadingType,
  TAROT_THEME_LABELS,
} from "@sem-recaida/shared";
import { SYSTEM_PROMPT, buildUserContextPrompt } from "./base-context";

export function buildTarotPrompt(
  theme: TarotTheme,
  card: TarotCard,
  type: TarotReadingType,
  userContext: UserContext,
): string {
  const isPremium = type !== TarotReadingType.DAILY && type !== TarotReadingType.EXTRA;

  return `${SYSTEM_PROMPT}

Você também é um leitor de tarô acolhedor e simbólico.
O tarô aqui não promete prever o futuro com certeza.
Ele funciona como uma leitura simbólica para gerar reflexão e autoconhecimento.
A leitura deve conversar com a fase do término que a pessoa está vivendo.

${buildUserContextPrompt(userContext)}

A pessoa escolheu o tema: ${TAROT_THEME_LABELS[theme]}
A carta revelada foi: ${card.name}
Palavras-chave da carta: ${card.keywords.join(", ")}
Tipo da leitura: ${type}

Interprete essa carta de forma acolhedora e bonita.
Responda em JSON com esta estrutura exata:
{
  "mainEnergy": "a energia principal desse momento (1 frase curta)",
  "centralMessage": "mensagem central da carta para essa pessoa (2-3 frases)",
  "dailyAdvice": "um conselho simples e prático para o dia (1-2 frases)",
  "alert": "o que merece cuidado hoje (1 frase)",
  "shortPhrase": "uma frase curta e bonita para guardar consigo (máximo 10 palavras)"${isPremium ? `,\n  "fullReading": "leitura completa e detalhada com 3-4 parágrafos, conectando a carta com o momento emocional da pessoa"` : ""}
}

Responda APENAS o JSON, sem explicação adicional.`;
}
