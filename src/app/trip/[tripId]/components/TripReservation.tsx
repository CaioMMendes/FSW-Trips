"use client";
import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import { Trip } from "@prisma/client";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { differenceInDays } from "date-fns";

interface TripReservationProps {
  tripId: string;
  startDate: Date;
  endDate: Date;
  maxGuests: number;
  pricePerDay: number;
}
const TripReservation = ({
  tripId,
  startDate,
  endDate,
  maxGuests,
  pricePerDay,
}: TripReservationProps) => {
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
    watch,
    setError,
  } = useForm<TripReservationFormData>({
    resolver: zodResolver(tripReservationFormSchema),
  });
  const onSubmit = async (data: TripReservationFormData) => {
    console.log({ data });
    const response = await fetch("http://localhost:3000/api/trip/check", {
      method: "POST",
      body: Buffer.from(
        JSON.stringify({
          tripId,
          startDate: data.startDate,
          endDate: data.endDate,
        })
      ),
    });
    const res = await response.json();
    if (res?.error?.code === "TRIP_ALREADY_RESERVED") {
      setError("startDate", {
        type: "manual",
        message: "Este intervalo de datas está indisponível.",
      });
      setError("endDate", {
        type: "manual",
        message: "Este intervalo de datas está indisponível.",
      });
    }
    if (res?.error?.code === "INVALID_START_DATE") {
      setError("startDate", {
        type: "manual",
        message: "Data inválida.",
      });
    }
    if (res?.error?.code === "INVALID_END_DATE") {
      setError("endDate", {
        type: "manual",
        message: "Data inválida.",
      });
    }

    console.log(res);
  };

  const startDateWatch = watch("startDate");
  const endDateWatch = watch("endDate");
  const minDate = () => {
    const currentDate = new Date(Date.now());
    if (startDateWatch === null) {
      return null;
    }
    if (startDateWatch <= currentDate) {
      return currentDate;
    } else {
      return startDateWatch;
    }
  };
  console.log("start date", startDate);
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
              minDate={startDate}
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
              maxDate={endDate}
              minDate={startDateWatch ?? startDate}
            />
          )}
        />
      </div>
      <Input
        {...register("guests")}
        error={!!errors?.guests}
        errorMessage={errors?.guests?.message}
        placeholder={`Número de hóspedes (máx: ${maxGuests})`}
      />
      <div className="flex justify-between">
        <p className="text-primaryDarker text-sm font-medium">Total</p>
        <p className="text-primaryDarker text-sm font-medium">
          R${" "}
          {startDateWatch && endDateWatch
            ? differenceInDays(endDateWatch, startDateWatch) * pricePerDay
            : "0,00"}
        </p>
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
