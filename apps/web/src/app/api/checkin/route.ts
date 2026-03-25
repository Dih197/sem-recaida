import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { AIServiceImpl, createAIProvider } from "@sem-recaida/ai";
import { buildUserContext } from "@/lib/user-context";

const checkInSchema = z.object({
  feeling: z.string(),
  intensity: z.number().min(1).max(5),
  triggerType: z.string().optional(),
  trigger: z.string().optional(),
  journalText: z.string().optional(),
});

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const data = checkInSchema.parse(body);

    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!user || !user.onboardingDone) {
      return NextResponse.json({ error: "Complete o onboarding primeiro" }, { status: 400 });
    }

    // Run AI analysis
    const provider = createAIProvider();
    const ai = new AIServiceImpl(provider);

    const userContext = buildUserContext(user);

    const analysis = await ai.analyzeCheckIn(
      {
        feeling: data.feeling as any,
        intensity: data.intensity,
        triggerType: data.triggerType as any,
        journalText: data.journalText,
      },
      userContext,
    );

    // Save to database
    const checkIn = await prisma.checkIn.create({
      data: {
        userId: session.user.id,
        feeling: data.feeling as any,
        intensity: data.intensity,
        triggerType: data.triggerType as any ?? null,
        trigger: data.trigger ?? null,
        journalText: data.journalText ?? null,
        emotionSource: analysis.emotionSource as any,
        relapseRisk: analysis.relapseRisk as any,
        actionStep: analysis.actionStep,
        holdingPhrase: analysis.holdingPhrase,
      },
    });

    // Update progress
    await prisma.userProgress.upsert({
      where: { userId: session.user.id },
      create: { userId: session.user.id, totalCheckIns: 1 },
      update: { totalCheckIns: { increment: 1 } },
    });

    return NextResponse.json({ id: checkIn.id, analysis });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    console.error("Check-in error:", error);
    return NextResponse.json({ error: "Erro ao registrar check-in" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get("limit") || "10");

  const checkIns = await prisma.checkIn.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: limit,
  });

  return NextResponse.json(checkIns);
}
