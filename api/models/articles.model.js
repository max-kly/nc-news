const db = require('../../db/connection')
const format = require('pg-format')
function fetchArticles(sort_by, order, topic, limit = 10, page = 1) {
    const offset = (page - 1) * limit
    const sqlOrder = order === undefined ? 'DESC' : order.toUpperCase()
    const sqlSort = sort_by === undefined ? 'created_at' : sort_by
    const sqlTopic = topic === undefined ? 'ANY (SELECT topic FROM articles)' : `'${topic}'`
    const sql = format('SELECT articles.article_id, articles.author, articles.title, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comment_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id WHERE articles.topic = %s GROUP BY articles.article_id ORDER BY %s %s OFFSET %s LIMIT %s', sqlTopic, sqlSort, sqlOrder, offset, limit)
    return db.query(sql)
        .then(({ rows }) => {
            if (!rows.length && topic !== undefined) {
                return Promise.reject({ status: 404, msg: 'No artciles found for a requested topic' })
            }
            if (!rows.length && page) {
                return Promise.reject({ status: 404, msg: 'No content: Search constraints are out of range' })
            }
            return rows
        })
}
function fetchArticleById(article_id) {
    const sql = format('SELECT articles.article_id, articles.author, articles.body, articles.title, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comment_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id WHERE articles.article_id = %L GROUP BY articles.article_id', article_id)
    return db.query(sql)
        .then(({ rows }) => {
            if (!rows.length) {
                return Promise.reject({ status: 404, msg: 'Article not found' })
            }
            return rows[0]
        })
}
function fetchCommentsByArticleID(article_id) {
    return db.query('SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC', [article_id])
        .then(({ rows }) => {
            return rows
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
function addComment(article_id, username, body) {
    if (!username || !body) {
        return Promise.reject({ status: 400, msg: 'Bad request' })
    }
    return db.query('INSERT INTO comments (body, votes, author, article_id, created_at) VALUES ($1, 0, $2, $3, NOW()) RETURNING *', [body, username, article_id])
        .then((result) => {
            return result
        })
}
function addNewArticle(author, title, body, topic, article_img_url) {
    if (!author || !title || !body || !topic) {
        return Promise.reject({ status: 400, msg: 'Bad request, required fields are missing' })
    }
    const articleImg = !article_img_url ? 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700' : article_img_url;
    return db.query('INSERT INTO articles (title, topic, author, body, created_at, votes, article_img_url) VALUES ($1, $2, $3, $4, NOW(), 0, $5) RETURNING *', [title, topic, author, body, articleImg])
        .then(({ rows }) => {
            return rows[0]
        })
}

module.exports = { fetchArticles, fetchArticleById, updateArticleVotes, fetchCommentsByArticleID, addComment, addNewArticle }