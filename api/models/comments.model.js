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

module.exports = { removeComment, fetchCommentById }