import { Trip } from "@prisma/client";
import Image from "next/image";
import ReactCountryFlag from "react-country-flag";

interface TripProps {
  trip: Trip;
}

const TripItem = ({ trip }: TripProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="relative h-[280px] w-[280px]">
        <Image
          src={trip.coverImage}
          alt={`${trip.name} image`}
          fill
          className="rounded-lg shadow-md"
        />
      </div>
      <div>
        <h3 className="text-primaryDarker font-medium text-sm">{trip.name}</h3>
        <div className="flex items-center gap-1">
          <ReactCountryFlag countryCode={trip.countryCode} svg />
          <p className="text-xs font-normal text-secondaryGray">
            {trip.location}
          </p>
        </div>
        <p className="text-xs font-normal text-secondaryGray">
          <span className="text-primary font-medium">
            R$ {trip.pricePerDay.toString()}
          </span>{" "}
          por dia
        </p>
      </div>
    </div>
  );
};

export default TripItem;
