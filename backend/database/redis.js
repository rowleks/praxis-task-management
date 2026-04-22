const Redis = require('ioredis')

/* eslint-disable no-console */
let client

const connect = () => {
  client = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
    lazyConnect: false,
    maxRetriesPerRequest: null,
  })

  client.on('connect', () => console.log('Redis connected'))
  client.on('error', err => {
    throw new Error(err.message)
  })

  return client
}

const getClient = () => {
  if (!client)
    throw new Error('Redis client not initialised. Call connect() first.')
  return client
}

module.exports = { connect, getClient }
