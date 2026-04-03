const authService = require('../services/auth.service')
const usersService = require('../services/users.service')

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing or invalid token' })
  }

  const token = authorization.split(' ')[1]

  if (await authService.isTokenBlacklisted(token)) {
    return res.status(401).json({ message: 'Token has been invalidated' })
  }

  const decoded = authService.verifyToken(token)
  req.user = await usersService.getUserById(decoded.id)
  req.token = token
  next()
}

const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' })
  }
  next()
}

module.exports = { authenticate, requireAdmin }
