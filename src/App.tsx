import type { FC } from "react";

import { Container, Section } from "./components/Layout";
import { SectionHeader } from "./components/SectionHeader";
import { Reveal } from "./components/Reveal";

const App: FC = () => {
  return (
    <main className="min-h-screen bg-cream-50">
      <Section tone="espresso" spacing="lg" className="bg-noise">
        <Container className="text-center">
          <Reveal>
            <p className="eyebrow text-sand">ONÍRIKO · Specialty Coffee</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="heading-display mt-6 text-cream-50 text-balance">
              Un cambio que va mucho más allá de una palabra
            </h1>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="lead mt-8 mx-auto max-w-2xl text-cream-100/80">
              Café de especialidad, desayunos, brunch y bakery horneada cada
              mañana en el corazón de Avilés.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section spacing="md">
        <Container>
          <SectionHeader
            eyebrow="Filosofía"
            title="Soñando despiertos"
            description="Cada taza es un viaje. Detenerse, respirar y disfrutar de los detalles que hacen diferente un café de especialidad."
          />
          <div className="grid gap-8 sm:grid-cols-3">
            {["Café", "Bakery", "Comunidad"].map((item) => (
              <Reveal key={item}>
                <div className="rounded-lg border border-espresso/10 bg-cream-100 p-8 transition-colors hover:border-sand-dark">
                  <h3 className="heading-card">{item}</h3>
                  <p className="body mt-3">
                    Lorem ipsum breve para validar tipografía, jerarquía y
                    espaciado editorial.
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="muted" spacing="md">
        <Container narrow>
          <SectionHeader
            eyebrow="Próximamente"
            title="Algo especial se está horneando"
            description="Comunidad, eventos y mucho más. Estamos preparando algo que merece la pena esperar."
          />
        </Container>
      </Section>
    </main>
  );
};

export default App;
