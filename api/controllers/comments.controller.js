const { fetchCommentsByArticleID } = require("../models/comments.model")

function getCommentsByArticleID(request, response, next) {
    const { article_id } = request.params
    fetchCommentsByArticleID(article_id)
        .then((comments) => {
            response.status(200).send(comments)
        })
        .catch((err) => {
            next(err)
        })
}
module.exports = { getCommentsByArticleID }