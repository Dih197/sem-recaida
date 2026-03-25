import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { AIServiceImpl, createAIProvider } from "@sem-recaida/ai";
import { buildUserContext } from "@/lib/user-context";

const emergencySchema = z.object({
  draftMessage: z.string().min(1, "Cole a mensagem que queria mandar"),
});

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const data = emergencySchema.parse(body);

    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!user || !user.onboardingDone) {
      return NextResponse.json({ error: "Complete o onboarding primeiro" }, { status: 400 });
    }

    const provider = createAIProvider();
    const ai = new AIServiceImpl(provider);

    const userContext = buildUserContext(user);

    const analysis = await ai.analyzeEmergency(data.draftMessage, userContext);

    const emergencyUse = await prisma.emergencyUse.create({
      data: {
        userId: session.user.id,
        draftMessage: data.draftMessage,
        impulseSource: analysis.impulseSource as any,
        whyNotSend: analysis.whyNotSend,
        regretRisk: analysis.regretRisk as any,
        ventVersion: analysis.ventVersion,
        exercise: analysis.exercise,
        guidance: analysis.guidance,
      },
    });

    // Update progress
    await prisma.userProgress.upsert({
      where: { userId: session.user.id },
      create: { userId: session.user.id, totalImpulsesBlocked: 1 },
      update: { totalImpulsesBlocked: { increment: 1 } },
    });

    return NextResponse.json({ id: emergencyUse.id, analysis });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    console.error("Emergency error:", error);
    return NextResponse.json({ error: "Erro ao analisar" }, { status: 500 });
  }
}
