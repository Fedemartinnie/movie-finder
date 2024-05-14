import express from 'express'
const usersController = require('../controllers/users.controller')
const router = express.Router()

// var usersController = require('../controllers/users.controller')
// var authorization = require('../../auth/authorization.js')


router.get("/", (_req, res) => {
    res.send("Users Route !!!")    
})


module.exports = router