import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu as MenuIcon, X } from "lucide-react";

import { LanguageSelector } from "./LanguageSelector";
import { useLanguage } from "../i18n/LanguageContext";

const linkKeys = [
  { href: "#inicio", key: "inicio" },
  { href: "#nosotros", key: "nosotros" },
  { href: "#menu", key: "menu" },
  { href: "#galeria", key: "galeria" },
  { href: "#contacto", key: "contacto" },
] as const;

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-cream-50/95 backdrop-blur-md border-b border-espresso/5 py-3"
          : "bg-espresso/20 backdrop-blur-lg py-5"
      }`}
    >
      <nav className="container-editorial flex h-20 items-center justify-between">
        <a
          href="#inicio"
          className={`font-serif text-xl tracking-[0.2em] transition-colors duration-500 ${
            scrolled ? "text-espresso" : "text-cream-50"
          }`}
          aria-label="ONÍRIKO · Inicio"
        >
          ONÍRIKO
        </a>

        <ul className={`hidden lg:flex items-center gap-10 transition-colors duration-500 ${
          scrolled ? "text-espresso" : "text-cream-50"
        }`}>
          {linkKeys.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-xs font-medium uppercase tracking-widest transition-colors hover:text-sand"
              >
                {t.nav[l.key]}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-4">
          <LanguageSelector scrolled={scrolled} />
          <a href="#contacto" className="btn-primary px-5 py-2 text-xs">
            {t.nav.reservar}
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden rounded-full p-2 text-espresso hover:bg-espresso/5"
        >
          {open ? <X size={22} /> : <MenuIcon size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden bg-cream-50 border-t border-espresso/5"
          >
            <ul className="container-editorial flex flex-col py-6">
              {linkKeys.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-sm uppercase tracking-widest text-espresso/80"
                  >
                    {t.nav[l.key]}
                  </a>
                </li>
              ))}
              <li className="pt-4 flex items-center justify-between gap-3">
                <LanguageSelector variant="mobile" scrolled={scrolled} />
                <a
                  href="#contacto"
                  onClick={() => setOpen(false)}
                  className="btn-primary px-5 py-2 text-xs"
                >
                  {t.nav.reservar}
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
