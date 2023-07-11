import ptBR from "date-fns/locale/pt-BR";
import format from "date-fns/format";

interface InfoBoxProps {
  startDate: Date;
  endDate: Date;
  guests: number;
}

const ReservationDetails = ({ startDate, endDate, guests }: InfoBoxProps) => {
  return (
    <div className="flex flex-col ga-5">
      <h1 className="text-primaryDarker text-base font-semibold">
        Sobre a viagem
      </h1>
      <div className="flex flex-col">
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <p className="text-sm leading-6">Data</p>
              <p className="text-sm leading-6">
                {format(new Date(startDate), "dd 'de' MMMM", { locale: ptBR })}{" "}
                {" - "}
                {format(new Date(endDate), "dd 'de' MMMM", { locale: ptBR })}
              </p>
            </div>
          </div>
          <div className="flex justify-start items-center">
            <div className="flex flex-col">
              <p className="text-sm leading-6">Hóspedes</p>
              <p className="text-sm leading-6">{guests} hospedes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationDetails;
