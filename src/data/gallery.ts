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
    src: "/img/pet_friendly/pet_friendly_img1.jpeg",
    alt: "Perro acompañando",
    caption: "Bienvenidos todos",
    category: "pet",
  },
  {
    src: "/img/bakery_propia/bakery_propia_img1.jpeg",
    alt: "Bollería artesana",
    caption: "Recién horneado",
    category: "bakery",
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
    caption: "Dorado perfecto",
    category: "bakery",
  },
  {
    src: "/img/pet_friendly/pet_friendly_img5.jpeg",
    alt: "Amigo de 4 patas",
    caption: "Siempre bienvenidos",
    category: "pet",
  },
  {
    src: "/img/brunch/brunch_img6.jpeg",
    alt: "Plato de brunch",
    caption: "Desayunos completos",
    category: "brunch",
  },
  {
    src: "/img/bakery_propia/bakery_propia_img2.jpeg",
    alt: "De masa madre",
    caption: "Galletas caseras",
    category: "bakery",
  },
  {
    src: "/img/eventos/eventos_img5.jpeg",
    alt: "Detalle interior",
    caption: "Cada detalle cuenta",
    category: "espacio",
  },
];
