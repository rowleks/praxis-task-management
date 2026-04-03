const usersService = require('../services/users.service')

const getAllUsers = async (_, res) => {
  const users = await usersService.getAllUsers()
  res.json(users)
}

const getUserById = async (req, res) => {
  const user = await usersService.getUserById(req.params.id)
  res.json(user)
}

const updateUser = async (req, res) => {
  const user = await usersService.updateUser(req.params.id, req.body)
  res.json(user)
}

const deleteUser = async (req, res) => {
  await usersService.deleteUser(req.params.id)
  res.status(204).end()
}

module.exports = { getAllUsers, getUserById, updateUser, deleteUser }
