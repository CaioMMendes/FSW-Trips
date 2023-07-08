"use client";
import { useEffect, useState } from "react";
import Details from "./components/Details";
import InfoBox from "./components/InfoBox";
import { Trip } from "@prisma/client";
import { useSearchParams } from "next/navigation";

interface ITripConfirmation {
  params: {
    tripId: string;
  };
}

const TripConfirmation = ({ params }: ITripConfirmation) => {
  const [trip, setTrip] = useState<Trip | null>();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchTrip = async () => {
      const response = await fetch("http://localhost:3000/api/trip/check", {
        method: "POST",
        body: JSON.stringify({
          tripId: params.tripId,
          startDate: searchParams.get("startDate"),
          endDate: searchParams.get("endDate"),
        }),
      });
      const { trip, totalPrice } = await response.json();
      setTrip(trip);
      setTotalPrice(totalPrice);
    };
    fetchTrip();
  }, []);

  if (!trip) {
    return null;
  }

  const startDate = new Date(searchParams.get("startDate") as string);
  const endDate = new Date(searchParams.get("endDate") as string);
  const guests = searchParams.get("guests") as string;
  return (
    <div className="flex flex-col gap-5 px-5">
      <div className="flex h-[1px] w-full bg-secondaryGray"></div>
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
      </div>
    </div>
  );
};

export default TripConfirmation;
