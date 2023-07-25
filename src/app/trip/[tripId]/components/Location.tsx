import Button from "@/components/Button";
import Image from "next/image";
import GoogleMaps from "./GoogleMaps";
interface TripLocationProps {
  location: string;
  locationDescription: string;
  name: string;
  latitude: string;
  longitude: string;
}

const Location = ({
  location,
  locationDescription,
  name,
  latitude,
  longitude,
}: TripLocationProps) => {
  return (
    <div className="flex flex-col p-5 gap-3">
      <p className="flex flex-start font-semibold text-lg text-primaryDarker lg:text-xl">
        Localização
      </p>
      <div className="flex flex-col gap-1 mb-2">
        <h2 className="font-semibold leading-7 lg:text-lg">{location}</h2>
        <p className="text-sm leading-5 text-primaryDarker lg:text-base">
          {locationDescription}
        </p>
      </div>
      <div className="relative h-[300px] lg:h-[420px] md:h-[360px] flex justify-center  rounded-lg w-full items-center mx-auto">
        <Image
          src={"/map-mobile.png"}
          alt={`${location} image`}
          fill
          style={{ objectFit: "cover" }}
          className="rounded-lg shadow-md"
        />
        <GoogleMaps text={name} latitude={latitude} longitude={longitude} />
      </div>
    </div>
  );
};

export default Location;
