import React from "react";

// Define the type for the tile layer keys
type TileLayerType = "light" | "dark" | "satellite";

const ControlPanel: React.FC<{
  setTileLayer: (layer: TileLayerType) => void;
  tileLayer: TileLayerType;
}> = ({ setTileLayer, tileLayer }) => {
  return (
    <div className="absolute bottom-2 right-2 z-[1000] bg-white p-3 rounded-lg shadow-lg">
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
  );
};

export default ControlPanel;
