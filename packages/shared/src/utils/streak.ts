export function calculateStreak(streakStartedAt: Date | null, lastRelapseAt: Date | null): number {
  if (!streakStartedAt) return 0;

  const now = new Date();
  const start = new Date(streakStartedAt);
  const diffMs = now.getTime() - start.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  return Math.max(0, diffDays);
}

export function formatStreak(days: number): string {
  if (days === 0) return "Hoje é o dia 1";
  if (days === 1) return "1 dia sem recaída";
  return `${days} dias sem recaída`;
}
