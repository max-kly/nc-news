const db = require('../../db/connection')
const format = require('pg-format')
function fetchArticleById(article_id) {
    const sql = format('SELECT * FROM articles WHERE article_id = %L', article_id)
    return db.query(sql)
        .then(({ rows }) => {
            if (!rows.length) {
                return Promise.reject({msg: 'Not found'})
            }
            return rows[0]
        })
}
module.exports = { fetchArticleById }