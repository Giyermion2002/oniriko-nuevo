import { Helmet } from "react-helmet-async";
import { useLanguage } from "../i18n/LanguageContext";

export const SEO = () => {
  const { t, locale } = useLanguage();

  return (
    <Helmet>
      <html lang={locale} />
      <title>{t.seo.title}</title>
      <meta name="description" content={t.seo.description} />
      
      <meta property="og:title" content={t.seo.ogTitle} />
      <meta property="og:description" content={t.seo.ogDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://oniriko.es" />
      <meta property="og:image" content="https://oniriko.es/img/img1.jpeg" />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={t.seo.ogTitle} />
      <meta name="twitter:description" content={t.seo.ogDescription} />
      
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Helmet>
  );
};
