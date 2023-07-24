import Image from "next/image";
import Link from "next/link";

const QuickSearch = () => {
  return (
    <div className="flex flex-col items-center w-full px-5 pt-5 gap-5">
      <div className="flex items-center w-full justify-center h-6 gap-2">
        <div className="h-[1px] w-full bg-grayLight"></div>
        <div className="flex items-center jsutify-center font-medium h-6 w-auto">
          <h2 className="whitespace-nowrap text-secondaryGray">
            {" "}
            Tente pesquisar por
          </h2>
        </div>
        <div className="h-[1px] w-full bg-grayLight"></div>
      </div>
      <div className="flex justify-between w-full lg:max-w-3xl md:max-w-xl items-center ">
        <Link
          href={
            "/trip/search?text=fazenda&startDate=undefined&endDate=undefined&budget=undefined"
          }
        >
          <div className="flex  flex-col items-center justify-center gap-1 cursor-pointer">
            <Image
              src={"/farm-icon.png"}
              alt="Farm icon"
              width={25}
              height={25}
            />
            <p className="text-secondaryGray text-sm">Fazendas</p>
          </div>
        </Link>

        <Link
          href={
            "/trip/search?text=pousada&startDate=undefined&endDate=undefined&budget=undefined"
          }
        >
          <div className="flex flex-col items-center justify-center gap-1 cursor-pointer">
            <Image
              src={"/inn-icon.png"}
              alt="Inn icon"
              width={25}
              height={25}
            />
            <p className="text-secondaryGray text-sm">Pousadas</p>
          </div>
        </Link>

        <Link
          href={
            "/trip/search?text=hotel&startDate=undefined&endDate=undefined&budget=undefined"
          }
        >
          <div className="flex flex-col items-center justify-center gap-1 cursor-pointer">
            <Image
              src={"/hotel-icon.png"}
              alt="Hotel icon"
              width={25}
              height={25}
            />
            <p className="text-secondaryGray text-sm">Hoteis</p>
          </div>
        </Link>

        <Link
          href={
            "/trip/search?text=chalé&startDate=undefined&endDate=undefined&budget=undefined"
          }
        >
          <div className="flex flex-col items-center justify-center gap-1 cursor-pointer">
            <Image
              src={"/cottage-icon.png"}
              alt="Cottage icon"
              width={25}
              height={25}
            />
            <p className="text-secondaryGray text-sm">Chalés</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default QuickSearch;
