const controller = require('../controllers/users.controller')
const userRouter = require('express').Router()

userRouter.get('/', controller.getAllUsers)
userRouter.get('/login', controller.loginUser)
userRouter.get('/auth', controller.authUser)
userRouter.get('/:username', controller.getUserByUsername)

module.exports = userRouter