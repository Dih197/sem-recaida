import { requireOnboarded } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { calculateStreak, formatStreak, startOfDay } from "@sem-recaida/shared";
import { EMOTION_LABELS, EMOTION_SOURCE_LABELS, RISK_LABELS, RISK_COLORS } from "@sem-recaida/shared";
import Link from "next/link";

export default async function DashboardPage() {
  const user = await requireOnboarded();

  const streak = calculateStreak(user.streakStartedAt, user.lastRelapseAt);

  // Last check-in
  const lastCheckIn = await prisma.checkIn.findFirst({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  // Today's check-in
  const todayStart = startOfDay();
  const todayCheckIn = await prisma.checkIn.findFirst({
    where: {
      userId: user.id,
      createdAt: { gte: todayStart },
    },
  });

  // Active plan
  const activePlan = await prisma.userRecoveryPlan.findFirst({
    where: { userId: user.id, status: "ACTIVE" },
    include: {
      template: true,
      days: { where: { completedAt: { not: null } } },
    },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">
          Olá, {user.name?.split(" ")[0] || "você"} 👋
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Como você está hoje?
        </p>
      </div>

      {/* Streak Card */}
      <div className="card bg-gradient-to-br from-brand-primary/20 to-brand-secondary/10 border-brand-primary/20">
        <div className="text-center">
          <p className="text-4xl font-bold text-brand-primary">{streak}</p>
          <p className="text-slate-300 mt-1">{formatStreak(streak)}</p>
        </div>
      </div>

      {/* Last Emotion */}
      {lastCheckIn && (
        <div className="card">
          <h3 className="text-sm text-slate-400 mb-2">Último sentimento registrado</h3>
          <div className="flex items-center justify-between">
            <span className="text-lg">
              {EMOTION_LABELS[lastCheckIn.feeling as keyof typeof EMOTION_LABELS]}
            </span>
            {lastCheckIn.relapseRisk && (
              <span
                className="text-xs px-2 py-1 rounded-full font-medium"
                style={{
                  backgroundColor: `${RISK_COLORS[lastCheckIn.relapseRisk as keyof typeof RISK_COLORS]}20`,
                  color: RISK_COLORS[lastCheckIn.relapseRisk as keyof typeof RISK_COLORS],
                }}
              >
                {RISK_LABELS[lastCheckIn.relapseRisk as keyof typeof RISK_LABELS]}
              </span>
            )}
          </div>
          {lastCheckIn.emotionSource && (
            <p className="text-sm text-slate-400 mt-1">
              Fonte: {EMOTION_SOURCE_LABELS[lastCheckIn.emotionSource as keyof typeof EMOTION_SOURCE_LABELS]}
            </p>
          )}
        </div>
      )}

      {/* Active Plan */}
      {activePlan && (
        <div className="card">
          <h3 className="text-sm text-slate-400 mb-2">Plano ativo</h3>
          <p className="font-medium">{activePlan.template.name}</p>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex-1 h-2 bg-brand-surface-light rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-primary rounded-full"
                style={{
                  width: `${(activePlan.days.length / activePlan.template.duration) * 100}%`,
                }}
              />
            </div>
            <span className="text-sm text-slate-400">
              {activePlan.days.length}/{activePlan.template.duration}
            </span>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        {!todayCheckIn && (
          <Link href="/checkin" className="card hover:border-brand-primary/30 transition-colors text-center">
            <span className="text-2xl">💭</span>
            <p className="text-sm font-medium mt-2">Check-in do dia</p>
          </Link>
        )}
        <Link href="/emergencia" className="card hover:border-red-500/30 transition-colors text-center border-red-900/20 bg-red-950/20">
          <span className="text-2xl">🚨</span>
          <p className="text-sm font-medium mt-2">Botão de emergência</p>
        </Link>
        <Link href="/tarot" className="card hover:border-violet-500/30 transition-colors text-center">
          <span className="text-2xl">✨</span>
          <p className="text-sm font-medium mt-2">Tarô do dia</p>
        </Link>
        <Link href="/diario" className="card hover:border-brand-primary/30 transition-colors text-center">
          <span className="text-2xl">📖</span>
          <p className="text-sm font-medium mt-2">Diário guiado</p>
        </Link>
      </div>
    </div>
  );
}
