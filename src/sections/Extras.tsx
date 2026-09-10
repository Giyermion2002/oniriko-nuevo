import { CalendarDays, Cake, Megaphone } from "lucide-react";

import { Container, Section } from "../components/Layout";
import { Reveal } from "../components/Reveal";
import { useLanguage } from "../i18n/LanguageContext";

export const Extras = () => {
  const { t } = useLanguage();
  return (
    <>
      <Section tone="espresso" spacing="lg" className="bg-noise">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
            <Reveal>
              <p className="eyebrow text-sand-dark">{t.extras.cateringEyebrow}</p>
              <h2 className="heading-section mt-4 text-cream-50 text-balance">
                {t.extras.cateringTitle}
              </h2>
              <p className="lead mt-5 max-w-xl text-cream-100/80">
                {t.extras.cateringText}
              </p>
              <a
                href="#contacto"
                className="btn mt-8 border border-cream-100/30 text-cream-50 hover:border-cream-50 hover:bg-cream-50 hover:text-espresso"
              >
                {t.extras.cateringCta}
              </a>
            </Reveal>
            <Reveal variant="scale-in" delay={0.1}>
              <div className="grid gap-4 sm:grid-cols-2">
                <FeatureCard
                  icon={Cake}
                  title={t.extras.cateringCard1T}
                  text={t.extras.cateringCard1D}
                />
                <FeatureCard
                  icon={CalendarDays}
                  title={t.extras.cateringCard2T}
                  text={t.extras.cateringCard2D}
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
              <p className="eyebrow">{t.extras.eventsEyebrow}</p>
              <h2 className="heading-section mt-4 text-balance">
                {t.extras.eventsTitle}
              </h2>
              <p className="lead mt-5 text-balance">{t.extras.eventsText}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="https://instagram.com" className="btn-primary">
                  {t.extras.eventsCta1}
                </a>
                <a href="#contacto" className="btn-outline">
                  {t.extras.eventsCta2}
                </a>
              </div>
              <div className="mt-10 flex items-start gap-3 text-sm text-espresso/70">
                <Megaphone size={16} className="mt-0.5 text-sand-dark" strokeWidth={1.5} />
                <span>{t.extras.eventsNote}</span>
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
