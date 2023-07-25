"use client";
import Slide from "@/components/Slide";
import { Trip } from "@prisma/client";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import ReactCountryFlag from "react-country-flag";
import ImageModal from "./ImageModal";

interface TripProps {
  trip: Trip;
}

const TripHeader = ({ trip }: TripProps) => {
  const router = useRouter();
  const images = [...trip.imageUrl, trip.coverImage];
  const handleClick = () => {
    router.back();
  };

  return (
    <>
      <button onClick={handleClick} className="max-sm:hidden">
        <div className="flex  mb-1 ml-5  text-primary ">
          <MoveLeft width={32} height={24} /> Voltar
        </div>
      </button>
      <div className="flex flex-col justify-center gap-4 ">
        <div className="relative px-5  h-[280px] w-full lg:hidden">
          <Slide
            imageUrl={trip.imageUrl}
            coverImage={trip.coverImage}
            name={trip.name}
            tripId={trip.id}
            redirectUrl={null}
          />
        </div>
        <ImageModal
          coverImage={trip.coverImage}
          imageUrl={trip.imageUrl}
          name={trip.name}
        />
        {/* Título e informações*/}
        <div className="flex flex-col px-5 gap-1 lg:order-1">
          <h1 className="text-xl lg:text-2xl text-primaryDarker font-semibold">
            {trip.name}
          </h1>
          <div className="flex items-center gap-1">
            <ReactCountryFlag countryCode={trip.countryCode} svg />
            <p className="text-xs font-normal lg:text-base text-secondaryGray underline">
              {trip.location}
            </p>
          </div>
          <p className="text-xs font-normal text-secondaryGray lg:hidden">
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
