const Task = require('../model/tasks.model')

const getAllTasks = async () => await Task.findAll()

const getTaskById = async id => await Task.findById(id)

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
