import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ConfigProvider } from "antd";
import { Router } from "react-router-dom";

import Routes from "./routes";
import history from "./services/history";
import ptBR from "antd/es/locale/pt_BR";

import { persistor, store } from "./store";

import "./App.css";

function App() {
  return (
    <ConfigProvider locale={ptBR}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Router history={history}>
            <Routes />
          </Router>
        </PersistGate>
      </Provider>
    </ConfigProvider>
  );
}

export default App;
