import { requireOnboarded } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { calculateStreak, formatStreak, startOfDay } from "@sem-recaida/shared";
import { EMOTION_LABELS, EMOTION_SOURCE_LABELS, RISK_LABELS } from "@sem-recaida/shared";
import Link from "next/link";

export default async function DashboardPage() {
  const user = await requireOnboarded();
  const streak = calculateStreak(user.streakStartedAt, user.lastRelapseAt);

  const lastCheckIn = await prisma.checkIn.findFirst({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  const todayStart = startOfDay();
  const todayCheckIn = await prisma.checkIn.findFirst({
    where: { userId: user.id, createdAt: { gte: todayStart } },
  });

  const activePlan = await prisma.userRecoveryPlan.findFirst({
    where: { userId: user.id, status: "ACTIVE" },
    include: {
      template: true,
      days: { where: { completedAt: { not: null } } },
    },
  });

  const progress = await prisma.userProgress.findUnique({ where: { userId: user.id } });

  return (
    <div className="space-y-6 pb-4">
      {/* Header */}
      <div className="animate-in">
        <p className="text-[var(--color-text-muted)] text-xs tracking-widest uppercase">Bem-vindo de volta</p>
        <h1 className="text-2xl font-bold mt-1 text-gradient-mystic">
          {user.name?.split(" ")[0] || "Guerreiro(a)"}
        </h1>
      </div>

      {/* Streak Ring */}
      <div className="card-mystic text-center py-6 animate-in animate-in-delay-1">
        <div className="streak-ring mx-auto">
          <svg width="160" height="160" viewBox="0 0 160 160">
            <defs>
              <linearGradient id="streakGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--color-mystic)" />
                <stop offset="50%" stopColor="var(--color-flame)" />
                <stop offset="100%" stopColor="var(--color-gold)" />
              </linearGradient>
            </defs>
            <circle className="ring-bg" cx="80" cy="80" r="70" fill="none" strokeWidth="6" />
            <circle className="ring-progress" cx="80" cy="80" r="70" fill="none" strokeWidth="6" strokeLinecap="round" />
          </svg>
          <div className="streak-number">
            <span className="number">{streak}</span>
            <span className="label">dias sem recaída</span>
          </div>
        </div>
        <p className="text-[var(--color-text-muted)] text-xs mt-4 tracking-wide" style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}>
          {formatStreak(streak)}
        </p>
      </div>

      {/* Last Emotion */}
      {lastCheckIn && (
        <div className="card-mystic animate-in animate-in-delay-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-[var(--color-text-dim)] tracking-wider uppercase mb-1">Último sentimento</p>
              <span className="text-lg font-semibold" style={{ fontFamily: "'Cinzel', serif" }}>
                {EMOTION_LABELS[lastCheckIn.feeling as keyof typeof EMOTION_LABELS]}
              </span>
            </div>
            {lastCheckIn.relapseRisk && (
              <span className={`text-xs px-3 py-1.5 rounded-full font-medium tracking-wide risk-${lastCheckIn.relapseRisk.toLowerCase()}`}>
                {RISK_LABELS[lastCheckIn.relapseRisk as keyof typeof RISK_LABELS]}
              </span>
            )}
          </div>
          {lastCheckIn.emotionSource && (
            <p className="text-sm text-[var(--color-text-muted)] mt-2">
              Fonte: {EMOTION_SOURCE_LABELS[lastCheckIn.emotionSource as keyof typeof EMOTION_SOURCE_LABELS]}
            </p>
          )}
        </div>
      )}

      {/* Stats Bar */}
      {progress && (
        <div className="grid grid-cols-2 gap-3 animate-in animate-in-delay-3">
          <div className="card-mystic text-center py-4">
            <p className="text-2xl font-bold text-[var(--color-emerald)]" style={{ fontFamily: "'Cinzel', serif" }}>
              {progress.totalImpulsesBlocked}
            </p>
            <p className="text-[10px] text-[var(--color-text-dim)] tracking-wider uppercase mt-1">Impulsos bloqueados</p>
          </div>
          <div className="card-mystic text-center py-4">
            <p className="text-2xl font-bold text-[var(--color-cyan)]" style={{ fontFamily: "'Cinzel', serif" }}>
              {progress.totalCheckIns}
            </p>
            <p className="text-[10px] text-[var(--color-text-dim)] tracking-wider uppercase mt-1">Check-ins feitos</p>
          </div>
        </div>
      )}

      {/* Active Plan */}
      {activePlan && (
        <div className="card-mystic animate-in animate-in-delay-4">
          <p className="text-xs text-[var(--color-text-dim)] tracking-wider uppercase mb-2">Plano ativo</p>
          <p className="font-semibold text-sm" style={{ fontFamily: "'Cinzel', serif" }}>{activePlan.template.name}</p>
          <div className="mt-3">
            <div className="xp-bar">
              <div
                className="xp-bar-fill"
                style={{ width: `${(activePlan.days.length / activePlan.template.duration) * 100}%` }}
              />
            </div>
            <div className="flex justify-between mt-1.5">
              <span className="text-[10px] text-[var(--color-text-dim)]">Dia {activePlan.days.length}</span>
              <span className="text-[10px] text-[var(--color-text-dim)]">{activePlan.template.duration} dias</span>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3 animate-in animate-in-delay-5">
        {!todayCheckIn && (
          <Link href="/checkin" className="card-mystic hover:scale-[1.02] transition-all text-center py-6 group">
            <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform" style={{ filter: "drop-shadow(0 0 10px rgba(139, 92, 246, 0.3))" }}>◆</span>
            <p className="text-xs font-semibold tracking-wider" style={{ fontFamily: "'Cinzel', serif" }}>Check-in</p>
          </Link>
        )}
        <Link href="/emergencia" className="card-flame hover:scale-[1.02] transition-all text-center py-6 group">
          <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform" style={{ filter: "drop-shadow(0 0 10px rgba(239, 68, 68, 0.4))" }}>⚡</span>
          <p className="text-xs font-semibold tracking-wider text-red-300" style={{ fontFamily: "'Cinzel', serif" }}>Emergência</p>
        </Link>
        <Link href="/tarot" className="card-gold hover:scale-[1.02] transition-all text-center py-6 group">
          <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform" style={{ filter: "drop-shadow(0 0 10px rgba(251, 191, 36, 0.3))" }}>✦</span>
          <p className="text-xs font-semibold tracking-wider text-[var(--color-gold)]" style={{ fontFamily: "'Cinzel', serif" }}>Tarô</p>
        </Link>
        <Link href="/diario" className="card-mystic hover:scale-[1.02] transition-all text-center py-6 group">
          <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform" style={{ filter: "drop-shadow(0 0 10px rgba(139, 92, 246, 0.3))" }}>☽</span>
          <p className="text-xs font-semibold tracking-wider" style={{ fontFamily: "'Cinzel', serif" }}>Diário</p>
        </Link>
      </div>
    </div>
  );
}
