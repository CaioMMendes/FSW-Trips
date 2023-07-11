import { Prisma } from "@prisma/client";
import ImageBox from "./ImageBox";
import ReservationDetails from "./ReservationDetails";
import Button from "@/components/Button";

interface UserReservationItemProps {
  reservation: Prisma.TripReservationGetPayload<{
    include: { trip: true };
  }>;
}

const UserReservationItem = ({ reservation }: UserReservationItemProps) => {
  const { trip } = reservation;
  return (
    <div className="flex flex-col border rounded-xl border-grayLight shadow-lg p-5 gap-5">
      <ImageBox
        countryCode={trip.countryCode}
        name={trip.name}
        coverImage={trip.coverImage}
        location={trip.location}
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
        <p className="text-sm text-primaryDarker">Total</p>
        <p className="text-primaryDarker text-sm leading-6">
          R$ {Number(reservation.totalPaid)}
        </p>
      </div>
      <Button variant="outlined">Cancelar Reserva</Button>
    </div>
  );
};

export default UserReservationItem;
