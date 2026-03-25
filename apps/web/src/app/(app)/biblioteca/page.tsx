"use client";

import { useState, useEffect } from "react";

interface Article {
  id: string;
  slug: string;
  title: string;
  category: string;
  tags: string[];
}

const CATEGORY_LABELS: Record<string, string> = {
  RECAIDA: "Recaída",
  CARENCIA: "Carência",
  SAUDADE: "Saudade",
  AUTOESTIMA: "Autoestima",
  DESAPEGO: "Desapego",
  DIGNIDADE: "Dignidade",
  STALKING: "Parar de vigiar",
  SELF_LOVE: "Amor-próprio",
};

export default function BibliotecaPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filter, setFilter] = useState<string | null>(null);

  useEffect(() => {
    const url = filter ? `/api/biblioteca?category=${filter}` : "/api/biblioteca";
    fetch(url).then((r) => r.json()).then(setArticles);
  }, [filter]);

  const categories = Object.keys(CATEGORY_LABELS);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Biblioteca de Apoio</h1>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter(null)}
          className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
            !filter
              ? "border-brand-primary bg-brand-primary/10 text-brand-primary"
              : "border-white/10 text-slate-400"
          }`}
        >
          Todos
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat === filter ? null : cat)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
              filter === cat
                ? "border-brand-primary bg-brand-primary/10 text-brand-primary"
                : "border-white/10 text-slate-400"
            }`}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      {articles.length === 0 ? (
        <div className="card text-center py-8">
          <p className="text-slate-400">Em breve, novos textos aqui</p>
          <p className="text-slate-500 text-sm mt-1">
            Reflexões sobre recaída, autoestima, dignidade e mais
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {articles.map((article) => (
            <div key={article.id} className="card hover:border-brand-primary/30 transition-colors cursor-pointer">
              <span className="text-xs text-brand-primary">
                {CATEGORY_LABELS[article.category] || article.category}
              </span>
              <p className="font-medium mt-1">{article.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
