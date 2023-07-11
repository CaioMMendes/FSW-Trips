"use client";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const GoogleMaps = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY!,
  });
  return (
    <>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={{ lat: 40.6307395, lng: 14.5941317 }}
          zoom={15}
        ></GoogleMap>
      ) : (
        <></>
      )}
    </>
  );
};

export default GoogleMaps;
