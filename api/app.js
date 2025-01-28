const { getEndpoints } = require("./controllers/main.controller");
const topics = require('./controllers/topics.controller')
const articles = require('./controllers/articles.controller')
const comments = require('./controllers/comments.controller')
const express = require('express')
const app = express();
app.use(express.json());

app.get('/api', getEndpoints)
app.get('/api/topics', topics.getTopics)
app.get('/api/articles', articles.getArticles)
app.get('/api/articles/:article_id', articles.getArticlesById)
app.get('/api/articles/:article_id/comments', comments.getCommentsByArticleID)
app.post('/api/articles/:article_id/comments', comments.postComment)

app.use((err, request, response, next) => {
    if (err.code === '22P02' || err.code === '23503') {
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