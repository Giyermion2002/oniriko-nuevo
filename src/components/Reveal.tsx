import { motion, type HTMLMotionProps } from "framer-motion";
import type { PropsWithChildren } from "react";

import { fadeUp, fadeIn, scaleIn } from "../hooks/motion";

type RevealProps = PropsWithChildren<
  Omit<HTMLMotionProps<"div">, "variants" | "initial" | "animate" | "whileInView">
> & {
  variant?: "fade-up" | "fade-in" | "scale-in";
  delay?: number;
  amount?: number;
};

const variantsMap = {
  "fade-up": fadeUp,
  "fade-in": fadeIn,
  "scale-in": scaleIn,
};

export const Reveal = ({
  variant = "fade-up",
  delay = 0,
  amount = 0.25,
  children,
  ...rest
}: RevealProps) => {
  return (
    <motion.div
      variants={variantsMap[variant]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      transition={{ delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};
