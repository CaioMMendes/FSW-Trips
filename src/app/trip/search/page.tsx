"use client";

import TripItem from "@/components/TripItem";
import { prisma } from "@/lib/prisma";
import { Trip } from "@prisma/client";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface GetTripsParams {
  text: string | null;
  startDate: Date | null;
  budget: string;
}

const TripsFinded = () => {
  const searchParams = useSearchParams();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [message, setMessage] = useState<string>();

  useEffect(() => {
    const fetchTrips = async () => {
      // let decodedUrl = "";
      // if (searchParams.get("text")) {
      //   decodedUrl = decodeURIComponent(searchParams.get("text")!);
      // }
      // console.log(decodedUrl);
      const response = await fetch(
        `/api/trip/search?text=${searchParams.get("text") ?? ""}&startDate=${
          searchParams.get("startDate") ?? ""
        }&endDate=${searchParams.get("endDate") ?? ""}&budget=${
          searchParams.get("budget") ?? ""
        }`
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setTrips(data);
        data.length > 0
          ? setMessage("Listamos os melhores locais para você!")
          : setMessage(
              "Infelizmente não foi possível encontrar uma viagem com esses parâmetros."
            );
      }
    };
    fetchTrips();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Link href={"/"}>
        <div className="flex  mb-1 ml-5  text-primary">
          <MoveLeft width={32} height={24} /> Voltar
        </div>
      </Link>

      <div className="flex flex-col items-center p-5 gap-5  ">
        <div className="flex flex-col items-center">
          <h1 className="text-primaryDarker text-xl leading-6 font-semibold">
            Hospedagens Encontradas
          </h1>
          {trips.length == 0 ? (
            <p className="font-medium text-secondaryGray  flex justify-center text-center">
              {message}
            </p>
          ) : (
            <p className="font-medium text-secondaryGray">{message}</p>
          )}
        </div>
        <div className="lg:flex-row lg:flex-wrap gap-5  md:flex-row md:flex-wrap md:justify-center lg:gap-8 lg:justify-center flex flex-col">
          {trips?.map((trip) => (
            <TripItem key={trip.id} trip={trip} />
          ))}
        </div>
      </div>
    </>
  );
};

export default TripsFinded;
