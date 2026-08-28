import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

export const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      id="inicio"
      className="relative isolate min-h-[100svh] overflow-hidden bg-espresso text-cream-50"
    >
      <motion.div
        style={{ y }}
        className="absolute inset-0 -z-10"
        aria-hidden
      >
        <img
          src="/img/img5.jpeg"
          alt=""
          className="h-full w-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-espresso/70 via-espresso/55 to-espresso/85" />
        <div className="absolute inset-0 bg-noise opacity-30" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="container-editorial relative flex min-h-[100svh] flex-col justify-center pb-20 pt-32"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="eyebrow text-sand"
        >
          ONÍRIKO · Specialty Coffee · Avilés
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="heading-display mt-6 max-w-5xl text-balance"
        >
          Un cambio que va mucho más allá de una palabra.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="lead mt-8 max-w-xl text-cream-100/80"
        >
          Café de especialidad, desayunos, brunch y bakery horneada cada mañana.
          Un lugar donde vienes, te quedas y no hay prisa.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a href="#menu" className="btn-primary">
            Descubrir la carta
            <ArrowRight size={16} strokeWidth={1.75} />
          </a>
          <a
            href="#nosotros"
            className="btn border border-cream-100/30 text-cream-50 hover:border-cream-50 hover:bg-cream-50 hover:text-espresso"
          >
            Nuestra historia
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute inset-x-0 bottom-8 flex justify-center text-cream-100/60"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        >
          <ChevronDown size={22} strokeWidth={1.25} />
        </motion.div>
      </motion.div>
    </section>
  );
};
