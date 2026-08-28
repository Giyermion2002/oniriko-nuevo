export type GalleryItem = {
  src: string;
  alt: string;
  caption?: string;
  category: "brunch" | "bakery" | "cafe" | "pet" | "espacio";
};

export const galleryItems: GalleryItem[] = [
  {
    src: "/img/brunch/brunch_img1.jpeg",
    alt: "Brunch servido en mesa",
    caption: "Brunch de temporada",
    category: "brunch",
  },
  {
    src: "/img/img8.jpeg",
    alt: "Café de especialidad",
    caption: "El ritual de cada mañana",
    category: "cafe",
  },
  {
    src: "/img/bakery_propia/bakery_propia_img1.jpeg",
    alt: "Bollería artesana",
    caption: "Bakery recién horneada",
    category: "bakery",
  },
  {
    src: "/img/pet_friendly/pet_friendly_img2.jpeg",
    alt: "Perro en la cafetería",
    caption: "Petfriendly, siempre",
    category: "pet",
  },
  {
    src: "/img/brunch/brunch_img3.jpeg",
    alt: "Detalle de plato brunch",
    category: "brunch",
  },
  {
    src: "/img/img11.jpeg",
    alt: "Interior del local",
    caption: "Nuestro espacio",
    category: "espacio",
  },
  {
    src: "/img/bakery_propia/bakery_propia_img3.jpeg",
    alt: "Croissant de mantequilla",
    category: "bakery",
  },
  {
    src: "/img/carta/carta_img2.jpeg",
    alt: "Detalle de café",
    category: "cafe",
  },
  {
    src: "/img/pet_friendly/pet_friendly_img4.jpeg",
    alt: "Perro y cliente",
    category: "pet",
  },
  {
    src: "/img/brunch/brunch_img5.jpeg",
    alt: "Brunch con café",
    category: "brunch",
  },
  {
    src: "/img/bakery_propia/bakery_propia_img2.jpeg",
    alt: "Hogaza de pan",
    caption: "Hogaza de masa madre",
    category: "bakery",
  },
  {
    src: "/img/img13.jpeg",
    alt: "Latte art",
    category: "cafe",
  },
];
