import Image from "next/image";
import Link from "next/link";

const QuickSearch = () => {
  return (
    <div className="flex flex-col px-5 pt-5 gap-5">
      <div className="flex items-center justify-center h-6 gap-2">
        <div className="h-[1px] w-full bg-grayLight"></div>
        <div className="flex items-center jsutify-center font-medium h-6 w-auto">
          <h2 className="whitespace-nowrap text-secondaryGray">
            {" "}
            Tente pesquisar por
          </h2>
        </div>
        <div className="h-[1px] w-full bg-grayLight"></div>
      </div>
      <div className="flex justify-between items-center ">
        <Link
          href={
            "/trip/search?text=fazenda&startDate=undefined&budget=undefined"
          }
        >
          <div className="flex flex-col items-center justify-center gap-1 cursor-pointer">
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
            "/trip/search?text=pousada&startDate=undefined&budget=undefined"
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
          href={"/trip/search?text=hotel&startDate=undefined&budget=undefined"}
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
          href={"/trip/search?text=chale&startDate=undefined&budget=undefined"}
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
