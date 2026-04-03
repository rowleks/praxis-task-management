const router = require('express').Router()
const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/tasks.controller')
const { authenticate } = require('../middlewares/auth.middleware')
const {
  validateCreateTask,
  validateUpdateTask,
} = require('../middlewares/task.validator')

router.use(authenticate)

router.get('/', getAllTasks)
router.get('/:id', getTaskById)
router.post('/', validateCreateTask, createTask)
router.patch('/:id', validateUpdateTask, updateTask)
router.delete('/:id', deleteTask)

module.exports = router
