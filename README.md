# Oníriko

Web de **Oníriko Specialty Coffee** (Avilés). Single Page Application en React + TypeScript + Vite, con un backend en Express/Resend para el formulario de contacto.

## Requisitos

- Node.js 20+ y npm
- (Opcional) Docker y Docker Compose para despliegue contenerizado
- Una API key de [Resend](https://resend.com) (para el envío de correos desde el backend)

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

> En el repositorio hay archivos `EXAMPLE.env` (raíz y `server/`) como plantilla, junto con `.env` locales. Revisa y ajusta los valores necesarios antes de ejecutar la app.

### 1) Frontend (Vite, prefijo `VITE_`)

Crea un archivo `.env` en la **raíz del proyecto** (junto a `package.json`) si vas a ejecutar/buildar el frontend:

```env
# Temporada usada para recursos/contenido del menú (p. ej. imagen de carta en /img/menu/<temporada>/...)
# Si no se define, la app usa "verano" por defecto.
VITE_CURRENT_SEASON=verano

# URL base del backend para el formulario de contacto.
# El frontend hará la petición a: <VITE_API_URL>/send-email
# - Desarrollo local (backend en tu máquina): http://localhost:5000
# - Producción con Nginx proxy (/api -> backend): /api
# Si no se define, se usa por defecto: http://localhost:5000
VITE_API_URL=http://localhost:5000
```

**Uso en el código:**
- `VITE_CURRENT_SEASON`: se usa en `src/data/menu.ts` y `src/sections/Menu.tsx` (fallback: `verano`).
- `VITE_API_URL`: se usa en `src/sections/Contact.tsx` como base para enviar el formulario a `POST <VITE_API_URL>/send-email` (fallback: `http://localhost:5000`).

> Importante: las variables `VITE_*` se inyectan en **tiempo de build**. Si cambias `VITE_API_URL` (u otras `VITE_*`), debes volver a ejecutar el build/generar la imagen.

### 2) Backend (`server/.env`)

Crea o ajusta `server/.env` (puedes partir de `server/EXAMPLE.env`) con la API key de Resend, el correo de destino y el origen permitido del frontend:

```env
RESEND_API_KEY=re_tu_api_key
CONTACT_EMAIL=tu-correo@resend.dev
PORT=5000
FRONTEND_URL=http://localhost:5173,http://localhost:4173
```

- `RESEND_API_KEY`: API key de Resend (nunca se incluye en el repositorio).
- `CONTACT_EMAIL`: dirección que recibe los mensajes del formulario (`to`).
- `PORT` (opcional): puerto del backend (por defecto `5000`; Render lo inyecta automáticamente).
- `FRONTEND_URL` (opcional, recomendado): origen(es) permitidos para CORS, separados por comas y con `trim`. Si no se define (o es `*`), el servidor permite peticiones desde cualquier origen.

El correo se envía con `from: 'Oníriko Web <onboarding@resend.dev>'` y `replyTo` = el email introducido en el formulario.

## Cómo obtener la API key de Resend

El backend usa el SDK de Resend (`resend.emails.send`). Para que funcione:

1. Crea una cuenta en [resend.com](https://resend.com).
2. En el dashboard, entra en **API Keys** y pulsa **Create API Key**.
3. Copia la clave (empieza por `re_`) y pégala en `server/.env` como `RESEND_API_KEY`.
4. Define `CONTACT_EMAIL` con la dirección que debe recibir los mensajes.

**Notas importantes:**
- `onboarding@resend.dev` es el remitente de prueba: en la cuenta gratuita solo entrega al correo propietario de la cuenta de Resend. Para otros destinos, verifica un dominio propio y cambia el `from` en `server/index.js`.
- Mantén `server/.env` fuera del control de versiones y no compartas la API key.

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
- El formulario de contacto envía a `<VITE_API_URL>/send-email`. Si no defines `VITE_API_URL`, usará `http://localhost:5000` por defecto, por lo que en desarrollo local basta con tener el backend levantado en ese puerto.

### Scripts disponibles (frontend)

- `npm run dev` — Servidor de desarrollo de Vite.
- `npm run build` — Compila TypeScript (`tsc -b`) y genera el build de producción en `dist/`.
- `npm run preview` — Previsualiza el build de producción.
- `npm run lint` — Ejecuta Oxlint.

## Despliegue con Docker

Asegúrate de tener configuradas las variables necesarias antes de construir:

- `server/.env` con `RESEND_API_KEY`, `CONTACT_EMAIL` (y `PORT` si aplica).
- Variables de build del frontend (`VITE_CURRENT_SEASON`, `VITE_API_URL`) disponibles en el entorno desde el que ejecutes Docker Compose (por ejemplo, en un `.env` en la raíz para la interpolación de Compose).

Para la configuración incluida (`nginx.conf` hace proxy de `/api/` al backend), lo habitual es definir:

```env
VITE_CURRENT_SEASON=verano
VITE_API_URL=/api
```

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
- Con `VITE_API_URL=/api`, el formulario enviará las peticiones al mismo origen (`/api/send-email`), que Nginx redirige al backend.

## Despliegue en Render

El backend se despliega como **Web Service**:

- **Root Directory**: `server`
- **Runtime**: Node 20 (o superior)
- **Build Command**: `npm install`
- **Start Command**: `npm start` (equivale a `node index.js`)
- **Environment variables**: `RESEND_API_KEY`, `CONTACT_EMAIL` y `FRONTEND_URL` con la URL del frontend. `PORT` no hace falta: Render lo define automáticamente y el servidor ya escucha en `process.env.PORT || 5000`.

Si el frontend se despliega como Static Site en Render: Build Command `npm run build`, Publish Directory `dist`, y variable `VITE_API_URL` apuntando a la URL del backend. Para que el backend acepte las peticiones, añade esa URL del frontend a `FRONTEND_URL`.

## Arquitectura

- **SPA (React)**: `App.tsx` compone la página con `SEO`, `Navbar`, secciones (`Hero`, `About`, `Menu`, `Extras`, `Gallery`, `Contact`) y `Footer`. El contenido se apoya en `src/data` y la internacionalización en `src/i18n`. Incluye animaciones con Framer Motion y utilidades como `Reveal` y `ScrollToTop`.
- **API de contacto**: servicio Express independiente, sin persistencia, encargado de validar la solicitud y reenviar el mensaje por correo mediante Resend.
- **Integración en producción**: Nginx actúa como punto de entrada: sirve los assets estáticos del frontend y redirige las peticiones `/api/*` al backend, separando la entrega de la web del envío de correos.
- **Configuración por entorno/temporada**: el frontend admite variables `VITE_*` en tiempo de build (p. ej. temporada y URL base de la API) para adaptar contenido y configuración de despliegue.
