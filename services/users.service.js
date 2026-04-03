const User = require('../model/users.model')

const getAllUsers = async () => await User.findAll()

const getUserById = async id => await User.findById(id)

const getUserByEmail = async email => await User.findOne({ email })

const createUser = async userData => await User.create(userData)

const updateUser = async (id, userData) => await User.updateById(id, userData)

const deleteUser = async id => await User.deleteById(id)

module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
}
