import { prisma } from "@/lib/prisma";
import Image from "next/image";
import ReactCountryFlag from "react-country-flag";
import TripHeader from "./components/TripHeader";
import TripReservation from "./components/TripReservation";

const getTripDetails = async (tripId: string) => {
  const trip = await prisma.trip.findUnique({
    where: {
      id: tripId,
    },
  });
  return trip;
};

const TripDetails = async ({ params }: { params: { tripId: string } }) => {
  const trip = await getTripDetails(params.tripId);
  if (trip === null) {
    return;
  }
  return (
    <div>
      <TripHeader trip={trip} />
      <TripReservation trip={trip} />

      <h1>asdasd</h1>
    </div>
  );
};

export default TripDetails;
