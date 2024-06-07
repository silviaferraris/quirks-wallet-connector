import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { ConnectionButton } from "./ConnectionButton";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App>
      <ConnectionButton></ConnectionButton>
    </App>
  </React.StrictMode>
);

reportWebVitals();
