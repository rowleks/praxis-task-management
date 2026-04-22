const express = require('express')
const path = require('node:path')
const db = require('./database')
const redis = require('./database/redis')
const cors = require('cors')
const {
  errorHandler,
  unknownEndpoint,
} = require('./middlewares/error.middleware')

const { morganMiddleware } = require('./middlewares/morgan.middleware')

/* eslint-disable no-console */
process.on('uncaughtException', err => {
  console.error('UNCAUGHT EXCEPTION:', err)
  process.exit(1)
})
let server

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(morganMiddleware)
app.use(express.json())

// API routes
app.use('/api', require('./routes'))

// Serve frontend
app.use(express.static(path.join(__dirname, 'dist')))

app.get('/{*splat}', (_, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

// Error handlers
app.use(unknownEndpoint)
app.use(errorHandler)

const startServer = async () => {
  await db.connect()
  redis.connect()
  server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    console.log(
      `If you ran the build:ui script, visit: http://localhost:${PORT}/ to view frontend`
    )
  })
}

process.on('unhandledRejection', err => {
  console.error('UNHANDLED REJECTION:', err)
  if (server && server.listening) server.close(() => process.exit(1))
  else process.exit(1)
})

module.exports = { startServer, app }
