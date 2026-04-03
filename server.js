const express = require('express')
const db = require('./database')
const cors = require('cors')
const {
  unknownEndpoint,
  errorHandler,
} = require('./middlewares/error.middleware')

const { morganMiddleware } = require('./middlewares/morgan.middleware')

/* eslint-disable no-console */
process.on('uncaughtException', err => {
  console.error('UNCAUGHT EXCEPTION:', err)
  process.exit(1)
})
let server

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(morganMiddleware)
app.use(express.json())

app.use('/', require('./routes'))

app.use(unknownEndpoint)
app.use(errorHandler)

const startServer = async () => {
  await db.connect()
  server = app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
  })
}

process.on('unhandledRejection', err => {
  console.error('UNHANDLED REJECTION:', err)
  if (server && server.listening) server.close(() => process.exit(1))
  else process.exit(1)
})

module.exports = { startServer, app }
