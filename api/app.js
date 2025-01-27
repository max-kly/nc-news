const { getEndpoints } = require("./controllers/main.controller");
const topics = require('./controllers/topics.controller')
const express = require('express')
const app = express();

app.get('/api', getEndpoints)
app.get('/api/topics', topics.getTopics)

app.use((err, request, response, next) => {
    response.status(500).send(err)
})

module.exports = app