"use client";
import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import { Trip } from "@prisma/client";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface TripReservationPorps {
  trip: Trip;
}
const TripReservation = ({ trip }: TripReservationPorps) => {
  type TripReservationFormData = z.infer<typeof tripReservationFormSchema>;

  const tripReservationFormSchema = z.object({
    guests: z.string().nonempty("O número de hóspedes é obrigatório"),
    startDate: z
      .date({
        required_error: "A data inicial é obrigatória",
        invalid_type_error: "Selecione uma data valida",
      })
      .nullable(),
    endDate: z
      .date({
        required_error: "A data final é obrigatória",
        invalid_type_error: "Selecione uma data valida",
      })
      .nullable(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<TripReservationFormData>({
    resolver: zodResolver(tripReservationFormSchema),
  });
  const onSubmit = (data: any) => {
    console.log({ data });
    console.log(1231);
  };

  return (
    <div className="px-5 pt-5  flex flex-col gap-2 ">
      <div className="flex gap-2">
        <Controller
          name="startDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              className="w-full"
              placeholderText="Data de início"
              error={!!errors.startDate}
              errorMessage={errors.startDate?.message}
              selected={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          name="endDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              className="w-full"
              placeholderText="Data Final"
              error={!!errors.endDate}
              errorMessage={errors.endDate?.message}
              selected={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>
      <Input
        {...register("guests")}
        error={!!errors?.guests}
        errorMessage={errors?.guests?.message}
        placeholder={`Número de hóspedes (máx: ${trip.maxGuests})`}
      />
      <div className="flex justify-between">
        <p className="text-primaryDarker text-sm font-medium">Total</p>
        <p className="text-primaryDarker text-sm font-medium">R$</p>
      </div>
      <div className="pb-10 border border-b-grayLight w-full">
        <Button onClick={() => handleSubmit(onSubmit)()} className="w-full">
          Reservar agora
        </Button>
      </div>
    </div>
  );
};

export default TripReservation;
