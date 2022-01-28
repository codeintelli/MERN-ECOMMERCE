import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
// todo: Basically we are import and use for alert if we are import it here then we can use it anywhere
// * for using it we need to do some process like creating options & provide tag ALert provider and more
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

let options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  offset: "30px",
  transition: transitions.SCALE,
};

ReactDOM.render(
  <>
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...options}>
        {/* <React.StrictMode> */}
        <App />
        {/* </React.StrictMode> */}
      </AlertProvider>
    </Provider>
  </>,
  document.getElementById("root")
);
