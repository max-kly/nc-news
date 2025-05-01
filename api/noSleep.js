const axios = require('axios').default;
const noSleep = () => setInterval(() => {
    axios.get('https://nc-news-yuce.onrender.com/api/articles/1')
        .then(({ data }) => {
            console.log({ data })
        })
}, 120000);
module.exports = noSleep