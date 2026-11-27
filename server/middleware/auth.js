const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 8,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Demasiados intentos. Espera 15 minutos.' },
});

function verifyPassword(inputPassword, expectedPassword) {
  if (!inputPassword || !expectedPassword) return false;

  // Hash SHA-256 antes de comparar para que ambos buffers midan igual.
  const inputHash = crypto.createHash('sha256').update(String(inputPassword)).digest();
  const expectedHash = crypto.createHash('sha256').update(String(expectedPassword)).digest();
  return crypto.timingSafeEqual(inputHash, expectedHash);
}

function signAdminToken() {
  return jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '8h' });
}

function requireAdmin(req, res, next) {
  if (!process.env.JWT_SECRET) {
    return res.status(503).json({ error: 'Panel admin no configurado' });
  }

  const authorization = req.headers.authorization || '';
  const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : null;
  if (!token) {
    return res.status(401).json({ error: 'No autorizado' });
  }

  try {
    req.admin = jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch {
    return res.status(401).json({ error: 'Sesión expirada o inválida' });
  }
}

module.exports = {
  loginLimiter,
  verifyPassword,
  signAdminToken,
  requireAdmin,
};
