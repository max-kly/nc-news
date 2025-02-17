const { getEndpoints } = require("./controllers/main.controller");
const topics = require('./controllers/topics.controller')
const articles = require('./controllers/articles.controller')
const comments = require('./controllers/comments.controller')
const users = require('./controllers/users.controller')
const express = require('express');
const apiRouter = require("./routers/api.router");
const cors = require('cors')
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', apiRouter)

app.use((err, request, response, next) => {
    if (err.code === '22P02' || err.code === '23503' || err.code === '42703' || err.code === '42601') {
        response.status(400).send({ msg: 'Bad request' })
    }
    else {
        next(err)
    }
})
app.use((err, request, response, next) => {
    if (err.status && err.msg) {
        response.status(err.status).send({ msg: err.msg })
    }
    else {
        next(err)
    }
})
app.use((err, request, response, next) => {
    response.status(500).send(err)
})

module.exports = app