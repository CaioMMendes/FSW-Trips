import TripItem from "@/components/TripItem";
import { prisma } from "@/lib/prisma";
import { Trip } from "@prisma/client";

const getTrips = async () => {
  const trips = await prisma.trip.findMany();
  return trips;
};

const RecommendedTrips = async () => {
  const data = await getTrips();

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-5">
      <div className="flex items-center justify-center w-full h-6 gap-2">
        <div className="h-[1px] w-full bg-grayLight"></div>
        <div className="flex items-center jsutify-center font-medium h-6 w-auto">
          <h2 className="whitespace-nowrap text-secondaryGray">
            Destinos Recomendados
          </h2>
        </div>
        <div className="h-[1px] w-full bg-grayLight"></div>
      </div>

      <div className="flex flex-col gap-5 items-center w-full">
        {data.map((trip: Trip) => (
          <TripItem key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedTrips;
