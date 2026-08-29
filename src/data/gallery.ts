export type GalleryItem = {
  src: string;
  alt: string;
  caption?: string;
  category: "brunch" | "bakery" | "cafe" | "pet" | "espacio";
};

export const galleryItems: GalleryItem[] = [
  {
    src: "/img/brunch/brunch_img1.jpeg",
    alt: "Brunch completo",
    caption: "Sabores que despiertan",
    category: "brunch",
  },
  {
    src: "/img/bakery_propia/bakery_propia_img1.jpeg",
    alt: "Bollería artesana",
    caption: "Recién horneado",
    category: "bakery",
  },
  {
    src: "/img/carta/carta_img2.jpeg",
    alt: "Latte Art",
    caption: "Precisión en cada taza",
    category: "cafe",
  },
  {
    src: "/img/pet_friendly/pet_friendly_img1.jpeg",
    alt: "Perro acompañando",
    caption: "Bienvenidos todos",
    category: "pet",
  },
  {
    src: "/img/brunch/brunch_img5.jpeg",
    alt: "Tostadas de aguacate",
    category: "brunch",
  },
  {
    src: "/img/eventos/eventos_img3.jpeg",
    alt: "Ambiente del local",
    caption: "Nuestro refugio",
    category: "espacio",
  },
  {
    src: "/img/bakery_propia/bakery_propia_img3.jpeg",
    alt: "Croissant dorado",
    category: "bakery",
  },
  {
    src: "/img/carta/carta_img3.jpeg",
    alt: "Filtro de especialidad",
    category: "cafe",
  },
  {
    src: "/img/pet_friendly/pet_friendly_img5.jpeg",
    alt: "Amigo de 4 patas",
    category: "pet",
  },
  {
    src: "/img/brunch/brunch_img6.jpeg",
    alt: "Plato de brunch",
    category: "brunch",
  },
  {
    src: "/img/bakery_propia/bakery_propia_img2.jpeg",
    alt: "Hogaza de masa madre",
    caption: "El pan perfecto",
    category: "bakery",
  },
  {
    src: "/img/eventos/eventos_img5.jpeg",
    alt: "Detalle interior",
    category: "espacio",
  },
];
