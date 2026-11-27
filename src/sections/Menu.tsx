import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Container, Section } from "../components/Layout";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { useLanguage } from "../i18n/LanguageContext";
import { API_BASE_URL, resolveMediaUrl, type MenuItem } from "../lib/api";

const FALLBACK_MENU_IMAGES: MenuItem[] = [
  {
    id: "temporada",
    label: "Carta de temporada",
    alt: "Carta de temporada Oníriko",
    url: `/img/menu/${import.meta.env.VITE_CURRENT_SEASON || "verano"}/carta.jpeg`,
    updatedAt: 1,
  },
  {
    id: "carta-1",
    label: "Carta principal 1",
    alt: "Carta Oníriko 1",
    url: "/img/carta/carta_img1.jpeg",
    updatedAt: 1,
  },
  {
    id: "carta-2",
    label: "Carta principal 2",
    alt: "Carta Oníriko 2",
    url: "/img/carta/carta_img2.jpeg",
    updatedAt: 1,
  },
];

export const Menu = () => {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<MenuItem | null>(null);
  const [menuImages, setMenuImages] = useState<MenuItem[]>(FALLBACK_MENU_IMAGES);

  useEffect(() => {
    const controller = new AbortController();

    const loadMenu = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/menu`, {
          signal: controller.signal,
        });
        if (!response.ok) return;

        const data = (await response.json()) as { items?: MenuItem[] };
        if (Array.isArray(data.items) && data.items.length > 0) {
          setMenuImages(data.items);
        }
      } catch {
        // Si el backend está dormido o falla, se mantienen las imágenes de fallback.
      }
    };

    loadMenu();
    return () => controller.abort();
  }, []);

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
          {menuImages.map((img) => (
            <Reveal
              key={img.id}
              variant="scale-in"
              className="relative group"
            >
              <div
                className="relative overflow-hidden rounded-lg shadow-lg bg-cream-100 transition-transform duration-500 group-hover:scale-[1.02] cursor-pointer"
                onClick={() => setSelectedImage(img)}
              >
                <img
                  src={resolveMediaUrl(img)}
                  alt={img.alt || img.label}
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
                  src={resolveMediaUrl(selectedImage)}
                  className="w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-2xl"
                  alt={selectedImage.alt || selectedImage.label}
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
