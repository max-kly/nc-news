const { fetchTopics, addNewTopic } = require('../models/topics.model')
function getTopics(request, response, next) {
    fetchTopics()
        .then((topics) => {
            response.status(200).send({ topics })
        })
        .catch((err) => {
            next(err)
        })
}
function postTopic(request, response, next) {
    const { slug, description } = request.body
    addNewTopic(slug, description)
        .then((topic) => {
            response.status(201).send({ topic })
        })
        .catch((err) => {
            next(err)
        })
}
module.exports = { getTopics, postTopic }