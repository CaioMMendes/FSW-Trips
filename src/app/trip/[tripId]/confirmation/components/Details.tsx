import Button from "@/components/Button";
import ptBR from "date-fns/locale/pt-BR";
import format from "date-fns/format";
interface IDetails {
  startDate: Date;
  endDate: Date;
  guests: string;
}
const Details = ({ startDate, endDate, guests }: IDetails) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <p className="text-sm leading-6">Data</p>
            <p className="text-sm leading-6">
              {format(startDate, "dd 'de' MMMM", { locale: ptBR })} {" - "}
              {format(endDate, "dd 'de' MMMM", { locale: ptBR })}
            </p>
          </div>
        </div>
        <div className="flex justify-start items-center">
          <div className="flex flex-col">
            <p className="text-sm leading-6">Hóspedes</p>
            <p className="text-sm leading-6">{guests} hospedes</p>
          </div>
        </div>

        <Button>Comprar</Button>
      </div>
    </div>
  );
};

export default Details;
