import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.jsx";
import { GlobalContextWrapper } from "./context/globalContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalContextWrapper>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GlobalContextWrapper>
  </StrictMode>
);
