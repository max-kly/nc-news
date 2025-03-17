const { fetchAllUsers, fetchUser, findUser } = require("../models/users.model")

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
        .then((msg) => {
            response.status(200).send(msg)
        })
        .catch((err) => {
            next(err)
        })
}
module.exports = { getAllUsers, getUserByUsername, loginUser }