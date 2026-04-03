const router = require('express').Router()
const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/tasks.controller')
const { authenticate } = require('../middlewares/auth.middleware')

router.use(authenticate)

router.get('/', getAllTasks)
router.get('/:id', getTaskById)
router.post('/', createTask)
router.put('/:id', updateTask)
router.delete('/:id', deleteTask)

module.exports = router
