import {
  type UserContext,
  Gender,
  CurrentNeed,
  TimeSince,
  WhoEnded,
  TimeOfDay,
  PainType,
  GENDER_LABELS,
  CURRENT_NEED_LABELS,
  TIME_SINCE_LABELS,
  WHO_ENDED_LABELS,
  TIME_OF_DAY_LABELS,
  PAIN_TYPE_LABELS,
} from "@sem-recaida/shared";

export const SYSTEM_PROMPT = `Você é um especialista em apoio emocional para pessoas que estão passando pelo fim de um relacionamento.
Seu tom é acolhedor, firme e direto. Você fala português brasileiro.
Você nunca julga a dor da pessoa.
Você nunca dá falsas esperanças.
Você nunca incentiva insistência, perseguição ou humilhação.
Você ajuda a pessoa a voltar para si mesma.
Você entende que sentir saudade não obriga ninguém a voltar para o mesmo ciclo.
Suas respostas são curtas, claras e práticas.`;

export function buildUserContextPrompt(ctx: UserContext): string {
  const pronoun = ctx.gender === Gender.MALE ? "ele" : "ela";
  const exPronoun = ctx.preference === Gender.MALE ? "o ex" : "a ex";

  return `Contexto da pessoa:
- Gênero: ${GENDER_LABELS[ctx.gender]}
- Se relaciona com: ${ctx.preference === Gender.MALE ? "homens" : "mulheres"}
- O que mais precisa agora: ${CURRENT_NEED_LABELS[ctx.currentNeed]}
- Tempo desde o término: ${TIME_SINCE_LABELS[ctx.timeSinceBreakup]}
- Quem terminou: ${WHO_ENDED_LABELS[ctx.whoEnded]}
- Ainda tem contato: ${ctx.stillInContact ? "Sim" : "Não"}
- Recaídas até agora: ${ctx.relapseCount}
- Dor mais forte: ${PAIN_TYPE_LABELS[ctx.strongestPain]}
- Horário mais difícil: ${TIME_OF_DAY_LABELS[ctx.hardestTime]}
- Dias sem recaída: ${ctx.currentStreak}

Use pronomes adequados (${pronoun}) e se refira ao ex-parceiro como "${exPronoun}".
Adapte a linguagem e os exemplos ao gênero e à dor principal dessa pessoa.`;
}
