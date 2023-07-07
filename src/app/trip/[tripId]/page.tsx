import { prisma } from "@/lib/prisma";
import Image from "next/image";
import ReactCountryFlag from "react-country-flag";
import TripHeader from "./components/TripHeader";
import TripReservation from "./components/TripReservation";
import AboutTrip from "./components/AboutTrip";
import HighlightsTrip from "./components/HighlightsTrip";
import Location from "./components/Location";
import Footer from "./components/Footer";

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
      <AboutTrip description={trip.description} />
      <HighlightsTrip highlights={trip.highlights} />
      <Location
        location={trip.location}
        locationDescription={trip.locationDescription}
      />
      <Footer />
    </div>
  );
};

export default TripDetails;
