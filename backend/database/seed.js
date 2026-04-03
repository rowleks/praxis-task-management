require('dotenv').config()
const db = require('./index')
const User = require('../model/users.model')
const Task = require('../model/tasks.model')
const authService = require('../services/auth.service')

/* eslint-disable no-console */

const users = [
  {
    name: 'Admin User',
    email: 'admin@praxis.com',
    password: 'password123',
    role: 'admin',
  },
  { name: 'John Doe', email: 'user@praxis.com', password: 'password123' },
]

const seedTasks = userId => [
  { userId, title: 'Set up project', status: 'done', priority: 'high' },
  {
    userId,
    title: 'Build API endpoints',
    status: 'in-progress',
    priority: 'high',
  },
  { userId, title: 'Write documentation', status: 'todo', priority: 'low' },
]

const seed = async () => {
  await db.connect()

  await User.deleteMany({})
  await Task.deleteMany({})

  for (const userData of users) {
    const password = await authService.hashPassword(userData.password)
    const user = await User.create({ ...userData, password })
    await Task.insertMany(seedTasks(user._id))
    console.log(`Seeded user: ${user.email}`)
  }

  console.log('Seeding complete')
  process.exit(0)
}

seed().catch(err => {
  console.error('Seeding failed:', err.message)
  process.exit(1)
})
