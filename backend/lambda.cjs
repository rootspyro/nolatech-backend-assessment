const app = require("./app.cjs")
const serverless = require("serverless-http")


module.exports.handler = serverless(app)
