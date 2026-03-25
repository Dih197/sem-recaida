import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const onboardingSchema = z.object({
  gender: z.enum(["MALE", "FEMALE"]),
  preference: z.enum(["MALE", "FEMALE"]),
  currentNeed: z.enum(["OVERCOME", "STOP_RELAPSES", "RECOVER_SELF_ESTEEM", "UNDERSTAND_WORTH"]),
  timeSinceBreakup: z.enum(["LESS_THAN_WEEK", "ONE_TO_FOUR_WEEKS", "ONE_TO_THREE_MONTHS", "THREE_TO_SIX_MONTHS", "MORE_THAN_SIX_MONTHS"]),
  whoEnded: z.enum(["ME", "THEM", "MUTUAL"]),
  stillInContact: z.boolean(),
  relapseCount: z.number().min(0),
  strongestPain: z.enum(["SAUDADE", "REJEICAO", "CULPA", "SOLIDAO", "INSEGURANCA", "RAIVA", "MEDO_FICAR_SO"]),
  hardestTime: z.enum(["MORNING", "AFTERNOON", "NIGHT", "DAWN"]),
});

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const data = onboardingSchema.parse(body);

    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        ...data,
        onboardingDone: true,
        streakStartedAt: new Date(),
      },
    });

    // Create initial progress record
    await prisma.userProgress.upsert({
      where: { userId: user.id },
      create: { userId: user.id },
      update: {},
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: "Erro ao salvar perfil" }, { status: 500 });
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      onboardingDone: true,
      gender: true,
      preference: true,
      currentNeed: true,
      timeSinceBreakup: true,
      whoEnded: true,
      stillInContact: true,
      relapseCount: true,
      strongestPain: true,
      hardestTime: true,
    },
  });

  return NextResponse.json(user);
}
