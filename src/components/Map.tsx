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
    <div style={{ position: "relative" }}>
      <MapContainer
        center={coordinates || [51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={true}
        zoomControl={true}
        style={{ height: "100vh" }}
      >
        {/* Dynamically select the tile layer */}
        <TileLayer
          url={tileLayers[tileLayer]} // Fixed type error
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

      {/* Layer Switch Buttons */}
      <div
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          zIndex: 1000,
          background: "white",
          padding: "10px",
          borderRadius: "8px",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
        }}
      >
        <button
          onClick={() => setTileLayer("light")}
          style={{
            display: "block",
            marginBottom: "5px",
            padding: "5px",
            background: tileLayer === "light" ? "#ddd" : "#fff",
          }}
        >
          Light
        </button>
        <button
          onClick={() => setTileLayer("dark")}
          style={{
            display: "block",
            marginBottom: "5px",
            padding: "5px",
            background: tileLayer === "dark" ? "#ddd" : "#fff",
          }}
        >
          Dark
        </button>
        <button
          onClick={() => setTileLayer("satellite")}
          style={{
            display: "block",
            padding: "5px",
            background: tileLayer === "satellite" ? "#ddd" : "#fff",
          }}
        >
          Satellite
        </button>
      </div>
    </div>
  );
};

export default Map;
