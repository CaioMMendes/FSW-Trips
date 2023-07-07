import { prisma } from "@/lib/prisma";

// const getTrips = async () => {
//   const trips = await prisma.trip.findMany({});
//   return trips;
// };

// const createTrip = async () => {
//   const trip = await prisma.trip.create({
//     data: {
//       name: "asdasd",
//       location: "asdasd",
//       startDate: new Date(Date.now()),
//       endDate: new Date(Date.now()),
//       pricePerDay: 11.33,
//       description: "asdasd",
//       coverImage: "asdasd",
//       imageUrl: "asdasd",
//       hightlights: "asdasd",
//       maxGuests: 11,
//     },
//   });
//   return trip;
// };

const deleteTrip = async () => {
  await prisma.trip.deleteMany({});
};

const Trips = async () => {
  // const data = await createTrip()

  //   const data = await getTrips();
  // const data = await fetch("https://jsonplaceholder.typicode.com/todos/1")

  //   console.log({ data });
  return <div>Trips</div>;
};

export default Trips;
