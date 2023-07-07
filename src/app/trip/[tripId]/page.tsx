import { prisma } from "@/lib/prisma";
import Image from "next/image";
import ReactCountryFlag from "react-country-flag";
import TripHeader from "./components/TripHeader";

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
      <div className="flex flex-col justify-center gap-4">
        <TripHeader trip={trip} />

        {/* Inputs */}
      </div>
    </div>
  );
};

export default TripDetails;
