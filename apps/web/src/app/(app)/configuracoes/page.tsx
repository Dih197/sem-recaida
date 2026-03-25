"use client";

import { signOut } from "next-auth/react";

export default function ConfiguracoesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Configurações</h1>

      <div className="space-y-3">
        <div className="card">
          <h3 className="font-medium mb-1">Conta</h3>
          <p className="text-sm text-slate-400">Gerencie seu perfil e preferências</p>
        </div>

        <div className="card">
          <h3 className="font-medium mb-1">Assinatura</h3>
          <p className="text-sm text-slate-400">Plano gratuito</p>
          <button className="btn-tarot text-sm mt-3 py-2 px-4">
            Desbloquear Premium
          </button>
        </div>

        <div className="card">
          <h3 className="font-medium mb-1">Refazer onboarding</h3>
          <p className="text-sm text-slate-400">Atualize suas respostas iniciais</p>
        </div>

        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="card w-full text-left text-red-400 hover:border-red-500/30 transition-colors"
        >
          <h3 className="font-medium">Sair da conta</h3>
        </button>
      </div>
    </div>
  );
}
