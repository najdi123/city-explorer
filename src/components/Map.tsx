import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Map: React.FC = () => {
  const { coordinates, name, country } = useSelector(
    (state: RootState) => state.city
  );

  return (
    <MapContainer
      center={coordinates || [51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={true}
      zoomControl={true}
      style={{ height: "100vh" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {coordinates && (
        <Marker position={coordinates}>
          <Popup>
            {name}, {country}
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default Map;
