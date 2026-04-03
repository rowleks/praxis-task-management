const mongoose = require('mongoose')
const userSchema = require('../database/schemas/users.schema')

const User = mongoose.model('User', userSchema)

const findAll = async () => await User.find({})

const findById = async id => await User.findById(id)

const findOne = async filter => await User.findOne(filter)

const create = async userData => await new User(userData).save()

const updateById = async (id, userData) =>
  await User.findByIdAndUpdate(id, userData, { returnDocument: 'after' })

const deleteById = async id => {
  const user = await User.findById(id)
  if (!user) return null
  await user.deleteOne()
  return user
}

const deleteMany = async filter => await User.deleteMany(filter)

const insertMany = async users => await User.insertMany(users)

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
