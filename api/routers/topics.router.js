const topicsRouter = require('express').Router()
const controller = require('../controllers/topics.controller')

topicsRouter.get('/', controller.getTopics)

module.exports = topicsRouter