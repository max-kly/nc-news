const bcrypt = require('bcrypt')
const db = require('../../db/connection')
const jwt = require('jsonwebtoken')
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
                    process.env.JWT_SECRET,
                    { expiresIn: process.env.JWT_EXPIRES_IN })
                const userData = {
                    username: rows[0].username,
                    name: rows[0].name,
                    avatar_url: rows[0].avatar_url
                }
                return { token, userData }
            }
            return Promise.reject({ status: 404, msg: 'Invalid username or password' })
        })
}
function decodeUserToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return Promise.reject({ status: 403, msg: 'Invalid auth token' })
        }
        return Promise.resolve(decoded)
    })
}
module.exports = { fetchAllUsers, fetchUser, findUser, decodeUserToken }