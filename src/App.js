import React from "react";
import RootNavigation from "./navigation";
import { Provider } from "react-redux";
import Store from "./redux/store";

function App() {
  return (
    <Provider store={Store}>
      <RootNavigation />
    </Provider>
  );
}

export default App;
