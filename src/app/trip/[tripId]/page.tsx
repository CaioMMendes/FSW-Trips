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

const getTripsReservatios = async (tripId: string) => {
  const tripsReservations = await prisma.tripReservation.findMany({
    where: {
      tripId: tripId,
    },
  });

  return tripsReservations.map((reservation) => {
    return {
      startDate: reservation.startDate,
      endDate: reservation.endDate,
    };
  });
};

const TripDetails = async ({ params }: { params: { tripId: string } }) => {
  const trip = await getTripDetails(params.tripId);
  if (trip === null) {
    return;
  }
  const tripsReservations = await getTripsReservatios(params.tripId);
  console.log(tripsReservations);

  return (
    <div>
      <TripHeader trip={trip} />
      <TripReservation
        tripId={trip.id}
        startDate={trip.startDate}
        endDate={trip.endDate}
        maxGuests={Number(trip.maxGuests)}
        pricePerDay={Number(trip.pricePerDay)}
        tripsReservations={tripsReservations}
      />
      <AboutTrip description={trip.description} />
      <HighlightsTrip highlights={trip.highlights} />
      <Location
        location={trip.location}
        latitude={trip.latitude}
        longitude={trip.longitude}
        locationDescription={trip.locationDescription}
        name={trip.name}
      />
    </div>
  );
};

export default TripDetails;
