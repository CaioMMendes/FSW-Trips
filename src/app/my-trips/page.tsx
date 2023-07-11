"use client";
import { useSession } from "next-auth/react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TripReservation } from "@prisma/client";

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

  return <div>MyTrips</div>;
};

export default MyTrips;
