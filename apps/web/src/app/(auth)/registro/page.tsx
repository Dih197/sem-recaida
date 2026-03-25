"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegistroPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Erro ao criar conta"); setLoading(false); return; }
      const result = await signIn("credentials", { email, password, redirect: false });
      if (result?.error) { setError("Conta criada, mas erro ao entrar."); setLoading(false); return; }
      router.push("/onboarding");
      router.refresh();
    } catch { setError("Erro de conexão."); setLoading(false); }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-10 animate-in">
          <div className="inline-block mb-4">
            <span className="text-5xl" style={{ filter: "drop-shadow(0 0 20px rgba(236, 72, 153, 0.4))" }}>
              ✦
            </span>
          </div>
          <h1 className="text-4xl font-bold text-gradient-mystic tracking-wide">
            Sem Recaída
          </h1>
          <div className="divider-mystic w-32 mx-auto my-4" />
          <p className="text-[var(--color-text-muted)] text-sm" style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}>
            Comece sua jornada de volta para si
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card-mystic space-y-5 animate-in animate-in-delay-2">
          <div>
            <label className="block text-xs text-[var(--color-text-muted)] mb-2 tracking-wider uppercase">Nome</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)}
              className="input-mystic" placeholder="Como quer ser chamado(a)?" required />
          </div>
          <div>
            <label className="block text-xs text-[var(--color-text-muted)] mb-2 tracking-wider uppercase">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="input-mystic" placeholder="seu@email.com" required />
          </div>
          <div>
            <label className="block text-xs text-[var(--color-text-muted)] mb-2 tracking-wider uppercase">Senha</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              className="input-mystic" placeholder="Mínimo 6 caracteres" minLength={6} required />
          </div>

          {error && (
            <div className="text-red-400 text-sm text-center py-2 px-4 rounded-xl bg-red-500/5 border border-red-500/10">
              {error}
            </div>
          )}

          <button type="submit" disabled={loading} className="btn-mystic w-full disabled:opacity-50 text-center">
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="spinner-mystic !w-5 !h-5 !border-2" /> Criando...
              </span>
            ) : "Iniciar Jornada"}
          </button>

          <p className="text-center text-sm text-[var(--color-text-muted)]">
            Já tem conta?{" "}
            <Link href="/login" className="text-[var(--color-mystic-light)] hover:text-[var(--color-flame-light)] transition-colors">
              Entrar
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
