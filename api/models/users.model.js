const bcrypt = require('bcrypt')
const db = require('../../db/connection')
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET
const jwtExpirity = process.env.JWT_EXPIRES_IN
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
                return Promise.reject({ status: 404, msg: 'User not found' })
            }
            return rows[0]
        })
}
function findUser(username, password) {
    return db.query('SELECT * FROM users WHERE username = $1', [username])
        .then(({ rows }) => {
            if (!rows.length) {
                return Promise.reject({ status: 404, msg: 'Invalid username or password' })
            }
            if (bcrypt.compareSync(password, rows[0].password)) {
                const token = jwt.sign(
                    { username: rows[0].username, avatar_url: rows[0].avatar_url, name: rows[0].name },
                    jwtSecret,
                    { expiresIn: jwtExpirity })
                return { token, msg: 'User was found, credentials are valid' }
            }
            return Promise.reject({ status: 404, msg: 'Invalid username or password' })
        })
}
function decodeUserToken(token) {
    return jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            return Promise.reject({ status: 403, msg: 'Invalid authorisation token' })
        }
        return Promise.resolve(decoded)
    })
}
module.exports = { fetchAllUsers, fetchUser, findUser, decodeUserToken }