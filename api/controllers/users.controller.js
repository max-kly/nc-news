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
        .then(({ token, msg }) => {
            response.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: 'Strict',
                maxAge: 24 * 60 * 60 * 1000
            }).status(200).send({ msg })
        })
        .catch((err) => {
            next(err)
        })
}
function authUser(request, response, next) {
    const token = request.headers.authorization.split(" ")[1]
    if (!token) next({ status: 401, msg: 'No authorisation token provided' })
    decodeUserToken(token)
        .then((data) => {
            response.status(200).send({ data })
        })
        .catch((err) => {
            next(err)
        })
}
module.exports = { getAllUsers, getUserByUsername, loginUser, authUser }