import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

const generateSearchQuery = (
  text?: string | null,
  startDate?: string | null,
  budget?: string | null
) => {
  let searchQuery;
  if (!text) {
    searchQuery = { AND: [] };
  } else {
    searchQuery = {
      OR: [
        {
          name: {
            search: text,
          },
        },
        {
          description: {
            search: text,
          },
        },
        {
          location: {
            search: text,
          },
        },
      ],
      AND: [],
    };
  }

  if (startDate !== "undefined" && startDate !== null) {
    searchQuery = {
      ...searchQuery,
      AND: [
        ...searchQuery.AND,
        {
          endDate: {
            gte: startDate,
          },
        },
      ],
    };
  }

  if (budget !== "undefined" && budget !== null) {
    searchQuery = {
      ...searchQuery,
      AND: [
        ...searchQuery.AND,
        {
          pricePerDay: {
            lte: budget,
          },
        },
      ],
    };
  }
  return searchQuery;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let text = searchParams.get("text");
  let textModified;
  const startDate = searchParams.get("startDate");
  const budget = searchParams.get("budget");
  if (searchParams.get("text")) {
    text = decodeURIComponent(searchParams.get("text")!);
    text = text.trim();
    textModified = text.replace(/ /g, " & ");
  }

  const trips = await prisma.trip.findMany({
    where: generateSearchQuery(textModified ?? "", startDate, budget),
  });

  return new NextResponse(JSON.stringify(trips), { status: 200 });
}
