const db = require('../../db/connection')
function fetchTopics() {
    return db.query('SELECT * FROM topics')
        .then((topics) => {
            return topics.rows
        })
        .catch((err) => {
            return err
        })
}
function addNewTopic(slug, description) {
    if (!slug || !description) {
        return Promise.reject({ status: 400, msg: 'Bad request: required fields are missing' })
    }
    return db.query('SELECT * FROM topics WHERE slug = $1', [slug])
        .then(({ rows }) => {
            if (rows.length > 0) {
                return Promise.reject({ status: 409, msg: 'Topic already exists' })
            }
            return db.query('INSERT INTO topics (slug, description) VALUES ($1, $2) RETURNING *', [slug, description])
                .then(({ rows }) => {
                    return rows[0]
                })
        })
}
module.exports = { fetchTopics, addNewTopic }