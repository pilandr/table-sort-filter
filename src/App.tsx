import React from "react";
import { Provider } from "react-redux";

import MainApplication from "components/MainApplication/MainApplication";
import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <MainApplication />
    </Provider>
  );
}

export default App;
