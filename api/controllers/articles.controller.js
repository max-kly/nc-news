const { fetchArticles, fetchArticleById, updateArticleVotes, fetchCommentsByArticleID, addComment, addNewArticle } = require('../models/articles.model.js')
function getArticles(request, response, next) {
    const { sort_by, order, topic, page, limit } = request.query
    fetchArticles(sort_by, order, topic, limit, page)
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
        .then(() => {
            return updateArticleVotes(article_id, inc_votes)
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
function getCommentsByArticleID(request, response, next) {
    const { article_id } = request.params
    const { page, limit } = request.query
    fetchArticleById(article_id)
        .then(() => {
            fetchCommentsByArticleID(article_id, page, limit)
                .then((comments) => {
                    response.status(200).send({ comments })
                })
                .catch((err) => {
                    next(err)
                })
        })
        .catch((err) => {
            next(err)
        })
}
function postComment(request, response, next) {
    const { article_id } = request.params
    const { username } = request.body
    const { body } = request.body
    fetchArticleById(article_id)
        .then(() => {
            addComment(article_id, username, body)
                .then(({ rows }) => {
                    response.status(201).send({ comment: rows[0] })
                })
                .catch((err) => {
                    next(err)
                })
        })
        .catch((err) => {
            next(err)
        })
}
function postArticle(request, response, next) {
    const { author, title, body, topic, article_img_url } = request.body
    addNewArticle(author, title, body, topic, article_img_url)
        .then((article) => {
            return fetchArticleById(article.article_id)
                .then((article) => {
                    response.status(201).send({ article })
                })
                .catch((err) => {
                    next(err)
                })
        })
        .catch((err) => {
            next(err)
        })
}

module.exports = { getArticles, getArticlesById, changeArticleVotes, getCommentsByArticleID, postComment, postArticle }