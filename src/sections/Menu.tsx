import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import { Container, Section } from "../components/Layout";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { menu } from "../data/menu";
import { staggerContainer } from "../hooks/motion";
import { useLanguage } from "../i18n/LanguageContext";

export const Menu = () => {
  const { t } = useLanguage();
  return (
    <Section id="menu" tone="default" spacing="lg">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow={t.menu.eyebrow}
            title={t.menu.title}
            description={t.menu.description}
          />
        </Reveal>

        <div className="space-y-24 sm:space-y-32">
          {menu.map((cat, i) => {
            const reverse = i % 2 === 1;
            return (
              <article
                key={cat.id}
                id={cat.id}
                className="grid items-center gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16"
              >
                <Reveal
                  variant="scale-in"
                  className={`relative ${reverse ? "lg:order-2" : ""}`}
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                    <img
                      src={cat.cover}
                      alt={cat.title}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 hidden h-32 w-32 rounded-full bg-sand/90 blur-2xl sm:block" />
                </Reveal>

                <Reveal
                  className={reverse ? "lg:order-1" : ""}
                  delay={0.05}
                >
                  <p className="eyebrow">{cat.eyebrow}</p>
                  <h3 className="heading-section mt-3 text-balance">
                    {cat.title}
                  </h3>
                  <p className="lead mt-4 max-w-xl text-balance">
                    {cat.description}
                  </p>

                  <motion.ul
                    variants={staggerContainer(0.06, 0.1)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    className="mt-8 divide-y divide-espresso/10 border-t border-espresso/10"
                  >
                    {cat.products.map((p) => (
                      <motion.li
                        key={p.name}
                        variants={{
                          hidden: { opacity: 0, y: 14 },
                          visible: {
                            opacity: 1,
                            y: 0,
                            transition: {
                              duration: 0.6,
                              ease: [0.22, 1, 0.36, 1],
                            },
                          },
                        }}
                        className="grid grid-cols-[1fr_auto] items-baseline gap-6 py-4"
                      >
                        <div>
                          <h4 className="flex items-center gap-2 font-serif text-lg text-espresso">
                            {p.name}
                            {p.tag && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-sand/20 px-2 py-0.5 text-[10px] uppercase tracking-widest text-sand-dark">
                                <Sparkles size={10} strokeWidth={1.5} />
                                {p.tag}
                              </span>
                            )}
                          </h4>
                          <p className="body mt-1">{p.description}</p>
                        </div>
                        {p.price && (
                          <span className="font-serif text-base text-espresso/80">
                            {p.price}
                          </span>
                        )}
                      </motion.li>
                    ))}
                  </motion.ul>
                </Reveal>
              </article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
};
