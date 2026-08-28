import type { PropsWithChildren } from "react";

type EyebrowProps = PropsWithChildren<{
  className?: string;
}>;

export const Eyebrow = ({ children, className = "" }: EyebrowProps) => (
  <span className={`eyebrow ${className}`}>{children}</span>
);

type SectionHeaderProps = PropsWithChildren<{
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  invert?: boolean;
}>;

export const SectionHeader = ({
  eyebrow,
  title,
  description,
  align = "center",
  invert = false,
  children,
}: SectionHeaderProps) => {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";
  const titleColor = invert ? "text-cream-50" : "text-espresso";
  const descColor = invert ? "text-cream-100/80" : "text-espresso/75";

  return (
    <header className={`max-w-3xl ${alignment} mb-12 sm:mb-16`}>
      {eyebrow && (
        <Eyebrow className={invert ? "text-sand" : ""}>{eyebrow}</Eyebrow>
      )}
      <h2
        className={`heading-section mt-4 text-balance ${titleColor}`}
      >
        {title}
      </h2>
      {description && (
        <p className={`lead mt-5 text-balance ${descColor}`}>{description}</p>
      )}
      {children}
    </header>
  );
};
