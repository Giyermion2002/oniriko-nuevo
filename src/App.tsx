import type { FC } from "react";

import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { SEO } from "./components/SEO";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Menu } from "./sections/Menu";
import { Extras } from "./sections/Extras";
import { Gallery } from "./sections/Gallery";
import { Community } from "./sections/Community";
import { Contact } from "./sections/Contact";

const App: FC = () => {
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
        <Community />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default App;
