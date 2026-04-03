const mongoose = require('mongoose')
const taskSchema = require('../database/schemas/tasks.schema')

const Task = mongoose.model('Task', taskSchema)

const findAll = async (filter = {}) =>
  await Task.find(filter).sort({ createdAt: -1 })

const findById = async id => await Task.findById(id)

const findOne = async filter => await Task.findOne(filter)

const create = async taskData => await new Task(taskData).save()

const updateById = async (id, taskData) =>
  await Task.findByIdAndUpdate(id, taskData, {
    returnDocument: 'after',
    runValidators: true,
  })

const deleteById = async id => await Task.findByIdAndDelete(id)

const deleteMany = async filter => await Task.deleteMany(filter)

const insertMany = async tasks => await Task.insertMany(tasks)

module.exports = {
  findAll,
  findById,
  findOne,
  create,
  updateById,
  deleteById,
  deleteMany,
  insertMany,
}
