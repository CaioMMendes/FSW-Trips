import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});
export async function POST(request: Request) {
  const userSession = await getServerSession(authOptions);
  const req = await request.json();
  const {
    totalPrice,
    name,
    description,
    coverImage,
    imageUrl,
    startDate,
    endDate,
    guests,
    tripId,
    stripeCheckbox,
  } = req;

  if (stripeCheckbox === true) {
    const session = await stripe.checkout.sessions.create({
      success_url: process.env.HOST_URL!,
      metadata: {
        startDate,
        endDate,
        guests,
        tripId,
        userId: (userSession?.user as any)?.id,
        totalPrice,
      },
      line_items: [
        {
          price_data: {
            currency: "brl",
            unit_amount: totalPrice * 100,
            product_data: {
              name,
              description,
              images: [coverImage],
            },
          },
          quantity: 1,
        },
      ],
      mode: "payment",
    });
    return new NextResponse(JSON.stringify({ sessionId: session.id }), {
      status: 200,
    });
  } else if (stripeCheckbox === false) {
    await prisma.tripReservation.create({
      data: {
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        userId: (userSession?.user as any)?.id,
        tripId: tripId,
        totalPaid: Number(totalPrice),
        guests: Number(guests),
      },
    });
    return new NextResponse(JSON.stringify({ success: true }), {
      status: 201,
    });
  }
  return new NextResponse(JSON.stringify({ success: false }), {
    status: 400,
  });
}
