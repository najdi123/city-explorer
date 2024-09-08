import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <p>City Explorer</p>
      </div>
    </Provider>
  );
}

export default App;
