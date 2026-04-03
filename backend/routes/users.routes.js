const router = require('express').Router()
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/users.controller')
const { authenticate, requireAdmin } = require('../middlewares/auth.middleware')
const { validateUpdateUser } = require('../middlewares/user.validator')

router.use(authenticate)

router.get('/', requireAdmin, getAllUsers)
router.get('/:id', getUserById)
router.patch('/:id', validateUpdateUser, updateUser)
router.delete('/:id', deleteUser)

module.exports = router
