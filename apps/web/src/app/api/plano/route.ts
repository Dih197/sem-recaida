import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const templates = await prisma.recoveryPlanTemplate.findMany({
    include: { days: { orderBy: { dayNumber: "asc" } } },
    orderBy: { duration: "asc" },
  });

  const activePlan = await prisma.userRecoveryPlan.findFirst({
    where: { userId: session.user.id, status: "ACTIVE" },
    include: {
      template: true,
      days: { orderBy: { dayNumber: "asc" } },
    },
  });

  return NextResponse.json({ templates, activePlan });
}

const startPlanSchema = z.object({
  templateId: z.string(),
});

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { templateId } = startPlanSchema.parse(body);

    // Abandon any active plan
    await prisma.userRecoveryPlan.updateMany({
      where: { userId: session.user.id, status: "ACTIVE" },
      data: { status: "ABANDONED" },
    });

    const template = await prisma.recoveryPlanTemplate.findUnique({
      where: { id: templateId },
    });

    if (!template) {
      return NextResponse.json({ error: "Plano não encontrado" }, { status: 404 });
    }

    const plan = await prisma.userRecoveryPlan.create({
      data: {
        userId: session.user.id,
        templateId,
      },
    });

    return NextResponse.json(plan);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: "Erro ao iniciar plano" }, { status: 500 });
  }
}
