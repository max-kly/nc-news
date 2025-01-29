const { fetchCommentById, removeComment } = require("../models/comments.model")

function deleteComment(request, response, next) {
    const { comment_id } = request.params
    fetchCommentById(comment_id)
        .then(() => {
            removeComment(comment_id)
                .then(() => {
                    response.status(204).send()
                })
                .catch((err) => {
                    next(err)
                })
        })
        .catch((err) => {
            next(err)
        })
}

module.exports = { deleteComment }