const { fetchArticleById } = require('../models/articles.model.js')
function getArticlesById(request, response, next) {
    const { article_id } = request.params
    console.log('Here we entered the controller!!', article_id, '<--- article id')
    fetchArticleById(article_id)
        .then((article) => {
            response.status(200).send({ article })
        })
        .catch((err) => {
            console.log(err, '<--- err from controller')
            next(err)
        })
}
module.exports = { getArticlesById }
