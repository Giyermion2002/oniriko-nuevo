import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Container, Section } from "../components/Layout";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { galleryItems } from "../data/gallery";
import { useLanguage } from "../i18n/LanguageContext";

export const Gallery = () => {
  const { t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const items = galleryItems;

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      const newScrollPosition = direction === "left" 
        ? scrollLeft - scrollAmount 
        : scrollLeft + scrollAmount;
      
      scrollRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
    }
  };

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

        <div className="relative group">
          {/* Mobile Carousel - 360 degrees view */}
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 no-scrollbar lg:hidden"
          >
            {items.map((item, i) => (
              <motion.div
                key={item.src}
                className="min-w-[85vw] snap-center"
              >
                <figure className="group/item relative overflow-hidden rounded-lg bg-cream-100">
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    className="w-full aspect-square object-cover transition-transform duration-700 ease-out group-hover/item:scale-105"
                  />
                  {item.caption && (
                    <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-espresso/85 via-espresso/40 to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover/item:opacity-100">
                      <span className="eyebrow text-sand-dark">
                        {item.category}
                      </span>
                      <p className="mt-1 font-serif text-lg text-cream-50">
                        {item.caption}
                      </p>
                    </figcaption>
                  )}
                </figure>
              </motion.div>
            ))}
          </div>

          {/* Navigation Arrows - Mobile Only */}
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2 pointer-events-none lg:hidden">
            <button 
              onClick={() => scroll("left")}
              className="p-2 rounded-full bg-espresso/50 text-cream-50 backdrop-blur-sm pointer-events-auto transition-colors hover:bg-espresso/80"
              aria-label="Previous"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => scroll("right")}
              className="p-2 rounded-full bg-espresso/50 text-cream-50 backdrop-blur-sm pointer-events-auto transition-colors hover:bg-espresso/80"
              aria-label="Next"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Desktop Grid */}
          <div className="hidden lg:grid grid-cols-3 gap-6">
            {items.map((item, i) => (
              <motion.div
                key={item.src}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="break-inside-avoid"
              >
                <figure className="group/item relative overflow-hidden rounded-lg bg-cream-100">
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    className="w-full aspect-square object-cover transition-transform duration-700 ease-out group-hover/item:scale-105"
                  />
                  {item.caption && (
                    <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-espresso/85 via-espresso/40 to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover/item:opacity-100">
                      <span className="eyebrow text-sand-dark">
                        {item.category}
                      </span>
                      <p className="mt-1 font-serif text-lg text-cream-50">
                        {item.caption}
                      </p>
                    </figcaption>
                  )}
                </figure>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};
