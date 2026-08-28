import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { LanguageProvider } from "./i18n/LanguageContext.tsx";
import { ScrollToTop } from "./components/ScrollToTop.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LanguageProvider>
      <App />
      <ScrollToTop />
    </LanguageProvider>
  </StrictMode>,
);
