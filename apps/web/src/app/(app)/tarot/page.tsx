"use client";

import { useState } from "react";
import { TarotTheme, TAROT_THEME_LABELS } from "@sem-recaida/shared";
import type { TarotInterpretation } from "@sem-recaida/shared";

const THEME_ICONS: Record<string, string> = {
  AMOR: "♥",
  AUTOESTIMA: "✦",
  CURA: "☽",
  RECOMECO: "☀",
  TRABALHO: "⚙",
  GERAL: "∞",
};

const CARD_SYMBOLS = ["☽", "☀", "✦", "♦", "⚝", "✧", "♠", "⚜", "✵", "☿", "♃", "♄", "⚕", "☊", "⚷", "✤", "❋", "⚘", "☬", "✡", "☸", "⚛"];

export default function TarotPage() {
  const [step, setStep] = useState<"theme" | "shuffling" | "reveal" | "reading" | "used">("theme");
  const [theme, setTheme] = useState<TarotTheme | null>(null);
  const [cardName, setCardName] = useState("");
  const [cardSymbol, setCardSymbol] = useState("✦");
  const [reading, setReading] = useState<TarotInterpretation | null>(null);
  const [flipped, setFlipped] = useState(false);

  async function handleSelectTheme(selectedTheme: TarotTheme) {
    setTheme(selectedTheme);
    setStep("shuffling");

    // Shuffle animation
    await new Promise((r) => setTimeout(r, 2000));

    try {
      const res = await fetch("/api/tarot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme: selectedTheme }),
      });
      const data = await res.json();
      if (data.error === "ALREADY_USED") { setStep("used"); return; }
      if (data.reading) {
        setCardName(data.cardName);
        setCardSymbol(CARD_SYMBOLS[Math.floor(Math.random() * CARD_SYMBOLS.length)]);
        setReading(data.reading);
        setStep("reveal");
      }
    } catch { setStep("theme"); }
  }

  function handleFlip() {
    if (!flipped) {
      setFlipped(true);
      setTimeout(() => setStep("reading"), 1500);
    }
  }

  const themes = Object.values(TarotTheme);

  return (
    <div className="space-y-6 pb-4">
      {/* Header */}
      <div className="text-center animate-in">
        <div className="inline-block mb-3">
          <span
            className="text-6xl block"
            style={{
              filter: "drop-shadow(0 0 25px rgba(251, 191, 36, 0.4))",
              animation: "rotate-star 10s linear infinite",
            }}
          >
            ✦
          </span>
        </div>
        <h1 className="text-3xl font-bold text-gradient-gold tracking-wider">
          Tarô do Dia
        </h1>
        <p
          className="text-[var(--color-text-muted)] text-sm mt-2"
          style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
        >
          Uma pausa, uma leitura, uma mensagem para o coração
        </p>
      </div>

      {/* Theme Selection */}
      {step === "theme" && (
        <div className="animate-in animate-in-delay-2">
          <p className="text-center text-[var(--color-text-muted)] text-sm mb-5 tracking-wide">
            Escolha o tema da sua revelação
          </p>
          <div className="grid grid-cols-2 gap-3">
            {themes.map((t, i) => (
              <button
                key={t}
                onClick={() => handleSelectTheme(t)}
                className={`card-gold text-center py-7 hover:scale-[1.02] transition-all duration-300 animate-in`}
                style={{ animationDelay: `${0.1 + i * 0.08}s` }}
              >
                <span
                  className="text-3xl block mb-2"
                  style={{
                    color: "var(--color-gold)",
                    filter: "drop-shadow(0 0 10px rgba(251, 191, 36, 0.3))",
                  }}
                >
                  {THEME_ICONS[t]}
                </span>
                <p
                  className="text-sm font-semibold text-[var(--color-gold-light)] tracking-wider"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  {TAROT_THEME_LABELS[t]}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Shuffling Animation */}
      {step === "shuffling" && (
        <div className="flex flex-col items-center justify-center py-12 animate-in">
          <div className="tarot-scene mb-8">
            <div className="tarot-card shuffling">
              <div className="tarot-back" />
              <div className="tarot-face">
                <span className="card-symbol">✦</span>
                <span className="card-name">...</span>
              </div>
            </div>
          </div>
          <p className="text-[var(--color-text-muted)] text-sm tracking-widest uppercase animate-pulse">
            Embaralhando as cartas...
          </p>
          <p className="text-[var(--color-text-dim)] text-xs mt-2" style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}>
            Respire fundo e concentre-se na sua pergunta
          </p>
        </div>
      )}

      {/* Card Reveal */}
      {step === "reveal" && (
        <div className="flex flex-col items-center justify-center py-8 animate-in">
          <p className="text-[var(--color-gold)] text-sm tracking-widest uppercase mb-6 animate-pulse">
            Toque na carta para revelar
          </p>
          <div className="tarot-scene mb-6" onClick={handleFlip}>
            <div className={`tarot-card ${flipped ? "flipped" : ""}`}>
              <div className="tarot-back" />
              <div className="tarot-face">
                <span className="card-symbol">{cardSymbol}</span>
                <span className="card-name">{cardName}</span>
              </div>
            </div>
          </div>
          {!flipped && (
            <div className="flex gap-2 items-center text-[var(--color-text-dim)] text-xs">
              <span className="inline-block w-8 h-px bg-[var(--color-text-dim)]/30" />
              toque para revelar
              <span className="inline-block w-8 h-px bg-[var(--color-text-dim)]/30" />
            </div>
          )}
        </div>
      )}

      {/* Reading Result */}
      {step === "reading" && reading && (
        <div className="space-y-4">
          {/* Card Header */}
          <div className="card-gold text-center py-6 animate-in">
            <span className="text-4xl block mb-2" style={{ filter: "drop-shadow(0 0 15px rgba(251, 191, 36, 0.4))" }}>
              {cardSymbol}
            </span>
            <h2 className="text-2xl font-bold text-gradient-gold">{cardName}</h2>
            <p className="text-[var(--color-gold)]/70 text-sm mt-2">{reading.mainEnergy}</p>
          </div>

          {/* Central Message */}
          <div className="card-mystic animate-in animate-in-delay-1">
            <p className="text-xs text-[var(--color-mystic-light)] tracking-wider uppercase mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
              Mensagem Central
            </p>
            <p className="text-[var(--color-text)] leading-relaxed">{reading.centralMessage}</p>
          </div>

          {/* Daily Advice */}
          <div className="card-mystic animate-in animate-in-delay-2">
            <p className="text-xs text-[var(--color-emerald)] tracking-wider uppercase mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
              Conselho do Dia
            </p>
            <p className="text-[var(--color-text)] leading-relaxed">{reading.dailyAdvice}</p>
          </div>

          {/* Alert */}
          <div className="card-mystic animate-in animate-in-delay-3" style={{ borderColor: "rgba(251, 191, 36, 0.2)" }}>
            <p className="text-xs text-[var(--color-gold)] tracking-wider uppercase mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
              ⚠ Atenção
            </p>
            <p className="text-[var(--color-text)] leading-relaxed">{reading.alert}</p>
          </div>

          {/* Short Phrase */}
          <div
            className="card-gold text-center py-6 animate-in animate-in-delay-4"
            style={{
              background: "linear-gradient(135deg, rgba(50, 30, 10, 0.4), rgba(30, 15, 5, 0.6))",
            }}
          >
            <p className="text-xs text-[var(--color-gold)]/60 tracking-wider uppercase mb-3" style={{ fontFamily: "'Cinzel', serif" }}>
              Guarde Consigo
            </p>
            <p
              className="text-lg text-[var(--color-gold-light)] font-medium"
              style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
            >
              &ldquo;{reading.shortPhrase}&rdquo;
            </p>
          </div>
        </div>
      )}

      {/* Already Used */}
      {step === "used" && (
        <div className="card-mystic text-center py-10 animate-in">
          <span className="text-5xl block mb-4" style={{ filter: "drop-shadow(0 0 15px rgba(139, 92, 246, 0.3))" }}>
            ☽
          </span>
          <p className="text-[var(--color-text)] mb-2 font-semibold" style={{ fontFamily: "'Cinzel', serif" }}>
            Sua revelação de hoje já foi feita
          </p>
          <p className="text-[var(--color-text-muted)] text-sm mb-6" style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}>
            Volte amanhã para uma nova carta
          </p>
          <div className="divider-mystic w-24 mx-auto mb-6" />
          <button className="btn-tarot">
            Desbloquear Revelações Extras
          </button>
        </div>
      )}
    </div>
  );
}
