"use client";
import Button from "@/components/Button";
import { Swalfire } from "@/components/Swalfire";
import { toastError, toastSuccess } from "@/components/Toastify";
import { Trip } from "@prisma/client";
import { loadStripe } from "@stripe/stripe-js";
import { differenceInDays } from "date-fns";
import { MoveLeft } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Details from "./components/Details";
import InfoBox from "./components/InfoBox";
interface ITripConfirmation {
  params: {
    tripId: string;
  };
}

const TripConfirmation = ({ params }: ITripConfirmation) => {
  const [trip, setTrip] = useState<Trip | null>();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [stripeCheckbox, setStripeCheckbox] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { status, data } = useSession();
  useEffect(() => {
    const startDate = new Date(searchParams.get("startDate") as string);
    const endDate = new Date(searchParams.get("endDate") as string);
    const fetchTrip = async () => {
      const response = await fetch("/api/trip/check", {
        method: "POST",
        body: JSON.stringify({
          tripId: params.tripId,
          startDate: searchParams.get("startDate"),
          endDate: searchParams.get("endDate"),
        }),
      });

      const daysDifference = differenceInDays(endDate, startDate);
      if (daysDifference <= 0) {
        return router.push(`/`);
      }

      const res = await response.json();
      if (res?.error?.code === "TRIP_ALREADY_RESERVED") {
        return router.push(`/`);
      }
      setTrip(res.trip);
      setTotalPrice(res.totalPrice);
    };
    if (status === "unauthenticated") {
      return router.push("/user/unauthenticated");
    }
    fetchTrip();
  }, [status, searchParams, params, router]);

  if (!trip) {
    return null;
  }

  const startDate = new Date(searchParams.get("startDate") as string);
  const endDate = new Date(searchParams.get("endDate") as string);
  const guests = searchParams.get("guests") as string;

  const handleCheckbox = () => {
    setStripeCheckbox(!stripeCheckbox);
  };
  const swalCheck = () => {
    if (stripeCheckbox === true) {
      Swalfire(
        handleBuyClick,
        "Para utilizar o stripe",
        `<p>Use o número de cartão: 4242 4242 4242 4242</p>  <p>O restante dos dados utlize qualquer coisa</p>`,
        "Ok",
        "Cancelar",
        false,
        "#aaa",
        "#590bd8"
      );
    } else if (stripeCheckbox === false) {
      handleBuyClick();
    }
  };
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
          stripeCheckbox,
        })
      ),
    });
    if (res.ok) {
      if (stripeCheckbox === true) {
        const { sessionId } = await res.json();
        const stripe = await loadStripe(
          process.env.NEXT_PUBLIC_STRIPE_KEY as string
        );
        await stripe?.redirectToCheckout({ sessionId });
      } else if (stripeCheckbox === false) {
        toastSuccess("Reserva realizada com sucesso!");
        return router.push(`/my-trips`);
      }
    } else {
      toastError("Ocorreu um erro");
    }
  };
  return (
    // <div className="flex justify-center">
    <div className="flex flex-col  mx-auto">
      <Link href={`/trip/${trip.id}`} className="mt-3 mb-1 max-md:hidden">
        <div className="flex  mb-1 ml-5  text-primary">
          <MoveLeft width={32} height={24} /> Voltar
        </div>
      </Link>
      <div className="flex flex-col px-5">
        <div className="flex flex-col gap-5">
          <h2 className="text-primaryDarker font-semibold text-xl leading-8 ">
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
          <label htmlFor="stripeOption" className="flex gap-1">
            <input
              type="checkbox"
              name="stripeOption"
              id="stripeOption"
              className="accent-primary"
              checked={stripeCheckbox}
              onChange={handleCheckbox}
            />
            <p className="text-sm lg:text-base">
              Utilizar stripe para o pagamento
            </p>
          </label>

          <Button onClick={swalCheck}>Finalizar Compra</Button>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default TripConfirmation;
