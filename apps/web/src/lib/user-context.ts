import type { User } from "@prisma/client";
import type { UserContext } from "@sem-recaida/shared";
import { calculateStreak } from "@sem-recaida/shared";

export function buildUserContext(user: User): UserContext {
  return {
    gender: user.gender as unknown as UserContext["gender"],
    preference: user.preference as unknown as UserContext["preference"],
    currentNeed: user.currentNeed as unknown as UserContext["currentNeed"],
    timeSinceBreakup: user.timeSinceBreakup as unknown as UserContext["timeSinceBreakup"],
    whoEnded: user.whoEnded as unknown as UserContext["whoEnded"],
    stillInContact: user.stillInContact ?? false,
    relapseCount: user.relapseCount ?? 0,
    strongestPain: user.strongestPain as unknown as UserContext["strongestPain"],
    hardestTime: user.hardestTime as unknown as UserContext["hardestTime"],
    currentStreak: calculateStreak(user.streakStartedAt, user.lastRelapseAt),
  };
}
