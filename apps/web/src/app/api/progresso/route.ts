import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { calculateStreak, daysAgo } from "@sem-recaida/shared";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });

  const progress = await prisma.userProgress.findUnique({
    where: { userId: session.user.id },
  });

  // Recent check-ins for emotion stats
  const recentCheckIns = await prisma.checkIn.findMany({
    where: {
      userId: session.user.id,
      createdAt: { gte: daysAgo(7) },
    },
    orderBy: { createdAt: "desc" },
  });

  // Recent emergency uses
  const recentEmergencies = await prisma.emergencyUse.findMany({
    where: {
      userId: session.user.id,
      createdAt: { gte: daysAgo(7) },
    },
  });

  const streak = calculateStreak(user.streakStartedAt, user.lastRelapseAt);

  // Count emotions
  const emotionCounts: Record<string, number> = {};
  for (const ci of recentCheckIns) {
    emotionCounts[ci.feeling] = (emotionCounts[ci.feeling] || 0) + 1;
  }

  // Count triggers
  const triggerCounts: Record<string, number> = {};
  for (const ci of recentCheckIns) {
    if (ci.triggerType) {
      triggerCounts[ci.triggerType] = (triggerCounts[ci.triggerType] || 0) + 1;
    }
  }

  return NextResponse.json({
    currentStreak: streak,
    longestStreak: progress?.longestStreak ?? streak,
    totalImpulsesBlocked: progress?.totalImpulsesBlocked ?? 0,
    totalCheckIns: progress?.totalCheckIns ?? 0,
    weeklyEmotions: emotionCounts,
    weeklyTriggers: triggerCounts,
    recentEmergencyCount: recentEmergencies.length,
    recentRelapses: recentEmergencies.filter((e) => e.relapsed).length,
    lastWeeklySummary: progress?.lastWeeklySummary ?? null,
  });
}
