import { Trip } from "@prisma/client";

interface AboutTripProps {
  description: string;
}

const AboutTrip = ({ description }: AboutTripProps) => {
  return (
    <div className="flex flex-col p-5 pt-3 lg:pt-8  gap-1">
      <div className="flex justify-start font-semibold mt-5 lg:text-xl text-primaryDarker">
        Sobre a Viagem
      </div>
      <p className="flex justify-start text-sm lg:text-base text-primaryDarker leading-5">
        {description}
      </p>
    </div>
  );
};

export default AboutTrip;
