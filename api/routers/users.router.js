const controller = require('../controllers/users.controller')
const userRouter = require('express').Router()

userRouter.get('/', controller.getAllUsers)

module.exports = userRouter