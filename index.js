require('dotenv').config()
const { startServer } = require('./server')

/* eslint-disable no-console */
const main = async () => {
  try {
    await startServer()
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

main()
