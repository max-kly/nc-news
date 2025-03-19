const { fetchAllUsers, fetchUser, findUser, decodeUserToken } = require("../models/users.model")

function getAllUsers(request, response, next) {
    fetchAllUsers()
        .then((users) => {
            response.status(200).send({ users })
        })
        .catch((err) => {
            next(err)
        })
}
function getUserByUsername(request, response, next) {
    const { username } = request.params
    fetchUser(username)
        .then((user) => {
            response.status(200).send({ user })
        })
        .catch((err) => {
            next(err)
        })
}
function loginUser(request, response, next) {
    const { username, password } = request.query
    if (!username || !password) next({ status: 404, msg: 'Invalid username or password' })
    findUser(username, password)
        .then(({ token, userData }) => {
            response.status(200).send({ token, userData })
        })
        .catch((err) => {
            next(err)
        })
}
function authUser(request, response, next) {
    const { session } = request.query
    if (!session) return next({ status: 401, msg: 'No auth token provided' })
    decodeUserToken(session)
        .then((data) => {
            response.status(200).send({ data })
        })
        .catch((err) => {
            next(err)
        })
}
module.exports = { getAllUsers, getUserByUsername, loginUser, authUser }