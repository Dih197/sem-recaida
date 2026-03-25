import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const realitySchema = z.object({
  entryType: z.enum(["FACT", "PATTERN", "SUFFERING_MOMENT", "IDEALIZATION"]),
  title: z.string().optional(),
  description: z.string().min(1),
  category: z.string().optional(),
});

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const data = realitySchema.parse(body);

    const entry = await prisma.realityEntry.create({
      data: {
        userId: session.user.id,
        entryType: data.entryType,
        title: data.title ?? null,
        description: data.description,
        category: data.category ?? null,
      },
    });

    return NextResponse.json(entry);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: "Erro ao salvar" }, { status: 500 });
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const entries = await prisma.realityEntry.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(entries);
}
