"use client";

import { useState, useEffect } from "react";
import { EMOTION_LABELS, TRIGGER_LABELS } from "@sem-recaida/shared";

interface ProgressData {
  currentStreak: number;
  longestStreak: number;
  totalImpulsesBlocked: number;
  totalCheckIns: number;
  weeklyEmotions: Record<string, number>;
  weeklyTriggers: Record<string, number>;
  recentEmergencyCount: number;
  recentRelapses: number;
  lastWeeklySummary: string | null;
}

export default function ProgressoPage() {
  const [data, setData] = useState<ProgressData | null>(null);

  useEffect(() => {
    fetch("/api/progresso").then((r) => r.json()).then(setData);
  }, []);

  if (!data) {
    return <div className="text-center py-12 text-slate-400">Carregando...</div>;
  }

  const sortedEmotions = Object.entries(data.weeklyEmotions)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const sortedTriggers = Object.entries(data.weeklyTriggers)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Seu Progresso</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="card text-center">
          <p className="text-3xl font-bold text-brand-primary">{data.currentStreak}</p>
          <p className="text-xs text-slate-400 mt-1">Dias sem recaída</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-bold text-brand-secondary">{data.longestStreak}</p>
          <p className="text-xs text-slate-400 mt-1">Maior sequência</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-bold text-green-400">{data.totalImpulsesBlocked}</p>
          <p className="text-xs text-slate-400 mt-1">Impulsos bloqueados</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-bold text-violet-400">{data.totalCheckIns}</p>
          <p className="text-xs text-slate-400 mt-1">Check-ins feitos</p>
        </div>
      </div>

      {/* Weekly Emotions */}
      {sortedEmotions.length > 0 && (
        <div className="card">
          <h3 className="text-sm text-slate-400 mb-3">Emoções da semana</h3>
          <div className="space-y-2">
            {sortedEmotions.map(([emotion, count]) => {
              const maxCount = sortedEmotions[0][1];
              return (
                <div key={emotion} className="flex items-center gap-3">
                  <span className="text-sm w-24 text-slate-300">
                    {EMOTION_LABELS[emotion as keyof typeof EMOTION_LABELS] || emotion}
                  </span>
                  <div className="flex-1 h-2 bg-brand-surface-light rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-primary rounded-full"
                      style={{ width: `${(count / maxCount) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-slate-500 w-6 text-right">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Weekly Triggers */}
      {sortedTriggers.length > 0 && (
        <div className="card">
          <h3 className="text-sm text-slate-400 mb-3">Gatilhos da semana</h3>
          <div className="space-y-2">
            {sortedTriggers.map(([trigger, count]) => (
              <div key={trigger} className="flex items-center justify-between">
                <span className="text-sm text-slate-300">
                  {TRIGGER_LABELS[trigger as keyof typeof TRIGGER_LABELS] || trigger}
                </span>
                <span className="text-xs text-slate-500">{count}x</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Weekly Summary */}
      {data.lastWeeklySummary && (
        <div className="card bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 border-brand-primary/20">
          <h3 className="text-sm text-slate-400 mb-2">Resumo da semana</h3>
          <p className="text-slate-200 text-sm">{data.lastWeeklySummary}</p>
        </div>
      )}
    </div>
  );
}
