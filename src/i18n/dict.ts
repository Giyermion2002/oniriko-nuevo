export type Locale = "es" | "en";

export const locales: { code: Locale; label: string; flag: string }[] = [
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "en", label: "English", flag: "🇬🇧" },
];

export type Dictionary = {
  seo: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
  };
  nav: { inicio: string; nosotros: string; menu: string; galeria: string; contacto: string; reservar: string };
  hero: { eyebrow: string; title: string; description: string; cta: string; ctaSecondary: string };
  about: { eyebrow: string; title: string; p1: string; p2: string; highlights: { cafe: { t: string; d: string }; bakery: { t: string; d: string }; pet: { t: string; d: string }; wifi: { t: string; d: string } }; stamp: string };
  menu: { eyebrow: string; title: string; description: string };
  extras: { cateringEyebrow: string; cateringTitle: string; cateringText: string; cateringCta: string; cateringCard1T: string; cateringCard1D: string; cateringCard2T: string; cateringCard2D: string; eventsEyebrow: string; eventsTitle: string; eventsText: string; eventsCta1: string; eventsCta2: string; eventsNote: string };
  gallery: { eyebrow: string; title: string; description: string };
  community: { eyebrow: string; title: string; description: string; placeholder: string; cta: string; note: string };
  contact: { eyebrow: string; title: string; description: string; fields: { name: string; email: string; phone: string; reason: string; message: string; send: string } };
  footer: { tagline: string; nav: string; contacto: string; horario: string; address: string; hours1: string; hours2: string; made: string; rights: (year: number) => string };
  schedule: { weekdays: string; openHours: string; evenings: string };
};

