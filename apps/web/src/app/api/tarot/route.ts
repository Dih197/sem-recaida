import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { AIServiceImpl, createAIProvider } from "@sem-recaida/ai";
import { drawRandomCard, TarotReadingType, startOfDay } from "@sem-recaida/shared";
import { buildUserContext } from "@/lib/user-context";

const tarotSchema = z.object({
  theme: z.enum(["AMOR", "AUTOESTIMA", "CURA", "RECOMECO", "TRABALHO", "GERAL"]),
  isPremium: z.boolean().optional().default(false),
});

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const data = tarotSchema.parse(body);

    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!user || !user.onboardingDone) {
      return NextResponse.json({ error: "Complete o onboarding primeiro" }, { status: 400 });
    }

    // Check daily free limit
    if (!data.isPremium) {
      const todayStart = startOfDay();
      const todayReading = await prisma.tarotReading.findFirst({
        where: {
          userId: session.user.id,
          isPremium: false,
          createdAt: { gte: todayStart },
        },
      });

      if (todayReading) {
        return NextResponse.json({ error: "ALREADY_USED" }, { status: 429 });
      }
    }

    // TODO: check premium subscription for paid readings

    const card = drawRandomCard();

    const provider = createAIProvider();
    const ai = new AIServiceImpl(provider);

    const userContext = buildUserContext(user);

    const reading = await ai.generateTarotReading(
      data.theme as any,
      card,
      data.isPremium ? TarotReadingType.EXTRA : TarotReadingType.DAILY,
      userContext,
    );

    await prisma.tarotReading.create({
      data: {
        userId: session.user.id,
        theme: data.theme as any,
        cardName: card.name,
        cardNumber: card.number,
        isPremium: data.isPremium,
        readingType: data.isPremium ? "EXTRA" : "DAILY",
        mainEnergy: reading.mainEnergy,
        centralMessage: reading.centralMessage,
        dailyAdvice: reading.dailyAdvice,
        alert: reading.alert,
        shortPhrase: reading.shortPhrase,
        fullReading: reading.fullReading ?? null,
      },
    });

    return NextResponse.json({ cardName: card.name, reading });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    console.error("Tarot error:", error);
    return NextResponse.json({ error: "Erro na leitura" }, { status: 500 });
  }
}
