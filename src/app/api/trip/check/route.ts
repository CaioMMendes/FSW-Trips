import { prisma } from "@/lib/prisma";
import { addDays, differenceInDays, isBefore } from "date-fns";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const req = await request.json();
  const trip = await prisma.trip.findUnique({
    where: {
      id: req.tripId,
    },
  });
  if (!trip) {
    return new NextResponse(
      JSON.stringify({
        error: {
          code: "TRIP_NOT_FOUND",
        },
      })
    );
  }

  if (isBefore(new Date(req.startDate), new Date(trip.startDate))) {
    return new NextResponse(
      JSON.stringify({
        error: {
          code: "INVALID_START_DATE",
        },
      }),
      {
        status: 400,
      }
    );
  }

  if (isBefore(new Date(trip.endDate), new Date(req.endDate))) {
    return new NextResponse(
      JSON.stringify({
        error: {
          code: "INVALID_END_DATE",
        },
      }),
      {
        status: 400,
      }
    );
  }
  const updatedStartDate = addDays(new Date(req.startDate), 1);
  const reservation = await prisma.tripReservation.findMany({
    where: {
      tripId: req.tripId,
      //verifica se existe alguma reserva entre as datas
      startDate: {
        lte: new Date(req.endDate),
      },
      endDate: {
        gte: new Date(updatedStartDate),
      },
    },
  });

  if (reservation.length > 0) {
    return new NextResponse(
      JSON.stringify({
        error: {
          code: "TRIP_ALREADY_RESERVED",
        },
      })
    );
  }
  return new NextResponse(
    JSON.stringify({
      success: true,
      trip,
      totalPrice:
        differenceInDays(new Date(req.endDate), new Date(req.startDate)) *
        Number(trip.pricePerDay),
    })
  );
}
