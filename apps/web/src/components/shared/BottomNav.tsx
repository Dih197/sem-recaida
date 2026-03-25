"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "Início", icon: "🏠" },
  { href: "/checkin", label: "Check-in", icon: "💭" },
  { href: "/emergencia", label: "SOS", icon: "🚨", isEmergency: true },
  { href: "/tarot", label: "Tarô", icon: "✨" },
  { href: "/mais", label: "Mais", icon: "☰" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-brand-surface border-t border-white/5 z-50">
      <div className="max-w-lg mx-auto flex justify-around items-center h-16">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-colors ${
                item.isEmergency
                  ? "relative -mt-4"
                  : isActive
                    ? "text-brand-primary"
                    : "text-slate-400 hover:text-white"
              }`}
            >
              {item.isEmergency ? (
                <div className="w-14 h-14 bg-brand-emergency rounded-full flex items-center justify-center shadow-lg shadow-red-900/40 text-2xl">
                  {item.icon}
                </div>
              ) : (
                <span className="text-xl">{item.icon}</span>
              )}
              <span className={`text-[10px] ${item.isEmergency ? "mt-1 text-red-400" : ""}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
