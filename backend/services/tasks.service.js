const Task = require('../model/tasks.model')

const getTaskAndVerifyOwnership = async (id, userId) => {
  const task = await Task.findById(id)
  if (!task) {
    throw Object.assign(new Error('Task not found'), { status: 404 })
  }
  if (task.userId.toString() !== userId) {
    throw Object.assign(new Error('Forbidden'), { status: 403 })
  }
  return task
}

const getAllTasks = async (filters = {}) => await Task.findAll(filters)

const getTaskById = async (id, userId) => {
  const task = await Task.findOne({ _id: id, userId })
  if (!task) throw Object.assign(new Error('Task not found'), { status: 404 })
  return task
}

const createTask = async taskData => await Task.create(taskData)

const updateTask = async (id, userId, taskData) => {
  await getTaskAndVerifyOwnership(id, userId)
  return await Task.updateById(id, taskData)
}

const deleteTask = async (id, userId) => {
  await getTaskAndVerifyOwnership(id, userId)
  return await Task.deleteById(id)
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
}
