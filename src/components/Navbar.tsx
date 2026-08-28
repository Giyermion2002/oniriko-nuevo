import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#inicio", label: "Inicio" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#menu", label: "Menú" },
  { href: "#galeria", label: "Galería" },
  { href: "#productos", label: "Productos" },
  { href: "#comunidad", label: "Comunidad" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
          ? "bg-cream-50/90 backdrop-blur-md border-b border-espresso/5"
          : "bg-transparent"
      }`}
    >
      <nav className="container-editorial flex h-20 items-center justify-between">
        <a
          href="#inicio"
          className="font-serif text-xl tracking-[0.2em] text-espresso"
          aria-label="ONÍRIKO · Inicio"
        >
          ONÍRIKO
        </a>

        <ul className="hidden lg:flex items-center gap-10">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-xs font-medium uppercase tracking-widest text-espresso/70 transition-colors hover:text-espresso"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-4">
          <button
            type="button"
            className="flex items-center gap-2 rounded-full border border-espresso/15 px-3 py-1.5 text-xs uppercase tracking-widest text-espresso/70 transition-colors hover:border-espresso hover:text-espresso"
            aria-label="Cambiar idioma"
          >
            <span aria-hidden className="text-base">🇪🇸</span>
            ES
          </button>
          <a href="#contacto" className="btn-primary px-5 py-2 text-xs">
            Reservar
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden rounded-full p-2 text-espresso hover:bg-espresso/5"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
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
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-sm uppercase tracking-widest text-espresso/80"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="pt-4 flex items-center gap-3">
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-full border border-espresso/15 px-3 py-1.5 text-xs uppercase tracking-widest text-espresso/70"
                >
                  <span aria-hidden className="text-base">🇪🇸</span> ES
                </button>
                <a
                  href="#contacto"
                  onClick={() => setOpen(false)}
                  className="btn-primary px-5 py-2 text-xs"
                >
                  Reservar
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
