import { Coffee, Instagram, Facebook, MapPin, Mail, Clock } from "lucide-react";

import { useLanguage } from "../i18n/LanguageContext";

const navKeys = [
  { href: "#inicio", key: "inicio" },
  { href: "#nosotros", key: "nosotros" },
  { href: "#menu", key: "menu" },
  { href: "#galeria", key: "galeria" },
  { href: "#productos", key: "productos" },
] as const;

export const Footer = () => {
  const year = new Date().getFullYear();
  const { t } = useLanguage();
  return (
    <footer id="contacto" className="bg-espresso text-cream-100">
      <div className="container-editorial py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Coffee size={20} className="text-sand" strokeWidth={1.5} />
              <span className="font-serif text-2xl tracking-[0.18em]">
                ONÍRIKO
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream-100/70">
              {t.footer.tagline}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://instagram.com"
                aria-label="Instagram"
                className="rounded-full border border-cream-100/15 p-2 text-cream-100/70 transition-colors hover:border-sand hover:text-sand"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://facebook.com"
                aria-label="Facebook"
                className="rounded-full border border-cream-100/15 p-2 text-cream-100/70 transition-colors hover:border-sand hover:text-sand"
              >
                <Facebook size={16} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg text-cream-50">{t.footer.nav}</h4>
            <ul className="mt-5 space-y-3 text-sm text-cream-100/70">
              {navKeys.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="transition-colors hover:text-sand"
                  >
                    {t.nav[l.key]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg text-cream-50">
              {t.footer.contacto}
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-cream-100/70">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 text-sand" strokeWidth={1.5} />
                <span>{t.footer.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="mt-0.5 text-sand" strokeWidth={1.5} />
                <a
                  href="mailto:hola@oniriko.es"
                  className="transition-colors hover:text-sand"
                >
                  hola@oniriko.es
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg text-cream-50">
              {t.footer.horario}
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-cream-100/70">
              <li className="flex items-start gap-3">
                <Clock size={16} className="mt-0.5 text-sand" strokeWidth={1.5} />
                <div>
                  <p>{t.footer.hours1}</p>
                  <p>{t.footer.hours2}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-cream-100/10 pt-8 text-xs uppercase tracking-widest text-cream-100/50 sm:flex-row sm:items-center">
          <p>{t.footer.rights(year)}</p>
          <p className="divider-editorial text-sand/70 sm:gap-3">
            <span>{t.footer.made}</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
