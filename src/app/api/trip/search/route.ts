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
          startDate: {
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
  const text = searchParams.get("text");
  const startDate = searchParams.get("startDate");
  const budget = searchParams.get("budget");
  //   const formatedDate = new Date(startDate);
  const formatedBudget = Number(budget);

  //   if (!text) {
  //     return new NextResponse(JSON.stringify({ message: "Missing text param" }), {
  //       status: 400,
  //     });
  //   }
  console.log(text);
  const trips = await prisma.trip.findMany({
    where: generateSearchQuery(text, startDate, budget),
  });
  console.log(trips);
  return new NextResponse(JSON.stringify(trips), { status: 200 });
}
