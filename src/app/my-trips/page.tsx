"use client";
import { useSession } from "next-auth/react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Prisma, TripReservation } from "@prisma/client";
import UserReservationItem from "./components/UserReservationItem";
import Button from "@/components/Button";
import Link from "next/link";

const MyTrips = () => {
  const router = useRouter();

  const { status, data } = useSession();
  const [reservations, setReservatios] = useState<
    Prisma.TripReservationGetPayload<{
      include: { trip: true };
    }>[]
  >([]);

  useEffect(() => {
    if (status === "unauthenticated") {
      return router.push("/user/unauthenticated");
    }

    const fetchReservation = async () => {
      const response = await fetch(`/api/user/${(data?.user as any)?.id}/trip`);
      const json = await response.json();

      setReservatios(json);
    };
    fetchReservation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <div className="flex flex-col gap-5 p-5">
      <h1 className="flex flex-start text-primaryDarker text-lg leading-8 font-semibold lg:text-2xl">
        Minhas Viagens
      </h1>
      {reservations.length > 0 ? (
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-10">
          {reservations.map((reservation) => {
            return (
              <UserReservationItem
                reservation={reservation}
                reservations={reservations}
                setReservations={setReservatios}
                key={reservation.id}
              />
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <p className="flex text-primaryDarker font-medium">
            Você ainda não possui nenhuma reserva.
          </p>
          <Link href={"/"}>
            <Button className="w-full">Fazer Reserva</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyTrips;
