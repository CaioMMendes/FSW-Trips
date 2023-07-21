import addDays from "date-fns/addDays";

interface GetDatesInRangeProps {
  tripReservations: {
    startDate: Date;
    endDate: Date;
  }[];
}
const GetDatesInRange = (
  tripReservations: {
    startDate: Date;
    endDate: Date;
  }[]
) => {
  const reservedDates: Date[] = [];

  tripReservations.map((reservations) => {
    const start = new Date(
      new Date(reservations.startDate) /*.setUTCHours(0, 0, 0, 0)*/
    );
    const end = new Date(
      new Date(addDays(reservations.endDate, -1)) /*.setUTCHours(0, 0, 0, 0)*/
    );

    const date = new Date(start.getTime());

    // const dates = [];

    while (date <= end) {
      reservedDates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    // return dates;
  });
  return reservedDates;
};

export default GetDatesInRange;
