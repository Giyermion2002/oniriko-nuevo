export type MenuProduct = {
  name: string;
  description: string;
  price?: string;
  tag?: string;
};

export type MenuCategory = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  cover: string;
  products: MenuProduct[];
};

export const menu: MenuCategory[] = [
  {
    id: "cafe",
    eyebrow: "Café de especialidad",
    title: "El ritual de cada mañana",
    description:
      "Granos seleccionados de microlotes, extracción precisa y un menú cambiante de filtros y espresso.",
    cover: "/img/carta/carta_img1.jpeg",
    products: [
      { name: "Espresso", description: "Doble, limpio y persistente.", price: "2,20€" },
      { name: "Cappuccino", description: "Textura sedosa, equilibrio clásico.", price: "3,20€" },
      { name: "Flat White", description: "Doble ristretto con leche vaporizada.", price: "3,40€" },
      { name: "V60 / Kalita", description: "Filtro de temporada, rotación semanal.", price: "3,80€" },
      { name: "Cold Brew", description: "Infusión en frío 18h, suave y dulce.", price: "3,60€" },
      { name: "Batch Brew", description: "Filtro del día, copa de carafita.", price: "2,80€" },
    ],
  },
  {
    id: "brunch",
    eyebrow: "Brunch & desayunos",
    title: "Sin prisa, con todo",
    description:
      "Huevos, panes, frutas y bowls para empezar (o seguir) el día como se merece.",
    cover: "/img/brunch/brunch_img4.jpeg",
    products: [
      { name: "Brunch ONÍRIKO", description: "Huevos, aguacate, pan de masa madre, fruta y café.", price: "16,50€", tag: "Estrella" },
      { name: "Bowl de yogur", description: "Yogur griego, granola casera, frutas de temporada y miel.", price: "7,80€" },
      { name: "Tosta de aguacate", description: "Pan de masa madre, aguacate, huevo pochado y semillas.", price: "9,50€" },
      { name: "Huevos benedictinos", description: "Sobre muffins artesanos con salsa holandesa.", price: "11,20€" },
      { name: "Tortilla de la casa", description: "Patata confitada, cebolla caramelizada y ensalada.", price: "9,80€" },
      { name: "Pancakes", description: "Con fruta fresca, sirope y mantequilla.", price: "8,90€" },
    ],
  },
  {
    id: "bakery",
    eyebrow: "Bakery",
    title: "Horneado al alba",
    description:
      "Bollería artesana, panes de masa madre y dulces que cambian cada semana.",
    cover: "/img/bakery_propia/bakery_propia_img2.jpeg",
    products: [
      { name: "Croissant de mantequilla", description: "Hojaldrado, dorado, crujiente.", price: "2,80€" },
      { name: "Pain au chocolat", description: "Hojaldre con chocolate negro 70%.", price: "3,00€" },
      { name: "Caracola de canela", description: "Masa brioche y canela de Ceylán.", price: "3,20€" },
      { name: "Scone", description: "Con crema agria y pasas.", price: "2,40€" },
      { name: "Pan de masa madre", description: "Hogaza fermentada 24h.", price: "4,20€" },
      { name: "Cookie artesana", description: "Con chocolate y sal marina.", price: "2,50€" },
    ],
  },
];
