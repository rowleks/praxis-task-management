const express = require('express')
const db = require('./database')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use('/', require('./routes'))

/* eslint-disable no-console */
const startServer = () => {
  app.listen(PORT, async () => {
    await db.connect()
    console.log(`Server is listening on port ${PORT}`)
  })
}

module.exports = { startServer, app }
