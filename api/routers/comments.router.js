const controller = require('../controllers/comments.controller')
const commentsRouter = require('express').Router()

commentsRouter.delete('/:comment_id', controller.deleteComment)

module.exports = commentsRouter