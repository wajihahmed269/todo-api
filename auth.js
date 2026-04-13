// ⚠️ INTENTIONAL ERROR #1 — hardcoded secret
// This will be caught by GitLeaks in the pipeline
const SECRET_KEY = "supersecret123";

function authenticateToken(req, res, next) {
  const token = req.headers['x-api-key'];

  if (!token || token !== SECRET_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
}

module.exports = { authenticateToken };
