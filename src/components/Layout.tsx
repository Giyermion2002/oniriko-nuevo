import type { HTMLAttributes, PropsWithChildren } from "react";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  narrow?: boolean;
};

export const Container = ({
  narrow = false,
  className = "",
  children,
  ...rest
}: PropsWithChildren<ContainerProps>) => {
  const base = narrow ? "container-narrow" : "container-editorial";
  return (
    <div className={`${base} ${className}`} {...rest}>
      {children}
    </div>
  );
};

type SectionProps = HTMLAttributes<HTMLElement> & {
  id?: string;
  tone?: "default" | "muted" | "espresso";
  spacing?: "sm" | "md" | "lg";
};

const toneStyles: Record<NonNullable<SectionProps["tone"]>, string> = {
  default: "bg-cream-50 text-espresso",
  muted: "bg-cream-100 text-espresso",
  espresso: "bg-espresso text-cream-50",
};

const spacingStyles: Record<NonNullable<SectionProps["spacing"]>, string> = {
  sm: "py-16 sm:py-20",
  md: "py-20 sm:py-28 lg:py-32",
  lg: "py-24 sm:py-32 lg:py-40",
};

export const Section = ({
  id,
  tone = "default",
  spacing = "md",
  className = "",
  children,
  ...rest
}: PropsWithChildren<SectionProps>) => {
  return (
    <section
      id={id}
      className={`${toneStyles[tone]} ${spacingStyles[spacing]} ${className}`}
      {...rest}
    >
      {children}
    </section>
  );
};
