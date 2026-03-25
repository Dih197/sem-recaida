export enum RealityType {
  FACT = "FACT",
  PATTERN = "PATTERN",
  SUFFERING_MOMENT = "SUFFERING_MOMENT",
  IDEALIZATION = "IDEALIZATION",
}

export interface RealityEntry {
  id: string;
  userId: string;
  createdAt: Date;
  entryType: RealityType;
  title: string | null;
  description: string;
  category: string | null;
}
