import React from "react";
import { Provider } from "react-redux";
import ReduxAppRouter from "./router/AppRouter";
import setupStore from "./redux/setupStore";
import isAuthorized from "./helpers/check-auth";
import "./styles/main.scss";

const store = setupStore();

function App() {
  return (
    <Provider store={store}>
      <ReduxAppRouter authorized={isAuthorized(store)} />
    </Provider>
  );
}

export default App;
