import { prisma } from "@/lib/prisma";
import AboutTrip from "./components/AboutTrip";
import HighlightsTrip from "./components/HighlightsTrip";
import Location from "./components/Location";
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
  console.log(trip.startDate);
  return (
    <div>
      <TripHeader trip={trip} />
      <TripReservation
        tripId={trip.id}
        startDate={trip.startDate}
        endDate={trip.endDate}
        maxGuests={trip.maxGuests}
        pricePerDay={trip.pricePerDay as any}
      />
      <AboutTrip description={trip.description} />
      <HighlightsTrip highlights={trip.highlights} />
      <Location
        location={trip.location}
        locationDescription={trip.locationDescription}
      />
    </div>
  );
};

export default TripDetails;
