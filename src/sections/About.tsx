import { motion } from "framer-motion";
import { Coffee, Croissant, Wifi, Dog } from "lucide-react";

import { Container, Section } from "../components/Layout";
import { Reveal } from "../components/Reveal";
import { staggerContainer } from "../hooks/motion";

const highlights = [
  {
    icon: Coffee,
    title: "Café de especialidad",
    text: "Granos seleccionados, extracción cuidada y un ritual diario.",
  },
  {
    icon: Croissant,
    title: "Bakery cada mañana",
    text: "Horno encendido al alba para ofrecerte bollería artesana.",
  },
  {
    icon: Dog,
    title: "Petfriendly",
    text: "Porque las mejores sobremesas se comparten con quien quieres.",
  },
  {
    icon: Wifi,
    title: "Teletrabajo",
    text: "Espacio tranquilo de lunes a viernes para trabajar sin prisa.",
  },
];

export const About = () => {
  return (
    <Section id="nosotros" tone="default" spacing="lg">
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_1fr]">
          <Reveal>
            <p className="eyebrow">Filosofía</p>
            <h2 className="heading-section mt-4 text-balance">
              Soñando despiertos, una taza a la vez.
            </h2>
            <p className="lead mt-6 text-balance">
              Oníriko es mucho más que una cafetería. Somos ese lugar donde
              vienes y te quedas. Por la calma, porque no hay prisa. Porque huele
              a bakery casera recién horneada, porque nuestra pasión se transmite
              desde que entras por la puerta.
            </p>
            <p className="body mt-4">
              Contamos con opciones vegetarianas, veganas y sin gluten, aptas
              para celíacos. Apostamos por productos de calidad y de cercanía, y
              por lo casero. Cada mañana nuestro horno se enciende para tener a
              punto la bakery para que vengáis a disfrutar.
            </p>

            <motion.ul
              variants={staggerContainer(0.08, 0.2)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2"
            >
              {highlights.map(({ icon: Icon, title, text }) => (
                <motion.li
                  key={title}
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                  className="flex gap-4"
                >
                  <span className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cream-100 text-espresso">
                    <Icon size={18} strokeWidth={1.5} />
                  </span>
                  <div>
                    <h3 className="heading-card">{title}</h3>
                    <p className="body mt-1.5">{text}</p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </Reveal>

          <Reveal variant="scale-in" className="relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg">
              <img
                src="/img/img8.jpeg"
                alt="Detalle de un café en ONÍRIKO"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 hidden w-2/3 overflow-hidden rounded-lg shadow-xl sm:block">
              <div className="relative aspect-[4/5]">
                <img
                  src="/img/img11.jpeg"
                  alt="Interior de la cafetería"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="absolute -top-6 -right-6 hidden h-24 w-24 -rotate-12 rounded-full border border-espresso/15 sm:flex sm:items-center sm:justify-center">
              <span className="font-serif text-sm uppercase tracking-widest text-espresso/70">
                Est. 2025
              </span>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
};
