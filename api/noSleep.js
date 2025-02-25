const axios = require('axios').default;
const noSleep = () => setInterval(() => {
    axios.get('https://nc-news-ih3j.onrender.com/api/')
        .then(({ data }) => {
            console.log({ data })
        })
}, 120000);
module.exports = noSleep