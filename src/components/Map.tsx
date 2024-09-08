import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

// Define the type for the tile layer keys
type TileLayerType = "light" | "dark" | "satellite";

const Map: React.FC = () => {
  const { coordinates, name, country } = useSelector(
    (state: RootState) => state.city
  );

  // State to manage the active tile layer with strict type
  const [tileLayer, setTileLayer] = useState<TileLayerType>("light");

  // Tile layer URLs for light, dark, and satellite views
  const tileLayers: Record<TileLayerType, string> = {
    light: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    satellite:
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", // ESRI Satellite layer
  };

  return (
    <div className="relative">
      <MapContainer
        center={coordinates || [51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={true}
        zoomControl={true}
        className="h-screen" // Replace inline style with Tailwind's full-height screen
      >
        {/* Dynamically select the tile layer */}
        <TileLayer
          url={tileLayers[tileLayer]}
          attribution="&copy; OpenStreetMap contributors & ESRI"
        />
        {coordinates && (
          <Marker position={coordinates}>
            <Popup>
              {name}, {country}
            </Popup>
          </Marker>
        )}
      </MapContainer>

      {/* Layer Switch Buttons */}
      <div className="absolute top-2 right-2 z-1000 bg-white p-3 rounded-lg shadow-lg">
        <button
          onClick={() => setTileLayer("light")}
          className={`block mb-2 px-4 py-2 rounded ${
            tileLayer === "light" ? "bg-gray-200" : "bg-white"
          }`}
        >
          Light
        </button>
        <button
          onClick={() => setTileLayer("dark")}
          className={`block mb-2 px-4 py-2 rounded ${
            tileLayer === "dark" ? "bg-gray-200" : "bg-white"
          }`}
        >
          Dark
        </button>
        <button
          onClick={() => setTileLayer("satellite")}
          className={`block px-4 py-2 rounded ${
            tileLayer === "satellite" ? "bg-gray-200" : "bg-white"
          }`}
        >
          Satellite
        </button>
      </div>
    </div>
  );
};

export default Map;
