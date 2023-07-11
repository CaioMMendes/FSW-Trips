import { TripReservation } from "@prisma/client";

interface UserReservationItemProps {
  reservation: TripReservation;
}

const UserReservationItem = ({ reservation }: UserReservationItemProps) => {
  return <div>UserReservationItem</div>;
};

export default UserReservationItem;
