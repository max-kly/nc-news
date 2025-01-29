const db = require('../../db/connection')
const format = require('pg-format')
function fetchArticles(sort_by, order, topic) {
    const sqlOrder = order === undefined ? 'DESC' : order.toUpperCase()
    const sqlSort = sort_by === undefined ? 'created_at' : sort_by
    const sqlTopic = topic === undefined ? 'ANY (SELECT topic FROM articles)' : `'${topic}'`
    const sql = format('SELECT articles.article_id, articles.author, articles.title, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comment_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id WHERE articles.topic = %s GROUP BY articles.article_id ORDER BY %s %s', sqlTopic, sqlSort, sqlOrder)
    return db.query(sql)
        .then(({ rows }) => {
            if (!rows.length && topic !== undefined) {
                return Promise.reject({status: 404, msg: 'No artciles found for a requested topic'})
            }
            return rows
        })
}
function fetchArticleById(article_id) {
    const sql = format('SELECT * FROM articles WHERE article_id = %L', article_id)
    return db.query(sql)
        .then(({ rows }) => {
            if (!rows.length) {
                return Promise.reject({ status: 404, msg: 'Article not found' })
            }
            return rows[0]
        })
}
function updateArticleVotes(article_id, amount) {
    if (!amount || typeof amount !== 'number') {
        return Promise.reject({ status: 400, msg: 'Bad request' })
    }
    return db.query('UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *', [amount, article_id])
        .then(({ rows }) => {
            return rows[0]
        })
}
module.exports = { fetchArticles, fetchArticleById, updateArticleVotes }