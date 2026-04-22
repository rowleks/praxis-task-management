const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const redis = require('../database/redis')

const generateToken = payload =>
  jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })

const verifyToken = token => jwt.verify(token, process.env.JWT_SECRET)

const hashPassword = async password => await bcrypt.hash(password, 10)

const comparePassword = async (password, hash) =>
  await bcrypt.compare(password, hash)

const blacklistToken = async token => {
  try {
    const decoded = verifyToken(token)
    const ttl = decoded.exp - Math.floor(Date.now() / 1000)
    if (ttl > 0) {
      await redis.getClient().set(`bl:${token}`, '1', 'EX', ttl)
    }
  } catch (error) {
    // If token is already invalid or expired, no need to blacklist
    // eslint-disable-next-line no-console
    console.error('Invalid or expired token:', error.message)
    return false
  }
}

const isTokenBlacklisted = async token => {
  try {
    const result = await redis.getClient().get(`bl:${token}`)
    return result !== null
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Redis error:', error)
    return false // Fallback: allow if cache is down, or change to true for strict security
  }
}

module.exports = {
  generateToken,
  verifyToken,
  hashPassword,
  comparePassword,
  blacklistToken,
  isTokenBlacklisted,
}
