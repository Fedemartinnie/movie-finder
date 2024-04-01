import express from 'express'

const router = express.Router()

// var usersController = require('../controllers/users.controller')
// var authorization = require('../../auth/authorization.js')


router.get("/", (_req, res) => {
    res.send("Users Route !!!")    
})

//router.post('/register',usersController.register)

module.exports = router