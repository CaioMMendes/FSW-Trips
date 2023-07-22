"use client";
import { Prisma } from "@prisma/client";
import ImageBox from "./ImageBox";
import ReservationDetails from "./ReservationDetails";
import Button from "@/components/Button";
import { toastError, toastSuccess } from "@/components/Toastify";
import { Dispatch, SetStateAction } from "react";
import { Swalfire } from "@/components/Swalfire";
import { differenceInDays } from "date-fns";

interface UserReservationItemProps {
  reservation: Prisma.TripReservationGetPayload<{
    include: { trip: true };
  }>;
  reservations: Prisma.TripReservationGetPayload<{
    include: { trip: true };
  }>[];

  setReservations: Dispatch<
    SetStateAction<
      Prisma.TripReservationGetPayload<{
        include: { trip: true };
      }>[]
    >
  >;
}

const UserReservationItem /*:React.FC<UserReservationItemProps> */ = ({
  reservation,
  reservations,
  setReservations,
}: UserReservationItemProps) => {
  const { trip } = reservation;

  const handleDeleteClick = async () => {
    try {
      await fetch(`api/trip/reservation/${reservation.id}`, {
        method: "DELETE",
      });
      const reservationsUpdated = reservations.filter((res) => {
        return res.id !== reservation.id;
      });
      setReservations(reservationsUpdated);
      toastSuccess("Reserva cancelada");
    } catch (error) {
      toastError("Ocorreu um erro");
    }
  };
  const daysDifference =
    reservation.startDate && reservation.endDate
      ? differenceInDays(
          new Date(reservation.endDate),
          new Date(reservation.startDate)
        )
      : 0;
  return (
    <div className="flex flex-col border rounded-xl border-grayLight shadow-lg p-5 gap-5">
      <ImageBox
        countryCode={trip.countryCode}
        name={trip.name}
        coverImage={trip.coverImage}
        location={trip.location}
        tripId={trip.id}
      />
      <div className="flex h-[1px] w-full bg-primaryLighter"></div>
      <ReservationDetails
        startDate={reservation.startDate}
        endDate={reservation.endDate}
        guests={reservation.guests}
      />
      <div className="flex h-[1px] w-full bg-primaryLighter"></div>
      <h1 className="text-primaryDarker text-base font-semibold">
        Informações sobre o pagamento
      </h1>
      <div className="flex justify-between">
        <p className="text-sm text-primaryDarker">
          Total{" "}
          {reservation.startDate && reservation.endDate
            ? `(${daysDifference} ${
                daysDifference === 1 ? "noite" : "noites"
              }) `
            : ""}
        </p>
        <p className="text-primaryDarker text-sm leading-6">
          R$ {Number(reservation.totalPaid)}
        </p>
      </div>
      <Button
        variant="outlined"
        onClick={() => {
          Swalfire(
            handleDeleteClick,
            "Deseja cancelar esta viagem?",
            "",
            "Sim",
            "Não",
            true,
            "#590bd8",
            "#aaa"
          );
        }}
      >
        Cancelar Reserva
      </Button>
    </div>
  );
};

export default UserReservationItem;
