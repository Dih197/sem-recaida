"use client";

interface OptionCardProps {
  label: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
}

export function OptionCard({ label, description, selected, onClick }: OptionCardProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
        selected
          ? "border-brand-primary bg-brand-primary/10 ring-1 ring-brand-primary/30"
          : "border-white/10 bg-brand-surface-light hover:border-white/20"
      }`}
    >
      <span className={`font-medium ${selected ? "text-brand-primary" : "text-white"}`}>
        {label}
      </span>
      {description && (
        <p className="text-sm text-slate-400 mt-1">{description}</p>
      )}
    </button>
  );
}
