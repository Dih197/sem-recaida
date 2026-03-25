"use client";

import { useState, useEffect } from "react";
import { RealityType, REALITY_TYPE_LABELS } from "@sem-recaida/shared";

interface RealityEntryData {
  id: string;
  entryType: string;
  title: string | null;
  description: string;
  createdAt: string;
}

export default function RealidadePage() {
  const [entries, setEntries] = useState<RealityEntryData[]>([]);
  const [showNew, setShowNew] = useState(false);
  const [entryType, setEntryType] = useState<RealityType>(RealityType.FACT);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/realidade").then((r) => r.json()).then(setEntries);
  }, []);

  async function handleSave() {
    if (!description.trim()) return;
    setSaving(true);
    const res = await fetch("/api/realidade", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ entryType, title: title || undefined, description }),
    });
    if (res.ok) {
      const entry = await res.json();
      setEntries([entry, ...entries]);
      setTitle("");
      setDescription("");
      setShowNew(false);
    }
    setSaving(false);
  }

  const types = Object.values(RealityType);
  const grouped = types.reduce(
    (acc, type) => {
      acc[type] = entries.filter((e) => e.entryType === type);
      return acc;
    },
    {} as Record<string, RealityEntryData[]>,
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Modo Realidade</h1>
        <p className="text-slate-400 text-sm mt-1">
          Quebre a fantasia. Lembre do que realmente acontecia.
        </p>
      </div>

      <button onClick={() => setShowNew(!showNew)} className="btn-primary w-full">
        {showNew ? "Cancelar" : "Adicionar registro"}
      </button>

      {showNew && (
        <div className="card space-y-4">
          <div className="flex flex-wrap gap-2">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setEntryType(type)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                  entryType === type
                    ? "border-brand-primary bg-brand-primary/10 text-brand-primary"
                    : "border-white/10 text-slate-400"
                }`}
              >
                {REALITY_TYPE_LABELS[type]}
              </button>
            ))}
          </div>

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-field"
            placeholder="Título (opcional)"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea-field"
            placeholder="Descreva o que realmente acontecia..."
            rows={4}
          />

          <button
            onClick={handleSave}
            disabled={saving || !description.trim()}
            className="btn-primary w-full disabled:opacity-50"
          >
            {saving ? "Salvando..." : "Salvar"}
          </button>
        </div>
      )}

      {types.map((type) => (
        grouped[type]?.length > 0 && (
          <div key={type}>
            <h3 className="text-sm font-medium text-slate-400 mb-2">
              {REALITY_TYPE_LABELS[type]}
            </h3>
            <div className="space-y-2">
              {grouped[type].map((entry) => (
                <div key={entry.id} className="card">
                  {entry.title && <p className="font-medium text-sm mb-1">{entry.title}</p>}
                  <p className="text-sm text-slate-300">{entry.description}</p>
                </div>
              ))}
            </div>
          </div>
        )
      ))}

      {entries.length === 0 && !showNew && (
        <div className="card text-center py-8">
          <p className="text-slate-400">Nenhum registro ainda</p>
          <p className="text-slate-500 text-sm mt-1">
            Lembrar dos fatos ajuda a ver a diferença entre o que foi vivido e o que está sendo idealizado
          </p>
        </div>
      )}
    </div>
  );
}
