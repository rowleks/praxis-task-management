const usersService = require('../services/users.service')
const { success } = require('../utils/response')

const getAllUsers = async (req, res) => {
  const users = await usersService.getAllUsers()
  success(res, users)
}

const getUserById = async (req, res) => {
  const user = await usersService.getUserById(req.params.id)
  success(res, user)
}

const updateUser = async (req, res) => {
  const user = await usersService.updateUser(req.params.id, req.body)
  success(res, user)
}

const deleteUser = async (req, res) => {
  await usersService.deleteUser(req.params.id)
  success(res, null, 204)
}

module.exports = { getAllUsers, getUserById, updateUser, deleteUser }
