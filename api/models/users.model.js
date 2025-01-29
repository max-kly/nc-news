const db = require('../../db/connection')
function fetchAllUsers() {
    return db.query('SELECT * FROM users')
        .then(({ rows }) => {
            return rows
        })
}
function fetchUser(username) {
    return db.query('SELECT * FROM users WHERE username = $1', [username])
        .then(({ rows }) => {
            if (!rows.length) {
                return Promise.reject({status: 404, msg: 'User not found'})
            }
            return rows[0]
        })
}
module.exports = { fetchAllUsers, fetchUser }