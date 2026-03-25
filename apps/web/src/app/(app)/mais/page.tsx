import Link from "next/link";

const MENU_ITEMS = [
  { href: "/plano", label: "Plano de Recuperação", icon: "📋", description: "Trilha de 7, 14 ou 30 dias" },
  { href: "/diario", label: "Diário Guiado", icon: "📖", description: "Perguntas para se entender melhor" },
  { href: "/realidade", label: "Modo Realidade", icon: "👁️", description: "Quebre a fantasia com fatos reais" },
  { href: "/biblioteca", label: "Biblioteca", icon: "📚", description: "Textos sobre recaída, autoestima e mais" },
  { href: "/progresso", label: "Progresso", icon: "📊", description: "Veja sua evolução" },
  { href: "/configuracoes", label: "Configurações", icon: "⚙️", description: "Perfil e conta" },
];

export default function MaisPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Mais</h1>

      <div className="space-y-3">
        {MENU_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="card flex items-center gap-4 hover:border-brand-primary/30 transition-colors"
          >
            <span className="text-2xl">{item.icon}</span>
            <div>
              <p className="font-medium">{item.label}</p>
              <p className="text-sm text-slate-400">{item.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
