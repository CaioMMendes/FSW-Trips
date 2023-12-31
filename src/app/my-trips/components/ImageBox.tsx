import Image from "next/image";
import Link from "next/link";
import ReactCountryFlag from "react-country-flag";

interface ImageBoxProps {
  coverImage: string;
  name: string;
  countryCode: string;
  location: string;
  tripId: string;
}

const ImageBox = ({
  coverImage,
  name,
  countryCode,
  location,
  tripId,
}: ImageBoxProps) => {
  return (
    <Link href={`https://fsw-trips-caiommendes.vercel.app/trip/${tripId}`}>
      <div className="flex gap-5 items-center">
        <div className="relative h-[106px] w-[124px] ">
          <Image
            src={coverImage}
            alt={`${name} image`}
            fill
            className="rounded-xl "
            style={{
              objectFit: "cover",
            }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-primaryDarker font-semibold">{name}</p>
          <div className="flex gap-1 items-center">
            <ReactCountryFlag countryCode={countryCode} svg />
            <p className="text-secondaryGray text-sm font-medium underline">
              {location}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ImageBox;
