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
    <div className="px-5 pt-5 pb-10 flex flex-col gap-2">
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
      <Button>Reservar agora</Button>
    </div>
  );
};

export default TripReservation;
