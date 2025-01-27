const { getEndpoints } = require("./controllers/main.controller");
const topics = require('./controllers/topics.controller')
const articles = require('./controllers/articles.controller')
const express = require('express')
const app = express();

app.get('/api', getEndpoints)
app.get('/api/topics', topics.getTopics)
app.get('/api/articles', articles.getArticles)
app.get('/api/articles/:article_id', articles.getArticlesById)

app.use((err, request, response, next) => {
    if (err.code === '22P02') {
        response.status(400).send({ msg: 'Bad request' })
    }
    else {
        next(err)
    }
})
app.use((err, request, response, next) => {
    if (err.msg === 'Not found') {
        response.status(404).send(err)
    }
    else {
        next(err)
    }
})
app.use((err, request, response, next) => {
    response.status(500).send(err)
})

module.exports = app