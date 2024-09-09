import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Map from "./components/map/index";
import Search from "./components/Search";

function App() {
  return (
    <Provider store={store}>
      <div className="relative h-screen">
        <Search />
        <Map />
      </div>
    </Provider>
  );
}

export default App;
