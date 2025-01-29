const controller = require('../controllers/users.controller')
const userRouter = require('express').Router()

userRouter.get('/', controller.getAllUsers)
userRouter.get('/:username', controller.getUserByUsername)

module.exports = userRouter