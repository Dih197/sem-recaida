import { CurrentNeed } from "./user";

export enum PlanStatus {
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
  ABANDONED = "ABANDONED",
}

export interface RecoveryPlanTemplate {
  id: string;
  name: string;
  duration: number; // 7, 14, 30
  description: string;
  targetNeed: CurrentNeed | null;
  days: RecoveryDayTemplate[];
}

export interface RecoveryDayTemplate {
  id: string;
  dayNumber: number;
  title: string;
  description: string;
  actionText: string;
}

export interface UserRecoveryPlan {
  id: string;
  userId: string;
  templateId: string;
  startedAt: Date;
  status: PlanStatus;
  days: UserRecoveryDay[];
}

export interface UserRecoveryDay {
  id: string;
  dayNumber: number;
  completedAt: Date | null;
  skipped: boolean;
  reflectionText: string | null;
}
