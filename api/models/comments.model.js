const db = require('../../db/connection')
function fetchCommentsByArticleID(article_id) {
    return db.query('SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC', [article_id])
        .then(({ rows }) => {
            return rows
        })

}
function addComment(article_id, username, body) {
    if (!username || !body) {
        return Promise.reject({ status: 400, msg: 'Bad request' })
    }
    return db.query('INSERT INTO comments (body, votes, author, article_id, created_at) VALUES ($1, 0, $2, $3, NOW()) RETURNING *', [body, username, article_id])
        .then((result) => {
            return result
        })
}
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
module.exports = { fetchCommentsByArticleID, addComment, removeComment, fetchCommentById }