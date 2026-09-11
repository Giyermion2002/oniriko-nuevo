import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Container, Section } from "../components/Layout";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { useLanguage } from "../i18n/LanguageContext";

export const Menu = () => {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const season = import.meta.env.VITE_CURRENT_SEASON || "verano";
  const menuImages = [
    {
      src: `/img/menu/${season}/carta.jpeg`,
      alt: `Carta de ${season}`,
    },
    {
      src: "/img/carta/carta_img1.jpeg",
      alt: "Carta Oníriko 1",
    },
    {
      src: "/img/carta/carta_img2.jpeg",
      alt: "Carta Oníriko 2",
    },
  ];

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {menuImages.map((img, i) => (
            <Reveal
              key={i}
              variant="scale-in"
              className="relative group"
            >
              <div 
                className="relative overflow-hidden rounded-lg shadow-lg bg-cream-100 transition-transform duration-500 group-hover:scale-[1.02] cursor-pointer"
                onClick={() => setSelectedImage(img.src)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-auto block"
                />
              </div>
            </Reveal>
          ))}
        </div>

        <AnimatePresence>
        {selectedImage && (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-espresso/95 backdrop-blur-lg p-4 sm:p-10"
        onClick={() => setSelectedImage(null)}
        >
        <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative max-w-4xl w-full max-h-[90vh] flex flex-col justify-center"
        onClick={(e) => e.stopPropagation()}
        >
        <img 
        src={selectedImage} 
        className="w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-2xl" 
        alt="Menu expanded" 
        />
        <button 
        className="absolute -top-12 right-0 text-cream-50 text-sm uppercase tracking-widest hover:text-sand transition-colors"
        onClick={() => setSelectedImage(null)}
        >
        Cerrar
        </button>
        </motion.div>
        </motion.div>
        )}
        </AnimatePresence>
      </Container>
    </Section>
  );
};
