const router = require('express').Router()
const { register, login, logout } = require('../controllers/auth.controller')
const { authenticate } = require('../middlewares/auth.middleware')
const {
  validateRegister,
  validateLogin,
} = require('../middlewares/user.validator')

router.post('/register', validateRegister, register)
router.post('/login', validateLogin, login)
router.post('/logout', authenticate, logout)

module.exports = router
