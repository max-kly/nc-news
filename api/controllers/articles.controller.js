const { fetchArticles, fetchArticleById, updateArticleVotes } = require('../models/articles.model.js')
function getArticles(request, response, next) {
    fetchArticles()
        .then((articles) => {
            response.status(200).send({ articles })
        })
        .catch((err) => {
            next(err)
        })
}
function getArticlesById(request, response, next) {
    const { article_id } = request.params
    fetchArticleById(article_id)
        .then((article) => {
            response.status(200).send({ article })
        })
        .catch((err) => {
            next(err)
        })
}
function changeArticleVotes(request, response, next) {
    const { article_id } = request.params
    const { inc_votes } = request.body
    fetchArticleById(article_id)
        .then((article) => {
            updateArticleVotes(article_id, inc_votes, article.votes)
                .then((article) => {
                    response.status(200).send({ article })
                })
                .catch((err) => {
                    next(err)
                })
        })
        .catch((err) => {
            next(err)
        })
}
module.exports = { getArticles, getArticlesById, changeArticleVotes }