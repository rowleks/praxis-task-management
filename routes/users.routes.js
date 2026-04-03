const router = require('express').Router()
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/users.controller')
const {
  authenticate,
  authorizeAdmin,
} = require('../middlewares/auth.middleware')

router.use(authenticate)

router.get('/', authorizeAdmin, getAllUsers)
router.get('/:id', getUserById)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

module.exports = router
