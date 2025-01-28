const db = require('../../db/connection')
const format = require('pg-format')
function fetchArticles() {
    return db.query('SELECT articles.article_id, articles.author, articles.title, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comment_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id ORDER BY articles.created_at DESC')
        .then(({ rows }) => {
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
module.exports = { fetchArticles, fetchArticleById }