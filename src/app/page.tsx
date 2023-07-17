import Slide from "@/components/Slide";
import QuickSearch from "./components/QuickSearch";
import RecommendedTrips from "./components/RecommendedTrips";
import SearchTrip from "./components/SearchTrip";

export default function Home() {
  return (
    <>
      <SearchTrip />
      <QuickSearch />
      <RecommendedTrips />
    </>
  );
}
