"use client";

interface OptionCardProps {
  label: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
}

export function OptionCard({ label, description, selected, onClick }: OptionCardProps) {
  return (
    <button onClick={onClick} className={`option-mystic ${selected ? "selected" : ""}`}>
      <span className={`font-semibold text-sm tracking-wide ${selected ? "text-[var(--color-mystic-light)]" : "text-[var(--color-text)]"}`}
        style={{ fontFamily: "'Cinzel', serif" }}>
        {label}
      </span>
      {description && (
        <p className="text-xs text-[var(--color-text-muted)] mt-1" style={{ fontFamily: "'Raleway', sans-serif" }}>
          {description}
        </p>
      )}
    </button>
  );
}
