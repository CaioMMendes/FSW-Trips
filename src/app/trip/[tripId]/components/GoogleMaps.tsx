"use client";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import "../../../globals.css";
const stylesMap = {
  // width:'30px',
  // height:"30px",
  color: "blue",
};
interface GoogleMapsProps {
  text: string;
}
const GoogleMaps = ({ text }: GoogleMapsProps) => {
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
          zoom={12}
          options={{ streetViewControl: false }}
        >
          <Marker
            title={text}
            options={{
              label: {
                text,
                className: `markerMaps`,
                fontSize: "16px",
                color: "#000",
                fontWeight: "500",
              },
            }}
            // label={"hotel"}
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
