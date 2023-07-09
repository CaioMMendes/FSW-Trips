import { Trip } from "@prisma/client";
import { MoveLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ReactCountryFlag from "react-country-flag";

interface TripProps {
  trip: Trip;
}

const TripHeader = ({ trip }: TripProps) => {
  return (
    <>
      <Link href={"/"}>
        <div className="flex  mb-1 ml-5  text-primary">
          <MoveLeft width={32} height={24} /> Voltar
        </div>
      </Link>
      <div className="flex flex-col justify-center gap-4">
        <div className="relative h-[280px] w-full">
          <Image
            src={`${trip.coverImage}`}
            alt={`${trip.name} cover image`}
            fill
          />
        </div>
        {/* Título e informações*/}
        <div className="flex flex-col px-5 gap-1">
          <h1 className="text-xl  text-primaryDarker">{trip.name}</h1>
          <div className="flex items-center gap-1">
            <ReactCountryFlag countryCode={trip.countryCode} svg />
            <p className="text-xs font-normal text-secondaryGray underline">
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
    </>
  );
};

export default TripHeader;
