const { fetchArticleById } = require('../models/articles.model.js')
function getArticlesById(request, response, next) {
    const { article_id } = request.params
    fetchArticleById(article_id)
        .then((article) => {
            response.status(200).send({ article })
        })
        .catch((err) => {
            next(err)
        })
}
module.exports = { getArticlesById }
