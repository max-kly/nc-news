const { fetchCommentById, removeComment, changeCommentVotes } = require("../models/comments.model")

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
function updateCommentVotes(request, response, next) {
    const { comment_id } = request.params
    const { inc_votes } = request.body
    fetchCommentById(comment_id)
        .then(() => {
            return changeCommentVotes(comment_id, inc_votes)
                .then((comment) => {
                    response.status(200).send({ comment })
                })
        })
        .catch((err) => {
            next(err)
        })
}

module.exports = { deleteComment, updateCommentVotes }