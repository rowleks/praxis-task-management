const tasksService = require('../services/tasks.service')
const { success } = require('../utils/response')

const getAllTasks = async (req, res) => {
  const { status, priority } = req.query
  const filters = { userId: req.user.id }
  if (status) filters.status = status
  if (priority) filters.priority = priority
  const tasks = await tasksService.getAllTasks(filters)
  success(res, tasks)
}

const getTaskById = async (req, res) => {
  const task = await tasksService.getTaskById(req.params.id, req.user.id)
  success(res, task)
}

const createTask = async (req, res) => {
  const task = await tasksService.createTask({
    ...req.body,
    userId: req.user.id,
  })
  success(res, task, 201)
}

const updateTask = async (req, res) => {
  const task = await tasksService.updateTask(
    req.params.id,
    req.user.id,
    req.body
  )
  success(res, task)
}

const deleteTask = async (req, res) => {
  await tasksService.deleteTask(req.params.id, req.user.id)
  success(res, null, 204)
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
}
