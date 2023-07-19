"use client";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
const stylesMap = {
  // width:'30px',
  // height:"30px",
  color: "blue",
};
const GoogleMaps = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY!,
  });
  const position = { lat: 40.6307395, lng: 14.5941317 };
  return (
    <>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={position}
          zoom={15}
          options={{ streetViewControl: false }}
        >
          <Marker
            title={"Hotel"}
            // options={{
            //   label: {
            //     text: "teste",
            //     className: ''
            //   },
            // }}
            position={position}
          ></Marker>
        </GoogleMap>
      ) : (
        <></>
      )}
    </>
  );
};

export default GoogleMaps;
