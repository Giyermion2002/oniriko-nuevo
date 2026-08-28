import { Mail, MapPin, Clock, Phone } from "lucide-react";

import { Container, Section } from "../components/Layout";
import { Reveal } from "../components/Reveal";
import { useLanguage } from "../i18n/LanguageContext";

export const Contact = () => {
  const { t } = useLanguage();
  return (
    <Section id="contacto" tone="muted" spacing="lg">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <p className="eyebrow">{t.contact.eyebrow}</p>
            <h2 className="heading-section mt-4 text-balance">
              {t.contact.title}
            </h2>
            <p className="lead mt-5 max-w-md text-balance">
              {t.contact.description}
            </p>

            <ul className="mt-10 space-y-5 text-sm text-espresso/80">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 text-sand-dark" strokeWidth={1.5} />
                <div>
                  <p className="font-serif text-base text-espresso">
                    {t.footer.address}
                  </p>
                  <p>Calle · 33401 · España</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="mt-0.5 text-sand-dark" strokeWidth={1.5} />
                <a href="mailto:hola@oniriko.es" className="hover:text-espresso">
                  hola@oniriko.es
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} className="mt-0.5 text-sand-dark" strokeWidth={1.5} />
                <a href="tel:+34000000000" className="hover:text-espresso">
                  +34 000 000 000
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={18} className="mt-0.5 text-sand-dark" strokeWidth={1.5} />
                <div>
                  <p>{t.footer.hours1}</p>
                  <p>{t.footer.hours2}</p>
                </div>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="rounded-lg border border-espresso/10 bg-cream-50 p-8 shadow-sm sm:p-10"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label={t.contact.fields.name} name="name" placeholder="…" />
                <Field
                  label={t.contact.fields.email}
                  type="email"
                  name="email"
                  placeholder="…"
                />
                <Field
                  label={t.contact.fields.phone}
                  type="tel"
                  name="phone"
                  placeholder="+34 …"
                />
                <Field
                  label={t.contact.fields.reason}
                  name="reason"
                  placeholder="…"
                />
              </div>
              <div className="mt-5">
                <label className="block text-xs uppercase tracking-widest text-espresso/60">
                  {t.contact.fields.message}
                </label>
                <textarea
                  rows={5}
                  name="message"
                  placeholder="…"
                  className="mt-2 w-full rounded-md border border-espresso/15 bg-cream-50 px-4 py-3 text-sm text-espresso placeholder:text-espresso/40 focus:border-espresso focus:outline-none"
                />
              </div>
              <button type="submit" className="btn-primary mt-8 w-full sm:w-auto">
                {t.contact.fields.send}
              </button>
            </form>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
};

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
};

const Field = ({ label, name, type = "text", placeholder }: FieldProps) => (
  <div>
    <label
      htmlFor={name}
      className="block text-xs uppercase tracking-widest text-espresso/60"
    >
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      placeholder={placeholder}
      className="mt-2 w-full rounded-md border border-espresso/15 bg-cream-50 px-4 py-3 text-sm text-espresso placeholder:text-espresso/40 focus:border-espresso focus:outline-none"
    />
  </div>
);
