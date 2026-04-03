const router = require('express').Router()

router.get('/', (_, res) => {
  res.send('Hello from the root route!')
})

router.use('/auth', require('./auth.routes'))
router.use('/users', require('./users.routes'))
router.use('/tasks', require('./tasks.routes'))

module.exports = router
