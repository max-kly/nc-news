const { fetchArticleById } = require("../models/articles.model")
const { fetchCommentsByArticleID, addComment, fetchCommentById, removeComment } = require("../models/comments.model")

function getCommentsByArticleID(request, response, next) {
    const { article_id } = request.params
    fetchArticleById(article_id)
        .then(() => {
            fetchCommentsByArticleID(article_id)
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
function deleteComment(request, response, next) {
    const { comment_id } = request.params
    fetchCommentById(comment_id)
        .then(() => {
            removeComment(comment_id)
                .then(() => {
                    response.status(202).send()
                })
                .catch((err) => {
                    next(err)
                })
        })
        .catch((err) => {
            next(err)
        })
}
module.exports = { getCommentsByArticleID, postComment, deleteComment }