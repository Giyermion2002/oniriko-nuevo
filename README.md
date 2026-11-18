# Oníriko

Web de **Oníriko Specialty Coffee** (Avilés). Single Page Application en React + TypeScript + Vite, con un backend en Express/Nodemailer para el formulario de contacto.

## Requisitos

- Node.js 20+ y npm
- (Opcional) Docker y Docker Compose para despliegue contenerizado
- Una cuenta de Gmail con **contraseña de aplicación** (para el envío de correos desde el backend)

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

## Configuración de variables de entorno

> En el repositorio pueden existir archivos `.env` locales, pero no hay `.env.example` versionados. Crea los archivos necesarios antes de ejecutar la app.

### 1) Frontend (Vite, prefijo `VITE_`)

Crea un archivo `.env` en la **raíz del proyecto** (junto a `package.json`) si vas a ejecutar/buildar el frontend localmente:

```env
# Temporada usada para recursos/contenido del menú (p. ej. imagen de carta en /img/menu/<temporada>/...)
# Si no se define, la app usa "verano" por defecto. Posibles valores: primavera/verano/otono/invierno. Las imagenes que contengan estas cartas deben alojarse en public/img/menu/SEASON/carta.jpeg 
VITE_CURRENT_SEASON=verano

# Variable de entorno de build disponible en la configuración Docker.
# Nota: actualmente el formulario de contacto usa una URL hardcodeada en el frontend (ver notas más abajo).
VITE_API_URL=http://localhost:5000
```

**Uso en el código:**
- `VITE_CURRENT_SEASON`: se usa en `src/data/menu.ts` y `src/sections/Menu.tsx` (fallback: `verano`).
- `VITE_API_URL`: se pasa como argumento de build en Docker Compose, pero no se consume actualmente en el código del frontend.

### 2) Backend (`server/.env`)

Crea un archivo `server/.env` con las credenciales SMTP de Gmail:

```env
PORT=5000
EMAIL_USER=tu-correo@gmail.com
EMAIL_PASS=tu_contraseña_de_aplicacion_de_gmail
```

- `PORT` (opcional): puerto del backend (por defecto `5000`).
- `EMAIL_USER`: cuenta Gmail desde la que se envían los correos (también se usa como destinatario en la implementación actual).
- `EMAIL_PASS`: **contraseña de aplicación** de Google (no la contraseña normal de la cuenta).

## Cómo obtener las credenciales de Gmail (App Password)

El backend usa Nodemailer con `service: "gmail"`. Para que funcione, necesitas una contraseña de aplicación:

1. Usa una cuenta de Google/Gmail que controle el proyecto.
2. Activa la **verificación en dos pasos (2FA)** en la cuenta:
   - Google Account → **Seguridad** → **Verificación en dos pasos**.
3. Crea una **contraseña de aplicación**:
   - Google Account → **Seguridad** → **Verificación en dos pasos** → **Contraseñas de aplicaciones**.
   - Selecciona una app/nombre identificable (p. ej. "Oniriko Web") y genera la contraseña.
4. Copia la contraseña generada (normalmente 16 caracteres) y pégala en `server/.env` como `EMAIL_PASS`.
5. Usa el correo de esa cuenta como `EMAIL_USER`.

**Notas importantes:**
- No uses tu contraseña habitual de Gmail en `EMAIL_PASS`.
- Si no ves la opción de contraseñas de aplicación, revisa que la 2FA esté activada y que la cuenta permita este método.
- Mantén `server/.env` fuera del control de versiones y no compartas estas credenciales.

## Ejecución en local

### 1. Levantar el backend

```bash
cd server
npm install
npm start
```

- Por defecto escucha en `http://localhost:5000` (o el `PORT` definido en `server/.env`).
- Endpoint disponible: `POST /send-email`
  - Cuerpo JSON esperado: `{ "name", "email", "phone", "reason", "message" }`
  - Campos obligatorios: `name`, `email`, `phone`, `reason`

### 2. Levantar el frontend

En otra terminal, desde la raíz del proyecto:

```bash
npm install
npm run dev
```

- Vite mostrará la URL local (normalmente `http://localhost:5173`).
- **Importante:** el formulario de contacto (`src/sections/Contact.tsx`) envía actualmente las peticiones a `http://localhost:5000/send-email` (URL hardcodeada), así que para probar el envío en local el backend debe estar corriendo en ese host/puerto.

### Scripts disponibles (frontend)

- `npm run dev` — Servidor de desarrollo de Vite.
- `npm run build` — Compila TypeScript (`tsc -b`) y genera el build de producción en `dist/`.
- `npm run preview` — Previsualiza el build de producción.
- `npm run lint` — Ejecuta Oxlint.

## Despliegue con Docker

Asegúrate de tener configuradas las variables necesarias antes de construir:

- `server/.env` con `EMAIL_USER`, `EMAIL_PASS` (y `PORT` si aplica).
- Variables de build del frontend (`VITE_CURRENT_SEASON`, `VITE_API_URL`) disponibles en el entorno desde el que ejecutes Docker Compose (por ejemplo, en un `.env` en la raíz, que Compose puede leer para interpolación).

Construir y levantar:

```bash
docker compose up --build
```

### Servicios (`docker-compose.yml`, red `oniriko-network`)

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
- Proxy de `/api/` hacia `http://backend:5000/` (el prefijo `/api` se elimina en el proxy), por lo que el endpoint del backend queda accesible como `/api/send-email` a través del frontend.

> Nota de integración: el código actual del formulario apunta a `http://localhost:5000/send-email`. Si despliegas con Nginx y quieres usar el proxy `/api`, revisa/ajusta la URL de envío en `src/sections/Contact.tsx`.

## Arquitectura

- **SPA (React)**: `App.tsx` compone la página con `SEO`, `Navbar`, secciones (`Hero`, `About`, `Menu`, `Extras`, `Gallery`, `Contact`) y `Footer`. El contenido se apoya en `src/data` y la internacionalización en `src/i18n`. Incluye animaciones con Framer Motion y utilidades como `Reveal` y `ScrollToTop`.
- **API de contacto**: servicio Express independiente, sin persistencia, encargado de validar la solicitud y reenviar el mensaje por correo mediante Nodemailer (Gmail).
- **Integración en producción**: Nginx actúa como punto de entrada: sirve los assets estáticos del frontend y puede redirigir las peticiones `/api/*` al backend, separando la entrega de la web del envío de correos.
- **Configuración por entorno/temporada**: el frontend admite variables `VITE_*` en tiempo de build (p. ej. temporada y URL de API) para adaptar contenido y configuración de despliegue.
