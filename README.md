# Oníriko

Web de **Oníriko Specialty Coffee** (Avilés). Single Page Application en React + TypeScript + Vite, con un backend en Express/Nodemailer para el formulario de contacto.

## Requisitos

- Node.js 20+ y npm
- (Opcional) Docker y Docker Compose para despliegue contenerizado

## Estructura del proyecto

- `src/` — Frontend
  - `sections/` — Secciones de la landing (`Hero`, `About`, `Menu`, `Extras`, `Gallery`, `Contact`)
  - `components/` — Componentes compartidos (`Navbar`, `Footer`, `SEO`, `Reveal`, `ScrollToTop`, `SectionHeader`, `LanguageSelector`, etc.)
  - `i18n/` — Contexto y diccionarios de idioma (`LanguageContext.tsx`, `dict.ts`)
  - `data/` — Datos de contenido (`menu.ts`, `gallery.ts`)
  - `hooks/` — Hooks reutilizables (p. ej. `motion.ts`)
  - `App.tsx`, `main.tsx` — Composición y entrada de la aplicación
- `server/` — Backend (Express)
  - `index.js` — API de envío de correo (`POST /send-email`)
  - `Dockerfile`, `package.json`
- `public/`, `img/` — Assets e imágenes
- `dist/` — Salida del build de producción (generada)
- `Dockerfile`, `docker-compose.yml`, `nginx.conf` — Build y despliegue en contenedores
- `info.md` — Notas de contenido/estructura del sitio

## Variables de entorno

> En el repositorio existen archivos `.env` locales, pero no hay `.env.example` versionados. Crea/ajusta los necesarios en tu entorno antes de ejecutar.

### Frontend (tiempo de build, prefijo `VITE_`)

- `VITE_CURRENT_SEASON` — Temporada actual usada por el contenido/menú.
- `VITE_API_URL` — URL base de la API consumida por el frontend.

En Docker Compose se pasan como argumentos de build al servicio `frontend`.

### Backend (`server/.env`)

- `PORT` — Puerto del servidor (por defecto `5000`).
- `EMAIL_USER` — Cuenta de correo emisora (Gmail).
- `EMAIL_PASS` — Contraseña o app password para Nodemailer.

## Ejecución en local

### Frontend

```bash
npm install
npm run dev
```

Scripts disponibles:

- `npm run dev` — Servidor de desarrollo de Vite.
- `npm run build` — Compila TypeScript (`tsc -b`) y genera el build de producción en `dist/`.
- `npm run preview` — Previsualiza el build de producción.
- `npm run lint` — Ejecuta Oxlint.

### Backend

```bash
cd server
npm install
npm start
```

- El servidor arranca en `PORT` (por defecto `5000`).
- Endpoint: `POST /send-email`
  - Cuerpo JSON esperado: `{ "name", "email", "phone", "reason", "message" }`
  - Campos obligatorios: `name`, `email`, `phone`, `reason`
  - Envía el mensaje por correo mediante Nodemailer (servicio Gmail) usando `EMAIL_USER` y `EMAIL_PASS`.

## Despliegue con Docker

```bash
docker compose up --build
```

Servicios definidos en `docker-compose.yml` (red `oniriko-network`):

- **frontend**
  - Build multi-stage: Node 20 Alpine (`npm install`, `npm run build`) + Nginx (`nginx:stable-alpine`) para servir `dist/`.
  - Expone el puerto `80`.
  - Recibe `VITE_CURRENT_SEASON` y `VITE_API_URL` como argumentos de build.
- **backend**
  - Build desde `./server`.
  - Expone el puerto `5000`.
  - Carga variables desde `./server/.env`.

### Nginx

- Sirve la SPA con fallback a `index.html` (`try_files $uri $uri/ /index.html`).
- Proxy de `/api/` hacia `http://backend:5000/` (el prefijo `/api` se elimina en el proxy), lo que permite consumir el endpoint del backend como `/api/send-email` desde el frontend.

## Arquitectura

- **SPA (React)**: `App.tsx` compone la página con `SEO`, `Navbar`, secciones (`Hero`, `About`, `Menu`, `Extras`, `Gallery`, `Contact`) y `Footer`. El contenido se apoya en `src/data` y la internacionalización en `src/i18n`. Incluye animaciones con Framer Motion y utilidades como `Reveal` y `ScrollToTop`.
- **API de contacto**: servicio Express independiente, sin persistencia, encargado de validar la solicitud y reenviar el mensaje por correo.
- **Integración en producción**: Nginx actúa como punto de entrada único: sirve los assets estáticos del frontend y redirige las peticiones `/api/*` al backend, separando la entrega de la web del envío de correos.
- **Configuración por entorno/temporada**: el frontend admite variables `VITE_*` en tiempo de build (p. ej. temporada y URL de API) para adaptar contenido y configuración de despliegue.
