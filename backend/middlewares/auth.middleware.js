const authService = require('../services/auth.service')

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing or invalid token' })
  }

  const token = authorization.split(' ')[1]

  try {
    const decoded = authService.verifyToken(token)
    if (await authService.isTokenBlacklisted(token)) {
      return res.status(401).json({ message: 'Token has been invalidated' })
    }
    req.user = decoded // { id, email, role } from payload — no DB call
    req.token = token
    next()
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Authentication error:', error.message)
    return res.status(401).json({ message: 'Invalid or expired token' })
  }
}

const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' })
  }
  next()
}

module.exports = { authenticate, requireAdmin }
