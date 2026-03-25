export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export enum CurrentNeed {
  OVERCOME = "OVERCOME",
  STOP_RELAPSES = "STOP_RELAPSES",
  RECOVER_SELF_ESTEEM = "RECOVER_SELF_ESTEEM",
  UNDERSTAND_WORTH = "UNDERSTAND_WORTH",
}

export enum TimeSince {
  LESS_THAN_WEEK = "LESS_THAN_WEEK",
  ONE_TO_FOUR_WEEKS = "ONE_TO_FOUR_WEEKS",
  ONE_TO_THREE_MONTHS = "ONE_TO_THREE_MONTHS",
  THREE_TO_SIX_MONTHS = "THREE_TO_SIX_MONTHS",
  MORE_THAN_SIX_MONTHS = "MORE_THAN_SIX_MONTHS",
}

export enum WhoEnded {
  ME = "ME",
  THEM = "THEM",
  MUTUAL = "MUTUAL",
}

export enum TimeOfDay {
  MORNING = "MORNING",
  AFTERNOON = "AFTERNOON",
  NIGHT = "NIGHT",
  DAWN = "DAWN",
}

export enum PainType {
  SAUDADE = "SAUDADE",
  REJEICAO = "REJEICAO",
  CULPA = "CULPA",
  SOLIDAO = "SOLIDAO",
  INSEGURANCA = "INSEGURANCA",
  RAIVA = "RAIVA",
  MEDO_FICAR_SO = "MEDO_FICAR_SO",
}

export enum SubscriptionStatus {
  FREE = "FREE",
  PREMIUM = "PREMIUM",
  CANCELED = "CANCELED",
}

export interface UserProfile {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  onboardingDone: boolean;
  gender: Gender | null;
  preference: Gender | null;
  currentNeed: CurrentNeed | null;
  timeSinceBreakup: TimeSince | null;
  whoEnded: WhoEnded | null;
  stillInContact: boolean | null;
  relapseCount: number | null;
  strongestPain: PainType | null;
  hardestTime: TimeOfDay | null;
  lastRelapseAt: Date | null;
  streakStartedAt: Date | null;
  subscriptionStatus: SubscriptionStatus;
}

export interface UserContext {
  gender: Gender;
  preference: Gender;
  currentNeed: CurrentNeed;
  timeSinceBreakup: TimeSince;
  whoEnded: WhoEnded;
  stillInContact: boolean;
  relapseCount: number;
  strongestPain: PainType;
  hardestTime: TimeOfDay;
  currentStreak: number;
}

export interface OnboardingData {
  gender: Gender;
  preference: Gender;
  currentNeed: CurrentNeed;
  timeSinceBreakup: TimeSince;
  whoEnded: WhoEnded;
  stillInContact: boolean;
  relapseCount: number;
  strongestPain: PainType;
  hardestTime: TimeOfDay;
}
