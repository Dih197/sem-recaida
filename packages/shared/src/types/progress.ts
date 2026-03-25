export interface UserProgress {
  id: string;
  userId: string;
  totalImpulsesBlocked: number;
  totalCheckIns: number;
  longestStreak: number;
  currentStreak: number;
  weeklyEmotions: Record<string, number> | null;
  dangerousHours: Record<string, number> | null;
  dangerousTriggers: Record<string, number> | null;
  lastWeeklySummary: string | null;
  lastWeeklySummaryAt: Date | null;
  updatedAt: Date;
}

export interface DashboardData {
  currentStreak: number;
  lastEmotion: string | null;
  lastEmotionSource: string | null;
  topTrigger: string | null;
  relapseRisk: string | null;
  dailyGuidance: string | null;
  todayCheckInDone: boolean;
  todayTarotDone: boolean;
  activePlan: { name: string; currentDay: number; totalDays: number } | null;
}
