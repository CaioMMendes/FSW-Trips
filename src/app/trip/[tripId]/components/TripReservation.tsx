"use client";
import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import { Trip } from "@prisma/client";

interface TripReservationPorps {
  trip: Trip;
}

const TripReservation = ({ trip }: TripReservationPorps) => {
  return (
    <div className="px-5 pt-5  flex flex-col gap-2 ">
      <div className="flex gap-2">
        <DatePicker
          className="w-full"
          placeholderText="Data de início"
          onChange={() => {}}
        />
        <DatePicker
          className="w-full"
          placeholderText="Data de termino"
          onChange={() => {}}
        />
      </div>
      <Input placeholder={`Número de hóspedes (máx: ${trip.maxGuests})`} />
      <div className="flex justify-between">
        <p className="text-primaryDarker text-sm font-medium">Total</p>
        <p className="text-primaryDarker text-sm font-medium">R$</p>
      </div>
      <div className="pb-10 border border-b-grayLight w-full">
        <Button className="w-full">Reservar agora</Button>
      </div>
    </div>
  );
};

export default TripReservation;
