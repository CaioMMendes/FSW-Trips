import { addDays } from "date-fns";
export function minDateEnd(
  startDateWatch: Date | null,
  startDate: Date,
  tripReservations: {
    startDate: Date;
    endDate: Date;
  }[]
) {
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
}

export function minDate(startDateWatch: Date | null, startDate: Date) {
  const currentDate = new Date(Date.now());
  if (startDateWatch === null || startDate === null) {
    return null;
  }
  if (startDateWatch <= currentDate || startDate <= currentDate) {
    return currentDate;
  } else {
    return startDateWatch;
  }
}
