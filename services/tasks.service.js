const Task = require('../model/tasks.model')

const getAllTasks = async (filters = {}) => await Task.findAll(filters)

const getTaskById = async (id, userId) =>
  await Task.findOne({ _id: id, userId })

const createTask = async taskData => await Task.create(taskData)

const updateTask = async (id, taskData) => await Task.updateById(id, taskData)

const deleteTask = async id => await Task.deleteById(id)

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
}
