"use client";

import { useState } from "react";
import { TarotTheme, TAROT_THEME_LABELS } from "@sem-recaida/shared";
import type { TarotInterpretation } from "@sem-recaida/shared";

export default function TarotPage() {
  const [step, setStep] = useState<"theme" | "revealing" | "reading" | "used">("theme");
  const [theme, setTheme] = useState<TarotTheme | null>(null);
  const [cardName, setCardName] = useState("");
  const [reading, setReading] = useState<TarotInterpretation | null>(null);

  async function handleReveal(selectedTheme: TarotTheme) {
    setTheme(selectedTheme);
    setStep("revealing");

    try {
      const res = await fetch("/api/tarot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme: selectedTheme }),
      });

      const data = await res.json();

      if (data.error === "ALREADY_USED") {
        setStep("used");
        return;
      }

      if (data.reading) {
        setCardName(data.cardName);
        setReading(data.reading);
        setStep("reading");
      }
    } catch {
      setStep("theme");
    }
  }

  const themes = Object.values(TarotTheme);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-5xl mb-3">✨</div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
          Tarô do Dia
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Uma pausa, uma leitura, uma mensagem para o coração
        </p>
      </div>

      {/* Theme Selection */}
      {step === "theme" && (
        <div>
          <p className="text-slate-400 mb-4 text-center">Escolha o tema da sua leitura</p>
          <div className="grid grid-cols-2 gap-3">
            {themes.map((t) => (
              <button
                key={t}
                onClick={() => handleReveal(t)}
                className="card hover:border-violet-500/30 transition-colors text-center py-6"
              >
                <p className="font-medium text-violet-300">{TAROT_THEME_LABELS[t]}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Revealing Animation */}
      {step === "revealing" && (
        <div className="card text-center py-16">
          <div className="animate-pulse text-6xl mb-4">🃏</div>
          <p className="text-violet-300">Revelando sua carta...</p>
        </div>
      )}

      {/* Reading */}
      {step === "reading" && reading && (
        <div className="space-y-4">
          <div className="card text-center bg-gradient-to-br from-violet-950/50 to-pink-950/30 border-violet-500/20">
            <p className="text-sm text-violet-400 mb-1">Sua carta</p>
            <p className="text-3xl font-bold text-white mb-2">{cardName}</p>
            <p className="text-violet-300 text-sm">{reading.mainEnergy}</p>
          </div>

          <div className="card">
            <p className="text-sm text-violet-400 mb-2">Mensagem central</p>
            <p className="text-slate-200">{reading.centralMessage}</p>
          </div>

          <div className="card">
            <p className="text-sm text-violet-400 mb-2">Conselho para o dia</p>
            <p className="text-slate-200">{reading.dailyAdvice}</p>
          </div>

          <div className="card border-yellow-900/20">
            <p className="text-sm text-yellow-400 mb-2">Atenção</p>
            <p className="text-slate-200">{reading.alert}</p>
          </div>

          <div className="card bg-gradient-to-br from-violet-950/50 to-pink-950/30 border-violet-500/20 text-center">
            <p className="text-sm text-violet-400 mb-2">Guarde consigo</p>
            <p className="text-lg font-medium text-white italic">
              &ldquo;{reading.shortPhrase}&rdquo;
            </p>
          </div>
        </div>
      )}

      {/* Already Used */}
      {step === "used" && (
        <div className="card text-center py-8">
          <div className="text-4xl mb-3">🌙</div>
          <p className="text-slate-300 mb-2">Sua leitura gratuita de hoje já foi feita</p>
          <p className="text-slate-500 text-sm mb-6">
            Volte amanhã para uma nova carta, ou desbloqueie leituras extras
          </p>
          <button className="btn-tarot">
            Desbloquear leituras extras
          </button>
        </div>
      )}
    </div>
  );
}
