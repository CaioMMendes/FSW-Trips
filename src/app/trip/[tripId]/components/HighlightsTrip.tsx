import Image from "next/image";

interface HighlightsPorps {
  highlights: string[];
}
const HighlightsTrip = ({ highlights }: HighlightsPorps) => {
  //   if (!highlights) {
  //     return;
  //   }
  return (
    <div className="flex flex-col p-5 gap-2">
      <p className="flex flex-start font-semibold text-primaryDarker">
        Destaques
      </p>
      <div className="flex flex-wrap gap-y-2">
        {highlights.map((highlight, index) => {
          return (
            <div key={index} className="flex items-center gap-1 w-1/2">
              <Image
                src={"/check-icon.png"}
                width={15}
                height={15}
                alt="Check icon"
              />
              <p className="text-secondaryGray text-sm leading-6">
                {highlight}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HighlightsTrip;
