import { Gender, CurrentNeed, TimeSince, WhoEnded, TimeOfDay, PainType } from "../types/user";
import { JournalCategory } from "../types/journal";
import { RealityType } from "../types/reality";
import { TarotTheme, TarotReadingType } from "../types/tarot";

export const GENDER_LABELS: Record<Gender, string> = {
  [Gender.MALE]: "Homem",
  [Gender.FEMALE]: "Mulher",
};

export const CURRENT_NEED_LABELS: Record<CurrentNeed, string> = {
  [CurrentNeed.OVERCOME]: "Superar de vez",
  [CurrentNeed.STOP_RELAPSES]: "Parar de recair",
  [CurrentNeed.RECOVER_SELF_ESTEEM]: "Recuperar autoestima",
  [CurrentNeed.UNDERSTAND_WORTH]: "Entender se vale tentar",
};

export const CURRENT_NEED_DESCRIPTIONS: Record<CurrentNeed, string> = {
  [CurrentNeed.OVERCOME]: "Quero seguir em frente e deixar o passado para trás",
  [CurrentNeed.STOP_RELAPSES]: "Quero parar de mandar mensagem e me humilhar",
  [CurrentNeed.RECOVER_SELF_ESTEEM]: "Quero me sentir bem comigo de novo",
  [CurrentNeed.UNDERSTAND_WORTH]: "Quero ter clareza sobre o que fazer",
};

export const TIME_SINCE_LABELS: Record<TimeSince, string> = {
  [TimeSince.LESS_THAN_WEEK]: "Menos de 1 semana",
  [TimeSince.ONE_TO_FOUR_WEEKS]: "1 a 4 semanas",
  [TimeSince.ONE_TO_THREE_MONTHS]: "1 a 3 meses",
  [TimeSince.THREE_TO_SIX_MONTHS]: "3 a 6 meses",
  [TimeSince.MORE_THAN_SIX_MONTHS]: "Mais de 6 meses",
};

export const WHO_ENDED_LABELS: Record<WhoEnded, string> = {
  [WhoEnded.ME]: "Eu terminei",
  [WhoEnded.THEM]: "A outra pessoa terminou",
  [WhoEnded.MUTUAL]: "Foi decisão dos dois",
};

export const TIME_OF_DAY_LABELS: Record<TimeOfDay, string> = {
  [TimeOfDay.MORNING]: "Manhã",
  [TimeOfDay.AFTERNOON]: "Tarde",
  [TimeOfDay.NIGHT]: "Noite",
  [TimeOfDay.DAWN]: "Madrugada",
};

export const PAIN_TYPE_LABELS: Record<PainType, string> = {
  [PainType.SAUDADE]: "Saudade",
  [PainType.REJEICAO]: "Rejeição",
  [PainType.CULPA]: "Culpa",
  [PainType.SOLIDAO]: "Solidão",
  [PainType.INSEGURANCA]: "Insegurança",
  [PainType.RAIVA]: "Raiva",
  [PainType.MEDO_FICAR_SO]: "Medo de ficar sozinho(a)",
};

export const JOURNAL_CATEGORY_LABELS: Record<JournalCategory, string> = {
  [JournalCategory.SAUDADE_VS_CARENCIA]: "Saudade ou Carência?",
  [JournalCategory.AMOR_VS_APEGO]: "Amor ou Apego?",
  [JournalCategory.REAL_RELATIONSHIP]: "O que realmente acontecia",
  [JournalCategory.WHY_WANT_BACK]: "Por que quero voltar?",
  [JournalCategory.SELF_DISCOVERY]: "Reencontro comigo",
  [JournalCategory.GRATITUDE]: "Gratidão",
  [JournalCategory.FREE]: "Escrita livre",
};

export const REALITY_TYPE_LABELS: Record<RealityType, string> = {
  [RealityType.FACT]: "Fato real",
  [RealityType.PATTERN]: "Padrão repetido",
  [RealityType.SUFFERING_MOMENT]: "Momento de sofrimento",
  [RealityType.IDEALIZATION]: "O que estou idealizando",
};

export const TAROT_THEME_LABELS: Record<TarotTheme, string> = {
  [TarotTheme.AMOR]: "Amor",
  [TarotTheme.AUTOESTIMA]: "Autoestima",
  [TarotTheme.CURA]: "Cura",
  [TarotTheme.RECOMECO]: "Recomeço",
  [TarotTheme.TRABALHO]: "Trabalho",
  [TarotTheme.GERAL]: "Geral",
};

export const TAROT_READING_TYPE_LABELS: Record<TarotReadingType, string> = {
  [TarotReadingType.DAILY]: "Leitura do Dia",
  [TarotReadingType.EXTRA]: "Leitura Extra",
  [TarotReadingType.LOVE_DEEP]: "Leitura Profunda — Amor",
  [TarotReadingType.HEALING]: "Leitura — Cura Emocional",
  [TarotReadingType.SELF_ESTEEM]: "Leitura — Autoestima",
  [TarotReadingType.DETAILED]: "Leitura Detalhada",
};
