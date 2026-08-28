import { motion } from "framer-motion";

import { Container, Section } from "../components/Layout";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { galleryItems } from "../data/gallery";
import { staggerContainer } from "../hooks/motion";
import { useLanguage } from "../i18n/LanguageContext";

export const Gallery = () => {
  const { t } = useLanguage();
  return (
    <Section id="galeria" tone="muted" spacing="lg">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow={t.gallery.eyebrow}
            title={t.gallery.title}
            description={t.gallery.description}
          />
        </Reveal>

        <motion.ul
          variants={staggerContainer(0.08, 0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>li]:mb-4"
        >
          {galleryItems.map((item, i) => (
            <motion.li
              key={item.src}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className="break-inside-avoid"
            >
              <figure className="group relative overflow-hidden rounded-lg bg-cream-100">
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className={`w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
                    i % 5 === 0
                      ? "aspect-[3/4]"
                      : i % 5 === 1
                        ? "aspect-square"
                        : i % 5 === 2
                          ? "aspect-[4/3]"
                          : i % 5 === 3
                            ? "aspect-[4/5]"
                            : "aspect-square"
                  }`}
                />
                {item.caption && (
                  <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-espresso/85 via-espresso/40 to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <span className="eyebrow text-sand">
                      {item.category}
                    </span>
                    <p className="mt-1 font-serif text-lg text-cream-50">
                      {item.caption}
                    </p>
                  </figcaption>
                )}
              </figure>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </Section>
  );
};
