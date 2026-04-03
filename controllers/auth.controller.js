const usersService = require('../services/users.service')
const authService = require('../services/auth.service')

const register = async (req, res) => {
  const { email, password } = req.body
  const hashedPassword = await authService.hashPassword(password)
  const user = await usersService.createUser({
    email,
    password: hashedPassword,
  })
  res.status(201).json(user)
}

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await usersService.getUserByEmail(email)
  if (!user || !(await authService.comparePassword(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }
  const token = authService.generateToken({ id: user.id })
  res.json({ token })
}

const logout = async (req, res) => {
  await authService.blacklistToken(req.token)
  res.status(204).end()
}

module.exports = { register, login, logout }
