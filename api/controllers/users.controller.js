const { fetchAllUsers, fetchUser } = require("../models/users.model")

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
module.exports = { getAllUsers, getUserByUsername }