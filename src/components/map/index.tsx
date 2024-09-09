import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import RecenterMap from "./RecenterMap";
import ControlPanel from "./ControlPanel";
import L from "leaflet"; // Import Leaflet
import { ZoomControl } from "react-leaflet";

// Import the default marker images
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import markerRetina from "leaflet/dist/images/marker-icon-2x.png";

// Fix the marker icon issue by setting the default icon
const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerRetina,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon; // Set this as the default

// Define the type for the tile layer keys
type TileLayerType = "light" | "dark" | "satellite";

const Map: React.FC = () => {
  const { coordinates, name, country, population } = useSelector(
    (state: RootState) => state.city
  );

  const [tileLayer, setTileLayer] = useState<TileLayerType>("light");

  const tileLayers: Record<TileLayerType, string> = {
    light: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    satellite:
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  };

  return (
    <div className="relative">
      <MapContainer
        center={coordinates || [51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={true}
        zoomControl={false} // Disable the default zoom control
        className="h-screen"
      >
        <TileLayer
          url={tileLayers[tileLayer]}
          attribution="Karun Test Project by Ali Najdi"
          zIndex={1}
        />
        {coordinates && (
          <>
            <Marker position={[coordinates.lat, coordinates.lng]}>
              <Popup>
                {name}, {country}
                {population && <div>Population: {population}</div>}
              </Popup>
            </Marker>
            <RecenterMap coordinates={coordinates} />
          </>
        )}

        {/* Custom ZoomControl positioned at bottom-left */}
        <ZoomControl position="bottomleft" />
      </MapContainer>

      {/* Theme Switch Buttons */}
      <ControlPanel tileLayer={tileLayer} setTileLayer={setTileLayer} />
    </div>
  );
};

export default Map;
