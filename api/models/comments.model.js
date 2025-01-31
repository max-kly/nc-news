const db = require('../../db/connection')

function fetchCommentById(comment_id) {
    return db.query('SELECT * FROM comments WHERE comment_id = $1', [comment_id])
        .then(({ rows }) => {
            if (!rows.length) {
                return Promise.reject({ status: 404, msg: 'Comment not found' })
            }
            return rows
        })
}
function removeComment(comment_id) {
    return db.query('DELETE FROM comments WHERE comment_id = $1', [comment_id])
}
function changeCommentVotes(comment_id, amount) {
    if (!amount || typeof amount !== 'number') {
        return Promise.reject({ status: 400, msg: 'Bad request' })
    }
    return db.query('UPDATE comments SET votes = votes + $1 WHERE comment_id = $2 RETURNING *', [amount, comment_id])
        .then(({ rows }) => {
            return rows[0]
        })
}
function deleteAllCommentsByArticleID(article_id) {
    return db.query('DELETE FROM comments WHERE article_id = $1', [article_id])
}
module.exports = { removeComment, fetchCommentById, changeCommentVotes, deleteAllCommentsByArticleID }