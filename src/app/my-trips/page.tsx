"use client";
import { useSession } from "next-auth/react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TripReservation } from "@prisma/client";
import UserReservationItem from "./components/UserReservationItem";

const MyTrips = () => {
  const router = useRouter();

  const { status, data } = useSession();
  const [reservations, setReservatios] = useState<TripReservation[]>([]);

  useEffect(() => {
    if (status === "unauthenticated" || !data?.user) {
      return router.push("/");
    }

    const fetchReservation = async () => {
      const response = await fetch(
        `http://localhost:3000/api/user/${(data?.user as any).id}/trip`
      );
      const json = await response.json();

      setReservatios(json);
    };
    fetchReservation();
  }, [status]);

  return (
    <div className="flex flex-col gap-5 p-5">
      <h1 className="flex flex-start text-primaryDarker text-lg leading-8 font-semibold">
        Minhas Viagens
      </h1>

      {reservations.map((reservation) => {
        return (
          <UserReservationItem reservation={reservation} key={reservation.id} />
        );
      })}
    </div>
  );
};

export default MyTrips;
