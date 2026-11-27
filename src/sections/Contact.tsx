import { useState } from "react";
import { Mail, MapPin, Clock, Phone, Instagram } from "lucide-react";

import { Container, Section } from "../components/Layout";
import { Reveal } from "../components/Reveal";
import { useLanguage } from "../i18n/LanguageContext";
import { API_BASE_URL } from "../lib/api";

export const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    reason: "",
    message: "",
  });
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isSending, setIsSending] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.reason) {
      setStatus({ type: "error", message: "Por favor, rellena los campos obligatorios." });
      return;
    }

    setIsSending(true);
    setStatus(null);

    try {
      const response = await fetch(`${API_BASE_URL}/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          reason: formData.reason,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setStatus({ type: "success", message: "¡Mensaje enviado con éxito!" });
        setFormData({ name: "", email: "", phone: "", reason: "", message: "" });
      } else {
        throw new Error("Error al enviar");
      }
    } catch (error) {
      setStatus({ type: "error", message: "Hubo un error al enviar el mensaje. Inténtalo de nuevo." });
    } finally {
      setIsSending(false);
    }
  };

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
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=Oniriko+Specialty+Coffee+Aviles" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-xs text-sand-dark underline hover:text-espresso transition-colors"
                  >
                    Ver Mapa
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="mt-0.5 text-sand-dark" strokeWidth={1.5} />
                <a href="mailto:Onirikocoffee@gmail.com" className="hover:text-espresso">
                  Onirikocoffee@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} className="mt-0.5 text-sand-dark" strokeWidth={1.5} />
                <a href="tel:+34984831376" className="hover:text-espresso">
                  Teléfono: 984831376
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Instagram size={18} className="mt-0.5 text-sand-dark" strokeWidth={1.5} />
                <a href="https://instagram.com/onirikocoffee" target="_blank" rel="noopener noreferrer" className="hover:text-espresso">
                  @onirikocoffee
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
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d361.43097668829995!2d-5.923179246846271!3d43.55555111655372!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd369b7638d8a361%3A0xb4c756204147ff49!2sOn%C3%ADriko%20Specialty%20coffee!5e0!3m2!1ses!2ses!4v1789051190834!5m2!1ses!2ses"
                  className="h-[300px] w-full transition-all duration-500 hover:grayscale-0"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación de ONÍRIKO Specialty Coffee"
                />
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-lg border border-espresso/10 bg-cream-50 p-8 shadow-sm sm:p-10"
            >
              {status && (
                <div className={`mb-6 p-3 rounded-md text-sm text-center ${
                  status.type === "success" 
                    ? "bg-green-100 text-green-800 border border-green-200" 
                    : "bg-red-100 text-red-800 border border-red-200"
                }`}>
                  {status.message}
                </div>
              )}
              <div className="grid gap-5 sm:grid-cols-2">
                <Field 
                  label={t.contact.fields.name} 
                  name="name" 
                  placeholder="…" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  required 
                />
                <Field
                  label={t.contact.fields.email}
                  type="email"
                  name="email"
                  placeholder="…" 
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <Field
                  label={t.contact.fields.phone}
                  type="tel"
                  name="phone"
                  placeholder="+34 …" 
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
                <Field
                  label={t.contact.fields.reason}
                  name="reason"
                  placeholder="…" 
                  value={formData.reason}
                  onChange={handleInputChange}
                  required
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
                  value={formData.message}
                  onChange={handleInputChange}
                  className="mt-2 w-full rounded-md border border-espresso/15 bg-cream-50 px-4 py-3 text-sm text-espresso placeholder:text-espresso/40 focus:border-espresso focus:outline-none"
                />
              </div>
              <button 
                type="submit" 
                disabled={isSending}
                className="btn-primary mt-8 w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSending ? "Enviando..." : t.contact.fields.send}
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
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
};

const Field = ({ label, name, type = "text", placeholder, value, onChange, required }: FieldProps) => (
  <div>
    <label
      htmlFor={name}
      className="block text-xs uppercase tracking-widest text-espresso/60"
    >
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className="mt-2 w-full rounded-md border border-espresso/15 bg-cream-50 px-4 py-3 text-sm text-espresso placeholder:text-espresso/40 focus:border-espresso focus:outline-none"
    />
  </div>
);
