"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface PlanTemplate {
  id: string;
  name: string;
  duration: number;
  description: string;
}

interface ActivePlan {
  id: string;
  template: PlanTemplate;
  days: { dayNumber: number; completedAt: string | null }[];
}

export default function PlanoPage() {
  const router = useRouter();
  const [templates, setTemplates] = useState<PlanTemplate[]>([]);
  const [activePlan, setActivePlan] = useState<ActivePlan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/plano")
      .then((r) => r.json())
      .then((data) => {
        setTemplates(data.templates || []);
        setActivePlan(data.activePlan || null);
        setLoading(false);
      });
  }, []);

  async function startPlan(templateId: string) {
    const res = await fetch("/api/plano", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ templateId }),
    });
    if (res.ok) {
      router.refresh();
      window.location.reload();
    }
  }

  if (loading) {
    return <div className="text-center py-12 text-slate-400">Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Plano de Recuperação</h1>

      {activePlan ? (
        <div className="space-y-4">
          <div className="card">
            <h2 className="text-lg font-semibold">{activePlan.template.name}</h2>
            <p className="text-slate-400 text-sm mt-1">{activePlan.template.description}</p>
            <div className="flex items-center gap-2 mt-3">
              <div className="flex-1 h-2 bg-brand-surface-light rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-primary rounded-full transition-all"
                  style={{
                    width: `${(activePlan.days.filter((d) => d.completedAt).length / activePlan.template.duration) * 100}%`,
                  }}
                />
              </div>
              <span className="text-sm text-slate-400">
                {activePlan.days.filter((d) => d.completedAt).length}/{activePlan.template.duration} dias
              </span>
            </div>
          </div>

          <p className="text-sm text-slate-500 text-center">
            Se escorregar, o caminho continua. Sem culpa, sem castigo.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-slate-400">Escolha um plano para começar sua trilha</p>
          {templates.length === 0 ? (
            <p className="text-slate-500 text-center py-8">Nenhum plano disponível ainda</p>
          ) : (
            templates.map((t) => (
              <button
                key={t.id}
                onClick={() => startPlan(t.id)}
                className="card w-full text-left hover:border-brand-primary/30 transition-colors"
              >
                <h3 className="font-semibold">{t.name}</h3>
                <p className="text-sm text-slate-400 mt-1">{t.description}</p>
                <span className="text-xs text-brand-primary mt-2 inline-block">{t.duration} dias</span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
