"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "Início", icon: "⬡", activeIcon: "⬢" },
  { href: "/checkin", label: "Check-in", icon: "◇", activeIcon: "◆" },
  { href: "/emergencia", label: "SOS", icon: "⚡", isEmergency: true },
  { href: "/tarot", label: "Tarô", icon: "✧", activeIcon: "✦" },
  { href: "/mais", label: "Mais", icon: "☰", activeIcon: "☰" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      {/* Top glow line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-mystic)]/30 to-transparent" />

      <div
        className="backdrop-blur-xl"
        style={{
          background: "linear-gradient(180deg, rgba(10, 6, 20, 0.85), rgba(5, 3, 10, 0.95))",
        }}
      >
        <div className="max-w-lg mx-auto flex justify-around items-center h-[68px] px-2">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-2xl transition-all duration-300 relative ${
                  item.isEmergency ? "-mt-6" : ""
                }`}
              >
                {item.isEmergency ? (
                  <div className="relative">
                    <div
                      className="w-[56px] h-[56px] rounded-full flex items-center justify-center text-2xl"
                      style={{
                        background: "linear-gradient(135deg, #dc2626, #b91c1c)",
                        boxShadow: "0 0 25px rgba(220, 38, 38, 0.5), 0 0 50px rgba(220, 38, 38, 0.2), inset 0 1px 1px rgba(255,255,255,0.1)",
                        animation: "pulse-emergency 2s ease-in-out infinite",
                      }}
                    >
                      {item.icon}
                    </div>
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: "radial-gradient(circle, rgba(239, 68, 68, 0.15) 0%, transparent 70%)",
                        animation: "pulse-emergency 2s ease-in-out infinite",
                        transform: "scale(1.5)",
                      }}
                    />
                  </div>
                ) : (
                  <span
                    className={`text-xl transition-all duration-300 ${
                      isActive
                        ? "text-[var(--color-mystic-light)] drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]"
                        : "text-[var(--color-text-dim)]"
                    }`}
                  >
                    {isActive ? item.activeIcon : item.icon}
                  </span>
                )}
                <span
                  className={`text-[10px] font-medium tracking-wider transition-colors duration-300 ${
                    item.isEmergency
                      ? "text-red-400 mt-1"
                      : isActive
                        ? "text-[var(--color-mystic-light)]"
                        : "text-[var(--color-text-dim)]"
                  }`}
                  style={{ fontFamily: "'Raleway', sans-serif" }}
                >
                  {item.label}
                </span>
                {isActive && !item.isEmergency && (
                  <div
                    className="absolute -bottom-1 w-1 h-1 rounded-full bg-[var(--color-mystic)]"
                    style={{ boxShadow: "0 0 6px var(--color-mystic)" }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
