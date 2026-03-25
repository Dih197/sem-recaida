import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  const articles = await prisma.libraryArticle.findMany({
    where: {
      published: true,
      ...(category ? { category: category as any } : {}),
    },
    orderBy: { sortOrder: "asc" },
    select: {
      id: true,
      slug: true,
      title: true,
      category: true,
      tags: true,
    },
  });

  return NextResponse.json(articles);
}
