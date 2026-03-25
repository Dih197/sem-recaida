"use client";

import { useState, useEffect } from "react";
import { JournalCategory, JOURNAL_CATEGORY_LABELS, formatRelativeDate } from "@sem-recaida/shared";

interface JournalEntryData {
  id: string;
  createdAt: string;
  promptText: string | null;
  entryText: string;
  category: string | null;
}

export default function DiarioPage() {
  const [entries, setEntries] = useState<JournalEntryData[]>([]);
  const [showNew, setShowNew] = useState(false);
  const [category, setCategory] = useState<JournalCategory | null>(null);
  const [entryText, setEntryText] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/diario").then((r) => r.json()).then(setEntries);
  }, []);

  async function handleSave() {
    if (!entryText.trim()) return;
    setSaving(true);
    const res = await fetch("/api/diario", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ entryText, category }),
    });
    if (res.ok) {
      const entry = await res.json();
      setEntries([entry, ...entries]);
      setEntryText("");
      setShowNew(false);
      setCategory(null);
    }
    setSaving(false);
  }

  const categories = Object.values(JournalCategory);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Diário Guiado</h1>
        <button onClick={() => setShowNew(!showNew)} className="btn-primary text-sm py-2 px-4">
          {showNew ? "Cancelar" : "Nova entrada"}
        </button>
      </div>

      {showNew && (
        <div className="card space-y-4">
          <p className="text-slate-400 text-sm">Escolha um tema (opcional)</p>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat === category ? null : cat)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                  category === cat
                    ? "border-brand-primary bg-brand-primary/10 text-brand-primary"
                    : "border-white/10 text-slate-400 hover:border-white/20"
                }`}
              >
                {JOURNAL_CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>

          <textarea
            value={entryText}
            onChange={(e) => setEntryText(e.target.value)}
            className="textarea-field"
            placeholder="Escreva o que está sentindo, pensando, querendo..."
            rows={6}
          />

          <button
            onClick={handleSave}
            disabled={saving || !entryText.trim()}
            className="btn-primary w-full disabled:opacity-50"
          >
            {saving ? "Salvando..." : "Salvar entrada"}
          </button>
        </div>
      )}

      {entries.length === 0 && !showNew ? (
        <div className="card text-center py-8">
          <p className="text-slate-400">Nenhuma entrada ainda</p>
          <p className="text-slate-500 text-sm mt-1">Escrever ajuda a separar a dor da confusão</p>
        </div>
      ) : (
        <div className="space-y-3">
          {entries.map((entry) => (
            <div key={entry.id} className="card">
              <div className="flex items-center justify-between mb-2">
                {entry.category && (
                  <span className="text-xs text-brand-primary">
                    {JOURNAL_CATEGORY_LABELS[entry.category as JournalCategory]}
                  </span>
                )}
                <span className="text-xs text-slate-500">
                  {formatRelativeDate(new Date(entry.createdAt))}
                </span>
              </div>
              <p className="text-sm text-slate-300 line-clamp-3">{entry.entryText}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
