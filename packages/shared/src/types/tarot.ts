export enum TarotTheme {
  AMOR = "AMOR",
  AUTOESTIMA = "AUTOESTIMA",
  CURA = "CURA",
  RECOMECO = "RECOMECO",
  TRABALHO = "TRABALHO",
  GERAL = "GERAL",
}

export enum TarotReadingType {
  DAILY = "DAILY",
  EXTRA = "EXTRA",
  LOVE_DEEP = "LOVE_DEEP",
  HEALING = "HEALING",
  SELF_ESTEEM = "SELF_ESTEEM",
  DETAILED = "DETAILED",
}

export interface TarotCard {
  number: number;
  name: string;
  arcana: "major" | "minor";
  suit?: string;
  keywords: string[];
  image: string;
}

export interface TarotInterpretation {
  mainEnergy: string;
  centralMessage: string;
  dailyAdvice: string;
  alert: string;
  shortPhrase: string;
  fullReading?: string; // premium only
}

export interface TarotReadingRecord {
  id: string;
  userId: string;
  createdAt: Date;
  theme: TarotTheme;
  cardName: string;
  cardNumber: number;
  isPremium: boolean;
  readingType: TarotReadingType;
  mainEnergy: string | null;
  centralMessage: string | null;
  dailyAdvice: string | null;
  alert: string | null;
  shortPhrase: string | null;
  fullReading: string | null;
}
