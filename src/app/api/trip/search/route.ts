import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

const generateSearchQuery = (
  text?: string | null,
  startDate?: string | null,
  endDate?: string | null,
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
          startDate: {
            lte: startDate,
          },
        },
      ],
    };
  }
  if (endDate !== "undefined" && endDate !== null) {
    searchQuery = {
      ...searchQuery,
      AND: [
        ...searchQuery.AND,
        {
          endDate: {
            gte: endDate,
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
  const endDate = searchParams.get("endDate");
  const budget = searchParams.get("budget");
  console.log(startDate);
  console.log(endDate);
  console.log(searchParams);
  if (searchParams.get("text")) {
    text = decodeURIComponent(searchParams.get("text")!);
    text = text.trim();
    textModified = text.replace(/ /g, " & ");
  }

  const trips = await prisma.trip.findMany({
    where: generateSearchQuery(textModified ?? "", startDate, endDate, budget),
  });

  return new NextResponse(JSON.stringify(trips), { status: 200 });
}
