const controller = require('../controllers/comments.controller')
const commentsRouter = require('express').Router()

commentsRouter.patch('/:comment_id', controller.updateCommentVotes)
commentsRouter.delete('/:comment_id', controller.deleteComment)

module.exports = commentsRouter