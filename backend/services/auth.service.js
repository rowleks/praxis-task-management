const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const TokenBlacklist = require('../model/tokenBlacklist.model')

const generateToken = payload =>
  jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })

const verifyToken = token => jwt.verify(token, process.env.JWT_SECRET)

const hashPassword = async password => await bcrypt.hash(password, 10)

const comparePassword = async (password, hash) =>
  await bcrypt.compare(password, hash)

const blacklistToken = async token => {
  const decoded = verifyToken(token)
  await TokenBlacklist.create({
    token,
    expiresAt: new Date(decoded.exp * 1000),
  })
}

const isTokenBlacklisted = async token =>
  await TokenBlacklist.findOne({ token })

module.exports = {
  generateToken,
  verifyToken,
  hashPassword,
  comparePassword,
  blacklistToken,
  isTokenBlacklisted,
}
