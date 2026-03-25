"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (result?.error) { setError("Email ou senha incorretos"); return; }
    router.push("/");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10 animate-in">
          <div className="inline-block mb-4">
            <span className="text-5xl" style={{ filter: "drop-shadow(0 0 20px rgba(139, 92, 246, 0.4))" }}>
              ✦
            </span>
          </div>
          <h1 className="text-4xl font-bold text-gradient-mystic tracking-wide">
            Sem Recaída
          </h1>
          <div className="divider-mystic w-32 mx-auto my-4" />
          <p className="text-[var(--color-text-muted)] text-sm tracking-widest uppercase" style={{ fontFamily: "'Raleway', sans-serif" }}>
            Clareza · Dignidade · Paz
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="card-mystic space-y-5 animate-in animate-in-delay-2">
          <div>
            <label className="block text-xs text-[var(--color-text-muted)] mb-2 tracking-wider uppercase">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-mystic"
              placeholder="seu@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-xs text-[var(--color-text-muted)] mb-2 tracking-wider uppercase">
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-mystic"
              placeholder="••••••"
              required
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm text-center py-2 px-4 rounded-xl bg-red-500/5 border border-red-500/10">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-mystic w-full disabled:opacity-50 text-center"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="spinner-mystic !w-5 !h-5 !border-2" /> Entrando...
              </span>
            ) : "Entrar"}
          </button>

          <p className="text-center text-sm text-[var(--color-text-muted)]" style={{ fontFamily: "'Raleway', sans-serif" }}>
            Ainda não tem conta?{" "}
            <Link href="/registro" className="text-[var(--color-mystic-light)] hover:text-[var(--color-flame-light)] transition-colors">
              Criar conta
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
