const usersService = require('../services/users.service')
const authService = require('../services/auth.service')
const { success, error } = require('../utils/response')

const register = async (req, res) => {
  const { name, email, password } = req.body
  const hashedPassword = await authService.hashPassword(password)
  const user = await usersService.createUser({
    name,
    email,
    password: hashedPassword,
  })
  success(res, user, 201)
}

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await usersService.getUserByEmail(email)
  if (!user || !(await authService.comparePassword(password, user.password))) {
    return error(res, 'Invalid credentials', 401)
  }
  const token = authService.generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
  })
  success(res, { token, user })
}

const logout = async (req, res) => {
  await authService.blacklistToken(req.token)
  success(res, null, 204)
}

module.exports = { register, login, logout }
