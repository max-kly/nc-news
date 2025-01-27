const fs = require('fs/promises')
function fetchEndpoints() {
    return fs.readFile('endpoints.json', 'utf-8')
        .then((content) => {
            return content
        })
}

module.exports = { fetchEndpoints }