const fs = require('fs');
const path = require('path');
const { v2: cloudinary } = require('cloudinary');

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const cloudApiKey = process.env.CLOUDINARY_API_KEY;
const cloudApiSecret = process.env.CLOUDINARY_API_SECRET;
const usesCloudinary = Boolean(cloudName && cloudApiKey && cloudApiSecret);

if (usesCloudinary) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: cloudApiKey,
    api_secret: cloudApiSecret,
  });
}

const dataDir = process.env.DATA_DIR || path.join(__dirname, '..', 'data');
const uploadsDir = path.join(dataDir, 'uploads');
const configPath = path.join(dataDir, 'menu-config.json');

if (!usesCloudinary) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const CONFIG_PUBLIC_ID = 'oniriko/menu-config.json';
const EXT_BY_MIME = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
};

let cachedConfig = null;

function defaultConfig() {
  return {
    items: [
      {
        id: 'temporada',
        label: 'Carta de temporada',
        alt: 'Carta de temporada Oníriko',
        url: '/img/menu/verano/carta.jpeg',
        publicId: null,
        updatedAt: 1,
      },
      {
        id: 'carta-1',
        label: 'Carta principal 1',
        alt: 'Carta Oníriko 1',
        url: '/img/carta/carta_img1.jpeg',
        publicId: null,
        updatedAt: 1,
      },
      {
        id: 'carta-2',
        label: 'Carta principal 2',
        alt: 'Carta Oníriko 2',
        url: '/img/carta/carta_img2.jpeg',
        publicId: null,
        updatedAt: 1,
      },
    ],
  };
}

function normalizeConfig(value) {
  if (!value || !Array.isArray(value.items)) {
    throw new Error('Configuración de carta no válida');
  }

  return {
    items: value.items.map((item) => ({
      id: String(item.id),
      label: String(item.label || ''),
      alt: String(item.alt || ''),
      url: String(item.url),
      publicId: item.publicId ? String(item.publicId) : null,
      updatedAt: Number(item.updatedAt) || 1,
    })),
  };
}

function isNotFound(error) {
  return error?.error?.http_code === 404 || error?.http_code === 404;
}

async function getConfig() {
  if (cachedConfig) return cachedConfig;

  if (usesCloudinary) {
    try {
      const resource = await cloudinary.api.resource(CONFIG_PUBLIC_ID, {
        resource_type: 'raw',
      });
      const response = await fetch(resource.secure_url, { cache: 'no-store' });
      if (!response.ok) {
        throw new Error('No se pudo descargar menu-config.json desde Cloudinary');
      }

      cachedConfig = normalizeConfig(await response.json());
      return cachedConfig;
    } catch (error) {
      if (!isNotFound(error)) throw error;
      const initial = defaultConfig();
      await saveConfig(initial);
      return initial;
    }
  }

  if (!fs.existsSync(configPath)) {
    const initial = defaultConfig();
    await saveConfig(initial);
    return initial;
  }

  cachedConfig = normalizeConfig(JSON.parse(fs.readFileSync(configPath, 'utf8')));
  return cachedConfig;
}

async function saveConfig(config) {
  const normalized = normalizeConfig(config);

  if (usesCloudinary) {
    const jsonBuffer = Buffer.from(JSON.stringify(normalized, null, 2), 'utf8');
    await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'raw',
          public_id: CONFIG_PUBLIC_ID,
          overwrite: true,
          invalidate: true,
        },
        (error) => (error ? reject(error) : resolve()),
      );
      stream.end(jsonBuffer);
    });
  } else {
    fs.mkdirSync(dataDir, { recursive: true });
    const tmpPath = `${configPath}.tmp`;
    fs.writeFileSync(tmpPath, JSON.stringify(normalized, null, 2), 'utf8');
    fs.renameSync(tmpPath, configPath);
  }

  cachedConfig = normalized;
  return normalized;
}

function safeId(itemId) {
  return String(itemId).replace(/[^a-zA-Z0-9_-]/g, '-');
}

async function uploadMenuImage(buffer, itemId, mimeType) {
  const id = safeId(itemId);

  if (usesCloudinary) {
    const publicId = `carta-${id}-${Date.now()}`;
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: 'oniriko/menu',
          public_id: publicId,
          resource_type: 'image',
          transformation: [
            { width: 1800, crop: 'limit', quality: 'auto', fetch_format: 'auto' },
          ],
        },
        (error, uploadResult) => (error ? reject(error) : resolve(uploadResult)),
      );
      stream.end(buffer);
    });

    return { url: result.secure_url, publicId: result.public_id };
  }

  const ext = EXT_BY_MIME[mimeType] || '.jpg';
  const filename = `carta-${id}-${Date.now()}${ext}`;
  fs.mkdirSync(uploadsDir, { recursive: true });
  fs.writeFileSync(path.join(uploadsDir, filename), buffer);

  return { url: `/uploads/${filename}`, publicId: filename };
}

async function deleteMenuImage(publicId) {
  if (!publicId) return;

  if (usesCloudinary) {
    await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
    return;
  }

  const filePath = path.join(uploadsDir, path.basename(publicId));
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
}

module.exports = {
  getConfig,
  saveConfig,
  uploadMenuImage,
  deleteMenuImage,
};
