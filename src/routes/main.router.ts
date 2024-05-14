import express from 'express'

var router = express.Router()

// const users = require('./users.route')
const movies = require('./movies.route')


router.get('/', (_req, res) => {
  res.send('Main Route !!!')
})

// router.use('/users', users)
router.use('/movies', movies)

module.exports = router
