import Button from "@/components/Button";
import Image from "next/image";
import ReactCountryFlag from "react-country-flag";
interface Props {
  coverImage: string;
  name: string;
  countryCode: string;
  location: string;
  totalPrice: number;
}

const InfoBox = ({
  coverImage,
  name,
  location,
  countryCode,
  totalPrice,
}: Props) => {
  return (
    <div className="flex flex-col border border-grayLight rounded-xl shadow-lg gap-5 p-5">
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

      <div className="flex h-[1px] w-full bg-secondaryGray"></div>

      <div className="flex flex-col gap-5">
        <p className="text-primaryDarker text-sm font-semibold">
          Informações sobre o preço
        </p>
        <div className="flex justify-between">
          <p className="text-sm text-primaryDarker">Total</p>
          <p className="text-primaryDarker text-sm leading-6">
            R$ {totalPrice}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoBox;
