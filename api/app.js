const { getEndpoints } = require("./controllers/main.controller");

const express = require('express')
const app = express();

app.get('/api', getEndpoints)

module.exports = app