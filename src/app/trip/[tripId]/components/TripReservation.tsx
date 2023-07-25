"use client";
import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { differenceInDays } from "date-fns";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import GetDatesInRange from "./GetDatesInRange";
import { minDate, minDateEnd } from "./MinDate";

interface TripReservationProps {
  tripId: string;
  startDate: Date;
  endDate: Date;
  maxGuests: number;
  pricePerDay: number;
  tripsReservations: {
    startDate: Date;
    endDate: Date;
  }[];
}
const TripReservation = ({
  tripId,
  startDate,
  endDate,
  maxGuests,
  pricePerDay,
  tripsReservations,
}: TripReservationProps) => {
  type TripReservationFormData = z.infer<typeof tripReservationFormSchema>;

  const tripReservationFormSchema = z.object({
    guests: z
      .number({
        required_error: "O número de hóspedes é obrigatório",
        invalid_type_error: "Insira um número válido",
      })
      .int()
      .gte(1, "O número de hóspedes precisa ser igual ou maior que 1")
      .lte(
        maxGuests,
        `O número de hóspedes não pode ser maior que ${maxGuests}`
      ),
    // .max(
    //   maxGuests,
    //   `O número de hóspedes não pode ser maior que ${maxGuests}`
    // ),
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

  const router = useRouter();

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
    if (data.startDate === null || data.endDate === null) {
      return;
    }
    const response = await fetch("/api/trip/check", {
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
      return setError("endDate", {
        type: "manual",
        message: "Este intervalo de datas está indisponível.",
      });
    }
    if (res?.error?.code === "INVALID_START_DATE") {
      return setError("startDate", {
        type: "manual",
        message: "Data inválida.",
      });
    }
    if (res?.error?.code === "INVALID_END_DATE") {
      return setError("endDate", {
        type: "manual",
        message: "Data inválida.",
      });
    }

    router.push(
      `/trip/${tripId}/confirmation?startDate=${data.startDate?.toISOString()}&endDate=${data.endDate?.toISOString()}&guests=${
        data.guests
      }`
    );
  };

  const startDateWatch = watch("startDate");
  const endDateWatch = watch("endDate");
  const reservedDates = GetDatesInRange(tripsReservations);

  const daysDifference =
    endDateWatch && startDateWatch
      ? differenceInDays(endDateWatch, startDateWatch)
      : 0;
  return (
    <div className="px-5 pt-5  flex flex-col gap-2 lg:min-w-[380px] lg:border-grayLight lg:border lg:rounded-lg lg:shadow-md">
      <p className="text-xl text-primaryDarker mb-4 hidden lg:block">
        <span className="font-semibold">R$ {pricePerDay}</span>/Dia
      </p>

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
              minDate={minDate(startDateWatch, startDate)}
              maxDate={endDate}
              excludeDates={reservedDates}
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
              // minDate={startDateWatch ?? startDate}
              minDate={minDateEnd(startDateWatch, startDate, tripsReservations)}
              excludeDates={reservedDates}
            />
          )}
        />
      </div>
      <Input
        {...register("guests", {
          valueAsNumber: true,
        })}
        error={!!errors?.guests}
        type="number"
        errorMessage={errors?.guests?.message}
        placeholder={`Número de hóspedes (máx: ${maxGuests})`}
      />
      <div className="flex justify-between">
        <p className="text-primaryDarker text-sm lg:text-base font-medium">
          Total{" "}
          {startDateWatch && endDateWatch
            ? `(${daysDifference} ${
                daysDifference === 1 ? "noite" : "noites"
              }) `
            : ""}
        </p>
        <p className="text-primaryDarker text-sm font-medium lg:text-base">
          R${" "}
          {startDateWatch && endDateWatch
            ? daysDifference * pricePerDay
            : "0,00"}
        </p>
      </div>
      <Button onClick={() => handleSubmit(onSubmit)()} className="w-full mb-4">
        Reservar agora
      </Button>
      <div className=" h-[1px] bg-grayLight lg:border-none"></div>
    </div>
  );
};

export default TripReservation;
