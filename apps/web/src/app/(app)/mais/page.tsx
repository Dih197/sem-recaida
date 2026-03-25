import Link from "next/link";

const MENU_ITEMS = [
  { href: "/plano", label: "Plano de Recuperação", icon: "⚔", desc: "Trilha de 7, 14 ou 30 dias" },
  { href: "/diario", label: "Diário Guiado", icon: "☽", desc: "Perguntas para se entender melhor" },
  { href: "/realidade", label: "Modo Realidade", icon: "◈", desc: "Quebre a fantasia com fatos reais" },
  { href: "/biblioteca", label: "Biblioteca", icon: "✧", desc: "Textos sobre recaída e autoestima" },
  { href: "/progresso", label: "Progresso", icon: "◆", desc: "Veja sua evolução" },
  { href: "/configuracoes", label: "Configurações", icon: "⚙", desc: "Perfil e conta" },
];

export default function MaisPage() {
  return (
    <div className="space-y-6 pb-4">
      <h1 className="text-2xl font-bold text-gradient-mystic tracking-wider animate-in">
        Mais
      </h1>

      <div className="space-y-3">
        {MENU_ITEMS.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            className={`card-mystic flex items-center gap-4 hover:scale-[1.01] transition-all animate-in`}
            style={{ animationDelay: `${0.08 * i}s` }}
          >
            <span
              className="text-2xl w-10 text-center"
              style={{ color: "var(--color-mystic-light)", filter: "drop-shadow(0 0 8px rgba(139, 92, 246, 0.3))" }}
            >
              {item.icon}
            </span>
            <div>
              <p className="font-semibold text-sm tracking-wide" style={{ fontFamily: "'Cinzel', serif" }}>
                {item.label}
              </p>
              <p className="text-xs text-[var(--color-text-muted)]">{item.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
