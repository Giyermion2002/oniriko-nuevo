const crypto = require('crypto');
const express = require('express');
const multer = require('multer');

const {
  loginLimiter,
  verifyPassword,
  signAdminToken,
  requireAdmin,
} = require('../middleware/auth');
const {
  getConfig,
  saveConfig,
  uploadMenuImage,
  deleteMenuImage,
} = require('../services/menuStorage');

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024, files: 1 },
  fileFilter: (_req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error('Formato no permitido. Usa JPG, PNG o WEBP.'));
    }
    cb(null, true);
  },
});

const asyncHandler = (handler) => (req, res, next) => {
  Promise.resolve(handler(req, res, next)).catch(next);
};

function handleImageUpload(req, res, next) {
  upload.single('image')(req, res, (error) => {
    if (error) {
      if (error.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'La imagen supera el límite de 8 MB.' });
      }
      return res.status(400).json({ error: error.message || 'Archivo no válido.' });
    }
    next();
  });
}

function sendItems(res, config) {
  res.set('Cache-Control', 'no-store');
  return res.json({
    items: config.items.map(({ id, label, alt, url, updatedAt }) => ({
      id,
      label,
      alt,
      url,
      updatedAt,
    })),
  });
}

function textField(value, fallback) {
  if (typeof value !== 'string') return fallback;
  const trimmed = value.trim();
  return trimmed ? trimmed : fallback;
}

router.get('/health', (_req, res) => {
  res.json({ ok: true });
});

router.get(
  '/menu',
  asyncHandler(async (_req, res) => {
    sendItems(res, await getConfig());
  }),
);

router.post(
  '/admin/login',
  loginLimiter,
  asyncHandler(async (req, res) => {
    if (!process.env.ADMIN_PASSWORD || !process.env.JWT_SECRET) {
      return res.status(503).json({ error: 'Panel admin no configurado.' });
    }

    if (!verifyPassword(req.body?.password, process.env.ADMIN_PASSWORD)) {
      return res.status(401).json({ error: 'Contraseña incorrecta.' });
    }

    return res.json({ token: signAdminToken() });
  }),
);

router.get('/admin/verify', requireAdmin, (_req, res) => {
  res.json({ ok: true });
});

router.put(
  '/admin/menu/items/:id/image',
  requireAdmin,
  handleImageUpload,
  asyncHandler(async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'Falta la imagen.' });
    }

    const config = await getConfig();
    const item = config.items.find((entry) => entry.id === req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Imagen de carta no encontrada.' });
    }

    const previousPublicId = item.publicId;
    let uploaded;

    try {
      uploaded = await uploadMenuImage(req.file.buffer, item.id, req.file.mimetype);

      item.url = uploaded.url;
      item.publicId = uploaded.publicId;
      item.label = textField(req.body?.label, item.label);
      item.alt = textField(req.body?.alt, item.alt);
      item.updatedAt = Date.now();

      await saveConfig(config);
    } catch (error) {
      if (uploaded) await deleteMenuImage(uploaded.publicId);
      throw error;
    }

    await deleteMenuImage(previousPublicId);
    return sendItems(res, config);
  }),
);

router.post(
  '/admin/menu/items',
  requireAdmin,
  handleImageUpload,
  asyncHandler(async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'Falta la imagen.' });
    }

    const config = await getConfig();
    const id = `carta-${Date.now().toString(36)}-${crypto.randomUUID().slice(0, 6)}`;
    const label = textField(req.body?.label, `Carta ${config.items.length + 1}`);
    let uploaded;

    try {
      uploaded = await uploadMenuImage(req.file.buffer, id, req.file.mimetype);

      config.items.push({
        id,
        label,
        alt: textField(req.body?.alt, label),
        url: uploaded.url,
        publicId: uploaded.publicId,
        updatedAt: Date.now(),
      });

      await saveConfig(config);
    } catch (error) {
      if (uploaded) await deleteMenuImage(uploaded.publicId);
      throw error;
    }

    return sendItems(res, config);
  }),
);

router.patch(
  '/admin/menu/items/:id',
  requireAdmin,
  asyncHandler(async (req, res) => {
    const config = await getConfig();
    const item = config.items.find((entry) => entry.id === req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Imagen de carta no encontrada.' });
    }

    item.label = textField(req.body?.label, item.label);
    item.alt = textField(req.body?.alt, item.alt);
    item.updatedAt = Date.now();

    await saveConfig(config);
    return sendItems(res, config);
  }),
);

router.put(
  '/admin/menu/reorder',
  requireAdmin,
  asyncHandler(async (req, res) => {
    const orderedIds = req.body?.orderedIds;
    if (!Array.isArray(orderedIds)) {
      return res.status(400).json({ error: 'Se esperaba una lista de ids.' });
    }

    const config = await getConfig();
    const byId = new Map(config.items.map((item) => [item.id, item]));
    const reordered = orderedIds.map((id) => byId.get(String(id))).filter(Boolean);

    if (reordered.length !== config.items.length) {
      return res.status(400).json({ error: 'La lista de ids no coincide con la carta.' });
    }

    config.items = reordered;
    await saveConfig(config);
    return sendItems(res, config);
  }),
);

router.delete(
  '/admin/menu/items/:id',
  requireAdmin,
  asyncHandler(async (req, res) => {
    const config = await getConfig();
    if (config.items.length <= 1) {
      return res.status(400).json({ error: 'La carta debe tener al menos una imagen.' });
    }

    const index = config.items.findIndex((item) => item.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Imagen de carta no encontrada.' });
    }

    const [removed] = config.items.splice(index, 1);
    await saveConfig(config);
    await deleteMenuImage(removed.publicId);

    return sendItems(res, config);
  }),
);

router.use((error, _req, res, next) => {
  console.error('Error en API de carta:', error);
  if (res.headersSent) return next(error);
  return res.status(500).json({ error: 'Error interno del servidor.' });
});

module.exports = router;
