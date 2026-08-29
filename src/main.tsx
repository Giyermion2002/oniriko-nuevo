import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import Main from "./Main";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <Main />
    </HelmetProvider>
  </StrictMode>,
);
