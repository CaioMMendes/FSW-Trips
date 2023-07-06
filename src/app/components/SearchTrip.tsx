import Input from "@/components/Input";
import DatePicker from "@/components/DatePicker";
import CurrencyInput from "@/components/CurrencyInput";
import Button from "@/components/Button";
import QuickSearch from "./QuickSearch";

const SearchTrip = () => {
  return (
    <div className="mx-auto p-5 bg-search-background bg-cover bg-center bg-no-repeat">
      <h1 className="text-primaryDarker font-semibold text-2xl flex justify-center items-center">
        <p>
          Encontre sua próxima <span className="text-primary"> viagem!</span>
        </p>
      </h1>

      <div className="flex flex-col mt-5 gap-4">
        <Input placeholder="Onde você quer ir?" />
        <div className="flex gap-4">
          <DatePicker
            className="w-full"
            placeholderText="Data de ida"
            onChange={() => {}}
          />
          <CurrencyInput placeholder="Orçamento" />
        </div>
        <Button>Pesquisar</Button>
      </div>
      <QuickSearch />
    </div>
  );
};

export default SearchTrip;
