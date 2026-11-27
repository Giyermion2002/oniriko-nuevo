import { lazy, Suspense, type FC } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { SEO } from "./components/SEO";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Menu } from "./sections/Menu";
import { Extras } from "./sections/Extras";
import { Gallery } from "./sections/Gallery";
import { Contact } from "./sections/Contact";

const AdminMenuPage = lazy(() => import("./pages/AdminMenuPage"));
const ADMIN_PATH = import.meta.env.VITE_ADMIN_PATH || "/gestion-carta";

const LandingPage: FC = () => {
  return (
    <>
      <SEO />
      <Navbar />
      <main className="bg-cream-50">
        <Hero />
        <About />
        <Menu />
        <Extras />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path={ADMIN_PATH}
          element={
            <Suspense fallback={<div className="min-h-screen bg-cream-50" />}>
              <AdminMenuPage />
            </Suspense>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