export const dictionaries: Record<Locale, Dictionary> = {
  es: {
    seo: {
      title: "ONÍRIKO | Café de Especialidad, Brunch y Bakery en Avilés",
      description: "Descubre la mejor experiencia de café de especialidad en Avilés, Asturias. Brunch artesano, bakery recién horneada y un espacio diseñado para disfrutar sin prisas.",
      ogTitle: "ONÍRIKO · Especialistas en Café y Bakery en Avilés",
      ogDescription: "Siente el aroma de la bakery casera y el sabor del café de especialidad. El rincón más acogedor de Avilés para desayunar y teletrabajar.",
    },
    nav: {
      inicio: "Inicio",
      nosotros: "Nosotros",
      menu: "Menú",
      galeria: "Galería",
      contacto: "Contacto",
      reservar: "Reservar",
    },
    hero: {
      eyebrow: "ONÍRIKO · Specialty Coffee · Avilés",
      title: "Un cambio que va mucho más allá de una palabra.",
      description:
        "Café de especialidad, desayunos, brunch y bakery horneada cada mañana. Un lugar donde vienes, te quedas y no hay prisa.",
      cta: "Descubrir la carta",
      ctaSecondary: "Nuestra historia",
    },
    about: {
      eyebrow: "Filosofía",
      title: "Soñando despiertos, una taza a la vez.",
      p1: "Oníriko es mucho más que una cafetería. Somos ese lugar donde vienes y te quedas. Por la calma, porque no hay prisa. Porque huele a bakery casera recién horneada, porque nuestra pasión se transmite desde que entras por la puerta.",
      p2: "Contamos con opciones vegetarianas, veganas y sin gluten, aptas para celíacos. Apostamos por productos de calidad y de cercanía, y por lo casero. Cada mañana nuestro horno se enciende para tener a punto la bakery para que vengáis a disfrutar.",
      highlights: {
        cafe: { t: "Café de especialidad", d: "Granos seleccionados, extracción cuidada y un ritual diario." },
        bakery: { t: "Bakery cada mañana", d: "Horno encendido al alba para ofrecerte bollería artesana." },
        pet: { t: "Petfriendly", d: "Porque las mejores sobremesas se comparten con quien quieres." },
        wifi: { t: "Teletrabajo", d: "Espacio tranquilo de lunes a viernes para trabajar sin prisa." },
      },
      stamp: "Est. 2025",
    },
    menu: {
      eyebrow: "La carta",
      title: "Café, brunch y bakery sin prisas",
      description:
        "Una carta viva que cambia con la temporada. Trabajamos con producto local, opciones vegetarianas, veganas y sin gluten en casi todo.",
    },
    extras: {
      cateringEyebrow: "Encargos & Catering",
      cateringTitle: "Bakery por encargo y catering con mimo.",
      cateringText:
        "Hacemos encargos de bakery artesanal y catering para eventos privados con reserva previa. Cuéntanos qué necesitas y horneamos algo a tu medida.",
      cateringCta: "Pedir presupuesto",
      cateringCard1T: "Bakery a medida",
      cateringCard1D: "Tartas, bollería y mesas dulces para tus momentos especiales.",
      cateringCard2T: "Catering",
      cateringCard2D: "Desayunos, brunchs y coffee breaks para empresas y eventos.",
      eventsEyebrow: "Eventos especiales",
      eventsTitle: "En nuestras redes, al día.",
      eventsText:
        "Mantenemos al tanto de catas, colaboraciones y eventos especiales a través de nuestras redes sociales. Síguenos para no perderte nada.",
      eventsCta1: "Seguir en Instagram",
      eventsCta2: "Reservar para un evento",
      eventsNote: "¿Quieres organizar algo con nosotros? Escríbenos y lo preparamos.",
    },
    gallery: {
      eyebrow: "Galería",
      title: "Momentos que se saborean",
      description:
        "Una selección de instantes cotidianos en ONÍRIKO: del horno al café, del brunch a la sobremesa con quien más quieres.",
    },
    community: {
      eyebrow: "Próximamente",
      title: "Algo especial se está horneando.",
      description:
        "Estamos preparando un rincón para la comunidad ONÍRIKO: club de café, eventos exclusivos y mucho más. Déjanos tu email y te avisamos antes que a nadie.",
      placeholder: "tu@email.com",
      cta: "Avisadme",
      note: "Sin spam, lo prometemos.",
    },
    contact: {
      eyebrow: "Contacto",
      title: "Escríbenos, te escuchamos.",
      description:
        "¿Tienes una pregunta, una reserva grande o un evento en mente? Estamos a un mensaje de distancia.",
      fields: {
        name: "Nombre",
        email: "Email",
        phone: "Teléfono",
        reason: "Motivo",
        message: "Mensaje",
        send: "Enviar mensaje",
      },
    },
    footer: {
      tagline: "Café de especialidad, desayunos, brunch y bakery horneada cada mañana en el corazón de Avilés.",
      nav: "Navegación",
      contacto: "Contacto",
      horario: "Horario",
      address: "Calle Alfonso VII, 3 \n Avilés (Asturias)",
      hours1: "Lun – Dom · 09:00 – 14:00",
      hours2: "Jue – Sáb · 17:00 – 20:00",
      made: "Hecho con calma en Avilés",
      rights: (year) => `© ${year} ONÍRIKO Specialty Coffee`,
    },
    schedule: { weekdays: "Lunes a Domingo", openHours: "09:00 – 14:00", evenings: "Jue – Sáb · 17:00 – 20:00" },
  },
  en: {
    seo: {
      title: "ONÍRIKO | Specialty Coffee, Brunch & Bakery in Avilés",
      description: "Experience the finest specialty coffee in Avilés, Asturias. Artisan brunch, fresh bakery, and a welcoming space to enjoy your morning without rush.",
      ogTitle: "ONÍRIKO · Specialty Coffee & Bakery Experts in Avilés",
      ogDescription: "Feel the aroma of homemade bakery and the taste of specialty coffee. The most cozy spot in Avilés for breakfast and remote work.",
    },
    nav: {
      inicio: "Home",
      nosotros: "About",
      menu: "Menu",
      galeria: "Gallery",
      contacto: "Contact",
      reservar: "Book",
    },
    hero: {
      eyebrow: "ONÍRIKO · Specialty Coffee · Avilés",
      title: "A change that goes far beyond a word.",
      description:
        "Specialty coffee, breakfast, brunch and bakery baked fresh every morning. A place where you come, stay and there's no rush.",
      cta: "Discover the menu",
      ctaSecondary: "Our story",
    },
    about: {
      eyebrow: "Philosophy",
      title: "Daydreaming, one cup at a time.",
      p1: "Oníriko is much more than a coffee shop. We're that place where you come and stay. For the calm, because there's no rush. Because it smells like homemade bakery just out of the oven, because our passion is felt from the moment you walk through the door.",
      p2: "We offer vegetarian, vegan and gluten-free options, suitable for coeliacs. We bet on quality, local products, and homemade goodness. Every morning our oven turns on so the bakery is ready when you arrive.",
      highlights: {
        cafe: { t: "Specialty coffee", d: "Selected beans, careful extraction and a daily ritual." },
        bakery: { t: "Bakery every morning", d: "Oven on at dawn to offer you artisan pastries." },
        pet: { t: "Petfriendly", d: "Because the best moments are shared with those you love." },
        wifi: { t: "Remote work", d: "Quiet space Monday to Friday to work without rush." },
      },
      stamp: "Est. 2025",
    },
    menu: {
      eyebrow: "The menu",
      title: "Coffee, brunch and bakery, no rush",
      description:
        "A living menu that changes with the season. We work with local produce, with vegetarian, vegan and gluten-free options in almost everything.",
    },
    extras: {
      cateringEyebrow: "Orders & Catering",
      cateringTitle: "Bakery to order and catering with love.",
      cateringText:
        "We make artisan bakery orders and catering for private events with prior booking. Tell us what you need and we'll bake something tailored for you.",
      cateringCta: "Request a quote",
      cateringCard1T: "Custom bakery",
      cateringCard1D: "Cakes, pastries and sweet tables for your special moments.",
      cateringCard2T: "Catering",
      cateringCard2D: "Breakfasts, brunches and coffee breaks for companies and events.",
      eventsEyebrow: "Special events",
      eventsTitle: "Up to date on our socials.",
      eventsText:
        "We keep you posted on tastings, collaborations and special events through our social media. Follow us not to miss a thing.",
      eventsCta1: "Follow on Instagram",
      eventsCta2: "Book for an event",
      eventsNote: "Want to organise something with us? Write to us and we'll sort it out.",
    },
    gallery: {
      eyebrow: "Gallery",
      title: "Moments worth savouring",
      description:
        "A selection of everyday moments at ONÍRIKO: from the oven to the cup, from brunch to the after-lunch with your favourite people.",
    },
    community: {
      eyebrow: "Coming soon",
      title: "Something special is in the oven.",
      description:
        "We're preparing a corner for the ONÍRIKO community: coffee club, exclusive events and much more. Leave your email and we'll let you know before anyone else.",
      placeholder: "you@email.com",
      cta: "Notify me",
      note: "No spam, promised.",
    },
    contact: {
      eyebrow: "Contact",
      title: "Write to us, we listen.",
      description:
        "Got a question, a big booking or an event in mind? We're just a message away.",
      fields: {
        name: "Name",
        email: "Email",
        phone: "Phone",
        reason: "Reason",
        message: "Message",
        send: "Send message",
      },
    },
    footer: {
      tagline: "Specialty coffee, breakfast, brunch and bakery baked fresh every morning in the heart of Avilés.",
      nav: "Navigation",
      contacto: "Contact",
      horario: "Hours",
      address: "Avilés, Asturias",
      hours1: "Mon – Sun · 09:00 – 14:00",
      hours2: "Thu – Sat · 17:00 – 20:00",
      made: "Made with calm in Avilés",
      rights: (year) => `© ${year} ONÍRIKO Specialty Coffee`,
    },
    schedule: { weekdays: "Monday to Sunday", openHours: "09:00 – 14:00", evenings: "Thu – Sat · 17:00 – 20:00" },
  },
};
