"use client";
import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import { Trip } from "@prisma/client";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { differenceInDays } from "date-fns";
import { useRouter } from "next/navigation";
import { addDays } from "date-fns";
import { setHours } from "date-fns";

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
  const minDate = () => {
    const currentDate = new Date(Date.now());
    if (startDateWatch === null || startDate === null) {
      return null;
    }
    if (startDateWatch <= currentDate || startDate <= currentDate) {
      return currentDate;
    } else {
      return startDateWatch;
    }
  };
  const minDateEnd = () => {
    const currentDate = new Date(Date.now());
    const currentDayUpdated = addDays(currentDate, 1);
    if (startDateWatch === null || startDate === null) {
      return null;
    }
    const startDateUpdated = addDays(startDateWatch, 1);
    if (startDateWatch <= currentDate) {
      return currentDayUpdated;
    } else if (startDateWatch >= currentDate) {
      return startDateUpdated;
    } else if (startDate <= currentDate) {
      return currentDayUpdated;
    }
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
              minDate={minDate()}
              maxDate={endDate}
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
              minDate={minDateEnd()}
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
