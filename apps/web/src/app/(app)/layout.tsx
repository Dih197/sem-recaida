import { requireOnboarded } from "@/lib/auth-helpers";
import { BottomNav } from "@/components/shared/BottomNav";
import { Providers } from "@/components/shared/Providers";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireOnboarded();

  return (
    <Providers>
      <div className="min-h-screen bg-brand-bg pb-20">
        <main className="max-w-lg mx-auto px-4 py-6">
          {children}
        </main>
        <BottomNav />
      </div>
    </Providers>
  );
}
