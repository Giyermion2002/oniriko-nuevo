import { Cake } from "lucide-react";

import { Container, Section } from "../components/Layout";
import { Reveal } from "../components/Reveal";

export const Community = () => {
  return (
    <Section id="comunidad" tone="default" spacing="lg">
      <Container>
        <Reveal>
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-lg border border-espresso/10 bg-cream-100 px-6 py-16 text-center sm:px-12 sm:py-20">
            <div className="bg-noise absolute inset-0 opacity-50" aria-hidden />
            <div className="relative">
              <span className="mx-auto mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-cream-50 text-espresso shadow-sm">
                <Cake size={22} strokeWidth={1.5} />
              </span>
              <p className="eyebrow">Próximamente</p>
              <h2 className="heading-section mt-3 text-balance">
                Algo especial se está horneando.
              </h2>
              <p className="lead mx-auto mt-5 max-w-xl text-balance">
                Estamos preparando un rincón para la comunidad ONÍRIKO: club de
                café, eventos exclusivos y mucho más. Déjanos tu email y te
                avisamos antes que a nadie.
              </p>

              <form
                onSubmit={(e) => e.preventDefault()}
                className="mx-auto mt-10 flex w-full max-w-md flex-col gap-3 sm:flex-row"
              >
                <input
                  type="email"
                  required
                  placeholder="tu@email.com"
                  className="w-full rounded-full border border-espresso/15 bg-cream-50 px-5 py-3 text-sm text-espresso placeholder:text-espresso/40 focus:border-espresso focus:outline-none"
                />
                <button type="submit" className="btn-primary whitespace-nowrap">
                  Avisadme
                </button>
              </form>
              <p className="mt-4 text-xs uppercase tracking-widest text-espresso/40">
                Sin spam, lo prometemos.
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
};
