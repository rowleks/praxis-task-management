const tasksService = require('../services/tasks.service')

const getAllTasks = async (req, res) => {
  const { status, priority } = req.query
  const filters = { userId: req.user.id }
  if (status) filters.status = status
  if (priority) filters.priority = priority
  const tasks = await tasksService.getAllTasks(filters)
  res.json(tasks)
}

const getTaskById = async (req, res) => {
  const task = await tasksService.getTaskById(req.params.id, req.user.id)
  res.json(task)
}

const createTask = async (req, res) => {
  const task = await tasksService.createTask(req.body)
  res.status(201).json(task)
}

const updateTask = async (req, res) => {
  const task = await tasksService.updateTask(
    req.params.id,
    req.user.id,
    req.body
  )
  res.json(task)
}

const deleteTask = async (req, res) => {
  await tasksService.deleteTask(req.params.id, req.user.id)
  res.status(204).end()
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
}
