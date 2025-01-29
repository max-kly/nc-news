const controller = require('../controllers/articles.controller')
const articlesRouter = require('express').Router()

articlesRouter.get('/', controller.getArticles)
articlesRouter.get('/:article_id', controller.getArticlesById)
articlesRouter.get('/:article_id/comments', controller.getCommentsByArticleID)
articlesRouter.post('/:article_id/comments', controller.postComment)
articlesRouter.patch('/:article_id', controller.changeArticleVotes)

module.exports = articlesRouter