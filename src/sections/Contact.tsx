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
                  <p>Avilés, Asturias · España</p>
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

          <Reveal delay={0.1} className="flex flex-col gap-8">
            <div className="relative overflow-hidden rounded-2xl border border-espresso/10 shadow-2xl">
              <div className="absolute inset-0 z-10 pointer-events-none mix-blend-multiply opacity-20 bg-espresso" />
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2915.6435245348!2d-5.5468!3d43.5433!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0:0x0!2zNDMsMzIuNjB4N1SUIC01LTMyLzU4IIdS!5e0!3m2!1ses!2ses!4v1700000000000"
                  className="h-[300px] w-full grayscale-[30%] contrast-[1.1] invert-[0] transition-all duration-500 hover:grayscale-0"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación de ONÍRIKO Specialty Coffee"
                />
            </div>

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
