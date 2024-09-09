import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setCity } from "../store/citySlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Search: React.FC = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=5b806adc48044d549c70cbfb6d385636`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch city data. Please try again.");
      }
      const data = await response.json();
      const result = data.results[0];

      if (result) {
        dispatch(
          setCity({
            name: result.components.city || result.components.state,
            country: result.components.country,
            coordinates: {
              lat: result.geometry.lat,
              lng: result.geometry.lng,
            },
            population: result.components.population || "N/A",
          })
        );
      } else {
        toast.error("City not found. Please enter a valid city name.");
      }
    } catch (error) {
      console.error("Error fetching city data:", error);
      toast.error(
        "An error occurred while fetching city data. Please try again later."
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="absolute top-5 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-md p-4 flex gap-2 z-[1000]"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a city..."
          className="border border-gray-300 rounded-md py-2 px-3 w-64"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default Search;
