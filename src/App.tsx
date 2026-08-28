import type { FC } from "react";

import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";

const App: FC = () => {
  return (
    <>
      <Navbar />
      <main className="bg-cream-50">
        <Hero />
        <About />
      </main>
      <Footer />
    </>
  );
};

export default App;
