import { CalendarDays, Cake, Megaphone } from "lucide-react";

import { Container, Section } from "../components/Layout";
import { Reveal } from "../components/Reveal";

export const Extras = () => {
  return (
    <>
      <Section tone="espresso" spacing="lg" className="bg-noise">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
            <Reveal>
              <p className="eyebrow text-sand">Encargos & Catering</p>
              <h2 className="heading-section mt-4 text-cream-50 text-balance">
                Bakery por encargo y catering con mimo.
              </h2>
              <p className="lead mt-5 max-w-xl text-cream-100/80">
                Hacemos encargos de bakery artesanal y catering para eventos
                privados con reserva previa. Cuéntanos qué necesitas y
                horneamos algo a tu medida.
              </p>
              <a
                href="#contacto"
                className="btn mt-8 border border-cream-100/30 text-cream-50 hover:border-cream-50 hover:bg-cream-50 hover:text-espresso"
              >
                Pedir presupuesto
              </a>
            </Reveal>
            <Reveal variant="scale-in" delay={0.1}>
              <div className="grid gap-4 sm:grid-cols-2">
                <FeatureCard
                  icon={Cake}
                  title="Bakery a medida"
                  text="Tartas, bollería y mesas dulces para tus momentos especiales."
                />
                <FeatureCard
                  icon={CalendarDays}
                  title="Catering"
                  text="Desayunos, brunchs y coffee breaks para empresas y eventos."
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section id="eventos" tone="muted" spacing="lg">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
            <Reveal variant="scale-in">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <img
                  src="/img/eventos/eventos_img1.jpeg"
                  alt="Evento especial en ONÍRIKO"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="eyebrow">Eventos especiales</p>
              <h2 className="heading-section mt-4 text-balance">
                En nuestras redes, al día.
              </h2>
              <p className="lead mt-5 text-balance">
                Mantenemos al tanto de catas, colaboraciones y eventos
                especiales a través de nuestras redes sociales. Síguenos para no
                perderte nada.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="https://instagram.com"
                  className="btn-primary"
                >
                  Seguir en Instagram
                </a>
                <a href="#contacto" className="btn-outline">
                  Reservar para un evento
                </a>
              </div>
              <div className="mt-10 flex items-start gap-3 text-sm text-espresso/70">
                <Megaphone size={16} className="mt-0.5 text-sand-dark" strokeWidth={1.5} />
                <span>
                  ¿Quieres organizar algo con nosotros? Escríbenos y lo
                  preparamos.
                </span>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
};

type FeatureCardProps = {
  icon: typeof CalendarDays;
  title: string;
  text: string;
};

const FeatureCard = ({ icon: Icon, title, text }: FeatureCardProps) => (
  <div className="rounded-lg border border-cream-100/10 bg-cream-100/5 p-6 backdrop-blur-sm">
    <Icon size={20} className="text-sand" strokeWidth={1.5} />
    <h3 className="mt-4 font-serif text-lg text-cream-50">{title}</h3>
    <p className="mt-2 text-sm text-cream-100/70">{text}</p>
  </div>
);
