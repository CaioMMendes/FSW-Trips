import Button from "@/components/Button";
import Image from "next/image";
import GoogleMaps from "./GoogleMaps";
interface TripLocationProps {
  location: string;
  locationDescription: string;
}

const Location = ({ location, locationDescription }: TripLocationProps) => {
  return (
    <div className="flex flex-col p-5 gap-5">
      <p className="flex flex-start font-semibold text-primaryDarker">
        Localização
      </p>
      <div className="relative h-[280px] flex justify-center w-3/4 mx-auto">
        <Image
          src={"/map-mobile.png"}
          alt={`${location} image`}
          fill
          style={{ objectFit: "cover" }}
          className="rounded-lg shadow-md"
        />
        <GoogleMaps />
      </div>

      <div className="flex flex-col gap-1">
        <h2 className="font-semibold leading-7 ">{location}</h2>
        <p className="text-sm leading-5 text-primaryDarker">
          {locationDescription}
        </p>
      </div>
    </div>
  );
};

export default Location;
