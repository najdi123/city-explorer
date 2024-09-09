import { useEffect } from "react";
import { useMap } from "react-leaflet";

const RecenterMap = ({
  coordinates,
}: {
  coordinates: { lat: number; lng: number };
}) => {
  const map = useMap();
  useEffect(() => {
    if (coordinates) {
      map.setView([coordinates.lat, coordinates.lng], 13); // Adjust zoom level if needed
    }
  }, [coordinates, map]);
  return null;
};

export default RecenterMap;
