export enum Emotion {
  SAUDADE = "SAUDADE",
  TRISTEZA = "TRISTEZA",
  RAIVA = "RAIVA",
  CULPA = "CULPA",
  ANSIEDADE = "ANSIEDADE",
  SOLIDAO = "SOLIDAO",
  ESPERANCA = "ESPERANCA",
  ALIVIO = "ALIVIO",
  MEDO = "MEDO",
  CONFUSAO = "CONFUSAO",
  INDIFERENCA = "INDIFERENCA",
  DETERMINACAO = "DETERMINACAO",
}

export const EMOTION_LABELS: Record<Emotion, string> = {
  [Emotion.SAUDADE]: "Saudade",
  [Emotion.TRISTEZA]: "Tristeza",
  [Emotion.RAIVA]: "Raiva",
  [Emotion.CULPA]: "Culpa",
  [Emotion.ANSIEDADE]: "Ansiedade",
  [Emotion.SOLIDAO]: "Solidão",
  [Emotion.ESPERANCA]: "Esperança",
  [Emotion.ALIVIO]: "Alívio",
  [Emotion.MEDO]: "Medo",
  [Emotion.CONFUSAO]: "Confusão",
  [Emotion.INDIFERENCA]: "Indiferença",
  [Emotion.DETERMINACAO]: "Determinação",
};

export const EMOTION_ICONS: Record<Emotion, string> = {
  [Emotion.SAUDADE]: "💭",
  [Emotion.TRISTEZA]: "😢",
  [Emotion.RAIVA]: "😤",
  [Emotion.CULPA]: "😔",
  [Emotion.ANSIEDADE]: "😰",
  [Emotion.SOLIDAO]: "🫥",
  [Emotion.ESPERANCA]: "🌱",
  [Emotion.ALIVIO]: "😮‍💨",
  [Emotion.MEDO]: "😨",
  [Emotion.CONFUSAO]: "😵‍💫",
  [Emotion.INDIFERENCA]: "😐",
  [Emotion.DETERMINACAO]: "💪",
};

export enum EmotionSource {
  SAUDADE = "SAUDADE",
  CARENCIA = "CARENCIA",
  CULPA = "CULPA",
  REJEICAO = "REJEICAO",
  APEGO = "APEGO",
  SOLIDAO = "SOLIDAO",
  EGO_FERIDO = "EGO_FERIDO",
  MEDO = "MEDO",
  DESESPERO = "DESESPERO",
  RAIVA = "RAIVA",
  AMOR = "AMOR",
}

export const EMOTION_SOURCE_LABELS: Record<EmotionSource, string> = {
  [EmotionSource.SAUDADE]: "Saudade",
  [EmotionSource.CARENCIA]: "Carência",
  [EmotionSource.CULPA]: "Culpa",
  [EmotionSource.REJEICAO]: "Rejeição",
  [EmotionSource.APEGO]: "Apego",
  [EmotionSource.SOLIDAO]: "Solidão",
  [EmotionSource.EGO_FERIDO]: "Ego Ferido",
  [EmotionSource.MEDO]: "Medo",
  [EmotionSource.DESESPERO]: "Desespero",
  [EmotionSource.RAIVA]: "Raiva",
  [EmotionSource.AMOR]: "Amor",
};

export enum TriggerType {
  SAW_SOCIAL_MEDIA = "SAW_SOCIAL_MEDIA",
  RECEIVED_MESSAGE = "RECEIVED_MESSAGE",
  MUTUAL_FRIEND = "MUTUAL_FRIEND",
  PLACE_MEMORY = "PLACE_MEMORY",
  SONG_MOVIE = "SONG_MOVIE",
  LONELINESS = "LONELINESS",
  ALCOHOL = "ALCOHOL",
  NIGHT_TIME = "NIGHT_TIME",
  HOLIDAY_DATE = "HOLIDAY_DATE",
  OTHER = "OTHER",
}

export const TRIGGER_LABELS: Record<TriggerType, string> = {
  [TriggerType.SAW_SOCIAL_MEDIA]: "Vi nas redes sociais",
  [TriggerType.RECEIVED_MESSAGE]: "Recebi uma mensagem",
  [TriggerType.MUTUAL_FRIEND]: "Amigo em comum falou sobre",
  [TriggerType.PLACE_MEMORY]: "Passei por um lugar que lembra",
  [TriggerType.SONG_MOVIE]: "Uma música ou filme ativou",
  [TriggerType.LONELINESS]: "Estava me sentindo sozinho(a)",
  [TriggerType.ALCOHOL]: "Bebi e a dor veio",
  [TriggerType.NIGHT_TIME]: "A noite chegou e bateu",
  [TriggerType.HOLIDAY_DATE]: "Data especial ou feriado",
  [TriggerType.OTHER]: "Outro",
};

export enum RiskLevel {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export const RISK_LABELS: Record<RiskLevel, string> = {
  [RiskLevel.LOW]: "Risco Baixo",
  [RiskLevel.MEDIUM]: "Risco Médio",
  [RiskLevel.HIGH]: "Risco Alto",
};

export const RISK_COLORS: Record<RiskLevel, string> = {
  [RiskLevel.LOW]: "#22c55e",
  [RiskLevel.MEDIUM]: "#eab308",
  [RiskLevel.HIGH]: "#ef4444",
};
