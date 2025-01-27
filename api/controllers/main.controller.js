const { fetchEndpoints } = require("../models/main.model")

function getEndpoints(request, response) {
    fetchEndpoints()
        .then((endpoints) => {
            const formattedEndpoints = JSON.parse(endpoints)
            response.status(200).send({ endpoints: formattedEndpoints })
        })
}

module.exports = { getEndpoints }