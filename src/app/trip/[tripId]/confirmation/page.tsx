"use client";
import { useEffect, useState } from "react";
import Details from "./components/Details";
import InfoBox from "./components/InfoBox";
import { Trip } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MoveLeft } from "lucide-react";
import Button from "@/components/Button";
import { toastError, toastSuccess } from "@/components/Toastify";
import { loadStripe } from "@stripe/stripe-js";
interface ITripConfirmation {
  params: {
    tripId: string;
  };
}

const TripConfirmation = ({ params }: ITripConfirmation) => {
  const [trip, setTrip] = useState<Trip | null>();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { status, data } = useSession();
  useEffect(() => {
    const fetchTrip = async () => {
      const response = await fetch("/api/trip/check", {
        method: "POST",
        body: JSON.stringify({
          tripId: params.tripId,
          startDate: searchParams.get("startDate"),
          endDate: searchParams.get("endDate"),
        }),
      });

      const res = await response.json();
      if (res?.error?.code === "TRIP_ALREADY_RESERVED") {
        return router.push(`/`);
      }
      setTrip(res.trip);
      setTotalPrice(res.totalPrice);
    };
    if (status === "unauthenticated") {
      return router.push("/");
    }
    fetchTrip();
  }, [status, searchParams, params, router]);

  if (!trip) {
    return null;
  }

  const startDate = new Date(searchParams.get("startDate") as string);
  const endDate = new Date(searchParams.get("endDate") as string);
  const guests = searchParams.get("guests") as string;

  const handleBuyClick = async () => {
    const res = await fetch("/api/payment", {
      method: "POST",
      body: Buffer.from(
        JSON.stringify({
          tripId: params.tripId,
          startDate: searchParams.get("startDate"),
          endDate: searchParams.get("endDate"),
          guests: Number(searchParams.get("guests")),
          imageUrl: trip.imageUrl,
          coverImage: trip.coverImage,
          totalPrice,
          name: trip.name,
          description: trip.description,
        })
      ),
    });
    if (res.ok) {
      // toastSuccess("Reserva realizada com sucesso!");
      const { sessionId } = await res.json();
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_KEY as string
      );
      await stripe?.redirectToCheckout({ sessionId });
      // return router.push(`/my-trips`);
    } else {
      toastError("Ocorreu um erro");
    }
  };
  return (
    <div className="flex flex-col ">
      <div className="flex h-[1px] w-full bg-secondaryGray"></div>
      <Link href={`/trip/${trip.id}`} className="mt-3 mb-1">
        <div className="flex  mb-1 ml-5  text-primary">
          <MoveLeft width={32} height={24} /> Voltar
        </div>
      </Link>
      <div className="flex flex-col px-5">
        <div className="flex flex-col gap-5">
          <h2 className="text-primaryDarker font-semibold text-xl leading-8">
            Sua Viagem
          </h2>

          <InfoBox
            coverImage={trip.coverImage}
            name={trip.name}
            countryCode={trip.countryCode}
            location={trip.location}
            totalPrice={totalPrice}
          />
          <Details startDate={startDate} endDate={endDate} guests={guests} />

          <Button onClick={handleBuyClick}>Finalizar Compra</Button>
        </div>
      </div>
    </div>
  );
};

export default TripConfirmation;
