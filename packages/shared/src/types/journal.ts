export enum JournalCategory {
  SAUDADE_VS_CARENCIA = "SAUDADE_VS_CARENCIA",
  AMOR_VS_APEGO = "AMOR_VS_APEGO",
  REAL_RELATIONSHIP = "REAL_RELATIONSHIP",
  WHY_WANT_BACK = "WHY_WANT_BACK",
  SELF_DISCOVERY = "SELF_DISCOVERY",
  GRATITUDE = "GRATITUDE",
  FREE = "FREE",
}

export interface JournalEntry {
  id: string;
  userId: string;
  createdAt: Date;
  promptId: string | null;
  promptText: string | null;
  entryText: string;
  category: JournalCategory | null;
}

export interface JournalPrompt {
  id: string;
  text: string;
  category: JournalCategory;
}
