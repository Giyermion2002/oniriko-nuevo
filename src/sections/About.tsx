import { motion } from "framer-motion";
import { Coffee, Croissant, Wifi, Dog } from "lucide-react";

import { Container, Section } from "../components/Layout";
import { Reveal } from "../components/Reveal";
import { staggerContainer } from "../hooks/motion";
import { useLanguage } from "../i18n/LanguageContext";

export const About = () => {
  const { t } = useLanguage();

  const highlights = [
    { icon: Coffee, ...t.about.highlights.cafe },
    { icon: Croissant, ...t.about.highlights.bakery },
    { icon: Dog, ...t.about.highlights.pet },
    { icon: Wifi, ...t.about.highlights.wifi },
  ];

  return (
    <Section id="nosotros" tone="default" spacing="lg">
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_1fr]">
          <Reveal>
            <p className="eyebrow">{t.about.eyebrow}</p>
            <h2 className="heading-section mt-4 text-balance">
              {t.about.title}
            </h2>
            <p className="lead mt-6 text-balance">{t.about.p1}</p>
            <p className="body mt-4">{t.about.p2}</p>

            <motion.ul
              variants={staggerContainer(0.08, 0.2)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2"
            >
              {highlights.map(({ icon: Icon, t: title, d: text }) => (
                <motion.li
                  key={title}
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                  className="flex gap-4"
                >
                  <span className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cream-100 text-espresso">
                    <Icon size={18} strokeWidth={1.5} />
                  </span>
                  <div>
                    <h3 className="heading-card">{title}</h3>
                    <p className="body mt-1.5">{text}</p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </Reveal>

          <Reveal variant="scale-in" className="relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg">
              <img
                src="/img/img8.jpeg"
                alt="Detalle de un café en ONÍRIKO"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 hidden w-2/3 overflow-hidden rounded-lg shadow-xl sm:block">
              <div className="relative aspect-[4/5]">
                <img
                  src="/img/img11.jpeg"
                  alt="Interior de la cafetería"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="absolute -top-6 -right-6 hidden h-24 w-24 -rotate-12 rounded-full border border-espresso/15 sm:flex sm:items-center sm:justify-center">
              <span className="font-serif text-sm uppercase tracking-widest text-espresso/70">
                {t.about.stamp}
              </span>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
};
